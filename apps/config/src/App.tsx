import React from "react";
import styled, { ThemeProvider } from "styled-components";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import GlobalStyle from "@components/global-styles/global-styles";
import Imprint from "./pages/imprint/imprint";
import { Provider } from "react-redux";
import configStore from "@stores/config-store";

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Provider store={configStore}>
      <ThemeProvider theme={{ type: "light" }}>
        <GlobalStyle boldFont={false} fontSize="normal" />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/imprint" element={<Imprint />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
