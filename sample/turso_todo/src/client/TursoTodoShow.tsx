import {useState, useEffect}  from 'react';
import React from 'react'
//mport { Link } from 'react-router-dom';
import Head from '../components/Head'
//import CrudIndex from './TursoTodo/CrudIndex';
import CrudShow from "./TursoTodo/CrudShow"
let pageItem: any = {};
let itemId: number = 0;
//
function Page(){
  const [updatetime, setUpdatetime] = useState<string>("");
  // 
  useEffect(() => {
    (async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get('id') || "";
      itemId = Number(id);
      getItem(itemId);
    })()
  }, []);
  /**
   *
   * @param
   *
   * @return
   */
  const getItem = async function(id: number) {
    try{
        if(id < 1) { return; }
        const item = await CrudShow.get(id);
        pageItem = item;
console.log(pageItem);
        setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  /**
   *
   * @param
   *
   * @return
   */
  const deleteProc = async function(){
    const resulte = await CrudShow.delete(itemId);
    if(resulte) {
      location.href= "/tursotodo";
    }
//    console.log("addProc");
  }
  //
  return(
  <div  className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <a className="my-2" href={`/tursotodo`}>
      <button className="btn-outline-purple ms-2">Back</button>
    </a>
    <hr className="my-2" />
    <h1 className="text-4xl font-bold my-2">TursoTodo.tsx</h1>
    <hr className="my-2" />
    <h1 className="text-4xl font-bold">{pageItem.title}</h1>
    <p>ID: {pageItem.id}</p>
    <hr className="my-1" />
    <pre>{pageItem.content}</pre>
    <hr className="my-1" />
    <button className="btn-red" onClick={()=>deleteProc()}>Save
    </button>    
    <hr className="my-1" />
  </div>
  );
}
export default Page;
/*
/tursotodo
*/