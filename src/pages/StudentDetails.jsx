import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Button as MUIButton,
} from "@mui/material";

import { Button } from "../components/Button";
import { useStudents } from "../hooks/useStudents";

export const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getStudentById, deleteStudent } = useStudents();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await getStudentById(id);
      setStudent(data);
      setLoading(false);
    };
    load();
  }, [id, getStudentById]);

  const onDelete = async () => {
    setOpenConfirm(false);
    const ok = await deleteStudent(id);
    if (ok) {
      setSnack({
        open: true,
        message: "Estudiante eliminado",
        severity: "success",
      });
      setTimeout(() => navigate("/students"), 2200);
    } else {
      setSnack({
        open: true,
        message: "Error al eliminar",
        severity: "error",
      });
    }
  };

  return (
    <main className="p-4 sm:p-6">
      <div className="mx-auto w-full max-w-3xl">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Detalles del Estudiante
            </h1>
            <span className="mt-1 inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
              ID: {id}
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variantType="details"
              className="w-full sm:w-auto"
              onClick={() => navigate(`/students/${id}/edit`)}
            >
              Editar
            </Button>

            <Button
              variantType="delete"
              className="w-full sm:w-auto"
              onClick={() => setOpenConfirm(true)}
            >
              Eliminar
            </Button>

            <Button
              variantType="secondary"
              className="w-full sm:w-auto"
              onClick={() => navigate(-1)}
            >
              Volver
            </Button>
          </div>
        </div>

        <section className="mt-4 rounded border bg-white p-4">
          {loading && <p className="text-gray-500">Cargando...</p>}

          {!loading && student && (
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Nombre:</span>{" "}
                {student.nombre}
              </p>
              <p>
                <span className="font-semibold">Apellido:</span>{" "}
                {student.apellido}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {student.email}
              </p>
              <div>
                <span className="font-semibold">Cursos:</span>
                <ul className="ml-5 list-disc">
                  {(student.cursos || []).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>
      </div>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Seguro que querés eliminar este estudiante?
        </DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setOpenConfirm(false)}>Cancelar</MUIButton>
          <MUIButton color="error" variant="contained" onClick={onDelete}>
            Eliminar
          </MUIButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{ mb: 8, ml: 2 }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </main>
  );
};
