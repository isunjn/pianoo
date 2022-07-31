import { useState, useEffect, Suspense } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import Loading from "~/components/Loading";
import pianoo from "~/core/pianoo";
import { PlayerProvider } from "~/contexts/PlayerContext";

type PianooStatus = "idle" | "ready" | "error";

export function usePianooStatus() {
  return useOutletContext<PianooStatus>();
}

function App() {
  const [pianooStatus, setPianooStatus] = useState<PianooStatus>("idle");

  useEffect(() => {
    pianoo
      .init()
      .then(() => setPianooStatus("ready"))
      .catch(() => setPianooStatus("error"));
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div
        className="mx-auto px-4 max-w-6xl h-screen
        flex flex-col justify-between"
      >
        <Header />
        <main className="w-full">
          <PlayerProvider>
            <Outlet context={pianooStatus} />
          </PlayerProvider>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
