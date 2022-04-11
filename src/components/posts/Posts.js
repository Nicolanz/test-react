import React, { Component } from "react";
import axios from "axios";
import  Cookies from "universal-cookie";

// cookie obj
const cookie = new Cookies();

// Url all posts
const allPostsUrl = "http://front-test.vinixcode.cloud:8000/api/v1/post"
const token_type = cookie.get("token_type");
const token = cookie.get("token");

class Post extends Component {   
    render() {
        return (
            <div> 
            { this.props.value }
            </div>
        );
    }
}

class Posts extends Component {

    allPosts = async () => {
        axios.defaults.headers.common['Authorization'] = `${token_type} ${token}`
        return await axios.get(
            allPostsUrl
        ).then((res)=>{
            return res;
        }).catch((err)=>{
            console.log(err);
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

    render(){

        const res= this.allPosts((res)=>{
            return res;
        })

        var elements=[];
        
                const lists = [["uno", "dos"], [1, 2]]
                for(let arr of lists){
                    for(var i=0;i<arr.length;i++){
                        // push the component to elements!
                        elements.push(<Post value={ arr[i] } />);
                    }
                    if(lists[lists.length - 1]!= arr){
                        elements.push(<br/>)
                    }
                }

        return (
            <div>
                posts<br/>
               
                <div>
                {elements}
                </div> <br/>
            
                <a href="./menu">Menu</a>
            </div>
        )
    }
}
export default Posts;
