import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useStudents } from "../hooks/useStudents";
import { findStudentsByCourseService } from "../services/students.findByCourse";

import imgHistoria from "../assets/courses/historia.jpg";
import imgCiencias from "../assets/courses/ciencias.jpg";
import imgMatematica from "../assets/courses/matematica.jpg";
import imgArte from "../assets/courses/arte.jpg";

const COURSE_IMAGES = {
  historia: imgHistoria,
  ciencias: imgCiencias,
  matematica: imgMatematica,
  arte: imgArte
};

const COURSE_LABELS = {
  historia: "Historia",
  ciencias: "Ciencias",
  matematica: "Matemática",
  arte: "Arte"
};

export const CourseDetails = () => {
  const { id: courseId } = useParams();
  const courseLabel = COURSE_LABELS[courseId];

  const { students, updateStudent } = useStudents();

  const [enrolled, setEnrolled] = useState([]);
  const [listMessage, setListMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  async function loadEnrolled() {
    setLoading(true);
    try {
      const { message, data } = await findStudentsByCourseService(courseLabel);
      setEnrolled(data || []);
      setListMessage(message || "");
    } catch (e) {
      setEnrolled([]);
      setListMessage(e.message || "Error al cargar el curso");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnrolled();
  }, [courseLabel]);

  const availableToAdd = useMemo(() => {
    const ids = new Set(enrolled.map((s) => s._id));
    return students.filter((s) => !ids.has(s._id));
  }, [students, enrolled]);

  const handleRemove = async (student) => {
    const newCourses = (student.cursos || []).filter((c) => c !== courseLabel);
    const result = await updateStudent(student._id, { cursos: newCourses });
    setSnack({
      open: true,
      message: result.ok ? result.message : result.error,
      severity: result.ok ? "success" : "error"
    });
    if (result.ok) loadEnrolled();
  };

  const handleAdd = async (student) => {
    const newCourses = [...(student.cursos || []), courseLabel];
    const result = await updateStudent(student._id, { cursos: newCourses });
    setSnack({
      open: true,
      message: result.ok ? result.message : result.error,
      severity: result.ok ? "success" : "error"
    });
    if (result.ok) loadEnrolled();
  };

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Curso: {courseLabel}</h1>
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          VOLVER
        </Link>
      </div>

      <img
        src={COURSE_IMAGES[courseId]}
        alt={courseLabel}
        className="w-full h-56 object-cover rounded shadow"
      />

      <section>
        <h2 className="text-xl font-bold mb-3">Estudiantes en este curso</h2>

        {loading && <p className="text-gray-500">Cargando…</p>}

        {!loading && enrolled.length === 0 && (
          <p className="text-gray-600">{listMessage || "No hay estudiantes anotados."}</p>
        )}

        <ul className="space-y-3">
          {enrolled.map((s) => (
            <li
              key={s._id}
              className="flex justify-between items-center bg-gray-100 p-3 rounded shadow"
            >
              <span>{s.nombre} {s.apellido}</span>
              <button
                onClick={() => handleRemove(s)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Agregar estudiante al curso</h2>

        {students.length === 0 ? (
          <p className="text-gray-600">No hay estudiantes para agregar.</p>
        ) : availableToAdd.length === 0 ? (
          <p className="text-gray-600">Todos los estudiantes ya están agregados a este curso.</p>
        ) : (
          <ul className="space-y-3">
            {availableToAdd.map((s) => (
              <li
                key={s._id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span>{s.nombre} {s.apellido}</span>
                <button
                  onClick={() => handleAdd(s)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Agregar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{ ml: 2, mb: 8 }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </main>
  );
}
