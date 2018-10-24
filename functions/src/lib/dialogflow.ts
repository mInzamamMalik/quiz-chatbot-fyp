import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as _cors from 'cors';
import { session, textQuery } from './../core';
import db from './../db'
import { firebaseAdmin } from './../db'
import { document } from 'firebase-functions/lib/providers/firestore';
import { http } from 'request-inzi';
import * as request from "request";

var cors = _cors({ origin: true });// set these options appropriately According to your case,
// see document: https://www.npmjs.com/package/cors#configuration-options
// true means allow everything


interface talk {
    platform: string, // 0 for web, 1 for android
    text: string,
    email: string,
    token: string
}

export const getallmessages = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        let body = req.body;
        if (!body.email || !body.token) {
            res.status(400).send("required params missing");
        }
        session.check(body.email, body.token).then(() => {

            let messageArr: any = [];

            db.collection(`messages/${body.email}/chat`).get()
                .then((userMessageRef) => {
                    userMessageRef.forEach(documentSnap => {
                        messageArr.push(documentSnap.data())
                    })
                    res.send(messageArr)
                }).catch(e => {
                    console.log("firebase write error");
                    res.status(500).send("firebase error")
                })
        }).catch(e => {
            res.status(401).send("invalid token")
        })
    })
})

export const writemessage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        let body = req.body;
        if (!body.email || !body.from || !body.token || !body.platform || !body.text) {
            res.status(400).send("required params missing");
        }
        session.check(body.email, body.token).then(() => {

            let userMessage = {
                text: body.text,
                platform: body.platform,
                from: body.from,
                timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
            }
            console.log("attempting to write messages in db");

            db.collection(`messages/${body.email}/chat`).add(userMessage)
                .then((userMessageRef) => {

                    console.log("firebase write success");
                    userMessageRef.get()
                        .then(userMessageSnap => {
                            res.send(userMessageSnap.data())
                        })
                }).catch(e => {
                    console.log("firebase write error");
                    res.status(500).send("firebase error")
                })
        }).catch(e => {
            res.status(401).send("invalid token")
        })
    })
})



export const talk = functions.https.onRequest((req, res) => {
    cors(req, res, () => {

        console.log("req.body: ", req.body)

        const languageCode = 'en-US';
        let sessionId = req.body.sessionId;
        const query = req.body.query;

        if (!query) return res.send("query text required")
        if (!sessionId) sessionId = "no-session";

        request({
            url: `https://api.dialogflow.com/v1/query?v=20170712&query=${query}&lang=en&sessionId=756b16a5-bb0a-1178-60a7-5408aff15a13&timezone=Asia/Karachi`,
            headers: { "Authorization": "Bearer 4033a05cc6e7444bad5f0e58ba9b4889" }
        },
            (error, response: any, body) => {
                //checking if response was success
                if (!error && response.statusCode == 200) {
                    let responseBody = JSON.parse(response.body)

                    console.log("responseBody: ", responseBody)
                    res.send({
                        reply: responseBody.result.fulfillment.speech
                    })

                } else {
                    console.log("http get error * url: ", url + query, error);
                    return
                }

            })

    })
})




// PREVIOUS TECHNIQUE TO TALK WITH CHATBOT

// // http example
// export const talk = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {

//         let body = req.body;
//         if (!body.email || !body.token || !body.platform || !body.text) {
//             res.status(400).send("required params missing");
//         }
//         session.check(body.email, body.token).then(() => {

//             let userMessage = {
//                 text: body.text,
//                 platform: body.platform,
//                 from: body.email,
//                 timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
//             }

//             //send req to dialogflow
//             textQuery(body.text, {
//                 sessionId: body.email,
//                 originalRequest: {
//                     data: { email: body.email }
//                 }
//             }).then((apiaiRes) => {
//                 console.log("apiaiRes: ", apiaiRes);
//                 // console.log("apiaiRes.result: ", apiaiRes.result);
//                 // console.log("apiaiRes.result.contexts: ", apiaiRes.result.contexts);
//                 // console.log("apiaiRes.result.contexts[0]: ", apiaiRes.result.contexts[0] || "none");
//                 // console.log("apiaiRes.result.contexts[1]: ", apiaiRes.result.contexts[1] || "none");

//                 // console.log("apiaiRes.result.fulfillment: ", apiaiRes.result.fulfillment);
//                 // console.log("apiaiRes.result.fulfillment.displayText: ", apiaiRes.result.fulfillment.displayText);
//                 // console.log("apiaiRes.result.fulfillment.speech: ", apiaiRes.result.fulfillment.speech);

//                 let promises: [Promise<any>] = [null];

//                 let quizbotMessages: any = [{
//                     type: 'text',
//                     display_text: apiaiRes.result.fulfillment.displayText || apiaiRes.result.fulfillment.speech || '',
//                     speech: apiaiRes.result.fulfillment.speech || '',
//                     from: 'quizbot',
//                     timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
//                 }]

//                 // let type = apiaiRes.result.fulfillment['data']['type'];
//                 // console.log("apiaiRes.result.fulfillment['data']['type']: ", apiaiRes.result.fulfillment['data']['type']);

//                 // let type = null;

//                 // switch (type) {
//                 //     case 'suggestion_chips':
//                 //         quizbotMessages.push({
//                 //             type: 'suggestion_chips',
//                 //             items: apiaiRes.result.fulfillment.data.items,
//                 //             from: 'quizbot',
//                 //             timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
//                 //         })
//                 //         break;
//                 // }

//                 console.log("attempting to write messages in db");
//                 db.collection(`messages/${body.email}/chat`)
//                     .add(quizbotMessages[0])
//                     .then((quizbotMessagesRef) => {
//                         console.log("rich responses write success");

//                         res.send(quizbotMessages)
//                     }).catch(e => {
//                         console.log("rich responses write error");
//                     })

//             }).catch((e) => {
//                 console.log("dialogflow query err: ", e);
//                 return "dialogflow query error"
//             })

//             // res.status(200).send([{
//             //     reply: "hello this is reply from chatbot",
//             //     ssml: `<speak>` +
//             //         `<s>Hello </s>` +
//             //         `<s>this is reply from chatbot </s>` +
//             //         `</speak>`,
//             //     email: body.email
//             // }])


//         }).catch(e => {
//             res.status(401).send("invalid token")
//         })
//     })
// });
