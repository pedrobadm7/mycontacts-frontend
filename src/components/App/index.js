import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "../../assets/styles/global";
import defaultTheme from "../../assets/styles/themes/default";

import Header from "../Header";
import Routes from "../../routes";
import * as S from "./styles";

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyles />

                <S.Container>
                    <Header />
                    <Routes />
                </S.Container>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
