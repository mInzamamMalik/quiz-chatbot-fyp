import * as functions from 'firebase-functions'
import db from './db'

import { talk, writemessage, getallmessages } from './lib/dialogflow'
export { talk, writemessage, getallmessages }

// import { onMessage } from './lib/onMessage'
// export { onMessage }

import { webhook } from "./lib/webhook"
export { webhook }

import { login, signup, profile, logout } from './lib/authentication'
export { login, signup, profile, logout }