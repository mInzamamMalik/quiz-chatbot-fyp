
import * as functions from 'firebase-functions';
const { WebhookClient } = require('dialogflow-fulfillment');


let quiz: any = {

    overview: `this is a general knowlegde quiz, all questions have equal marks you have to attempt all questions`,
    subject: "General Knowledge",
    totalMark: 100,
    passingMark: 50,
    durationInMinutes: 60,
    instructor: "Dr. Sam Smith",

    questions: [
        {
            question: "what was the first capital of pakistan",
            options: ["karachi", "lahore", "islamabad", "kashmir"],
            correctIndex: 0,
            userSelectedIndex: null
        },
        {
            question: "which one is the bigest city of pakistan",
            options: ["karachi", "lahore", "islamabad", "kashmir"],
            correctIndex: 0,
            userSelectedIndex: null
        },
        {
            question: "Which of the following country has no boundary with Syria?",
            options: ["Iraq", "Iran", "Turkey", "Israel"],
            correctIndex: 1,
            userSelectedIndex: null
        },
        {
            question: "which city is called The land of hospitality?",
            options: ["KPK", "Sindh", "Baluchistan", "Punjab"],
            correctIndex: 0,
            userSelectedIndex: null
        },
        {
            question: "How many crops seasons are in Pakistan?",
            options: ["2", "3", "4", "None of the above"],
            correctIndex: 2,
            userSelectedIndex: null
        }
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

export const webhook = functions.https.onRequest((request, response) => {

    const _agent = new WebhookClient({ request: request, response: response });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();

    // works with intent name(doesnt work with action identifier) and this intent name is ****ing case sensitive :-(
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
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
        return agent.add(`Hi, I'm your quiz assistant,
         I Will assist you through out the quiz, please say start quiz when you are ready to start`);
    }

    function fallback(agent: any) {
        let contextQuizStarted: contextQuizStarted = agent.context.get("quiz_started");

        let response = "I didnt understand what you have just said. ";

        if (contextQuizStarted) { // if quiz is already started
            response += ` your quiz is in progress, so far you have answered \n
            ${contextQuizStarted.parameters.answered_count}\n, you may ask me to read any question number, or you may ask for overview`
        } else {
            response += ` your have not started the quiz please say start quiz when you are ready`
        }
        agent.add(response)
    }


    function startQuiz(agent: any) {

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
        let quiz: contextQuizStarted = {
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

    function startQuiz_overview(agent: any) {

        return agent.add(
            `${quiz.overview}
        this quiz have ${quiz.questions.length} questions and all questions are mcqs based,\n
        created by ${quiz.instructor},\n
        total marks are ${quiz.totalMark} and passing mark is ${quiz.passingMark}\n
        ask for 1st question when you are ready`
        );
    }

    function startQuiz_readQuestion(agent: any) {

        let context: contextQuizStarted = agent.context.get("quiz_started");
        console.log("context: ", context)

        let params = agent.parameters;
        console.log("params: ", params)

        if (!params.question_number && !params.question_ordinal && !params.next && !params.this) {
            return agent.add(`which question number do you want me to read, \n
            you may ask like read first question or read question number 4, or if you want to skip this question\n
            ask me to read next question`)

        } else if (params.this) { // user is asking to read the last read question again

            let last_readed_question_index = context.parameters.last_readed_question_index || 0;
            agent.setContext({
                name: 'question_asked',
                lifespan: 1,
                parameters: {}
            });

            return agent.add(`ok, reading question number ${last_readed_question_index + 1} again,
            ${quiz.questions[last_readed_question_index].question},\n
            and your options are: ${quiz.questions[last_readed_question_index].options.toString()}\n
            which option do you think is correct?
            if you want to skip this question you may ask me to read any other question`)

        } else if (params.next) { // user is asking to skip/read next question with the context of current

            let last_readed_question_index = context.parameters.last_readed_question_index;
            let going_to_Read_question_index = (last_readed_question_index == null) ? 0 : last_readed_question_index + 1;

            // checking if last question was the last question
            if (quiz.questions[going_to_Read_question_index] == undefined) {

                return agent.add(`question number ${last_readed_question_index + 1} was the last question,
                 if you wanted me to read question number ${last_readed_question_index + 1} again just ask me to do so,
                 so far you have answered ${context.parameters.answered_count} questions,
                 you may ask what are my un-answered questions`)
            }


            let newContext: contextQuizStarted = {
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question_index: going_to_Read_question_index,
                    answered_count: context.parameters.answered_count
                }
            }
            agent.setContext(newContext);
            agent.setContext({
                name: 'question_asked',
                lifespan: 1,
                parameters: {}
            });

            return agent.add(`ok here is your next question, question number ${going_to_Read_question_index + 1}\n
            is saying, ${quiz.questions[going_to_Read_question_index].question},\n
            and your options are: ${quiz.questions[going_to_Read_question_index].options.toString()}\n
            which option do you think is correct? to log your answer say like option 1 or option A or first option is correct
            if you want me to read this question again simply ask me to read this question again,
            if you want to skip this question you may ask me to read any other question`)


        } else { // user is asking to read quesion by its number#
            let question_number = params.question_number || params.question_ordinal

            if (question_number > quiz.questions.length || question_number < 1) {
                return agent.add(`unable to read question number ${question_number}\n
                you have only ${quiz.questions.length} questions in this quiz
                you may ask what are my un-answered questions`)

            }

            let newContext: contextQuizStarted = {
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question_index: question_number - 1,
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


    function startQuiz_logAnswer(agent: any) {

        let context: contextQuizStarted = agent.context.get("quiz_started");
        console.log("context: ", context)

        let params = agent.parameters;
        console.log("params: ", params)

        let alreadyAnswered = false;

        if (!params.option) {
            return agent.add("sorry i didnt get what option you have selected, to log your answer say like option 1 or option A or first option is correct")
        } else {
            let selectedOptionNumber = params.option

            if (quiz.questions[context.parameters.last_readed_question_index].userSelectedIndex) {
                alreadyAnswered = true
            }

            let newContext: contextQuizStarted = {
                name: 'quiz_started',
                lifespan: 99,
                parameters: {
                    quizStarted: true,
                    last_readed_question_index: context.parameters.last_readed_question_index,
                    answered_count: (alreadyAnswered) ? context.parameters.last_readed_question_index : context.parameters.last_readed_question_index + 1
                }
            }
            agent.setContext(newContext);
            agent.setContext({
                name: 'question_asked',
                lifespan: 0,
                parameters: {}
            });
            return agent.add(
                `you said option number ${parseInt(selectedOptionNumber) + 1} is correct which is\n
             ${quiz.questions[context.parameters.last_readed_question_index].options[selectedOptionNumber]}\n
             ${(alreadyAnswered) ? "your previous answer is replaced with the new one" : ""}`)
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