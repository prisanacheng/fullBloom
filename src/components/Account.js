import React, { useState, useEffect } from "react";
import { getOrderHistory, getMyInfo } from "../api/index";
import { NavLink } from "react-router-dom";

const Account = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [myInfo, setMyInfo] = useState([]);

  async function fetchMyInfo() {
    const token = localStorage.getItem("token");
    const user = await getMyInfo(token);
    setMyInfo(user);
  }
  useEffect(() => {
    fetchMyInfo();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (myInfo.id) {
      getOrderHistory(myInfo.id, token).then((results) => {
        setOrderHistory(results);
      });
    }
  }, [myInfo]);
  return (
    <div className="AccountPage">
      <h1 className="Accountinfo">Account Information</h1>
      <div className="AccountBox">
        <div>
          <h2 className="orderhisttitle">Your Growing Plant Fam</h2>
          <div className="OrderHistoryContent">
            <div>
              {orderHistory.length ? (
                orderHistory.map((element, idx) => {
                  const { cartId, datePurchased } = element;
                  if (element) {
                    return (
                      <div
                        id="orderhist"
                        key={`OrderHistory: ${element.id} ${idx}`}
                        className="EachOrder"
                      >
                        {element.categoryId === 4 && element.quantity === 1 ? (
                          <p className="OrderHistoryText" id="orderName">
                            *A {element.name} became a home on{" "}
                            {element.datePurchased}
                          </p>
                        ) : element.categoryId === 4 && element.quantity > 1 ? (
                          <p className="OrderHistoryText" id="orderName">
                            *{element.quantity} {element.name}s became homes on{" "}
                            {element.datePurchased}
                          </p>
                        ) : element.categoryId < 4 && element.quantity === 1 ? (
                          <p className="OrderHistoryText" id="orderName">
                            *A {element.name} baby joined your family on{" "}
                            {element.datePurchased}
                          </p>
                        ) : (
                          <p className="OrderHistoryText" id="orderName">
                            *{element.quantity} {element.name} babies joined
                            your family on {element.datePurchased}
                          </p>
                        )}
                        <p className="OrderHistoryText" id="orderprice">
                          {" "}
                          Investment: ${element.price}, Return: <i>Priceless</i>
                        </p>
                      </div>
                    );
                  }
                })
              ) : (
                <div>You have not purchased plant babies at this time.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <NavLink className="Links" id="AccountLink" to="/RenderAllPlants">
        Grow your family!
      </NavLink>
    </div>
  );
};

export default Account;
