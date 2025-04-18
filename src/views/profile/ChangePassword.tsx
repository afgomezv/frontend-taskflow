import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { UpdateCurrentUserPasswordForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { changePassowrd } from "@/api/ProfileApi";
import { toast } from "react-toastify";

export default function ChangePasswordView() {
  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const { mutate } = useMutation({
    mutationFn: changePassowrd,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
    onError: (error) => toast.error(error.message),
  });

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => {
    mutate(formData);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-black ">Cambiar Password</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Utiliza este formulario para cambiar tu password
        </p>

        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className=" mt-14 space-y-5 bg-white shadow-lg p-10 rounded-lg"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label
              className="text-sm uppercase font-bold"
              htmlFor="current_password"
            >
              Password Actual
            </label>
            <input
              id="current_password"
              type="password"
              placeholder="Password Actual"
              className="w-full p-3  border border-gray-200  outline-solar-amber rounded-lg"
              {...register("current_password", {
                required: "El password actual es obligatorio",
              })}
            />
            {errors.current_password && (
              <ErrorMessage>{errors.current_password.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              Nuevo Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Nuevo Password"
              className="w-full p-3  border border-gray-200  outline-solar-amber rounded-lg"
              {...register("password", {
                required: "El Nuevo Password es obligatorio",
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
          <div className="mb-5 space-y-3">
            <label
              htmlFor="password_confirmation"
              className="text-sm uppercase font-bold"
            >
              Repetir Password
            </label>

            <input
              id="password_confirmation"
              type="password"
              placeholder="Repetir Password"
              className="w-full p-3  border border-gray-200  outline-solar-amber rounded-lg"
              {...register("password_confirmation", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Los Passwords no son iguales",
              })}
            />
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          <button
            type="submit"
            className="bg-solar-amber hover:bg-solar-amber/70 w-full p-3  text-white font-black  text-xl cursor-pointer rounded-lg"
          >
            Guardar Password
          </button>
        </form>
      </div>
    </>
  );
}
