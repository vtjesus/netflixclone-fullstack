import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from '@material-ui/icons'
import React from 'react'
import "./listitem.scss"

export default function ListItem({index, item}) {

    const [Hovered, setHovered] = React.useState(false)
    const trailer = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

    return (
        <div className="listItem"
            onMouseEnter={() => {setHovered(true)}}
            onMouseLeave={() => {setHovered(false)}}
            style={{left: Hovered && index * 225 - 50 + index * 2.5}}
        >
            
            <img src={item.img} alt="" />
            
            {
                Hovered && (
            <>
                <video src={item.trailer} autoPlay loop></video>

            <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className="icon"/>
                    <Add className="icon"/>
                    <ThumbUpAltOutlined className="icon"/>
                    <ThumbDownOutlined className="icon"/>
                </div>
                <div className="itemInfoTop">
                    <span>{item.duration}</span>
                    <span className="classified">{item.classification}</span>
                    <span>{item.year}</span>
                </div>
                <div className="desc">
                    {item.description}
                </div>
                <div className="genre">
                    {item.genre}
                </div>
            </div>
            </>
            )}
        </div>
    )
}
