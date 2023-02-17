import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

import { userSignOut } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from "./navigation.styles.jsx";
import { selectCurrentUser } from "../../store/user/user.selector";

import { useSelector } from "react-redux/es/exports";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { setIsCartOpen } from "../../store/cart/cart.actions";

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const dropdownHandler = () => {
    dispatch(setIsCartOpen(!isCartOpen));
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
        {isCartOpen ? <CartDropdown /> : ""}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
