import * as functions from 'firebase-functions'
import * as request from 'request'

import * as apiai from 'apiai';
import { TextRequestOptions, Event, EventRequestOptions } from 'apiai';

let app = apiai('4033a05cc6e7444bad5f0e58ba9b4889');

export function textQuery(text: [string] | string, options: {
    sessionId: string
    originalRequest: object
}): Promise<any> {
    return new Promise((resolve, reject) => {

        console.log("apiai text: ", text)
        console.log("apiai options: ", options)

        let request = app.textRequest(text, options);

        request.on('response', function (response) {
            console.log("apiai response: ", response);
            console.log("apiai response: JSON.stringify(response) ", JSON.stringify(response));
            resolve(response);
        });

        request.on('error', function (error) {
            console.log(error);
            reject(error);
        });

        request.end();

    })
}

export function eventQuery(event: Event, options: { sessionId: string }): Promise<any> {
    return new Promise((resolve, reject) => {

        let request = app.eventRequest(event, options);

        request.on('response', function (response) {
            console.log(response);
            resolve(response);
        });

        request.on('error', function (error) {
            console.log(error);
            reject(error);
        });

        request.end();
    })
}




let a = {
    "id": "81c5b710-c5dd-47f8-8a11-d100cd3ed208",
    "timestamp": "2018-01-17T14:46:32.86Z",
    "lang": "en",
    "result":
        {
            "source": "agent",
            "resolvedQuery": "manage group",
            "action": "manageGroup",
            "actionIncomplete": true,
            "parameters": { "groupName": "" },
            "contexts": [
                {
                    "name": "managegroup_dialog_params_groupname",
                    "parameters": { "groupName": "", "groupName.original": "" },
                    "lifespan": 1
                },
                {
                    "name": "0a66351e-9ca9-4696-a47a-0a95eb8f328d_id_dialog_context",
                    "parameters": { "groupName": "", "groupName.original": "" }, "lifespan": 2
                },
                {
                    "name": "managegroup_dialog_context", "parameters": { "groupName": "", "groupName.original": "" }, "lifespan": 2
                }],
            "metadata": {
                "intentId": "0a66351e-9ca9-4696-a47a-0a95eb8f328d", "webhookUsed": "true", "webhookForSlotFillingUsed": "true", "webhookResponseTime": 71, "intentName": "manageGroup"
            },
            "fulfillment": {
                "speech": "please select a group", 
                "messages": [{ "type": 0, "speech": "please select a group" }],
                "data": {
                    "type": "suggestion_chips",
                    "items": ["group1", "group2"]
                }
            },
            "score": 1
        },
    "status": { "code": 200, "errorType": "success", "webhookTimedOut": false }, "sessionId": "zia12"


}









