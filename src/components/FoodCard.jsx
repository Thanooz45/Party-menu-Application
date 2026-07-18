import {useNavigate} from "react-router-dom";
import "./FoodCard.css";
const FoodCard = ({ item, onRemove }) => {
    const navigate=useNavigate();
    const toDetail=()=> navigate(`/menu/${item.id}`);
    const handleKDown=(e)=>{
        if(e.key==="Enter"){
            toDetail();
        }
    };
    return (
        <div role="button" tabIndex="0" onClick={toDetail} onKeyDown={handleKDown} className="fc-cont">
            <div className="fc-img-cont">
                <img src={item.image} alt={item.name} className="fc-img"/>
                <span className={`fc-diet-badge ${item.isVeg ? 'fc-veg' : 'fc-nonveg'}`}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </span>
            </div>
            <div className="fc-info">
                <span className="fc-category">{item.category}</span>
                <h3 className="fc-name">{item.name}</h3>
                <p className="fc-description">{item.description}</p>
                <span className="fc-servings">{item.servings}</span>
            </div>
            {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(item.id);
            }} className="fc-remove-btn"
          >
            Remove
          </button>
        )}
        </div>
    )
}
export default FoodCard;
