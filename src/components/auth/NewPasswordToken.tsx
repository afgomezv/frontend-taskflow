import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { validateToken } from "@/api/AuthApi";
import { toast } from "react-toastify";

type NewPasswordTokenProps = {
  token: ConfirmToken["token"];
  setToken: Dispatch<SetStateAction<string>>;
  setIsValidToken: Dispatch<SetStateAction<boolean>>;
};

export default function NewPasswordToken({
  token,
  setToken,
  setIsValidToken,
}: NewPasswordTokenProps) {
  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const { mutate } = useMutation({
    mutationFn: validateToken,
    onSuccess: (data) => {
      toast.success(data.message);
      setIsValidToken(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <form className="space-y-8 p-10 rounded-lg bg-white mt-10">
        <label className="font-normal text-2xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
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
          to="/auth/forgot-password"
          className="text-center text-gray-400 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
