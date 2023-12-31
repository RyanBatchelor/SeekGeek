import { makeRequest } from "../../axios.js";
import Post from "../post/Post";
import "./posts.scss";
import {useQuery} from '@tanstack/react-query'

const Posts = () => {
  
  const {isLoading, error, data} = useQuery(['posts'], () =>
    makeRequest.get("/posts").then(res=>{
      return res.data
    })
  ) 

  return <div className="posts">
    { error 
    ? "Something went wrong!"
    : isLoading 
    ? "Loading" 
    : data.map((post)=><Post post={post} key={post.id}/>)}
    </div>;
};

export default Posts;
