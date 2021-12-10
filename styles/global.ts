import { createGlobalStyle } from 'styled-components'

export const GlobalStyle=createGlobalStyle`

:root {
    --primary-color: #40c8f4; //azul
    --secondary-color: #2179b5; //azul-escuro
    --error: #A91919; //vermelho-escuro
}

body {
    font-family: 'IBMPlexSansThaiLooped' !important;
    overflow-x: hidden !important;
}

@font-face {
    font-family: 'IBMPlexSansThaiLooped';
    src: url('/fonts/IBMPlexSansThaiLooped-Light.ttf') format('truetype');
    font-weight: 400;
}

h1,
h2,
h3,
h4,
h5,
p,
span,
strong,
time,
address,
i,
a,
b,
label,
li,
td {
    text-rendering: optimizeLegibility !important;
}

*:focus {
    outline: transparent !important;
}
  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
  }
  a {
    cursor: pointer;
    text-decoration: unset !important;
  }
`