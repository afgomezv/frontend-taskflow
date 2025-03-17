import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
  return (
    <>
      <section>
        <div className="bg-white py-10 px-4 w-[500px] mx-auto shadow-lg rounded-xl mt-12">
          <div className="flex justify-center">
            <Logo />
          </div>
          <div className="mt-4">
            <Outlet />
          </div>
        </div>
      </section>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
