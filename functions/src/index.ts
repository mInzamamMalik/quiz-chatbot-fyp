import * as functions from 'firebase-functions'
import db from './db'

import { webhook, talk } from './lib/dialogflow'
export { webhook, talk }

import { onMessage } from './lib/onMessage'
export { onMessage }

import { login, signup, profile } from './lib/authentication'
export { login, signup, profile }