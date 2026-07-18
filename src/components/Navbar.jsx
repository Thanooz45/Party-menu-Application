import {Link,useNavigate} from "react-router-dom";
import "./Navbar.css"
const Navbar=({user,savedIds = [],isAuthenticated,onLogout})=>{
    const navigate=useNavigate();
    
    function handleLogout(){
        onLogout();
        navigate("/signin",{replace:true});
    }

    return(
        <header className="nv-main">
            <div>
                <Link to={isAuthenticated?"/":"/signin"}>
                    <h1> party menu</h1>
                </Link>
                {user && <span className="nv-welcome">Welcome, {user.name}</span>}
            </div>
            <div className="nv-right">
                <Link to="/saved-recipes" className="nv-link">
                     Saved recipes
                    <span className="nv-saved-count" aria-label={`${savedIds.length} saved recipes`}>{savedIds.length}</span>
                </Link>
                {isAuthenticated &&(
                <button className="nv-t-btn" onClick={handleLogout}>Logout</button>
            )}
            </div>
            
        </header>
    )
}

export default Navbar;
