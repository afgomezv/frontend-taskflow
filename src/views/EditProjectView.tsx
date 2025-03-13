import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getProjectById } from "@/api/ProjectApi";
import EditProjectForm from "@/components/Projects/EditProjectForm";

export default function EditProjectView() {
  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["EditProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <Navigate to="/404" />;
  if (data) return <EditProjectForm data={data} projectId={projectId} />;
}
