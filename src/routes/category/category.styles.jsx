import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  row-gap: 50px;
  column-gap: 15px;
  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 15px;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 38px;
  text-align: center;
`;
