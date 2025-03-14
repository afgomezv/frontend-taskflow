import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getProjectById } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";

export default function ProjectDetailsView() {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["EditProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black text-ocean-deep">
          {data.projectName}
        </h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            type="button"
            className="bg-solar-amber hover:bg-solar-amber/70 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            onClick={() => navigate("?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList tasks={data.tasks} />
        <AddTaskModal />
      </>
    );
}
