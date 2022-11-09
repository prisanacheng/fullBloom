import React from "react";
import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {
  return (
    <header className="NavBar">
      <div className="FullBloom">
        <NavLink className="FullBloom" to="/">
          Full Bloom
        </NavLink>
      </div>

      {!isLoggedIn ? (
        <div className="LinkBox">
          <div className="LeftLinks">
            <NavLink className="headerLinks" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="headerLinks" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="headerLinks" to="/Care">
              Care
            </NavLink>
          </div>
          <div className="RightLinks">
            <NavLink className="headerLinks" to="/users/Login">
              Login
            </NavLink>
            <NavLink className="headerLinks" to="/Cart">
              <img
                className="CartIcon"
                src="/images/blanccart.png"
                width={25}
              ></img>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="LinkBox">
          <div className="LeftLinks">
            <NavLink className="headerLinks" to="/RenderAllPlants">
              Plants
            </NavLink>
            <NavLink className="headerLinks" to="/RenderPots">
              Pots
            </NavLink>
            <NavLink className="headerLinks" to="/Care">
              Care
            </NavLink>
          </div>
          <div className="RightLinks">
            <NavLink className="headerLinks" to="/Account">
              Account
            </NavLink>
            <NavLink className="headerLinks" to="/users/Logout">
              Logout
            </NavLink>
            <NavLink className="headerLinks" to="/Cart">
              <img
                className="CartIcon"
                src="/images/blanccart.png"
                width={25}
              ></img>
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;
