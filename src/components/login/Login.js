import React, { Component } from "react";
import axios from "axios";
import  Cookies from "universal-cookie";

// cookie obj
const cookie = new Cookies();

// login vars
const loginUrl = "http://front-test.vinixcode.cloud:8000/api/auth/login"
let userData = new FormData();

class Login extends Component {

    // set form state
    state ={
        form:{
            email: '',
            password: ''
        }
    }

    // get form data
    handleChange = async(e)=>{
        await this.setState({
           form:{
               ...this.state.form,
               [e.target.name]: e.target.value
           }
        });
        console.log(this.state.form);
    }

    // login method
    login = async (event)=>{
        event.preventDefault();

        userData.append('email', this.state.form.email);
        userData.append('password', this.state.form.password);

        await axios({
            method: "post",
            url: loginUrl,
            data: userData
        }).then((res)=>{
            const id = res.data.user.id;
            const name = res.data.user.name;
            const token_type = res.data.token_type;
            const token = res.data.access_token;

            cookie.set("id", id, {path: "/"});
            cookie.set("name", name, {path: "/"});
            cookie.set("token_type", token_type, {path: "/"});
            cookie.set("token", token, {path: "/"});

            // console.log(res);
            // console.log("Bienvenido");
            window.location.href = "./menu"
        })
        .catch((err)=>{
            // console.log(err);
            alert("Email o contraseña invalidos");
        })
    }

    // ciclo de vida del componente
    componentDidMount(){
        if ( 
            cookie.get("token") &&
            cookie.get("id") &&
            cookie.get("name") &&
            cookie.get("token_type")
        ){
            window.location.href= "./menu"
        }
    }

    render(){
        return (
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={this.handleChange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event)=>this.login(event)}>Log In</button>
                <br /><br />
                <a href="./register">Sign In</a>
            </form>
        )
    }
}

export default Login;

