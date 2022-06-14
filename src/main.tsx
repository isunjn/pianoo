import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "~/components/App";
import Player from "~/components/Player";
import About from "~/components/About";
import Compose from "~/components/Compose";
import ScoreList from "~/components/ScoreList";
import NotFound from "~/components/NotFound";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Player />} />
          <Route path="list" element={<ScoreList />} />
          <Route path="compose" element={<Compose />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
