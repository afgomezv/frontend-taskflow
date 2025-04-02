import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="font-black text-center text-4xl text-gray-400 capitalize">
        página no encontrada
      </h1>
      <p className="mt-10 text-gray-400">
        Tal vez quieras volver a{" "}
        <Link to={"/"} className="text-solar-amber">
          proyectos
        </Link>
      </p>
    </>
  );
}
