import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Calculator from './pages/calculator/calculator';
import Navbar from './components/navbar/navbar';
import Settings from './pages/settings/settings';
import Manual from './pages/manual/manual';
import About from './pages/about/about';
import Protocol from './pages/protocol/protocol';
import GlobalStyle from './globalStyles';
import useSessionStore from './stores/session-store/use-session-store';

function App() {
  const fontSize = useSessionStore((state) => state.interfaceFontSize);
  const theme = useSessionStore((state) => state.theme);

  return (
    <BrowserRouter>
      <GlobalStyle fontSize={fontSize} theme={theme} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Calculator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/about" element={<About />} />
        <Route path="/protocol" element={<Protocol />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
