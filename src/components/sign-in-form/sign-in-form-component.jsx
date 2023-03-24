import { useState } from "react";
import FormInput from "../form-input/form-input.component";

import Button from "../Button/Button.component";

import { ButtonContainer } from "./sign-in-form.styles.jsx";

import { BUTTON_TYPE_CLASSES } from "../Button/Button.component";
import { useDispatch } from "react-redux/es/exports";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

const SignInForm = () => {
  const dispatch = useDispatch();

  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handlerOnSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
    } catch (error) {
      console.log(error.code);
    }
  };

  const googleSignIn = async () => {
    try {
      dispatch(googleSignInStart());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handlerOnSubmit}>
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
        <ButtonContainer>
          <Button children={"Sign IN"} type="submit" />
          <Button
            type={"button"}
            children={"Google Sign In"}
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={googleSignIn}
          />
        </ButtonContainer>
      </form>
    </div>
  );
};

export default SignInForm;
