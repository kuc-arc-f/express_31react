//import { Routes, Route, Link } from 'react-router-dom';
import {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import Head from '../../components/Head'
import CrudIndex from './CrudIndex';

let pageItems: any[] = [];
//
function Home() {
    const [updatetime, setUpdatetime] = useState<string>("");
    //
    useEffect(() => {
        (async () => {
            getList();
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
            const items = await CrudIndex.getList();
            pageItems = items;
console.log(items);
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
    const createTodo = async function() {
        try{
            const result = await CrudIndex.addItem();
            if(result) {
                window.location.reload();
            }
        } catch (e) {
            console.error(e);
        } 
    }
    //
    return (
    <div className="container mx-auto my-2 px-8 bg-white">
        <Head />
        <h1 className="text-4xl font-bold mt-2">Test</h1>
        <hr className="my-1" />
        <div className="mb-2">
            <label className="text-2xl block text-gray-700 font-bold mb-2">Title</label>
            <input type="text" id="title" name="title"
            className="border border-gray-400 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="John Doe" required
            />
        </div>            
        <div className="mb-2">
            <label  className="text-2xl block text-gray-700 font-bold mb-2">Content</label>
            <textarea id="content" name="content"
            className="border border-gray-400 rounded-md px-3 py-2 w-full h-16 resize-none focus:outline-none focus:border-blue-500"
                placeholder="" required
            ></textarea>
        </div>
        <button onClick={()=>createTodo()} className="btn-purple ms-2" 
                >Create</button>
        <hr className="my-1" />
        {pageItems.map((item: any ,index: number) => {
        return (
        <div key={index}>
            <Link to={`/test/show?id=${item.id}`}><h3 className="text-3xl font-bold">{item.title}</h3>
            </Link>
            {/*
            <Link to={`/test/edit?id=${item.id}`}><button className="btn-outline-purple">edit</button>
            </Link><br />
            */}
            <a href={`/test/show?id=${item.id}`}><button className="btn-outline-purple">Show</button>
            </a>
            <a href={`/test/edit?id=${item.id}`}><button className="btn-outline-purple ms-2">edit</button>
            </a><br />
            <span>ID: {item.id}, {item.createdAt}</span>
            <hr />
        </div>
        )
        })}
    </div>
    )
    ;
}

export default Home;
/*
<h3 className="text-3xl font-bold">{item.title}</h3>
*/