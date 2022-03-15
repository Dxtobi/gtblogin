import { Routes, Route, Navigate, Link } from "react-router-dom";
import Table from "./Logins";
import Main from "./Main";
import Loanform from "./Loanform";
import {  AiOutlineMenu, } from 'react-icons/ai';
import { useState } from "react";

function App() {
  const [menu, showMenu] = useState(false)
  return (
    <div className="App">
        <div className="header-main">
        <div className='brand-img'>
          <img className="header-brand-img" src='gtblogo.png' alt="img"/>
        </div>
        <div onClick={()=>showMenu(!menu)} className='harm-bar'><AiOutlineMenu/></div>
      </div>
      {
        menu&&(<div className="menu">
          <Link to="/" className="menu-item-link"><div className="menu-item">Home</div></Link>
          <Link to="/loan/form" className="menu-item-link"><div className="menu-item">Form</div></Link>
        </div>)
      }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/adm__pass" element={<Table />} />
        <Route path="/loan/form" element={<Loanform />} />
        <Route path=" " element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App