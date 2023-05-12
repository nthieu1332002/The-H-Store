import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useShoppingCart } from "../../Context/ShoppingCartContext";
import "./Cart.scss";
import CartItem from "../../components/CartItem/CartItem"

const Cart = () => {
  const {
    state: { cart },
    state: { totalMoney },
  } = useShoppingCart();
  const [shippingFee, setShippingFee] = useState(10);

  return (
    <div className="cart-container">
      <div className="cart-left">
        <div className="cart-header">
          <h2>YOUR CART ({cart.length})</h2>
          <div className="choose-more">
            <Link to="/products">Choose more products</Link>
          </div>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <p>Fill it 😁</p>
            </div>
          ) : (
            <table>
              <tbody>
                {cart.map((item) => {
                  return (
                    <CartItem key={item.id} item={item}/>
                  );
                })}
                <tr></tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className="cart-right">
        <div className="cart-header">
          <h3>CART TOTAL</h3>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Subtotal:</th>
              <td>$ {totalMoney}.00</td>
            </tr>
            <tr>
              <th>Shipping:</th>
              <td>
                <form id="ship-type">
                  <label className="radio">
                    <span>Ho Chi Minh: $10</span>
                    <input
                      name="radio"
                      type="radio"
                      value="10"
                      onChange={() => setShippingFee(10)}
                      checked={shippingFee === 10}
                    />
                  </label>
                  <br></br>
                  <label className="radio">
                    <span>Others: $20</span>
                    <input
                      name="radio"
                      type="radio"
                      value="20"
                      onChange={() => setShippingFee(20)}
                      checked={shippingFee === 20}
                    />
                  </label>
                </form>
              </td>
            </tr>
            <tr>
              <th><span className="total">TOTAL:</span></th>
              <td>$ {totalMoney + shippingFee}.00</td>
            </tr>
          </tbody>
        </table>
        <div className="check-out">
          <button>CHECK OUT</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
