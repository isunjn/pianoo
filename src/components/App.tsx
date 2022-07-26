import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
import useTheme from "~/hooks/useTheme";
import { PlayerProvider } from "~/contexts/PlayerContext";

function App() {
  const { theme, changeTheme } = useTheme();

  return (
    <Suspense fallback={<Loading />}>
      <div data-theme={theme} className="bg-theme-bg">
        <div className="m-auto px-4 py-6 max-w-6xl h-screen
          flex flex-col justify-between text-theme-text">
          <Header />
          <main className="w-full">
            <PlayerProvider>
              <Outlet />
            </PlayerProvider>
          </main>
          <Footer theme={theme} changeTheme={changeTheme} />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
