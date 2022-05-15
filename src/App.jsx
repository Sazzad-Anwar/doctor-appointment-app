import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./screens/Home";
import styled from "styled-components";
import RootRoute from "./screens/RootRoute";
import Error from "./components/Error";

export const AppRoot = styled.div`
  height: 100%;
  width: 100%;
  padding: 2rem 5%;
  overflow: auto;
  font-family: "Poppins", sans-serif !important;
  @media (max-width: 1600px) {
    padding: 1rem 2%;
  }
  @media (max-width: 1200px) {
    padding: 2rem 1%;
  }
`;

export default function App() {
  return (
    <AppRoot>
      <Routes>
        <Route path="error" element={<Error />} />
        <Route path="/year/:year/month/:month" element={<Home />} />
        <Route path="/" element={<RootRoute />} />
      </Routes>
    </AppRoot>
  );
}
