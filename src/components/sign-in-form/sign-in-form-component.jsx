import { useState, useContext } from "react";
import { signInAutWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import Button from "../Button/Button.component";
import { signInWithGogglePopup } from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";
import { UserContext } from "../../contexts/user.context";

const SignInForm = () => {
  const defaultFormFields = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(UserContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handlerOnSubmit = async (event) => {
    event.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("password Do not match!");
    //   return;
    // }
    try {
      const { user } = await signInAutWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.code);
    }
  };

  const googleSignIn = async () => {
    try {
      await signInWithGogglePopup();
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
        <div className="buttons-container">
          <Button children={"Sign IN"} type="submit" />
          <Button
            type={"button"}
            children={"Google Sign In"}
            buttonType={"google"}
            onClick={googleSignIn}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
