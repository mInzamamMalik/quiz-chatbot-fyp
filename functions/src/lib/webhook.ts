
import * as functions from 'firebase-functions';
const { WebhookClient } = require('dialogflow-fulfillment');


// http example
export const webhook = functions.https.onRequest((request, response) => {

    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));



    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    // works with intent name(doesnt work with action identifier) and this intent name is ****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    // intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('Start quiz', startQuiz);

    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    _agent.handleRequest(intentMap);




    function welcome(agent: any) {
        console.log("agent.originalRequest: ", agent.originalRequest);

        let params = agent.parameters;

        agent.add(`Hi & welcome to Persongify. The place for personalized songs!`);
        
    }






});