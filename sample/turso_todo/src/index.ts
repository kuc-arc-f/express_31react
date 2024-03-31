
import express from 'express';
import { renderToString } from 'react-dom/server';
import basicAuth  from "express-basic-auth";
const app = express();
import 'dotenv/config'
//
import Top from './pages/App';
//
import commonRouter from './routes/commonRouter';
import tursoRouter from './routes/tursoRouter';
import tursoTodoRouter from './routes/tursoTodoRouter';
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//console.log(process.env)
console.log("env=", process.env.NODE_ENV)
//
app.use(basicAuth({
  users: { "test": "1111" },
  challenge: true,
}));
//
const errorObj = {ret: "NG", messase: "Error"};
// route
app.use('/api/common', commonRouter);
app.use('/api/turso', tursoRouter);
app.use('/api/turso_todo', tursoTodoRouter);
//tursoTodoRouter
app.get('/*', (req: any, res: any) => {
  try {
    res.send(renderToString(Top()));
  } catch (error) {
    res.sendStatus(500);
  }
});

//start
const PORT = 4000;
app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});
console.log('start');
