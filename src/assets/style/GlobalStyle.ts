import { createGlobalStyle } from "styled-components";

const GlobalStyle= createGlobalStyle`
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Noto Kufi Arabic";
}


a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

main {
  padding: 5px;
}

`;

export default GlobalStyle;