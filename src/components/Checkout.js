import {
  createOrderHistory,
  editIsPurchased,
  getMyInfo,
  getUnpurchasedCart,
} from "../api/index.js";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";

const Checkout = (params) => {
  const { isLoggedIn, cart, setCart } = params;
  const navigate = useNavigate();
  const [orderSummary, setOrderSummary] = useState([]);
  const token = localStorage.getItem("token");

  async function getUser() {
    if (token) {
      const user = await getMyInfo(token);
      const userId = user.id;
      const summary = await getUnpurchasedCart(userId);
      if (summary) {
        setOrderSummary(summary);
      } else {
        console.log("no unpurchased");
      }
    } else {
      const guestCart = localStorage.getItem("cart");
      if (guestCart) {
        setOrderSummary(guestCart);
      } else {
        console.log("no unpurchased in local storage");
      }
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (orderSummary.cartId) {
      await editIsPurchased(orderSummary.cartId);
      const result = await createOrderHistory(orderSummary.cartId);
      setCart({ products: [] });
      navigate("/Congratulations");
    } else {
      setCart(localStorage.setItem("cart", []));
      navigate("/Congratulations");
    }
  }
  if (cart && cart.products && cart.products.length) {
    if (isLoggedIn) {
      return (
        <div>
          <h1>Check Out</h1>
          <h2 className="OrderSummary">Order Summary</h2>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, name, quantity, price, image_url } = element;
              const image = element.image_url;
              return (
                <div key={`Checkout: ${element.id}`} className="orderProduct">
                  <img
                    id="OrderImage"
                    src={image}
                    alt={element.cartphoto}
                    width={200}
                  />
                  <div className="OrderText">
                    <h3 id="cartname">{element.name}</h3>
                    <p id="cartquantity">Quantity: {element.quantity}</p>
                    <p id="cartprice">${element.price}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div> Loading your Plants... </div>
          )}
          <button
            className="CheckOutButton"
            type="Submit"
            onClick={handleSubmit}
          >
            PLACE ORDER
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Check Out</h1>
          <h2 className="OrderSummary">Order Summary</h2>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, productName, quantity, productPrice, image_url } =
                element;
              const image = element.image_url;
              return (
                <div key={`Checkout2: ${element.id}`} className="orderProduct">
                  <img src={image} alt={element.cartphoto} width={200} />
                  <div className="OrderText">
                    <h3 id="cartname">{element.productName}</h3>
                    <p id="cartquantity">Quantity: {element.quantity}</p>
                    <p id="cartprice">${element.productPrice}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div> Loading your Plants... </div>
          )}
          <button id="placeOrder" type="Submit" onClick={handleSubmit}>
            Place Order
          </button>
        </div>
      );
    }
  } else {
    return (
      <div>
        <h2>You have not added any babies to your cart...</h2>
      </div>
    );
  }
};
export default Checkout;
