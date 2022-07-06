import { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "./data/data";
import List from "./view/List";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  font-size: 2rem;
`;
function App() {
  const [users, setUsers] = useState([]);
  const modifiedData = data => {
    const array = Object.entries(data)
      .map(([key, value]) => ({
        id: key,
        isActive: false,
        ...value,
      }))
      .filter(item => item.age >= 18);

    const newData = array.map(({ age, ...rest }) => {
      return rest;
    });
    return newData;
  };
  useEffect(() => {
    setUsers(modifiedData(data));
  }, []);

  return (
    <div className="App">
      <Wrapper>
        <List users={users} setUsers={setUsers} />
      </Wrapper>
    </div>
  );
}

export default App;
