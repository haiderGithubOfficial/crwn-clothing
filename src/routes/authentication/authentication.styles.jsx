import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  margin: 10px auto;
  padding: 5rem 5rem;
  width: 1100px;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    padding: 0;
    width: 100%;
  }
`;
