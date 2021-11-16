import "./post.css";
import { Link } from "react-router-dom";

export default function Post({post}) {
    const PF = "http://localhost:5000/images/";

    return (
        <>
        <div className="post">
            {post.photo && (
                <img 
                    className="postImg"
                    src={PF + post.photo} 
                    alt="" 
                />  
            )}                      
            <div className="postInfo">
                <div className="postCats"> 
                    <span className="postCat">{post.category.toUpperCase()}</span>                   
                </div>
                <Link to={`/posts/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>                
                <hr />
                <span className="postDate">{new Date(post.updatedAt).toDateString()}</span>
                <p className="postDesc">{post.desc}</p>
            </div>
        </div>
        </>
    )
}
