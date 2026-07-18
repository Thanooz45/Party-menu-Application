import {useState} from "react";
import "./FilterBar.css";
const categories=[
  { key: "all", label: "All" },
  { key: "starter", label: "Starter" },
  { key: "main", label: "Main" },
  { key: "sides", label: "Sides" },
  { key: "desert", label: "Desert" },
];

const DIETS = [
  { key: "all", label: "All" },
  { key: "veg", label: "🌿 Veg" },
  { key: "nonveg", label: "🍗 Non-Veg" },
];

const FilterBar =({ category, diet, onCategoryChange, onDietChange, onSearch })=>{
    const [searchIp,setSearchIp]=useState("");
    const handleSearch=()=> onSearch(searchIp);
    const handlekDown=(e)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            handleSearch();
        }
    };

    return(
        <div className="fb-container">
            <div className="fb-section">
                <span className="fb-label">Category</span>
                <div className="fb-btns">
                    {categories.map(cat=>(
                    <button key={cat.key} type="button"
                    className={`fb-pill ${category === cat.key ? "is-active" : ""}`}
                    onClick={()=>onCategoryChange(cat.key)}>
                        {cat.label}
                    </button>
                ))}
                </div>
                
            </div>
            <div className="fb-section">
                <span className="fb-label">Diet</span>
                <div className="fb-btns">
                    {DIETS.map((dietOption) => (
                    <button key={dietOption.key} type="button"
                    className={`fb-pill ${diet === dietOption.key ? "is-active" : ""}`}
                    onClick={()=>onDietChange(dietOption.key)}>
                        {dietOption.icon && <span className="fb-pill-icon">{dietOption.icon}</span>}
              {dietOption.label}
                    </button>
                ))}
                </div>
                
            </div>
            <div className="fb-search-row">
                <input type="text"
                value={searchIp}
                className="fb-input"
                onChange={(e)=>setSearchIp(e.target.value)}
                onKeyDown={handlekDown}
                placeholder="Search dishes by name…">
                </input>
                <button type="button" onClick={handleSearch} className="fb-search-btn">
                Search
            </button>
            </div>
            
        </div>
    )
}

export default FilterBar;
