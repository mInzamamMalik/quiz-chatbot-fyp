import * as functions from 'firebase-functions';

import { textQuery } from './../core'
import { firebaseAdminFirestore, firebaseAdmin, firebaseAdminAuth } from './../db'



// WE ARE NO LONGER USING THIS FUNCTION, INSTEAD WE ARE USING HELUSS TYPE RESPONSES

// // this functions will be triggered when user will send message to esox personal assistant
// // from home screen of esox android app and esox 
// // please do not modify this function without permission of inzamam
// export const onMessage = functions.firestore
//     .document('assistant-chat/{userId}/chat/{messageUid}')
//     .onWrite((event) => {

//         let userId = event.params.userId;
//         console.log("userId: ", userId);

//         var newValue = event.data.data();
//         console.log("newValue: ", newValue);

//         if (newValue.from == 'esoxbot') {
//             console.log("this message was from esox bot");
//             return "esoxbot"
//         }
//         console.log("newValue.display_text: ", newValue.display_text)

//         return textQuery(newValue.display_text, {
//             sessionId: userId,
//             originalRequest: {
//                 data: {
//                     user: {
//                         // groupId: event.params.groupId,
//                         // subgroupId: event.params.subgroupId,
//                         userId: userId
//                     }
//                 }
//             }
//         }).then((res) => {
//             console.log("res: ", res);
//             console.log("res.result: ", res.result);
//             console.log("res.result.contexts: ", res.result.contexts);
//             console.log("res.result.contexts[0]: ", res.result.contexts[0] || "none");
//             console.log("res.result.contexts[1]: ", res.result.contexts[1] || "none");

//             console.log("res.result.fulfillment: ", res.result.fulfillment);
//             console.log("res.result.fulfillment.displayText: ", res.result.fulfillment.displayText);
//             console.log("res.result.fulfillment.speech: ", res.result.fulfillment.speech);

//             let message = {
//                 type: 'text',
//                 display_text: res.result.fulfillment.displayText || res.result.fulfillment.speech || '',
//                 speech: res.result.fulfillment.speech || '',
//                 from: 'esoxbot',
//                 timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
//             }

//             return firebaseAdminFirestore.collection(`assistant-chat/${userId}/chat`)
//                 .add(message)
//                 .then(added => {

//                     console.log("firestore speech write success", res);

//                     let promises: [Promise<any>] = [null];
//                     let type = res.result.fulfillment['data']['type'];
//                     console.log("res.result.fulfillment['data']['type']: ", res.result.fulfillment['data']['type']);

//                     switch (type) {
//                         case 'suggestion_chips':
//                             let suggestionChip = {
//                                 type: 'suggestion_chips',
//                                 items: res.result.fulfillment.data.items,
//                                 from: 'esoxbot',
//                                 timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp()
//                             }
//                             promises.push(
//                                 firebaseAdminFirestore.collection(`assistant-chat/${userId}/chat`)
//                                     .add(suggestionChip)
//                             )
//                             break;
//                     }

//                     console.log("attempting to write rich messages");
//                     Promise.all(promises).then(responses => {
//                         console.log("rich responses write success");
//                     }).catch(e => {
//                         console.log("rich responses write error");
//                     })

//                 }).catch(e => {
//                     console.log("firestore speech write error", e);
//                     return "def error"
//                 })

//         }).catch((e) => {
//             console.log("dialogflow query err: ", e);
//             return "dialogflow query error"
//         })

//         console.log("outside");
//     })

