import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthApi";
import { ConfirmToken } from "../types";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data.message);
      setToken("");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <h1 className="text-5xl font-black text-gray-400">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-gray-400 mt-5">
        Ingresa el código que recibiste por el {""}
        <span className=" text-solar-amber font-semibold">
          correo electrónico
        </span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-2">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
            <PinInputField className="w-10 h-10 rounded-lg border-gray-300 border placeholder-white outline-solar-amber text-center" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-token"
          className="text-center text-gray-400 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
