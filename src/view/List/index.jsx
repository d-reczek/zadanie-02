import styled from "styled-components";
import ButtonComponent from "./components/ButtonComponent";
import Item from "./components/Item";
import { useCallback, useEffect, useState } from "react";

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

const List = ({ users, setUsers }) => {
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

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleAddUser = () => {
    setUsers(oldArray => [
      ...oldArray,
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
      <p>Pokemons</p>
      {isFetching ? (
        <p>Data is loading</p>
      ) : (
        pokemons.map(pokemon => (
          <Item
            key={pokemon.name}
            id={pokemon.name}
            text={pokemon.name}
            isActive={pokemon.isActive}
            updateData={setUsers}
          />
        ))
      )}
    </ListContainer>
  );
};

export default List;
