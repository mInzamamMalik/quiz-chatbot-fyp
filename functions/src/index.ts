import * as functions from 'firebase-functions'
import db from './db'

import { webhook, talk, writemessage, getallmessages } from './lib/dialogflow'
export { webhook, talk, writemessage, getallmessages }

import { onMessage } from './lib/onMessage'
export { onMessage }

import { login, signup, profile, logout } from './lib/authentication'
export { login, signup, profile, logout }