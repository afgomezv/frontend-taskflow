import { deleteNote } from "@/api/NoteApi";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/index";
import { Button } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
  const { data, isLoading } = useAuth();
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  const location = useLocation();
  const params = useParams();
  const queryParams = new URLSearchParams(location.search);
  const projectId = params.projectId!;
  const taskId = queryParams.get("viewTask")!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) return "Cargando...";

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-lg"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
