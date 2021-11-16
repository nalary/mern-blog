import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newPost = {
            title,
            desc,
            category,
            username: user.username,            
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + "_" + file.name;

            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;

            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }

        try {
            const res = await axios.post("/posts", newPost);
            await axios.post("/categories", { name: category });
            window.location.replace("/posts/" + res.data._id);
        } catch (err) { }        
    };
    
    return (
        <div className="write">
            {file && 
                <img 
                    src={URL.createObjectURL(file)}
                    alt="" 
                    className="writeImg"
                />
            }            
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id="fileInput" 
                        style={{display: "none"}} 
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="writeInput" 
                        autoFocus
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Category" 
                        className="writeInput"
                        required                        
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea 
                        placeholder="Tell your story..." 
                        type="text" 
                        className="writeInput writeText" 
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}
