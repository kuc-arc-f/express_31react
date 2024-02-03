import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head'
import HttpCommon from './lib/HttpCommon';
import CrudIndex from './test/CrudIndex';
//
let pageItems: any[] = [];
//
function Spinner(){
  return(
  <div className="container mx-auto my-2 px-8 bg-white"
   >
    <div className="text-center text-xl">Loading now, Please wait...
    </div>
    <div className="flex justify-center" aria-label="読み込み中">
      <div 
      className="animate-spin h-6 w-6 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
   <hr className="my-2" />
  </div>
  );
}
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  //
  useEffect(() => {
    (async () => {
        setIsLoading(true);
        await getList();
        setTimeout(() => {
          setIsLoading(false);
          console.log("Delayed for 1 second.");
        }, 5000);
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
      const json = await HttpCommon.post(item, "/api/test/test1");
      pageItems = json.data;
      console.log(json.data);
      //

      setUpdatetime(new Date().toString());
    } catch (e) {
        console.error(e);
    } 
  }
  //
  const testProc = async function(){
    setIsLoading(true);
    await getList();
    setTimeout(() => {
      setIsLoading(false);
      console.log("Delayed for 1 second.");
    }, 3000);    
  }
  //
  const addProc = async function(){
    await CrudIndex.addItem(); 
    location.reload();
//    console.log("addProc");
  }
  if (isLoading) { return <Spinner /> }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <h1 className="text-4xl text-gray-700 font-bold my-2">Test3.tsx, Loading Test.
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