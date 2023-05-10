import express from 'express'
import { config } from 'dotenv'
import path from 'path'
import initApp from './src/utils/initiateApp.js'
config({ path: path.resolve('config/config.env')})


const app = express()
initApp(app, express)