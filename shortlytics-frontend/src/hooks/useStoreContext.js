import { useContext } from "react";
import { ContextApi } from "../context/ContextApi";

export const useStoreContext = () => {
  const context = useContext(ContextApi);
  return context;
};
