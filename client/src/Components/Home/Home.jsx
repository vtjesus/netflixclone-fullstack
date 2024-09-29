import "./home.scss"
import React from 'react'
import Navbar from "../NavBar/Navbar"
import Featured from "../Featured/Featured"
import List from "../List/List"
import axios from "axios"

const url = "http://localhost:3001/api/"

export default function Home({type}) {
    const [lists, setLists] = React.useState([]);
    const [genre, setGenre] = React.useState(null);

    React.useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(url + `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`)
                console.log(res.data);
                setLists(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getRandomLists();
    }, [type, genre])

    return (
        <div className="home">
            <Navbar/>
            <Featured type={type}/>
            {
                lists.map((list) => 
                    <List list={list} key={list._id}/>
                )
            }
        </div>
    )
}

