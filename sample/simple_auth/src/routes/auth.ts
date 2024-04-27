import express from 'express';
const router = express.Router();
//import axios from 'axios';

/*****************************
 * 
******************************/
router.post('/login', async function(req: any, res: any) {
  const resObj = {ret: "NG", data: {}, message: ""};
  try {
//    //console.log("url=", process.env.SIMPLE_AUTH_USER);
console.log(req.body);
//console.log(data);
    //@ts-ignore
    return res.json(resObj);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
