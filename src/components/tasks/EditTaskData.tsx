import { getTaskById } from "@/api/TaskApi";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

export default function EditTaskData() {
  /** get productId**/
  const param = useParams();
  const projectId = param.projectId!;

  /**get taskId **/
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const { data, isError } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
    //retry: false,
  });

  if (isError) return <Navigate to="/" />;
  if (data) return <EditTaskModal data={data} taskId={taskId} />;
}
