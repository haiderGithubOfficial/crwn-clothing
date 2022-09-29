import { async } from "@firebase/util";
import { signInWithGogglePopup } from "../../utils/firebase/firebase.utils";

const SingIn = () => {
  const logUserIn = async () => {
    const response = await signInWithGogglePopup();
    console.log(response);
  };
  return (
    <div>
      <button onClick={logUserIn}>Sign In with Goggle</button>
    </div>
  );
};

export default SingIn;
