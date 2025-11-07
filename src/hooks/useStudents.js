import { useContext } from "react";
import { StudentsContext } from "../context/StudentsContext";

export const useStudents = () => useContext(StudentsContext);
