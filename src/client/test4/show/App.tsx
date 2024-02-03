//import { Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Head from '../../../components/Head'
import CrudIndex from '../CrudIndex';
import CrudShow from '../CrudShow';

let pageItem: any = {};
let itemId = 0;
//
function Home() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [updatetime, setUpdatetime] = useState<string>("");
    //
//    const id = searchParams.get('id') || "";
//console.log(id);
    //
    useEffect(() => {
        (async () => {
            const id = searchParams.get('id') || "";
            itemId = Number(id);
console.log(id);
            getItem(Number(itemId));
        })()

    }, []);
    /**
     *
     * @param
     *
     * @return
     */
    const getItem = async function(id: number) {
        try{
            const item = await CrudShow.get(id);
            pageItem = item;
console.log(pageItem);
            setUpdatetime(new Date().toString());
        } catch (e) {
            console.error(e);
        } 
    }
    /**
     *
     * @param
     *
     * @return
     */
    const deleteItem = async function() {
        try{
            const result = await CrudShow.delete(itemId);
            if(result) {
//                window.location.reload();
                window.location.href = '/test4';
            }
        } catch (e) {
            console.error(e);
        } 
    }
    //
    return (
    <div className="container mx-auto my-2 px-8 bg-white">
        <Head />
        <a href="/test4">
            <button className="btn-outline-purple ms-2 mt-2">Back</button>
        </a><br />
        <hr className="my-1" />
        <h1 className="text-4xl font-bold">{pageItem.title}</h1>
        <p>ID: {pageItem.id}</p>
        <hr className="my-1" />
        <pre>{pageItem.content}</pre>
        <div className="mb-2">
        </div>            
        <hr className="my-1" />
        <button onClick={()=>deleteItem()} className="btn-red"
        >delete</button>
    </div>
    );
}
export default Home;

/*
<h1 className="text-4xl font-bold">TestShow</h1>
*/

