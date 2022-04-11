import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const logOutUrl = "http://front-test.vinixcode.cloud:8000/api/auth/logout";
// let userData = new FormData();

// cookie obj and user cookies
const cookie = new Cookies();

// const id = cookie.get("id");
// const name = cookie.get("name");
const token_type = cookie.get("token_type");
const token = cookie.get("token");


class Menu extends Component{

    logout = async (event)=>{
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = `${token_type} ${token}`

        await axios.post(logOutUrl, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res)=>{
            cookie.remove("id", {path: "/"});
            cookie.remove("name", {path: "/"});
            cookie.remove("token_type", {path: "/"});
            cookie.remove("token", {path: "/"});

            alert("Sucessfull Log Out");
            window.location.href = "./"
        }).catch((err)=>{
            // console.log(err);
            alert("Invalid Logout");
        })
    }

    // ciclo de vida del componente
    componentDidMount(){
        if ( 
            !cookie.get("token") ||
            !cookie.get("id") ||
            !cookie.get("name") ||
            !cookie.get("token_type")
        ){
            window.location.href= "./"
        }
    }

    render (){
        return (
            <div>
                Menu Principal
                <br />
                <a href="./posts">Posts</a>
                <br />
                <button className="btn btn-primary" type="submit"
                onClick={(event)=>this.logout(event)} >Log Out</button>
            </div>
        );
    }
}
export default Menu;
