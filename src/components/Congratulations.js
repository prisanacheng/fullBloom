import React from "react";
import { NavLink } from "react-router-dom";

function Congratulations({ isLoggedIn }) {
  return (
    <main className="Congratulations">
      <div className="congratsText">
        <h1 className="congratsHeader">
          Congratulations on growing your plant family!
        </h1>
        {isLoggedIn ? (
          <NavLink className="congratulationsLink" to={`/Account`}>
            See your plant family...
          </NavLink>
        ) : (
          <NavLink className="congratulationsLink" to={`/RenderAllPlants`}>
            Grow your plant family...
          </NavLink>
        )}
      </div>
    </main>
  );
}

export default Congratulations;
