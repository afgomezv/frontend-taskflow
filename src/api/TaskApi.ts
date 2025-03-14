import { isAxiosError } from "axios";
import api from "@/lib/axios";
import { Project, TaskFormData } from "@/types/index";

type TaskAPI = {
  formData: TaskFormData;
  projectId: Project["_id"];
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPI, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data: dataresponse } = await api.post(url, formData);
    const { message } = dataresponse;
    return message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
