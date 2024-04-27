import {useState, useEffect}  from 'react';
import React from 'react'
import { z } from 'zod';
//import ReactDOM from 'react-dom/client'
//mport { Link } from 'react-router-dom';
import Head from '../components/Head'
import LoadBox from '../components/LoadBox';
import HttpCommon from './lib/HttpCommon';
import CrudIndex from './User/CrudIndex';
//
const FormData = z.object({
  email: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
  password: z
    .string()
    .min(4, { message: '4文字以上入力してください。' }),
  name: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
});
//
let pageItems: any[] = [];
let initDisplay = true;
//
function Page(){
  const [updatetime, setUpdatetime] = useState<string>("");
  const [data, setData] = useState({
    name: '', email: '' , password: '',
  });
  const [errors, setErrors] = useState(null);
  //
  useEffect(() => {
    (async () => {
      initDisplay = false;
      setUpdatetime(new Date().toString() + String(Math.random()));
//      getList();
    })()
  }, []);
  /**
   *
   * @param
   *
   * @return
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };  
  /**
   *
   * @param
   *
   * @return
   */
  const addProc = async function(){
    try{    
      setErrors(null);
      FormData.parse(data);
console.log(errors);
//      if(errors) {
//        return;
//      }  
      const result = await CrudIndex.addItem(); 
      if(result){
        alert("OK, add User");
        location.href = '/login';
      } else{
        alert("Error, add User");
      }

    } catch (e) {
      console.error(e.flatten().fieldErrors);
      setErrors(e.flatten().fieldErrors);
    }
//    console.log("addProc");
  }
  /**
   *
   * @param
   *
   * @return
   */
  const getList = async function() {
    try{
console.log("#TursoTodo.getList");
      const item  = {
        "userId": 0,
      }      
      const json = await HttpCommon.post(item, "/api/turso_todo/get_list");
      pageItems = json.data;
      console.log(json.data);
      initDisplay = false;
      setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  //
  return(
  <div  className="">
    {initDisplay ? (<LoadBox />) : null}
    <hr className="my-2" />
    <Head />
    <div  className="container mx-auto my-2 px-8 bg-white">
      <h1 className="text-4xl font-bold my-2">UserCreate</h1>
      <hr className="my-2" />
      <label className="text-2xl font-bold my-2">Name: 
        <input type="text" id="name" name="name" onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />    
      </label>
      {errors?.name && (<div className="error_message">{errors.name}</div>
      )}
      <label className="text-2xl font-bold my-2">Email: 
        <input type="text" id="email" name="email" onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />    
      </label>
      {errors?.email && (<div className="error_message">{errors.email}</div>
      )}
      <label className="text-2xl font-bold my-2">Password: 
        <input type="text" id="password" name="password" onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />    
      </label>
      {errors?.password && (<div className="error_message">{errors.password}</div>
      )}
      <hr className="my-2" />
      <button className="btn-purple" onClick={()=>addProc()}>Save
      </button>    
      <hr className="my-1" />
    </div>
  </div>
  );
}
export default Page;
/*
/tursotodo
*/