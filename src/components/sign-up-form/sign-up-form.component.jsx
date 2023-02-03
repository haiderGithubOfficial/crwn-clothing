import { async } from "@firebase/util";
import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../Button/Button.component";
import { UserContext } from "../../contexts/user.context";
import { SignUpContainer } from "./sign-up-form.styles.jsx";

const SignUpForm = () => {
  const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const { setCurrentUser } = useContext(UserContext);
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
      console.log("in signup1");
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      createUserDocumentFromAuth(user, { displayName });
      console.log("in signup2");
      setCurrentUser(user);
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <SignUpContainer>
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
    </SignUpContainer>
  );
};

export default SignUpForm;
