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
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const modifiedPokemons = data => {
    let newPokemons = [];
    if (data) {
      newPokemons = data
        .map(pokemon => ({
          name: pokemon.name,
          isActive: false,
          url: pokemon.url,
          id: pokemon.name,
          age: randomIntFromInterval(1, 99),
        }))
        .filter(item => item.age >= 18);
    }
    return newPokemons;
  };
  const fetchPokemons = useCallback(async () => {
    try {
      const response = await (
        await fetch("https://pokeapi.co/api/v2/pokemon")
      ).json();
      setPokemons(modifiedPokemons(response.results));
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(true);
    }
  }, []);
  //tutaj eslint sugeruje mi zeby dodaj modifiedPokemons do array dependency ale jak to zrobie to mam niekonczace sie
  // wysylanie zapytan do api, nie wiem dlaczego tak sie dzieje

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
    fetchPokemons();
    setUsers(modifiedData(data));
  }, [fetchPokemons]);

  return (
    <div className="App">
      <Wrapper>
        <List
          isFetching={isFetching}
          pokemons={pokemons}
          users={users}
          setUsers={setUsers}
          setPokemons={setPokemons}
        />
      </Wrapper>
    </div>
  );
}

export default App;
