import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head'
import HttpCommon from './lib/HttpCommon';

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
console.log("#getList");
      const item  = {
        "userId": 0,
      }
      const json = await HttpCommon.post(item, "/test/get_list")
      pageItems = json.data;
      console.log(json.data);
      setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  //
  const testProc = async function(){
    getList();
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <h1 className="text-4xl text-gray-700 font-bold my-2">test1.tsx
    </h1>
    <hr />
    <p>Test-page</p>
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>testProc()}>Test
    </button>
    <hr className="my-1" />
    {pageItems.map((item: any ,index: number) => {
    return (
    <div key={index}>
        <h3 className="text-3xl font-bold">{item.title}</h3>
        <span>ID: {item.id}, {item.createdAt}</span>
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