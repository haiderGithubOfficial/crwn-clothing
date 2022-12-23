import "./directory-item.style.scss";

const DirectoryItem = ({ directoryItem }) => {
  const { title, imageUrl } = directoryItem;
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="directory-item-body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
