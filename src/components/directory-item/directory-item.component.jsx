import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from "./directory-item.style.jsx";
const DirectoryItem = ({ directoryItem }) => {
  const { title, imageUrl } = directoryItem;
  return (
    <DirectoryItemContainer key={directoryItem.id + 2}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
