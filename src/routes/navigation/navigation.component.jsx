import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { userSignOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
import { useSelector } from "react-redux/es/exports";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";
import { selectCurrentUser } from "../../store/user/user.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);

  const { display, setDisplay } = useContext(CartContext);

  const dropdownHandler = () => {
    setDisplay(!display);
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to={"/"}>
          <div>
            <CrownLogo />
          </div>
        </LogoContainer>
        <NavLinks>
          <NavLink to={"/shop"}>SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={userSignOut}>
              Sign Out
            </NavLink>
          ) : (
            <NavLink to={"/auth"}>Sign In</NavLink>
          )}
          <CartIcon dropdownHandler={dropdownHandler} />
        </NavLinks>
        {display ? <CartDropdown /> : ""}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
