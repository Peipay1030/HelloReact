import { StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Detail from "./TaskDetail";
import Home from "./TaskHome";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<App />} />
      <Route path="/todo/:id" element={<Detail />} />
    </Routes>
  </Router>
);

const root = document.getElementById("root");

render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
  root,
);
