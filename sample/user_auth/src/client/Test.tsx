import Head from '../components/Head'
//
function Page() {
  return (
  <div className="container mx-auto my-2 px-8 bg-white">
    <Head />
    <h1 className="text-4xl text-gray-700 font-bold my-2"
    >Test!!</h1>
    <hr className="my-2" />
    <button className="btn btn-purple">TestButton1</button>
    <hr className="my-2" />
  </div>
  );
}

export default Page;