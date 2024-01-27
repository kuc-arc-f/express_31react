
import express from 'express';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
const app = express();
//
import Top from './pages/App';
//
//import Common from './lib/Common';
import testRouter from './routes/test'; 
//import commonRouter from './routes/common';
//
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
console.log("env=", process.env.NODE_ENV)
//
const errorObj = {ret: "NG", messase: "Error"};

// route
app.use('/api/test', testRouter);

//SPA
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
if (import.meta.env.PROD) {
  app.listen(3000);
}
console.log('start');

export const viteNodeApp = app;