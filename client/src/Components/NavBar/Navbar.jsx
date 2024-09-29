import React from 'react'
import "./navbar.scss"
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [Scroll, setScroll] = React.useState(false);

    window.onscroll = () => {
        setScroll(window.pageYOffset === 0 ? false : true);
        return () => window.onscroll = null;
    }


    return (
        <div className={Scroll ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to="/" className="link">
                        <span>Homepage</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                        <span>Movies</span>
                    </Link>
                    <span>New and popular</span>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icons"/>
                    <span>KID</span>
                    <Notifications className="icons"/>
                    <img src="https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=" alt="" />
                    <div className="profile">
                        <ArrowDropDown className="icons"/>
                        <div className="options">
                            <span>Options</span>
                            <span>Logout</span>
                        </div>
                    </div>
            
                </div>
            </div>  
        </div>
    )
}

export default Navbar
