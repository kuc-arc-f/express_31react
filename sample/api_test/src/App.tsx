import { Routes, Route } from 'react-router-dom';
//
import Home from './client/home';
import About from './client/about';
import TestApi from './client/TestApi';
//
export default function App(){
    return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test_api" element={<TestApi />} />
      </Routes>
    </div>
    )
}
/*
<div className="App">src/App.tsx
*/