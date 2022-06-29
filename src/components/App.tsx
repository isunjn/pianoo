import { Outlet } from "react-router-dom";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

function App() {
  return (
    <div className="m-auto px-4 py-6 max-w-4xl h-screen flex flex-col justify-between text-[#eaf1f3]">
      <Header />
      <main className="mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
