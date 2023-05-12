import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/User/UserSlice";
import { toast } from "react-toastify";
import { useShoppingCart } from "../../Context/ShoppingCartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import CartHeaderItem from "../CartHeaderItem";
import logo from "../../images/logo.png";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [showIcon, setShowIcon] = useState(false);
  let navigate = useNavigate();
  const {
    state: { cart },
    state: { totalMoney },
  } = useShoppingCart();

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, [auth]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(logOut());
        toast.success("Logout successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      })
      .catch(() => {
        toast.error("Logout fail!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          className: "foo-bar",
        });
      });
  };

  const toCart = () => {
    navigate("/cart");
  };

  return (
    <>
      <nav>
        <div className={showIcon ? "nav-menu active" : "nav-menu"}>
          <div className="nav-home">
            <NavLink className="nav-link" to="/">
              <h4>Home</h4>
            </NavLink>
            <NavLink className="nav-link" to="/products">
              <h4>Products</h4>
            </NavLink>
          </div>
          <div className="nav-logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="nav-user">
            <div className="nav-cart">
              <NavLink className="nav-link cart" to="/cart">
                <FaShoppingCart />
                <div className="cart-number">{cart.length}</div>
              </NavLink>
              <div className="cart-dropdown">
                <div className="cart-item-wrapper">
                  {cart.length ? (
                    cart.map((item) => {
                      return <CartHeaderItem key={item.id} item={item} />;
                    })
                  ) : (
                    <p>Your cart is empty!😁</p>
                  )}
                </div>
                <div className="action">
                  <div className="subtotal">
                    <p>Subtotal:</p>
                    <h5>${totalMoney}.00</h5>
                  </div>
                  <button className="view-cart" onClick={() => toCart()}>
                    VIEW CART
                  </button>
                  <button className="checkout">CHECK OUT</button>
                </div>
              </div>
            </div>
            {Object.keys(user).length !== 0 ? (
              <>
                <div className="profile-dropdown">
                  <FaUserCircle className="profile-icon" />
                  <div className="profile-dropdown-content">
                    <NavLink className="nav-link" to="/profile/information">
                      Profile 😎
                    </NavLink>
                    <NavLink className="nav-link" to="/cart">
                      My Cart 🛒
                    </NavLink>
                    <NavLink className="nav-link" to="/profile/favorite">
                      My Favorites 😍
                    </NavLink>
                    <div className="nav-link" onClick={() => handleLogout()}>
                      Log Out
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink className="nav-link signin" to="/signin">
                  Log in
                </NavLink>
                <NavLink className="nav-link signup" to="/signup">
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="menu-icon">
          <GiHamburgerMenu onClick={() => setShowIcon(!showIcon)} />
        </div>
      </nav>
    </>
  );
};

export default Header;
