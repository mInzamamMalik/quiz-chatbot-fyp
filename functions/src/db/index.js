"use strict";
exports.__esModule = true;
var admin = require("firebase-admin");
var serviceAccount = require('./serviceAccount.json');
var defaultApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rad-ul-fasaad.firebaseio.com"
});
var db = admin.firestore();
exports["default"] = db;
var firebaseAdmin = admin;
exports.firebaseAdmin = firebaseAdmin;
var firebaseAdminDb = admin.database().ref('/');
exports.firebaseAdminDb = firebaseAdminDb;
var firebaseAdminAuth = admin.auth();
exports.firebaseAdminAuth = firebaseAdminAuth;
var firebaseAdminFirestore = admin.firestore();
exports.firebaseAdminFirestore = firebaseAdminFirestore;
// var defaultApp = admin.initializeApp(functions.config().firebase);
var mongoose = require("mongoose");
/////////////////////////////////////////////////////////////////////////////////////////////////
var dbURI = "mongodb://abc123:abc123@ds135726.mlab.com:35726/rad-ul-fasad";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);
////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
    // process.exit(1);
});
mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});
process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
//////////////quiz schema and model///////////////////////////////////////////
var quizSchema = new mongoose.Schema({
    questionNumber: Number,
    question: String,
    options: [String],
    correctIndex: Number,
    createdOn: { type: Date, 'default': Date.now } //pack 'default' in single quotes(this is Optional) to avoid compile error
});
var quizModel = mongoose.model("quizes", quizSchema);
//////////////end quiz schema and model//////////////////////////////////////////
//////////////answer schema and model///////////////////////////////////////////
var answerSchema = new mongoose.Schema({
    user: String,
    questionNumber: Number,
    answerIndex: Number,
    isCorrect: Boolean,
    createdOn: { type: Date, 'default': Date.now } //pack 'default' in single quotes(this is Optional) to avoid compile error
});
var answerModel = mongoose.model("answers", answerSchema);
//////////////end answer schema and model//////////////////////////////////////////
new quizModel({
    questionNumber: 1,
    question: "what was the first capital of pakistan",
    options: ["karachi", "lahore", "islamabad", "kashmir"],
    correctIndex: 0,
    userSelectedIndex: null
}).save();
new quizModel({
    questionNumber: 2,
    question: "which one is the biggest city of pakistan",
    options: ["karachi", "lahore", "islamabad", "kashmir"],
    correctIndex: 0,
    userSelectedIndex: null
}).save();
