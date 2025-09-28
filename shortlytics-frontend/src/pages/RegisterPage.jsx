import { useState } from "react";
import toast from "react-hot-toast";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import api from "../api/api";
import TextField from "../components/TextField";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", data);
      reset();
      navigate("/login");
      toast.success("Registered successfully! Please login.");
    } catch (error) {
      reset();
      toast.error("Registration failed. Please try again.", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
      >
        <Link to="/" className="flex justify-center items-center gap-1">
          <img src="/images/img1.png" className="w-[50px]" />
          <h1 className="font-bold text-blue-700 text-3xl italic">
            Shortlytics
          </h1>
        </Link>
        <p className="text-sm text-center font-semibold text-gray-600 mt-3">
          Please enter your details to register
        </p>
        <hr className="mt-2 mb-5 text-gray-400" />

        <div className="flex flex-col gap-3">
          <TextField
            label="UserName"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Email"
            required
            id="email"
            type="email"
            message="*Email is required"
            placeholder="Type your email"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          type="submit"
          className="font-semibold text-white text-lg bg-custom-gradient w-full py-2 rounded-sm mt-5 cursor-pointer"
        >
          {loader ? "Loading..." : "Register"}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          Already have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/login"
          >
            <span className="text-btnColor"> Login</span>
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default RegisterPage;
