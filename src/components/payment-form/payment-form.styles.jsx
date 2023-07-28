import styled from "styled-components";

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 800px) {
    min-width: 100%;
  }
`;

export const FormContainer = styled.form`
  height: 100px;
  min-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .checkout-footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    p {
      padding: 0;
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    min-width: 100%;
  }
`;
