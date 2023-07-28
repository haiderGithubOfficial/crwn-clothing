import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form-component";
import { AuthContainer } from "./authentication.styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigation = useNavigate();
  useEffect(() => {
    currentUser && navigation("/");
  }, [currentUser]);

  return (
    <AuthContainer>
      <SignInForm />
      <SignUpForm />
    </AuthContainer>
  );
};

export default Authentication;
