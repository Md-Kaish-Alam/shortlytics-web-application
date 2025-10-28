import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import Tooltip from "@mui/material/Tooltip";

import api from "../../api/api";
import TextField from "../TextField";
import { useStoreContext } from "../../hooks/useStoreContext";

const CreateShortUrlForm = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setIsLoading(true);
    try {
      const { data: res } = await api.post("api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const shortUrl = `${
        import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`
      }`;
      navigator.clipboard.writeText(shortUrl).then(() => {
        toast.success("Short URL created and copied to clipboard!", {
          position: "bottom-center",
          className: "mb-5",
          duration: 5000,
        });
      });
      await refetch();
    } catch (error) {
      toast.error("Creating short URL failed. Please try again.", error);
    } finally {
      setIsLoading(false);
      reset();
      setOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white rounded-md">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >
        <h1 className="font-montserrat sm:mt-0 mt-3 text-center font-bold sm:text-2xl text-[22px] text-slate-800">
          Create Short URL
        </h1>
        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />
        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="URL is required"
            register={register}
            errors={errors}
          />
        </div>
        <button
          className="bg-custom-gradient-2 font-semibold text-white w-32 py-2 transition-colors rounded-md my-3"
          type="text"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>

        {!isLoading && (
          <Tooltip title="Close">
            <button
              disabled={isLoading}
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 bg-red-500 p-1 rounded-md"
            >
              <RxCross2 className="text-white text-lg" />
            </button>
          </Tooltip>
        )}
      </form>
    </div>
  );
};

export default CreateShortUrlForm;
