import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import FoodCard from "../components/FoodCard";
import {menuData} from "../data/menuData";
import "./SavedRecipes.css";

const SavedRecipes=({user,savedIds,isAuthenticated,onLogout,onRemove})=>{
    const items=menuData.filter( itm=>savedIds.includes(itm.id));
    return (
        <div className="sr-mp">
            <Navbar user={user} savedIds={savedIds} isAuthenticated={isAuthenticated} onLogout={onLogout}/>
            <main className="sr-content">
                <div className="sr-header-row">
          <div className="sr-title">
            <h1>Saved Recipes</h1>
            <p className="sr-counter-text">
              {items.length} {items.length === 1 ? "recipe saved" : "recipes saved"}
            </p>
          </div>
          <Link to="/" className="sr-back-btn">
            Back to Menu
          </Link>
        </div>
            {items.length===0 ? (
                <div className="sr-empty">
                  <div>
                        <p>No saved recipes yet.</p>
                    <Link to="/" className="sr-action-link">Browse the Menu</Link>
                  </div>
                    
                </div>
                
            ):(
          <div className="sr-grid">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} onRemove={onRemove} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default SavedRecipes;