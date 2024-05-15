import {useState, useEffect}  from 'react';
import React from 'react'
import { z } from 'zod';

import Head from '../components/Head'
import LoadBox from '../components/LoadBox';
import DialogBox from '../components/DialogBox';
import ErrorDialogBox from '../components/ErrorDialogBox';
//
const FormData = z.object({
  title: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
  content: z
    .string()
    .min(1, { message: '1文字以上入力してください。' }),
});
//value
let initDisplay = false;
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  const [data, setData] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState(null);
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
    const modalDialog = document.getElementById('modalDialog');
    try {
console.log(data);
      setErrors(null);
      FormData.parse(data);
console.log(errors);
      if(!errors) {
        console.log("nothing, errors");
        if(modalDialog) {
          //@ts-ignore
          modalDialog.showModal();
        }
      }
    } catch (e) {
      console.error(e.flatten().fieldErrors);
      setErrors(e.flatten().fieldErrors);
      const dlg = document.getElementById('errorModalDialog');
      if(dlg) {
        //@ts-ignore
        dlg.showModal();
      }
    }
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
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    {initDisplay ? (<LoadBox />) : null}
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Zod.tsx!!</h1>
    <hr className="my-2" />
    <label>Title:</label>
    <input type="text" id="title" name="title" onChange={handleChange}
    className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    />
    {errors?.title && (<div className="error_message">{errors.title}</div>
    )}
    <label>Content:</label>
    <input type="text" id="content" name="content" onChange={handleChange}
    className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
    /> 
    {errors?.content && (<div className="error_message">{errors.content}</div>
    )}
    <hr className="my-2" />
    <button className="btn-purple" onClick={()=>testProc()}>Save
    </button>
    {/* dialog */}
    <DialogBox message={`OK, Check Complete!!`} />
    <ErrorDialogBox message={`NG, Check!`} />
  </div>
  );
}

export default Page;
/*
    <dialog id="modalDialog" className="dialog">
      <div className="bg-white px-8 pt-3 pb-1 dialog_body_wrap">
        <p className="text-3xl font-bold">OK, Check Complete</p>
        <hr className="my-3" />
        <form method="dialog mb-1">
          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded"
          type="submit" value="OK">Ok</button>
          <button 
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ms-2 py-1 px-4 border border-blue-500 hover:border-transparent rounded"
          type="submit" value="CANCEL">Cancel</button>
        </form>
      </div>
    </dialog>
*/
