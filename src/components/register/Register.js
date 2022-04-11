import React, { Component } from "react";
import axios from "axios";
// import  Cookies from "universal-cookie";

// cookie obj
// const cookie = new Cookies();

// sign vars vars
const signUrl = "http://front-test.vinixcode.cloud:8000/api/auth/register"
let userData = new FormData();

class Register extends Component {

    state ={
        form:{
            name: '',
            email: '',
            password: '',
            confirm_password: ''
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

    // SignIN method
    signIn = async (event) => {
        event.preventDefault();

        if(this.state.form.password !== this.state.form.confirm_password){
            alert("password and password confirmation must be equal!");
            return; 
        }
        userData.append('name', this.state.form.name);
        userData.append('email', this.state.form.email);
        userData.append('password', this.state.form.password);
        userData.append('password_confirmation', this.state.form.confirm_password);

        await axios({
            method: "post",
            url: signUrl,
            data: userData
        }).then((res)=>{
            alert("user created successfully. Log in now!")
            window.location.href = "./"
        }).catch((err)=>{
            alert("Something went wrong. Try with another email")
        })

    }

    render(){
        return (
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail2" className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={this.handleChange} id="exampleInputEmail2"/>
                    <div className="form-text">We'll never share your name with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={this.handleChange} id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword2" className="form-label">Confirm Password</label>
                    <input type="password" name="confirm_password" className="form-control" onChange={this.handleChange} id="exampleInputPassword2"/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(event)=>this.signIn(event)}>Create user</button>
                <br /><br />
                <a href="./">Log In</a>
            </form>
        )
    }
}
export default Register;

