import express from 'express';
const router = express.Router();
import LibConfig from '../lib/LibConfig';
//require('dotenv').config();
import LibPg from '../lib/LibPg';


/**
* 
* @param
*
* @return
*/ 
router.post('/test1', async function(req: any, res: any) {
  try {
console.log(req.body);
    const text = `
      SELECT * FROM public."Todo"
      ORDER BY id DESC LIMIT 100
    `;
    const client = LibPg.getClient();
    const resulete = await client.query(text);
    client.end();
    /*
    */
//    res.json({ret: "OK", data: []});
    res.json({ret: "OK", data: resulete.rows});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});
/**
* 
* @param
*
* @return
*/ 
router.post('/create', async function(req: any, res: any) {
  try {
//console.log(body.userId);
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."Todo" (title, content, complete,
      "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, $3, current_timestamp, current_timestamp) RETURNING *
      `;
      const values = [body.title, body.content, body.userId ]
      const client = LibPg.getClient();
      const result = await client.query(text, values);
      client.end();
//console.log(result.rows);
      res.json({ret: "OK", data: result.rows});
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
