import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
    reset();
  };

  return (
    <>
      <h1 className="text-5xl font-black text-gray-500">Crear Cuenta</h1>
      <p className="text-2xl font-light text-gray-400 mt-5">
        Llena el formulario para {""}
        <span className=" text-solar-amber font-bold"> crear tu cuenta</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="px-4  space-y-2 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border  outline-solar-amber rounded-lg"
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

        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl">Nombre</label>
          <input
            type="name"
            placeholder="Nombre de Registro"
            className="w-full p-3  border-gray-300 border  outline-solar-amber rounded-lg"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl">Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña de Registro"
            className="w-full p-3  border-gray-300 border  outline-solar-amber rounded-lg"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-normal text-2xl">Confirmar Contraseña</label>

          <input
            id="password_confirmation"
            type="password"
            placeholder="Confirmar contraseña de Registro"
            className="w-full p-3  border-gray-300 border  outline-solar-amber rounded-lg"
            {...register("password_confirmation", {
              required: "Confirmar contraseña es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />

          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
        <button
          type="submit"
          className="bg-solar-amber hover:bg-solar-amber/70 w-full mt-4 p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
        >
          Registrarme
        </button>
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={"/auth/login"}
          className="text-center text-gray-300 font-normal"
        >
          ¿Ya tienes cuenta?
          <span className="text-solar-amber font-bold"> Iniciar Sesión</span>
        </Link>
      </nav>
    </>
  );
}
