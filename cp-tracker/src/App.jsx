import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Info from './pages/Info';
import Contest from './pages/Contest';
import ContestPage from './pages/ContestPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/contestpage" element={<ContestPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;