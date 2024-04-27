import LibConfig from './LibConfig';
//require('dotenv').config();
//
const LibStorage = {
  /**
  * 
  * @param
  *
  * @return
  */ 
  getValue: async function(key: string): Promise<any>
  {
    try {
//      const name = import.meta.env.VITE_APP_NAME + "_auth";
//console.log("v=", v); external_api_key
//console.log("path=", path);
      let url = ""; 
      const body: any = JSON.stringify(item);		
      const res = await fetch(path, {
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
 
}
export default LibStorage;
