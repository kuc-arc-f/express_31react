//
function Compo(props: any) {
console.log(props);
  //
  return (
  <dialog id="errorModalDialog" className="dialog">
    <div className="bg-white px-8 pt-3 pb-1 dialog_body_wrap">
      <p className="text-3xl font-bold text-red-400">{props.message}</p>
      <hr className="my-3" />
      <form method="dialog mb-1">
        <button 
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-8 rounded"
        type="submit" value="OK">Ok</button>
      </form>
    </div>
  </dialog>
  );
}
export default Compo;
/*
*/