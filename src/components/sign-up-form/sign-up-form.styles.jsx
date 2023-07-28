import styled from "styled-components";

export const StyledSignUpContainer = styled.div`
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
