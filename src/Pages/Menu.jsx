import {useState} from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import FoodCard from "../components/FoodCard";
import { filterMenuItems } from "../data/menuData";
import "./Menu.css";


const Menu=({ user, savedIds, isAuthenticated, onLogout })=>{
  const [category,setCategory] = useState("all");
  const [diet,setDiet] = useState("all");
  const [search,setSearch] = useState("");
  const items=filterMenuItems({category,diet,name:search});

  return (
    <div className="mn-cont">
        <Navbar user={user} savedIds={savedIds} isAuthenticated={isAuthenticated} onLogout={onLogout}/>
        <main>
            <FilterBar
          category={category}
          diet={diet}
          onCategoryChange={setCategory}
          onDietChange={setDiet}
          onSearch={setSearch}
        />
        <p className="mn-titems">{items.length} items found</p>

        {items.length === 0 ? (
          <div className="mn-empty-state">
            <p>No dishes found. Try different filters.</p>
          </div>
        ) : (
          <div className="mn-items">
            {items.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
export default Menu;