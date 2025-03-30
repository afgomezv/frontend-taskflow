import { useState } from "react";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { ConfirmToken } from "../types";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-gray-400">
        Reestablecer Contraseña
      </h1>
      <p className="text-2xl font-light text-gray-400 mt-5">
        Ingresa el código que recibiste por {""}
        <span className=" text-solar-amber font-bold"> correo electrónico</span>
      </p>
      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
}
