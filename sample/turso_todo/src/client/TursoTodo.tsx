import {useState, useEffect}  from 'react';
import React from 'react'
import { z } from 'zod';
//import ReactDOM from 'react-dom/client'
//mport { Link } from 'react-router-dom';
import Head from '../components/Head'
import LoadBox from '../components/LoadBox';
import HttpCommon from './lib/HttpCommon';
import CrudIndex from './TursoTodo/CrudIndex';
//
const FormData = z.object({
  title: z
    .string()
    .min(2, { message: '2文字以上入力してください。' }),
  content: z
    .string()
    .min(2, { message: '2文字以上入力してください。' }),
});
//
let pageItems: any[] = [];
let initDisplay = true;
//
function Page(){
  const [updatetime, setUpdatetime] = useState<string>("");
  const [data, setData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState(null);
  //
  useEffect(() => {
    (async () => {
      initDisplay = true;
      setUpdatetime(new Date().toString() + String(Math.random()));
      getList();
    })()
  }, []);
  //
  const testProc = async function(){
    console.log("testProc" + new Date().toString() );
  }
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
      if(!errors) {
        await CrudIndex.addItem(); 
        location.reload();
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
      <h1 className="text-4xl font-bold my-2">TursoTodo.tsx</h1>
      <hr className="my-2" />
      <label className="text-3xl font-bold my-2">Title: 
        <input type="text" id="title" name="title" onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />    
      </label>
      {errors?.title && (<div className="error_message">{errors.title}</div>
      )}
      <label className="text-3xl font-bold my-2">Content: 
        <input type="text" id="content" name="content" onChange={handleChange}
        className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />    
      </label>
      {errors?.content && (<div className="error_message">{errors.content}</div>
      )}
      <hr className="my-2" />
      <button className="btn-purple" onClick={()=>addProc()}>Save
      </button>    
      <hr className="my-1" />
      {pageItems.map((item: any ,index: number) => {
      return (
      <div key={index}>
          <h3 className="text-3xl font-bold">{item.title}</h3>
          <span>ID: {item.id}, {item.createdAt}</span>
          <a href={`/tursotodoshow?id=${item.id}`}>
            <button className="btn-outline-purple ms-2">Show</button>
          </a>
          <hr />
      </div>
      )
      })}
    </div>
  </div>
  );
}
export default Page;
/*
/tursotodo
*/