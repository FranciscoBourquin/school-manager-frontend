import { createContext, useState, useEffect } from "react";

import { getStudentsService } from "../services/students.getAll";
import { getStudentByIdService } from "../services/students.getById";
import { createStudentService } from "../services/students.create";
import { deleteStudentService } from "../services/students.delete";
import { updateStudentService } from "../services/students.update";

export const StudentsContext = createContext();

export const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const { message, data } = await getStudentsService();
      setStudents(data);
      setMessage(message);
    } catch (err) {
      setError(err.message);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (payload) => {
    setError("");
    try {
      const { message } = await createStudentService(payload);
      await loadStudents();
      return { ok: true, message };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const deleteStudent = async (id) => {
    setError("");
    try {
      const { message } = await deleteStudentService(id);
      await loadStudents();
      return { ok: true, message };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const updateStudent = async (id, payload) => {
    setError("");
    try {
      const { message } = await updateStudentService(id, payload);
      await loadStudents();
      return { ok: true, message };
    } catch (err) {
      return { ok: false, error: err.message };
    }
  };

  const getStudentById = async (id) => {
    setError("");
    try {
      const { message, data } = await getStudentByIdService(id);
      setMessage(message);
      return data;
    } catch (err) {
      setError(err.message);
      setMessage("");
      return null;
    }
  };

  useEffect(() => { loadStudents(); }, []);

  return (
    <StudentsContext.Provider
      value={{
        students,
        message,
        error,
        loading,
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
};
