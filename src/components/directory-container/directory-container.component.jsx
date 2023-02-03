import { DirectoryContainer } from "./directory.styles.jsx";
import { Link } from "react-router-dom";
import DirectoryItem from "../directory-item/directory-item.component";
const Directory = ({ directoryItems }) => {
  return (
    <DirectoryContainer>
      {directoryItems.map((directoryItem) => {
        return (
          <Link className="lofo" to={`/shop/${directoryItem.title}`}>
            <DirectoryItem
              key={directoryItem.id}
              directoryItem={directoryItem}
            />
          </Link>
        );
      })}
    </DirectoryContainer>
  );
};

export default Directory;
