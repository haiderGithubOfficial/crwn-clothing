import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component";
const Directory = ({ directoryItems }) => {
  return (
    <div className="directory-container">
      {directoryItems.map((directoryItem) => {
        return (
          <DirectoryItem key={directoryItem.id} directoryItem={directoryItem} />
        );
      })}
    </div>
  );
};

export default Directory;
