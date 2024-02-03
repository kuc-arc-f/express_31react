import { Routes, Route } from 'react-router-dom';
//
import Home from './client/home';
import About from './client/about';
import Test1 from './client/test1';
import Test3 from './client/Test3';
import Test4 from './client/Test4';
import Test4Show from './client/test4/show/App';
//
export default function App(){
    return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/test4/show" element={<Test4Show />} />
      </Routes>
    </div>
    )
}
/*
<div className="App">src/App.tsx
*/