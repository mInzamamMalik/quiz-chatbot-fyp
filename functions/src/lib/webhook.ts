
import * as functions from 'firebase-functions';
import { WebhookClient, context } from 'dialogflow-fulfillment';


let quiz = {
    overview: "",
    subject: "General Knowledge",
    totalMark: 100,
    passingMark: 50,
    durationInMinutes: 60,
    instructor: "Dr. Sam Smith",

    questions: [
        {
            question: "what was the first capital of pakistan",
            options: ["karachi", "lahore", "islamabad", "kashmir"],
            correctIndex: 0
        },
        {
            question: "which one is the bigest city of pakistan",
            options: ["karachi", "lahore", "islamabad", "kashmir"],
            correctIndex: 0
        },
    ]
}

interface contextQuizStarted {
    name: 'quiz_started',
    parameters: {
        quizStarted: boolean,
        last_readed_question_index: number,
        answered_count: number
    },
    lifespan: number
}




// http example
export const webhook = functions.https.onRequest((request, response) => {

    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    // works with intent name(doesnt work with action identifier) and this intent name is ****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('startQuiz', startQuiz);
    intentMap.set('startQuiz_overview', startQuiz_overview);
    intentMap.set('startQuiz_readQuestion', startQuiz_readQuestion);
    intentMap.set('startQuiz_logAnswer', startQuiz_logAnswer);

    _agent.handleRequest(intentMap);


    function welcome(agent: any) {
        console.log("agent.getContext('startQuiz'): ", agent.getContext('startQuiz'));

        let params = agent.parameters;

        let context = agent.context.get("quiz_started");
        console.log("context:", context)
        return agent.add(`Hi, would you like me to start quiz`);

    }


    function startQuiz(agent: WebhookClient) {

        let contextQuizStarted: contextQuizStarted = agent.context.get("quiz_started");

        if (contextQuizStarted) { // if quiz is already started
            return agent.add(`you already have started quiz, and you already answered \n
            ${contextQuizStarted.parameters.answered_count}\n
            you may ask me to read overview or ask me to read question number`);
        }

        let newContext: contextQuizStarted = {
            name: 'quiz_started',
            lifespan: 99,
            parameters: {
                quizStarted: true,
                answered_count: 0,
                last_readed_question_index: null
            }
        }
        agent.setContext(newContext);
        return agent.add(`your quiz is started, would you like me to tell you overview? or you can directly ask for 1st question`);
    }

    function startQuiz_overview(agent: WebhookClient) {

        return agent.add(`general knowlegde quiz\n
        this quiz have 10 questions and all questions are mcqs based,\n
        created by Prof. John maclean,\n
        all questions have equal marks
        you have to attempt all questions\n
        total marks 100 and passing marks is 50\n
        ask for 1st question when you are ready`);
    }

    function startQuiz_readQuestion(agent: WebhookClient) {

        let context: contextQuizStarted = agent.context.get("quiz_started");

        let params = agent.parameters;
        console.log("params: ", params)

        if (!params.question_number && !params.question_ordinal && params.next) {
            return agent.add(`please tell me which question you are talking about, \n
            you may ask like read first question or read question number 4, or if you want to skip this question\n
            ask me to read next question`)
            
        } else if (params.next) { // user is asking to skip/read next question with the context of current

            let newContext: contextQuizStarted = {
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question_index: (context.parameters.last_readed_question_index + 1),
                    answered_count: context.parameters.answered_count
                }
            }
            agent.setContext(newContext);
            agent.setContext({
                name: 'question_asked',
                lifespan: 1,
                parameters: {}
            });

            // TODO: correct this text
            return agent.add(`ok here is your next question, question number ${context.parameters.last_readed_question_index + 2}\n
            is saying, ${quiz.questions[context.parameters.last_readed_question_index + 1].question},\n
            and your options are: ${quiz.questions[context.parameters.last_readed_question_index + 1].options.toString()}\n
            which option do you think is correct? to log your answer say like option 1 or option A or first option is correct
            if you want me to read this question again simply ask me to read this question again,
            if you want to skip this question you may ask me to read any other question`)


        } else { // user is asking to read quesion by its number#
            let question_number = params.question_number || params.question_ordinal

            let newContext: contextQuizStarted = {
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question_index: question_number,
                    answered_count: context.parameters.answered_count
                }
            }
            agent.setContext(newContext);
            agent.setContext({
                name: 'question_asked',
                lifespan: 1,
                parameters: {}
            });
            return agent.add(`question number ${question_number} is saying, ${quiz.questions[question_number - 1].question},\n
            and your options are: ${quiz.questions[question_number - 1].options.toString()}\n
            which option do you think is correct? to log your answer say like option 1 or option A or first option is correct
            if you want me to read this question again simply ask me to read this question again,
            if you want to skip this question you may ask me to read any other question`)
        }
    }


    function startQuiz_logAnswer(agent: WebhookClient) {

        let params = agent.parameters;
        console.log("params: ", params)

        if (!params.option) {
            return agent.add("sorry i didnt get what option you have selected, to log your answer say like option 1 or option A or first option is correct")
        } else {
            let selectedOptionNumber = params.option

            agent.setContext({
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    // last_readed_question_index: question_number,
                    answered_count: 1 // TODO: get data from context and increment
                }
            });
            agent.setContext({
                name: 'question_asked',
                lifespan: 0,
                parameters: {}
            });
            return agent.add(`you said option number ${selectedOptionNumber + 1} is correct which is  ${quiz.questions[0].options[selectedOptionNumber]}`)
            //TODO: get data from context and replace 0 with last asked question number 
        }
    }

});



var body = {
    "id": "95293748-d13b-4458-9b25-3b33b729ec66",
    "timestamp": "2018-10-17T12:40:48.703Z",
    "lang": "en",
    "result": {
        "source": "agent",
        "resolvedQuery": "hi",
        "speech": "",
        "action": "input.welcome",
        "actionIncomplete": false,
        "parameters": {

        },
        "contexts": [{}],
        "metadata": {
            "intentId": "a32854c1-56f1-4dc8-897a-2eccf221017c",
            "webhookUsed": "true",
            "webhookForSlotFillingUsed": "false",
            "isFallbackIntent": "false",
            "intentName": "Default Welcome Intent"
        },
        "fulfillment": {
            "speech": "welcome to the quiz system,            you may ask me to start quiz or overview of quiz",
            "messages": [{
                "type": 0,
                "speech": "welcome to the quiz system,                 you may ask me to start quiz or overview of quiz"
            }]
        },
        "score": 1
    },
    "status": {
        "code": 200,
        "errorType": "success"
    },
    "sessionId": "b1e0414f-0c92-5497-0913-5b3acd475f9a"
}