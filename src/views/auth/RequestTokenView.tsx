import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { RequestConfirmationCodeForm } from "../types";
import { useMutation } from "@tanstack/react-query";
import { requestToken } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function RequestTokenView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestToken,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-3xl font-black text-gray-400">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-2xl font-light text-gray-400 mt-5">
        Coloca tu e-mail para recibir {""}
        <span className=" text-solar-amber font-bold"> un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3 rounded-lg border-gray-300 border outline-solar-amber"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="bg-solar-amber hover:bg-solar-amber/70 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        >
          Enviar Código
        </button>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-400 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-400 font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
