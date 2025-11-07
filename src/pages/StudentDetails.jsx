import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, Button as MUIButton } from "@mui/material";
import { useStudents } from "../hooks/useStudents";

export const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getStudentById, deleteStudent, error } = useStudents();

  const [student, setStudent] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [openConfirm, setOpenConfirm] = useState(false);

  const load = async () => {
    const data = await getStudentById(id);
    if (data) setStudent(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteStudent(id);
    setOpenConfirm(false);

    if (result.ok) {
      setSnack({ open: true, message: result.message, severity: "success" });
      setTimeout(() => navigate("/students"), 4000);
    } else {
      setSnack({ open: true, message: result.error || error, severity: "error" });
    }
  };

  if (!student) return <p className="p-6 text-center">Cargando...</p>;

  return (
    <main className="max-w-3xl mx-auto p-6 flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles del Estudiante con ID {id}</h1>

        <Link
          to="/students"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          VOLVER
        </Link>
      </div>

      <div className="bg-gray-100 p-4 rounded shadow">
        <p><strong>Nombre:</strong> {student.nombre}</p>
        <p><strong>Apellido:</strong> {student.apellido}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Cursos:</strong> {student.cursos?.join(", ") || "Ninguno"}</p>
      </div>

      <button
        onClick={() => setOpenConfirm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Eliminar
      </button>

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>¿Seguro que querés eliminar este estudiante?</DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setOpenConfirm(false)}>Cancelar</MUIButton>
          <MUIButton color="error" variant="contained" onClick={handleDelete}>
            Eliminar
          </MUIButton>
        </DialogActions>
      </Dialog>

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
