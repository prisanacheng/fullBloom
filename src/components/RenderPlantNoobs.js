import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../api/index";

const RenderPlantNoobs = () => {
  const [allPlants, setAllPlants] = useState([]);
  useEffect(() => {
    getAllPlants().then((results) => {
      setAllPlants(results);
    });
  }, []);

  return (
    <div>
      <div className="AllPlantsPage">
        <aside className="CategoryLinkBox">
          <h3 className="ViewPlants">View Plants by Skill Level</h3>
          <div className="AsideText">
            <NavLink className="CategoryLink" to="/RenderPlantNoobs">
              Plant Noobs
            </NavLink>
            <NavLink className="CategoryLink" to="/RenderGreenThumbs">
              Green Thumbs
            </NavLink>
            <NavLink className="CategoryLink" to="/RenderDivas">
              Divas
            </NavLink>
          </div>
        </aside>
        <div className="TitleContainer">
          <h1 className="PageHeader" id="ProfileHeader">
            Plant Noobs
          </h1>
          <div className="productRow">
            {allPlants.length ? (
              allPlants.map((element) => {
                const { id, name, price, categoryId, image_url } = element;
                const image = element.image_url;
                if (element.categoryId === 1) {
                  return (
                    <div
                      id="PlantNoobs"
                      key={element.id}
                      className="EachProduct"
                    >
                      <div className="ProductText">
                        <h3 id="name">{element.name}</h3>
                        <p id="price">${element.price}</p>
                      </div>
                      <img src={image} alt={element.name} width={300} />
                      <button>
                        <NavLink
                          className="ProductLink"
                          to={`/RenderPlantNoobs/${id}`}
                        >
                          VIEW PRODUCT
                        </NavLink>
                      </button>
                    </div>
                  );
                }
              })
            ) : (
              <div> Loading your PlantNoobs... </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenderPlantNoobs;
