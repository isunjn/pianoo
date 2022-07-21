import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { ThemeKind } from "~/config/theme";

function App() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useState<ThemeKind>(prefersDark ? "dark" : "light");

  return (
    <div data-theme={theme} className="bg-theme-bg">
      <div className="m-auto px-4 py-6 max-w-5xl h-screen
        flex flex-col justify-between text-theme-text">
        <Header />
        <main className="w-full">
          <Outlet />
        </main>
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}

export default App;
