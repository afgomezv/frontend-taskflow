import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <>
      <header className="bg-white py-5 shadow">
        <div className="max-w-screen-2xl mx-auto flex lg:flex-row justify-between items-center">
          <div className="ml-8">
            <Logo />
          </div>
          <div className="pr-8">
            <NavMenu />
          </div>
        </div>
        <nav></nav>
      </header>
      <main className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet />
      </main>
      <footer className="bg-white text-gray-600 text-sm text-center py-5">
        <p>
          Todos los derechos reservados &copy; {new Date().getFullYear()}{" "}
          TaskFlow
        </p>
      </footer>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
