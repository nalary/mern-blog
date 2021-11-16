import axios from "axios";
import { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
    const { user, dispatch } = useContext(Context);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);

    const PF = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        
        const updatedUser = {
            username,
            email,
            password,
            userId: user._id         
        };

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + "_" + file.name;

            data.append("name", fileName);
            data.append("file", file);
            updatedUser.profilePic = fileName;

            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }

        try {
            const res = await axios.put(`/users/${user._id}`, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setSuccess(true);
        } catch (err) { 
            dispatch({ type: "UPDATE_FAILURE" });
        }        
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Acoount</span>
                    <span className="settingsDeleteTitle">Delete Acoount</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img                             
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input 
                            type="file" 
                            id="fileInput" 
                            style={{display: "none"}} 
                            onChange={e => setFile(e.target.files[0])} 
                        />
                    </div>
                    <label>Username</label>
                    <input 
                        type="text" 
                        placeholder={user.username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                    <label>Email</label>
                    <input 
                        type="text" 
                        placeholder={user.email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <span style={{ color: "teal", textAlign: "center", marginTop: "20px" }}>Profile has been updated.</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
