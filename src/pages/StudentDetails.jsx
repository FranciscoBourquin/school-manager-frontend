import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Button as MUIButton } from "@mui/material";

import { useStudents } from "../context/StudentsContext";
import { Button } from "../components/Button";
import { StudentFormModal } from "../components/StudentFormModal";

export const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getStudentById,
    updateStudent,
    deleteStudent,
    loading,
    error,
  } = useStudents();

  const [student, setStudent] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    (async () => {
      const data = await getStudentById(id);
      if (data) setStudent(data);
    })();
  }, [id]);

  const handleEdit = async (payload) => {
    const ok = await updateStudent(id, payload);

    if (ok) {
      setSnack({ open: true, message: "Estudiante actualizado", severity: "success" });
      setOpenEdit(false);

      const updated = await getStudentById(id);
      if (updated) setStudent(updated);
    } else {
      setSnack({ open: true, message: "Error al actualizar", severity: "error" });
    }
  };

  const askDelete = () => {
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    const ok = await deleteStudent(id);
    setOpenConfirm(false);

    if (ok) {
      setSnack({ open: true, message: "Estudiante eliminado", severity: "success" });

      setTimeout(() => navigate("/students"), 800);
    } else {
      setSnack({ open: true, message: "Error al eliminar", severity: "error" });
    }
  };

  return (
    <main className="flex flex-col gap-4 p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Detalles del Estudiante con ID {id}</h1>

        <div className="flex gap-2">
          <Button onClick={() => setOpenEdit(true)} variantType="edit">
            Editar
          </Button>

          <Button onClick={askDelete} variantType="delete">
            Eliminar
          </Button>

          <Button onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </div>

      {loading && <p className="text-gray-500">Cargando…</p>}

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</p>
      )}

      {student && (
        <section className="bg-white border rounded p-4 space-y-2">
          <p><span className="font-semibold">Nombre: </span>{student.nombre}</p>
          <p><span className="font-semibold">Apellido: </span>{student.apellido}</p>
          <p><span className="font-semibold">Email: </span>{student.email}</p>

          <div>
            <span className="font-semibold">Cursos:</span>
            {student.cursos?.length ? (
              <ul className="list-disc ml-6 mt-2">
                {student.cursos.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            ) : (
              <p className="text-gray-600">Sin cursos</p>
            )}
          </div>
        </section>
      )}

      <StudentFormModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEdit}
        initialValues={student || undefined}
        title="Editar estudiante"
        submitLabel="Guardar cambios"
      />

      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>¿Seguro que querés eliminar este estudiante?</DialogContent>
        <DialogActions>
          <MUIButton onClick={() => setOpenConfirm(false)}>Cancelar</MUIButton>
          <MUIButton color="error" variant="contained" onClick={confirmDelete}>
            Eliminar
          </MUIButton>
        </DialogActions>
      </Dialog>

     <Snackbar
  open={snack.open}
  autoHideDuration={3000}
  onClose={() => setSnack({ ...snack, open: false })}
  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
  sx={{
    mb: 8,               
    ml: 2,               
  }}
>
  <Alert severity={snack.severity} variant="filled">
    {snack.message}
  </Alert>
</Snackbar>


    </main>
  );
}
