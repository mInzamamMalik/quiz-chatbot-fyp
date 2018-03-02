import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';
import { session, textQuery } from './../core';
import db from './../db'
import { firebaseAdmin } from './../db'


var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything

// http example
export const webhook = functions.https.onRequest((req, res) => {

});

interface talk {
    platform: string, // 0 for web, 1 for android
    text: string,
    email: string,
    token: string
}

// http example
export const talk = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        let body = req.body;
        if (!body.email || !body.token || !body.platform || !body.text) {
            res.status(400).send("required params missing");
        }
        session.check(body.email, body.token).then(() => {

            let userMessage = {
                text: body.text,
                platform: body.platform,
                from: body.email,
                timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
            }

            //send req to dialogflow
            textQuery(body.text, {
                sessionId: body.email,
                originalRequest: {
                    data: { email: body.email }
                }
            }).then((apiaiRes) => {
                console.log("apiaiRes: ", apiaiRes);
                // console.log("apiaiRes.result: ", apiaiRes.result);
                // console.log("apiaiRes.result.contexts: ", apiaiRes.result.contexts);
                // console.log("apiaiRes.result.contexts[0]: ", apiaiRes.result.contexts[0] || "none");
                // console.log("apiaiRes.result.contexts[1]: ", apiaiRes.result.contexts[1] || "none");

                // console.log("apiaiRes.result.fulfillment: ", apiaiRes.result.fulfillment);
                // console.log("apiaiRes.result.fulfillment.displayText: ", apiaiRes.result.fulfillment.displayText);
                // console.log("apiaiRes.result.fulfillment.speech: ", apiaiRes.result.fulfillment.speech);

                let promises: [Promise<any>] = [null];

                let quizbotMessages: any = [{
                    type: 'text',
                    display_text: apiaiRes.result.fulfillment.displayText || apiaiRes.result.fulfillment.speech || '',
                    speech: apiaiRes.result.fulfillment.speech || '',
                    from: 'quizbot',
                    timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
                }]

                // let type = apiaiRes.result.fulfillment['data']['type'];
                // console.log("apiaiRes.result.fulfillment['data']['type']: ", apiaiRes.result.fulfillment['data']['type']);

                // let type = null;

                // switch (type) {
                //     case 'suggestion_chips':
                //         quizbotMessages.push({
                //             type: 'suggestion_chips',
                //             items: apiaiRes.result.fulfillment.data.items,
                //             from: 'quizbot',
                //             timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
                //         })
                //         break;
                // }

                console.log("attempting to write messages in db");
                db.collection(`messages/${body.email}/chat`)
                    .add(quizbotMessages[0])
                    .then((quizbotMessagesRef) => {
                        console.log("rich responses write success");

                        res.send(quizbotMessages)
                    }).catch(e => {
                        console.log("rich responses write error");
                    })

            }).catch((e) => {
                console.log("dialogflow query err: ", e);
                return "dialogflow query error"
            })

            // res.status(200).send([{
            //     reply: "hello this is reply from chatbot",
            //     ssml: `<speak>` +
            //         `<s>Hello </s>` +
            //         `<s>this is reply from chatbot </s>` +
            //         `</speak>`,
            //     email: body.email
            // }])


        }).catch(e => {
            res.status(401).send("invalid token")
        })
    })
});
