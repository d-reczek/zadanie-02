import styled from "styled-components";

const Button = styled.button`
  font-size: 2rem;
  padding: 5px;
  border: none;
  flex-grow: 1;

`;

const ButtonComponent = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default ButtonComponent;
