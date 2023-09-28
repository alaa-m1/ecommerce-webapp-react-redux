import { createGlobalStyle } from "styled-components";

const GlobalStyle= createGlobalStyle`
body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


a {
  text-decoration: none;
}

* {
  box-sizing: border-box;
  color: #000;
}

main {
  padding: 5px;
}

`;

export default GlobalStyle;