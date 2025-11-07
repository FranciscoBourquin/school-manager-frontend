import { createContext, useContext, useState, useEffect } from "react";
import { getStudentsService } from "../services/students.getAll";
import { getStudentByIdService } from "../services/students.getById";
import { createStudentService } from "../services/students.create";
import { deleteStudentService } from "../services/students.delete";
import { updateStudentService } from "../services/students.update";

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const list = await getStudentsService();
      setStudents(list);
    } catch (err) {
      setError(err.message || "Error loading students");
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (data) => {
    try {
      await createStudentService(data);
      loadStudents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await deleteStudentService(id);
      loadStudents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateStudent = async (id, data) => {
    try {
      await updateStudentService(id, data);
      loadStudents();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const getStudentById = async (id) => {
    try {
      return await getStudentByIdService(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <StudentsContext.Provider
      value={{
        students,
        loading,
        error,
        setError,
        loadStudents,
        addStudent,
        deleteStudent,
        updateStudent,
        getStudentById,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

