import styled from "styled-components";
import colors from "./colors";

import { mediaQueries } from "./mediaQueries";

export const FormContainer = styled.div`
  width: 95%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 4px ${colors.tertiary};
  margin: 25px auto;

  @media (min-width: ${mediaQueries.large}) {
    width: 60%;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px 3%;
  margin: auto;
`

export const Label =styled.label`
  padding: 0 10px 5px;
`

export const Input = styled.input((props) => ({
  width: "80%",
  margin: "0 0 10px",
  padding: "5px",
  border: props.color + " solid 2px"
}))

export const TextArea = styled.textarea((props) => ({
  padding: "5px",
  minWidth: "75%",
  maxWidth: "90%",
  minHeight: "40%",
  maxHeight: "300px",
  fontFamily: "Lato, sans-serif",
  margin: "0 0 10px",
  border: props.color + " solid 2px"
}))

export const UploadButton = styled.label`
  text-align: center;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: ${colors.primary};
  color: black;
  width: fit-content;
  cursor: pointer;
`

export const InputUploadFile = styled.input((props) => ({
  display: "none"
}))