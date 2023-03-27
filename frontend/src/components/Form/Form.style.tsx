import styled from "styled-components";

export const FormTitle = styled.h1`
  font-size: 3rem;
  margin-top: 50px;
  /* color: #fff; */
`;

export const FormContainer = styled.form`
  font-family: "Edu NSW ACT Foundation", cursive;
  background-color: #eee;
  padding: 30px;
  border-radius: 10px;

  button {
    margin-top: 10px;
  }
`;

export const InputContainer = styled.div`
  width: 65%;
  margin: 0 auto;
  height: 65vh;

  button {
    background-color: rgb(40 38 38);
    font-family: "Edu NSW ACT Foundation", cursive;
    font-weight: 800;
    :hover {
      background-color: #000;
    }
  }
`;
