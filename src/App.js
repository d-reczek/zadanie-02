import { useCallback, useEffect, useState } from "react";
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

  const [isFetching, setIsFetching] = useState(true);
  const [pokemons, setPokemons] = useState(null);
  const fetchPokemons = useCallback(() => {
    const fetchData = async () => {
      try {
        const response = await (
          await fetch("https://pokeapi.co/api/v2/pokemon")
        ).json();
        setPokemons(response.results);
        console.log(pokemons);
        setIsFetching(false);
      } catch (err) {
        console.log(err);
        setIsFetching(true);
      }
    };
    fetchData();
  }, [pokemons]);

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
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Wrapper>
        <List
          isFetching={isFetching}
          pokemons={pokemons}
          users={users}
          setUsers={setUsers}
        />
      </Wrapper>
    </div>
  );
}

export default App;
