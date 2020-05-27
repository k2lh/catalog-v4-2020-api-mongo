import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors'
const mongoose = require('mongoose')

import routes from './routes'
import {connectionString, options} from './db'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', routes)

app.use('/', (req,res) => {
  console.log('API ready...');
  res.send('API ready')
})

connect();

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(process.env.PORT);
  console.log('Express app started on port ' + process.env.PORT);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(connectionString, options);
}
