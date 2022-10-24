import { async } from "@firebase/util";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGogglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SingIn = () => {
  useEffect(() => {
    const redirect = async () => {
      const { user } = await getRedirectResult(auth);
      const userDocRef = await createUserDocumentFromAuth(user);
      console.log(userDocRef);
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
    </div>
  );
};

export default SingIn;
