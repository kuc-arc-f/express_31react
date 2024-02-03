import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head'
import HttpCommon from './lib/HttpCommon';
import CrudIndex from './test4/CrudIndex';
//
let pageItems: any[] = [];
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  useEffect(() => {
    (async () => {
        getList();
    })()
  }, []);  
  /**
   *
   * @param
   *
   * @return
   */
  const getList = async function() {
    try{
console.log("#Test4.getList");
      const item  = {
        "userId": 0,
      }      
      const json = await HttpCommon.serverPost(item, "/test/get_list");
      pageItems = json.data;
      console.log(json.data);
      setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  //
  const testProc = async function(){
  }
  //
  const addProc = async function(){
    await CrudIndex.addItem(); 
    location.reload();
//    console.log("addProc");
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <h1 className="text-4xl text-gray-700 font-bold my-2">test4.tsx
    </h1>
    <hr />
    <p>Test-page</p>
    <hr className="my-2" />
    <label>Title:</label>
    <input type="text" id="title" 
    className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    />
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>addProc()}>Add
    </button>
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>testProc()}>Test
    </button>
    <hr className="my-1" />
    {pageItems.map((item: any ,index: number) => {
    return (
    <div key={index}>
        <h3 className="text-3xl font-bold">{item.title}</h3>
        <span>ID: {item.id}, {item.createdAt}</span>
        <a href={`/test4/show?id=${item.id}`}>
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
*/