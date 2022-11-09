import React from "react";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="homeScreen">
      <NavLink className="ShopAllPlants" to="/RenderAllPlants">
        SHOP ALL PLANTS
      </NavLink>
    </div>
  );
}

export default Home;
