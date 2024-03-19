import { Routes, Route } from 'react-router-dom';
//
import Home from './client/home';
import About from './client/about';
import TestApi from './client/TestApi/TestApi';
import TestTurso from './client/TestTurso';
//
export default function App(){
    return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test_api" element={<TestApi />} />
        <Route path="/test_turso" element={<TestTurso />} />
      </Routes>
    </div>
    )
}
/*
<div className="App">src/App.tsx
*/