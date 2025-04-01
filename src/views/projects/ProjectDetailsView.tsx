import { useMemo } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getFullProject } from "@/api/ProjectApi";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";

export default function ProjectDetailsView() {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["EditProject", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });

  const cantEdit = useMemo(() => data?.manager === user?._id, [data, user]);

  if (isLoading && authLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black text-ocean-deep">
          {data.projectName}
        </h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              type="button"
              className="bg-solar-amber hover:bg-solar-amber/70 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
              onClick={() => navigate(location.pathname + "?newTask=true")}
            >
              Agregar Tarea
            </button>
            <Link
              to={"team"}
              className="bg-solar-amber hover:bg-solar-amber/70 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded-lg"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.tasks} canEdit={cantEdit} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
}
