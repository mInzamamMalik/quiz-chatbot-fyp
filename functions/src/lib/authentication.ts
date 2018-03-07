import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import db from './../db';
import { session } from './../core';

import * as _cors from 'cors';

var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything

interface signup {
    firstName: string
    lastName: string
    phoneNumber: number
    email: string
    password: string
}
interface login {
    email: string
    password: string
}
interface auth {
    email: string
    token: string
}

export const signup = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        let body = req.body;

        if (!body.firstName ||
            !body.lastName ||
            !body.phoneNumber ||
            !body.email ||
            !body.password) {
            res.status(400).send("required params missing: firstName: string lastName: string phoneNumber: number email: string password: string");
        }

        let userObject: signup = req.body;
        db.collection("users").doc(userObject.email).get()
            .then(user => {
                if (user.exists) {
                    res.status(200).send("email already exist")
                } else {
                    db.collection("users").doc(userObject.email).set(userObject)
                        .then(success => {
                            res.status(200).send("signed up")
                        })
                }
            })
    })
})

export const login = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        let body = req.body;

        if (!body.email || !body.password) {
            res.status(400).send("required params missing: email: string password: string");
        }

        db.collection("users").doc(body.email).get()
            .then(user => {

                if (user.exists) {
                    console.log("Document data:", user.data());
                    if (user.data().password === body.password) {

                        session.start(body.email).then((token) => {
                            db.collection("users").doc(body.email).get()
                                .then(user => {
                                    res.send({
                                        email: body.email,
                                        token: token,
                                        profile: user.data()
                                    })
                                })
                        })
                    } else {
                        res.status(401).send("password is invalid");
                    }
                } else {
                    // user.data() will be undefined in this case
                    console.log("No such user!");
                    res.status(401).send("email is invalid");
                }
            })
    })
})

export const profile = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {
        let body: auth = req.body;

        if (!body.email || !body.token) {
            res.status(400).send("required params missing");
        }
        session.check(body.email, body.token).then(() => {

            db.collection("users").doc(body.email).get()
                .then(user => {
                    res.send(user.data())
                })

        }).catch(e => {
            res.status(401).send("invalid token")
        })
    })
})

export const logout = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {

        let body: auth = req.body;
        if (!body.email || !body.token) {
            res.status(400).send("required params missing");
        }

        session.check(body.email, body.token).then(() => {
            session.end(body.email).then(() => {
                res.status(200).send("logged out")
            })

        }).catch(e => {
            res.status(401).send("invalid token")
        })
    })
})