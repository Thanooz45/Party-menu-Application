import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SignIn from "./Pages/SignIn";
import Menu from "./Pages/Menu";
import FoodDetail from "./Pages/FoodDetail";
import SavedRecipes from "./Pages/SavedRecipes";
import NotFound from "./Pages/NotFound";
import "./index.css";

const TOKEN_KEY = "party_menu_token";
const USER_KEY = "party_menu_user";
const SAVED_KEY = "party_menu_saved_recipes";

function App() {

  const [token,setToken]=useState(localStorage.getItem(TOKEN_KEY));
  const [user,setUser]=useState(()=>{
    const userData=localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  });
  const isAuthenticated=token!==null;

  const [savedIds,setSavedIds]=useState(()=>{
    const stored=localStorage.getItem(SAVED_KEY);
    return stored ? JSON.parse(stored):[];
  });

  function handleLogin(newTok,num){
    localStorage.setItem(TOKEN_KEY,newTok);
    localStorage.setItem(USER_KEY,JSON.stringify(num));
    setToken(newTok);
    setUser(num);
  }
  function handleLogout(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }
  function saveRecipe(id){
    if (savedIds.includes(id)) return;
    const updated=[...savedIds,id];
    setSavedIds(updated);
    localStorage.setItem(SAVED_KEY,JSON.stringify(updated));
  }

  function removeRecipe(id){
    const updatedList=savedIds.filter((eachid)=>eachid!==id);
    setSavedIds(updatedList);
    localStorage.setItem(SAVED_KEY,JSON.stringify(updatedList));
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <SignIn isAuthenticated={isAuthenticated} onLogin={handleLogin} />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Menu
                user={user}
                savedIds={savedIds}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FoodDetail
                user={user}
                savedIds={savedIds}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                onSave={saveRecipe}
                onRemove={removeRecipe}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-recipes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SavedRecipes
                user={user}
                savedIds={savedIds}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                onRemove={removeRecipe}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound isAuthenticated={isAuthenticated} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
