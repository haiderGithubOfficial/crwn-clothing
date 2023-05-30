import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../Button/Button.component";

import { StyledSignUpContainer } from "./sign-up-form.styles.jsx";
import { emailSignUpStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();

  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handlerOnSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password Do not match!");
      return;
    }
    try {
      dispatch(emailSignUpStart(displayName, email, password));
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <StyledSignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handlerOnSubmit}>
        <FormInput
          label="Display Name:"
          type="text"
          name="displayName"
          value={displayName}
          onChange={onChangeHandler}
        />

        <FormInput
          label="Email:"
          type="email"
          name="email"
          value={email}
          onChange={onChangeHandler}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={onChangeHandler}
        />

        <FormInput
          label="Confirm Password:"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeHandler}
        />
        <Button children={"Sign UP"} type="submit" />
      </form>
    </StyledSignUpContainer>
  );
};

export default SignUpForm;
