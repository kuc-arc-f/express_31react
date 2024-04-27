import {useState, useEffect}  from 'react';
import Head from '../components/Head'
import CrudIndex from './User/CrudIndex';
import Crud from './User/Crud';
import LibCrypto from './lib/LibCrypto'
//
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
      const values = Crud.getInputValues();
      const resulte =  await CrudIndex.getItem(); 
console.log(values);
console.log(resulte);
      if(!resulte.password){
        alert("error. Login");
        return;
      }
      const decryptPassword = LibCrypto.decode(resulte.password);            
console.log(resulte.password);
console.log("decryptPassword=", decryptPassword);
      if(values.password && decryptPassword === values.password){
        alert("OK, password");
      }else{
        alert("error. Login password");
        return;
      }
//return;
      const name = import.meta.env.VITE_APP_NAME + "_auth";
      localStorage.setItem(name, values.email);
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