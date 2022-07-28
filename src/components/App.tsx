import { useState, useEffect, Suspense } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
import pianoo from "~/core/pianoo";
import useTheme from "~/hooks/useTheme";
import { PlayerProvider } from "~/contexts/PlayerContext";

type PianooStatus = "idle" | "ready" | "error";

export function usePianooStatus() {
  return useOutletContext<PianooStatus>();
}

function App() {
  const { theme, changeTheme } = useTheme();
  const [pianooStatus, setPianooStatus] = useState<PianooStatus>("idle");

  useEffect(() => {
    pianoo.init()
      .then(() => setPianooStatus("ready"))
      .catch(() => setPianooStatus("error"));
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div data-theme={theme} className="bg-theme-bg">
        <div className="m-auto px-4 py-6 max-w-6xl h-screen
          flex flex-col justify-between text-theme-text">
          <Header />
          <main className="w-full">
            <PlayerProvider>
              <Outlet context={pianooStatus} />
            </PlayerProvider>
          </main>
          <Footer theme={theme} changeTheme={changeTheme} />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
