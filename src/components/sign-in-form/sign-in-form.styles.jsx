import styled from "styled-components";

export const StyledSignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    form {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;
