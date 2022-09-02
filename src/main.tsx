import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "~/components/App";
import Player from "~/components/Player";
import About from "~/components/About";
import Help from "~/components/Help";
import Account from "~/components/Account";
import Compose from "~/components/Compose";
import ScoreList from "~/components/ScoreList";
import NotFound from "~/components/NotFound";

import "./index.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Player />} />
          <Route path="scores" element={<ScoreList />} />
          <Route path="compose" element={<Compose />} />
          <Route path="help" element={<Help />} />
          <Route path="account" element={<Account />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
