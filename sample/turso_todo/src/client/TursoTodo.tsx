import {useState, useEffect}  from 'react';
import React from 'react'
//import ReactDOM from 'react-dom/client'
//mport { Link } from 'react-router-dom';
import Head from '../components/Head'
import HttpCommon from './lib/HttpCommon';
import CrudIndex from './TursoTodo/CrudIndex';
//
let pageItems: any[] = [];
//
function Page(){
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  useEffect(() => {
    (async () => {
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
  const addProc = async function(){
    await CrudIndex.addItem(); 
    location.reload();
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
      setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  //
  return(
  <div  className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <hr />
    <h1 className="text-4xl font-bold my-2">TursoTodo.tsx</h1>
    <hr className="my-2" />
    <label className="text-3xl font-bold my-2">Title: 
      <input type="text" id="title" 
      className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />    
    </label>
    <label className="text-3xl font-bold my-2">Content: 
      <input type="text" id="content" 
      className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
      />    
    </label>
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
  );
}
export default Page;
/*
/tursotodo
*/