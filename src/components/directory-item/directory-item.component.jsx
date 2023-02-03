import {
  DirectoryItemContainer,
  Body,
  BackgroundImage,
} from "./directory-item.style.jsx";
const DirectoryItem = ({ directoryItem }) => {
  const { title, imageUrl } = directoryItem;
  return (
    <DirectoryItemContainer>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>shop now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
