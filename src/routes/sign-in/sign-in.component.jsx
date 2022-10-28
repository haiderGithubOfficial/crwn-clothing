import { async } from "@firebase/util";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import {
  auth,
  signInWithGogglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SingIn = () => {
  useEffect(() => {
    const redirect = async () => {
      try {
        const { user } = await getRedirectResult(auth);
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef);
      } catch (error) {}
    };
    redirect();
  }, []);
  const logUserIn = async () => {
    const { user } = await signInWithGogglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(userDocRef);
  };

  return (
    <div>
      <button onClick={logUserIn}>Sign In with Goggle</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In with Goggle Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SingIn;
