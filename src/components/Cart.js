import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getMyInfo, getUnpurchasedCart } from "../api/index.js";
import DeleteFromCart from "./DeleteFromCart";
import EditCart from "./EditCart";

const Cart = (params) => {
  const { isLoggedIn, cart, setCart } = params;
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    navigate("/Checkout");
  }

  async function checkCart() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const user = await getMyInfo(token);
      const userId = user.id;
      const currentCart = await getUnpurchasedCart(userId);
      if (currentCart) {
        setCart(currentCart);
      }
    } else {
      const products = JSON.parse(localStorage.getItem("cart"));
      if (products) {
        setCart({ products: products });
      }
    }
  }

  useEffect(() => {
    checkCart();
  }, [cart && cart.products && cart.products.length]);

  if (cart && cart.products && cart.products.length) {
    if (isLoggedIn) {
      return (
        <div className="MainBox">
          <h1>Your Cart</h1>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, name, quantity, price, image_url } = element;
              const image = element.image_url;
              return (
                <div
                  id="cartcontainer"
                  key={`Cart1: ${element.id}`}
                  className="EachProduct"
                >
                  <img
                    className="ProductImage"
                    src={image}
                    alt={element.cartphoto}
                    height={275}
                  />
                  <div className="BoxText">
                    <h3 className="CartText" id="cartname">
                      {element.name}
                    </h3>
                    <p className="CartText" id="cartprice">
                      ${element.price}
                    </p>
                    <p className="CartText" id="cartquantity">
                      Quantity: {element.quantity}
                    </p>
                    <EditCart
                      isLoggedIn={isLoggedIn}
                      cart={cart}
                      setCart={setCart}
                      id={element.id}
                    />
                    <DeleteFromCart
                      isLoggedIn={isLoggedIn}
                      cart={cart}
                      setCart={setCart}
                      id={element.id}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="Message"> Loading your Plants... </div>
          )}
          <button
            className="CheckOutButton"
            type="Submit"
            onClick={handleSubmit}
          >
            CHECK OUT
          </button>
        </div>
      );
    } else {
      return (
        <div className="MainBox">
          <h1>Your Cart</h1>
          {cart.products.length ? (
            cart.products.map((element) => {
              const { id, productName, quantity, productPrice, image_url } =
                element;
              const image = element.image_url;
              return (
                <div
                  id="cartcontainer"
                  key={`Cart: ${element.id}`}
                  className="EachProduct"
                >
                  <img
                    className="ProductImage"
                    src={image}
                    alt={element.cartphoto}
                    height={275}
                  />
                  <div className="BoxText">
                    <h3 className="CartText" id="cartname">
                      {element.productName}
                    </h3>
                    <p className="CartText" id="cartprice">
                      ${element.productPrice}
                    </p>
                    <p className="CartText" id="cartquantity">
                      Quantity: {element.quantity}
                    </p>
                    <EditCart
                      itemId={element.id}
                      itemQuantity={element.quantity}
                      isLoggedIn={isLoggedIn}
                      cart={cart}
                      setCart={setCart}
                    />
                    <DeleteFromCart
                      id={element.id}
                      isLoggedIn={isLoggedIn}
                      cart={cart}
                      setCart={setCart}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="Message"> Loading your Plants... </div>
          )}
          <button
            className="CheckOutButton"
            type="Submit"
            onClick={handleSubmit}
          >
            CHECK OUT
          </button>
        </div>
      );
    }
  } else {
    return (
      <div className="MainBox">
        <h2 className="AlertMessage">
          You have not added any babies to your cart...
        </h2>
      </div>
    );
  }
};

export default Cart;
