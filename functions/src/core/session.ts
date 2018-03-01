
import {
    stringToHash,
    varifyHash,
    validateHash
} from "bcrypt-inzi"

import db from './../db'
import { resolve } from "path";


export class session {
    static start = function (email: string): Promise<string> {
        return new Promise((resolve, reject) => {

            stringToHash(email + "token").then(hash => {
                // console.log("hash: ", hash);

                db.collection("sessions").doc(email).set({ hash: hash })
                    .then(success => {
                        resolve(hash);
                    })
            })
        })
    }
    static check = function (email: string, token: string) {
        return new Promise((resolve, reject) => {

            db.collection("sessions").doc(email).get()
                .then(session => {
                    // console.log("session data:", session.data());
                    if (session.exists && session.data().hash === token) {
                        resolve()
                    } else {
                        reject();
                    }
                })
        })
    }
    static end = function (email: string) {
        return new Promise((resolve, reject) => {

            db.collection("sessions").doc(email).delete()
                .then(success => {
                    resolve();
                })
        })
    }


}