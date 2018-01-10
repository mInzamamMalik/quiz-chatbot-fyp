import * as functions from 'firebase-functions'
import db from './db'


import { webhook, talk } from './lib/dialogflow'
export { webhook, talk }

import { login, signup } from './lib/authentication'
export { login, signup }