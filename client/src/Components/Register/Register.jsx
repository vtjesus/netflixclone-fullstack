import React from 'react'
import "./register.scss"

export default function Register() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const emailRef = React.useRef()
    const passwordRef = React.useRef()

    const handleEmail = () => {
        setEmail(emailRef.current.value)
    }

    const handlePassword = () => {
        setPassword(passwordRef.current.value)
    }

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png" alt="" />
                    <button className="logButton">Sign In</button>
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                {
                    !email ? (
                        
                        <div className="input">
                            <input type="email" placeholder="Enter your email address" ref={emailRef}/>
                            <button className="regButton" onClick={handleEmail}>Get Started</button>
                        </div>
                
                ) : (
                        <form className="input">
                            <input type="password" placeholder="Enter your password" ref={passwordRef}/>
                            <button className="regButton" onClick={handlePassword}>Start</button>
                        </form>
                    )}
                
            </div>
        </div>
    )
}
