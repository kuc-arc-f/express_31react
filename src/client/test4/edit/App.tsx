//import { Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Head from '../../../components/Head'
//import CrudIndex from '../CrudIndex';
import CrudShow from '../CrudShow';

let pageItem: any = {};
let itemId = 0;
let todoTitle = "";
let todoContent = "";
//
function Home() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [updatetime, setUpdatetime] = useState<string>("");
    //
    useEffect(() => {
        (async () => {
            const id = searchParams.get('id') || "";
            itemId = Number(id);
console.log(id);
            const item = await CrudShow.get(itemId);
            pageItem = item;
            todoTitle = item.title;
            todoContent = item.content;
console.log(pageItem);
            setUpdatetime(new Date().toString());
        })()

    }, []);
    /*
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
    */
    /**
     *
     * @param
     *
     * @return
     */
    const update = async function() {
        try{
            const result = await CrudShow.update(itemId);
            if(result) {
                   window.location.href = '/test';
            }
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
                window.location.href = '/test';
            }
        } catch (e) {
            console.error(e);
        } 
    }
    //
    return (
    <div className="container mx-auto my-2 px-8 bg-white">
        <Head />
        <a href="/test">
            <button className="btn-outline-purple ms-2 mt-2">Back</button>
        </a><br />
        <h1 className="text-4xl font-bold mt-2">Edit</h1>
        <p>ID: {pageItem.id}</p>
        <hr className="my-1" />

        <div className="mb-2">
            <label className="text-2xl block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" name="title"
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="John Doe" defaultValue={todoTitle}
            />
        </div> 
        <div className="mb-2">
            <label  className="text-2xl block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" name="content"
            className="border border-gray-400 rounded-md px-3 py-2 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
                placeholder="" defaultValue={todoContent}
            ></textarea>
        </div>        
        <hr className="my-4" />
        <span>{updatetime}</span><br />
        <hr className="my-1" />
        <button onClick={()=>update()} className="btn-purple">Save</button>
        <hr className="my-4" />
        <button onClick={()=>deleteItem()} className="btn-red">Delete</button>

    </div>

    )
    ;
}
export default Home;

/*
<div>{pageItem.content}</div>
<pre>{pageItem.content}</pre>
<h1 className="text-4xl font-bold">TestShow</h1>
*/

