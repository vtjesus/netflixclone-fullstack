import React from 'react'
import "./videoplayer.scss"
import { ArrowBackOutlined } from "@material-ui/icons"

export default function VideoPlayer() {
    return (
        <div className="videoplayer">
            <div className="back">
                <ArrowBackOutlined />
                Home
            </div>
            <video src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" className="video" autoPlay progress controls></video>
        </div>
    )
}
