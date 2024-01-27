//import { Routes, Route, Link } from 'react-router-dom';
import {Link } from 'react-router-dom';
//
function Page() {
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">&nbsp; [ about ]</Link>
        <Link to="/test1">&nbsp; [ test1 ]</Link>
        <hr />
    </div>
    );
}
export default Page;
/*
        <Link to="/test1">&nbsp; [ Test1 ]</Link>
        <Link to="/todos">&nbsp; [ Todos ]</Link>
*/