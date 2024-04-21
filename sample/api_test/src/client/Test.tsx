import {useState, useEffect}  from 'react';
import React from 'react'

import Head from '../components/Head'
import LoadBox from '../components/LoadBox';
//
let initDisplay = true;
//
function Page() {
  const [updatetime, setUpdatetime] = useState<string>("");
  //
  useEffect(() => {
    (async () => {
      initDisplay = true;
      setUpdatetime(new Date().toString());
      setTimeout(() => {
        console.log("Delayed for 1 second.");
        initDisplay = false;
        setUpdatetime(new Date().toString());
      }, 10 * 1000);
    })()
  }, []);
  //
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    {initDisplay ? (<LoadBox />) : null}
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Test.tsx!!!</h1>
  </div>
  );
}

export default Page;