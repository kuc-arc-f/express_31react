//import { Routes, Route, Link } from 'react-router-dom';
import {Link } from 'react-router-dom';
//
function Page() {
    return (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">&nbsp; [ about ]</Link>
        <Link to="/test_torso">&nbsp; [ testTorso ]</Link>
        <hr />
    </div>
    );
}
export default Page;
/*
<Link to="/test_api">&nbsp; [ testApi ]</Link>
*/