import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

var serviceAccount = require('./serviceAccount.json');

var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rad-ul-fasaad.firebaseio.com"
});

const db = admin.firestore();
export default db;



let firebaseAdmin = admin;
let firebaseAdminDb = admin.database().ref('/')
let firebaseAdminAuth = admin.auth()
let firebaseAdminFirestore = admin.firestore()

export { firebaseAdmin, firebaseAdminAuth, firebaseAdminDb, firebaseAdminFirestore }
// var defaultApp = admin.initializeApp(functions.config().firebase);



import * as mongoose from "mongoose";

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb://abc123:abc123@ds135726.mlab.com:35726/rad-ul-fasad";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////



//////////////quiz schema and model///////////////////////////////////////////
let quizSchema = new mongoose.Schema({


    questionNumber: Number,
    question: String,
    options: [String],
    correctIndex: Number,

    createdOn: { type: Date, 'default': Date.now } //pack 'default' in single quotes(this is Optional) to avoid compile error

});

let quizModel = mongoose.model("quizes", quizSchema);
//////////////end quiz schema and model//////////////////////////////////////////


//////////////answer schema and model///////////////////////////////////////////
let answerSchema = new mongoose.Schema({

    user: String,
    questionNumber: Number,
    
    answerIndex: Number,
    isCorrect: Boolean,

    createdOn: { type: Date, 'default': Date.now } //pack 'default' in single quotes(this is Optional) to avoid compile error

});

let answerModel = mongoose.model("answers", answerSchema);
//////////////end answer schema and model//////////////////////////////////////////


new quizModel({
    question: "what was the first capital of pakistan",
    options: ["karachi", "lahore", "islamabad", "kashmir"],
    correctIndex: 0,
    userSelectedIndex: null
}).save()


new quizModel({
    question: "which one is the bigest city of pakistan",
    options: ["karachi", "lahore", "islamabad", "kashmir"],
    correctIndex: 0,
    userSelectedIndex: null
}).save()

