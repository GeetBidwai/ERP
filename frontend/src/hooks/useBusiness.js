import { useContext } from "react";
import BusinessContext from "../context/BusinessContext";

export default function useBusiness() {
  return useContext(BusinessContext);
}