
import { createClient } from "@libsql/client";
//
const  LibTurso = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  getClient: function(){
    try{
//console.log("=", process.env.TORSO_URL);
      const client = createClient({
        url: process.env.TORSO_URL,
        authToken: process.env.TORSO_AUTH_TOKEN,
      });
      return client;      
    } catch (err) {
      console.log(err);
      throw new Error('Error, getClient');
    }
  },       
}
export default LibTurso;
