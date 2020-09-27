import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    a {
        text-decoration:none;
        color: inherit;
    }
    input {
        outline: none; 
    }
    button {
        outline: none; 
        font-size: 20px;
    }
    * {
        box-sizing:border-box;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
        font-size: 14px;
    }
`;

export default GlobalStyle;
