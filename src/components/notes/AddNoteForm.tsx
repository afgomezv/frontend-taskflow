import { useForm } from "react-hook-form";
import { NoteFormData } from "@/types/index";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteApi";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

const initialValues: NoteFormData = {
  content: "",
};

export default function AddNoteForm() {
  const location = useLocation();
  const params = useParams();

  const queryParams = new URLSearchParams(location.search);

  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleAddNote = (formData: NoteFormData) => {
    mutate({ projectId, taskId, formData });
  };

  return (
    <form
      className="space-y-3"
      noValidate
      onSubmit={handleSubmit(handleAddNote)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-bold">
          Crear Notas
        </label>
        <input
          type="text"
          id="content"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300 rounded-lg outline-solar-amber"
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
      </div>
      <button
        type="submit"
        className="bg-solar-amber hover:bg-solar-amber/70 w-full p-3 text-white font-black cursor-pointer rounded-lg"
      >
        Crear Nota
      </button>
    </form>
  );
}
