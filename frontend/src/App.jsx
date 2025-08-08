import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProcessarApolice from './pages/ProcessarApolice';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/app/*" element={<MainApp/>} />
      </Routes>
    </BrowserRouter>
  );
}

function MainApp(){
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <nav style={{width:260, padding:20}}>
        <h2>PGR System</h2>
        <ul style={{listStyle:'none', padding:0}}>
          <li><Link to="/app">Dashboard</Link></li>
          <li><Link to="/app/processar">Processar Apólice</Link></li>
        </ul>
      </nav>
      <main style={{flex:1, padding:24}}>
        <Routes>
          <Route path="/app" element={<Dashboard/>} />
          <Route path="/app/processar" element={<ProcessarApolice/>} />
        </Routes>
      </main>
    </div>
  );
}
