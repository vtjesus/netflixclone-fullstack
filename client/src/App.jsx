import Home from "./Components/Home/Home"
import "./app.scss";
import VideoPlayer from "./Components/VideoPlayer/VideoPlayer";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
    } from "react-router-dom";

const App = () => {
    const user = true;

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    { user ? <Home /> : <Redirect to="/register" /> }
                </Route>
                <Route exact path="/login">
                    { !user ? <Login /> : <Redirect to="/" /> }
                </Route>
                <Route exact path="/register">
                    { !user ? <Register /> : <Redirect to="/" /> }
                </Route>
                { user && 
                <>
                    <Route path="/movies">
                        <Home type="movies"/>
                    </Route>
                    <Route path="/series">
                        <Home type="series"/>
                    </Route>
                
                    <Route path="/watch">
                        <VideoPlayer />
                    </Route>
                </>
                }
            </Switch>
        </Router>
    )
}

export default App