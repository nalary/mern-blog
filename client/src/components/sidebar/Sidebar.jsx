import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get("/categories");
            setCategories(res.data);
        };

        getCategories();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img 
                    src="https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/132041461_10221600439853433_725026506335259556_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=l-jqxEDkAucAX8pZQjm&_nc_ht=scontent-ssn1-1.xx&oh=efcfabdb5a3088f1c718d0c52b31844e&oe=619F5141" 
                    alt="" 
                />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos minus expedita unde voluptas ea a atque accusamus aspernatur
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGOREIS</span>
                <ul className="sidebarList">
                    {categories.map(category => (
                        <Link to={`/?cat=${category.name}`} className="link" key={category._id}>
                            <li className="sidebarListItem">{category.name.toUpperCase()}</li>
                        </Link>
                    ))}                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                </div>
            </div>
        </div>
    )
}
