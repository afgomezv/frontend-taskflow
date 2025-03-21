import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUserToProject } from "@/api/TeamApi";
import { TeamMember } from "@/types/index";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleAddUserToProject = () => {
    const data = {
      projectId,
      id: user._id,
    };

    mutate(data);
  };

  return (
    <>
      <p className="mt-10 text-center">Resultado:</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
          className="text-solar-amber hover:bg-solar-amber/10 px-10 py-3 font-bold cursor-pointer rounded-lg"
          onClick={handleAddUserToProject}
        >
          Agregar Proyecto
        </button>
      </div>
    </>
  );
}
