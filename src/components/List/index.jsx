import styled from "styled-components";
import ButtonComponent from "./components/ButtonComponent";
import Item from "./components/Item";
const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

const List = ({ users, setUsers }) => {
  const handleAddUser = () => {
    setUsers(arr => [
      ...arr,
      {
        id: performance.now(),
        name: "Jan",
        surname: "Kowalski",
        isActive: false,
      },
    ]);
  };
  return (
    <ListContainer>
      <ButtonComponent onClick={handleAddUser}>Add User</ButtonComponent>
      {users.map(user => (
        <Item
          key={user.id}
          id={user.id}
          text={`${user.name} ${user.surname}`}
          isActive={user.isActive}
          updateData={setUsers}
       
        />
      ))}
    </ListContainer>
  );
};

export default List;
