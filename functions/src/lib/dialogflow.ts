import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';


var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything

// http example
export const webhook = functions.https.onRequest((req, res) => {

});

interface talk {
    platform: string, // 0 for web, 1 for android
    text: string,
    uid: string,
    token: string
}

// http example
export const talk = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        let messageObject: talk = req.body;

        if (messageObject.token === "1234tokenabc") {

            res.send({
                status: 200,
                reply: "hello world reply from chatbot",
                uid: messageObject.uid
            })
        } else {
            res.send({
                status: 401,
                message: "invalid token"
            })
        }
    }
});
