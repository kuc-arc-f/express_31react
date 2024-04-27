import {useState, useEffect}  from 'react';
import Head from '../components/Head'

import CrudIndex from './Login/CrudIndex';
//
function Page() {
  //
  useEffect(() => {
    (async () => {
      hiddenNavibar();
    })()
  }, []);
  /**
   *
   * @param
   *
   * @return
   */     
  const hiddenNavibar = function(){
    const elm = document.querySelector(`.app_navi_wrap`);
    if(elm) {elm.classList.remove('d-none');}
    if(elm) {elm.classList.add('d-none');}
  }
  //
  /**
   *
   * @param
   *
   * @return
   */
    const loginProc = async function(){
      try {
        const v =  CrudIndex.login(); 
//console.log("#loginProc.v=", v);
        if(!v){
          alert("error, Login");
          return;
        }
        const name = import.meta.env.VITE_APP_NAME + "_auth";
        localStorage.setItem(name, '1');
        location.href = '/';
      } catch (e) {
        console.error(e);
      }
    }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Login !</h1>
    <hr className="my-2" />
    <label className="text-2xl font-bold my-2">Email:</label>
    <input type="text" id="email" name="email"
    className="input_text" /> 
    <label className="text-2xl font-bold my-2">Password:</label>
    <input type="text" id="password" name="password"
    className="input_text" /> 
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>loginProc()}>Login
      </button>  
  </div>
  );
}

export default Page;