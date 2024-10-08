import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { axiosInstance } from "../lib/axios";

const LoginScheme = z.object({
  username: z.string().min(4, { message: "Username harus memiliki minimal 4 karakter" }),
  password: z.string().min(6, { message: "Password harus memiliki minimal 6 karakter" }),
});

const LoginSection = () => {
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginScheme),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("auth/login", {
        username: data.username,
        password: data.password,
      });

      const token = response.data.data.token;
      localStorage.setItem("token", token);
      toast.success("Login Berhasil!!!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Jika ada respons dari server, kita cek statusnya
        if (error.response.status === 401 || error.response.status === 500) {
          toast.error("Username atau password salah");
        } else {
          toast.error("Terjadi kesalahan tidak terduga");
        }
      } else {
        // Jika tidak ada response sama sekali, ini bisa berarti kesalahan jaringan
        toast.error("Tidak dapat terhubung ke server. Periksa koneksi jaringan Anda.");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (showNotification) {
      toast.success(
        <div className="gap-2 flex flex-col">
          <p className="font-bold text-lg">Akun demo: </p>
          <p>Username: admin </p>
          <p>Password: password </p>
        </div>,
        { position: "top-left" }
      );
    }
  }, [showNotification]);

  return (
    <div className="flex flex-col justify-center items-center bg-black-500 h-screen">
      <div className="p-10  h-max w-96 flex flex-col justify-center items-center rounded-xl gap-5 ">
        <h1 className="font-bold text-black text-2xl text-left w-96 ">SILAHKAN MASUK UNTUK MEMULAI </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-max w-96 flex flex-col gap-7 justify-center items-center">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => {
              return <Input {...field} variant="bordered" color="primary" type="text" label="Username" className="shadow-2xl  rounded-xl" isInvalid={Boolean(fieldState.error)} errorMessage={fieldState.error?.message} />;
            }}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => {
              return <Input {...field} isInvalid={Boolean(fieldState.error)} color="primary" errorMessage={fieldState.error?.message} variant="bordered" type="password" label="Password" className="shadow-2xl" />;
            }}
          />

          <Button type="submit" color="primary" className="w-full">
            Masuk
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;
