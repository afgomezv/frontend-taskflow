import { Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, Transition } from "@headlessui/react";
import { TaskFormData } from "@/types/index";
import TaskForm from "./TaskForm";
import { createTask } from "@/api/TaskApi";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const navigate = useNavigate();

  /** read if modal exist **/
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTaks = queryParams.get("newTask");
  const show = modalTaks ? true : false;

  /** get projectId **/
  const params = useParams();
  const projectId = params.projectId!;

  const initialValues: TaskFormData = {
    name: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["EditProject", projectId] });
      toast.success(data);
      reset();
      navigate(location.pathname, { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId,
    };
    mutate(data);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            navigate(location.pathname, { replace: true });
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <Dialog.Title
                    as="h3"
                    className="font-black text-ocean-deep text-4xl  my-5"
                  >
                    Nueva Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-icewave">una tarea</span>
                  </p>
                  <form
                    className="mt-10 space-y-3"
                    noValidate
                    onSubmit={handleSubmit(handleCreateTask)}
                  >
                    <TaskForm register={register} errors={errors} />
                    <button
                      type="submit"
                      className="bg-solar-amber hover:bg-solar-amber/70 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg"
                    >
                      Guardar Tarea
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
