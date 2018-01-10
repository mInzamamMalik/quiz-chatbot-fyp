import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import db from './../db'

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
    uid: string
    token: string
}

export const signup = functions.https.onRequest(async (req, res) => {
    cors(req, res, () => {

        let userObject: signup = req.body;

        db.collection("users").doc(userObject.email).set(userObject)
            .then(success => {
                res.send({
                    status: 200,
                    message: "signed up",
                    uid: userObject.email,
                    token: "1234tokenabc"
                })
            })
    })
})

export const login = functions.https.onRequest(async (req, res) => {

    cors(req, res, () => {

        let userObject: signup = req.body;

        db.collection("users").doc(userObject.email).get()
            .then(user => {

                res.send({
                    status: 200,
                    message: "logged in",
                    uid: userObject.email,
                    token: "1234tokenabc"
                })
            })
    })
})

export const profile = functions.https.onRequest(async (req, res) => {

    cors(req, res, () => {

        let authObject: auth = req.body;
        if (authObject.token === "1234tokenabc") {

            db.collection("users").doc(authObject.uid).get()
                .then(user => {
                    res.send({
                        status: 200,
                        profile: user.data()
                    })
                })
        } else {
            res.send({
                status: 401,
                message: "invalid token"
            })
        }
    })
})
