import { async } from "@firebase/util";
import { signInWithGogglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SingIn = () => {
  const logUserIn = async () => {
    const { user } = await signInWithGogglePopup();
    createUserDocumentFromAuth(user);
  };
  return (
    <div>
      <button onClick={logUserIn}>Sign In with Goggle</button>
    </div>
  );
};

export default SingIn;
