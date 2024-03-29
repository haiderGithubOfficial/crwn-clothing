import styled from "styled-components";
import { SpinnerContainer } from "../spinner/spinner.styles";

export const BaseButton = styled.button`
  min-width: 80%;
  width: auto;
  height: 47px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 0.5em 0 0.5em;
  font-size: 0.9em;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: "Open Sans Condensed", sans-serif;
  font-weight: lighter;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

export const InvertedButton = styled(BaseButton)`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

export const ButtonSpinner = styled(SpinnerContainer)`
  width: 30px;
  height: 30px;
  margin: 10px 0;
`;
