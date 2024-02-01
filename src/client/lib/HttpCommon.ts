import LibConfig from './LibConfig';
//require('dotenv').config();
//
const HttpCommon = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  post: async function(item: any, path: string): Promise<any>
  {
    try {
//      const v= import.meta.env.PROD;
//console.log("v=", v); external_api_key
      item.external_api_key = import.meta.env.VITE_API_KEY;
      let url = ""; 
      if(!import.meta.env.PROD){
        url = import.meta.env.VITE_API_URL;
      }
      const body: any = JSON.stringify(item);		
      const res = await fetch(url + "/api/test/test1", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  }, 
  /**
  * 
  * @param
  *
  * @return
  */ 
  serverPost: async function(item: any, path: string): Promise<any>
  {
    try {
      item.api_key = "";
      const body: any = JSON.stringify(item);		
      const res = await fetch(path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      const json = await res.json()
      //console.log(json);   
      if (res.status !== 200) {
        console.error("error, status <> 200");
        throw new Error(await res.text());
      }
      if (json.ret !==  LibConfig.OK_CODE) {
        console.error("Error, json.ret <> OK");
        return {};
      } 
      return json;
    } catch (e) {
      console.error(e);
      throw new Error('Error , post');
    }
  },  
}
export default HttpCommon;
