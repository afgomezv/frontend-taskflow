import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => {
      toast.success("iniciando sesión");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="text-5xl font-black text-gray-400">Inicio Sesión</h1>
      <p className="text-2xl font-light text-gray-400 mt-5">
        Comienzar ha gestionar tus proyectos {""}
        <span className=" text-solar-amber font-bold"> inicia sesión</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border outline-solar-amber rounded-lg"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border outline-solar-amber rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          className="bg-solar-amber hover:bg-solar-amber/70 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        >
          Iniciar Sesión
        </button>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/register"}
          className="text-center text-gray-400 font-normal"
        >
          ¿No tienes cuenta?
          <span className="text-solar-amber font-bold"> Crea una</span>
        </Link>
        <Link
          to={"/auth/forgot-password"}
          className="text-center text-gray-400 font-normal"
        >
          ¿Olvidaste tu contraseña?
          <span className="text-solar-amber font-bold"> Reestablecer</span>
        </Link>
      </nav>
    </>
  );
}
