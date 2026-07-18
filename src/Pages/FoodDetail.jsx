import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMenuItemById } from "../data/menuData";
import "./FoodDetail.css";

const FoodDetail = ({
  user,
  savedIds,
  isAuthenticated,
  onLogout,
  onSave,
  onRemove,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getMenuItemById(id);

  if (!item) {
    return (
      <div className="fd-page-wrapper">
        <Navbar
          user={user}
          savedIds={savedIds}
          isAuthenticated={isAuthenticated}
          onLogout={onLogout}
        />
        <main>
          <div className="fd-cont fd-empty">
            <p>We couldn't find that dish.</p>
            <Link to="/" className="fd-back-btn">Back to Menu</Link>
          </div>
        </main>
      </div>
    );
  }

  const saved = savedIds.includes(item.id);

  function handleSaveClick() {
    if (saved) {
      onRemove(item.id);
    } else {
      onSave(item.id);
    }
  }

  return (
    <div className="fd-page-wrapper">
      <Navbar
        user={user}
        savedIds={savedIds}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <main className="fd-cont">
        <div className="fd-action-row">
          <button onClick={() => navigate("/")} className="fd-back-btn">← Back to Menu</button>
          <div className="fd-action-right">
            <Link to="/saved-recipes" className="fd-nav-link">Saved Recipes</Link>
            <button 
              type="button" 
              onClick={handleSaveClick} 
              className={`fd-save-btn ${saved ? "is-saved" : ""}`}
            >
              {saved ? "✓ Saved" : "Save Recipe"}
            </button>
          </div>
        </div>
        <div className="fd-split-section">
          <div className="fd-media-side">
            <img className="fd-img" src={item.image} alt={item.name} />
          </div>

          <div className="fd-info-side">
            <div className="fd-badge-row">
              <span className="fd-badge fd-cat-badge">{item.category}</span>
              <span className={`fd-badge ${item.isVeg ? "fd-veg" : "fd-nonveg"}`}>
                {item.isVeg ? "🌿 Veg" : "🍗 Non-Veg"}
              </span>
            </div>
            <h1 className="fd-title">{item.name}</h1>
            <p className="fd-servings">For {item.servings}</p>
            <p className="fd-desc">{item.fullDescription}</p>
          </div>
        </div>
        <div className="fd-ingredients-card">
          <h2>Ingredients</h2>
          <ul className="fd-ing-list">
            {item.ingredients.map((ing) => (
              <li key={ing.name} className="fd-ing-item">
                <span className="fd-ing-name">{ing.name}</span>
                <span className="fd-ing-qty">{ing.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        
      </main>
    </div>
  );
};

export default FoodDetail;