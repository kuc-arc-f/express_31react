import {useState, useEffect}  from 'react';
import React from 'react'

import Head from '../components/Head'
import LoadBox from '../components/LoadBox';
import ConfirmDialog from '../components/ConfirmDialog'
//value
let initDisplay = false;
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  useEffect(() => {
    (async () => {
    })()
  }, []);
  /**
   *
   * @param
   *
   * @return
   */
  const testProc = async function(){
//console.log("testProc" + new Date().toString() );
    try {
      const modalDialog = document.getElementById('confirmDialog');
      if(modalDialog) {
        //@ts-ignore
        modalDialog.showModal();
      }
    } catch (e) {
      console.error(e);
    }
  }
  //
  const cbFunc = async function(){
    console.log("#cbFunc");
    alert("parent.cbFunc");
    const dlg = document.getElementById('confirmDialog');
    if(dlg) {
      //@ts-ignore
      dlg.close();
    }
  }
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    {initDisplay ? (<LoadBox />) : null}
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Confirm.tsx!</h1>
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>testProc()}>Save
    </button>
    {/* dialog */}
    <ConfirmDialog message={`OK? next`} cbFunction={cbFunc} />
  </div>
  );
}

export default Page;
/*
*/
