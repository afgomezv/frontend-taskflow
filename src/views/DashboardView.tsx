import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectApi";
import CardProject from "@/components/Projects/CardProject";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black text-ocean-deep">Mis Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Maneja y adminstra tus proyectos
        </p>
        <nav className="my-10">
          <Link
            to="/projects/create"
            className="bg-icewave hover:bg-ocean-deep px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
          >
            Nuevo Proyecto
          </Link>
        </nav>
        {data.length ? (
          data.map((project) => (
            <CardProject key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center py-20">
            No hay proyectos aún{" "}
            <Link to="/projects/create" className="text-solar-amber font-bold">
              Crear Projectos
            </Link>{" "}
          </p>
        )}
      </>
    );
}
