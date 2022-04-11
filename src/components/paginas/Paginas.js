import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../login/Login";
import Menu from "../menu/Menu";
import Register from "../register/Register"
import Posts from "../posts/Posts"

function Paginas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/register" element={<Register/>} />
                <Route exact path="/menu" element={<Menu/>} />
                <Route exact path="/posts" element={<Posts/>} />                
            </Routes>
        </BrowserRouter>
    )
}
export default Paginas;
