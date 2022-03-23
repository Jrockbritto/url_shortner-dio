import express, { Request, Response } from 'express';
import { URLController } from './controller/URLController';
import { MongoConnecion } from './database/MongoConnection';

const api =  express();

api.use(express.json());

const database = new MongoConnecion();
database.connect();

const urlController = new URLController(); 

api.post('/shorten', urlController.shorten)
api.use('/:hash', urlController.redirect)


api.listen(5000, () => console.log('listening on port http://localhost:5000'));