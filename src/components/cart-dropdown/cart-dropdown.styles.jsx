import styled from "styled-components";
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../Button/Button.styles";

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 245px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  ${BaseButton} {
    position: -webkit-sticky;
    position: sticky;
    bottom: 0px;
  }
`;
