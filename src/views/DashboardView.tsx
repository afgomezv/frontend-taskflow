import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <h1 className="text-5xl font-black text-ocean-deep">Mis Proyectos</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Maneja y adminstra tus proyectos
      </p>
      <nav className="my-5">
        <Link
          to="/projects/create"
          className="bg-icewave hover:bg-ocean-deep px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
        >
          Nuevo Proyecto
        </Link>
      </nav>
    </>
  );
}
