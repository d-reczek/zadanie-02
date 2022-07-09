import styled from "styled-components";
import ButtonComponent from "../ButtonComponent";

const LiContainer = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 2rem;
  background-color: ${prop => (prop.isActive ? "red" : "none")};
  list-style-type: none;
  padding: 10px;
`;
const Text = styled.p`
  margin: 0;
`;
const Item = ({ text, updateData, id, isActive }) => {


  const handleToggle = id => {
    updateData(oldArray =>
      oldArray.map(user => {
        if (user.id === id) {
          return { ...user, isActive: !user.isActive };
        }
        return user;
      })
    );
  };
  const handleDelete = id => {
    updateData(oldArray => oldArray.filter(user => user.id !== id));
    alert(`User ${text} deleted`);
  };

  return (
    <LiContainer isActive={isActive}>
      <Text>{text}</Text>
      <ButtonComponent onClick={() => handleToggle(id)}>Toggle</ButtonComponent>
      <ButtonComponent onClick={() => handleDelete(id)}>Delete</ButtonComponent>
    </LiContainer>
  );
};

export default Item;
