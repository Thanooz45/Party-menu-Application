import {Link} from "react-router-dom";
import "./NotFound.css";
const NotFound=({isAuthenticated})=>{
    return(
        <div className="nf-cont">
            <div className="inner-nf">
                <h1> 404</h1>
                <p>Page Not Found</p>
                <p className="p1">The page you're looking for has wandered off the menu.</p>
                <div>
                    <button className="nf-btn">
                    <Link to={isAuthenticated ? "/" : "/signin"} className="btn">
                    {isAuthenticated ? "Back to Menu" : "Back to Sign In"}
                    </Link>
                </button>
                </div>
                
            
            </div>
            
        </div>
    )
}
export default NotFound;