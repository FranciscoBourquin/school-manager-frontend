import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, Button as MUIButton } from "@mui/material";
import { Button } from "../components/Button";
import { StudentFormModal } from "../components/StudentFormModal";
import { useStudents } from "../hooks/useStudents";
import { useNavigate } from "react-router-dom";

export const Students = () => {
  const {
    students,
    loading,
    error,
    message,
    addStudent,
    deleteStudent,
  } = useStudents();

  const navigate = useNavigate();

  const [openAdd, setOpenAdd] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAdd = async (payload) => {
    const result = await addStudent(payload);
    if (result.ok) {
      setSnack({ open: true, message: result.message, severity: "success" });
      setOpenAdd(false);
    } else {
      setSnack({ open: true, message: result.error, severity: "error" });
    }
  };

  const askDelete = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    const result = await deleteStudent(selectedId);
    setOpenConfirm(false);

    if (result.ok) {
      setSnack({ open: true, message: result.message, severity: "success" });
    } else {
      setSnack({ open: true, message: result.error, severity: "error" });
    }
  };

  return (
    <main className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold">Administrar Estudiantes</h1>

        <Button variantType="add" onClick={() => setOpenAdd(true)}>
          Agregar estudiante
        </Button>
      </div>

      {loading && <p className="text-gray-500 text-center">Cargando...</p>}

      {!loading && students.length === 0 && (
        <p className="text-gray-600 text-center">{message}</p>
      )}

      {error && (
        <p className="max-w-3xl mx-auto bg-red-100 text-red-700 px-4 py-2 rounded">
          {error}
        </p>
      )}

      <ul className="w-full max-w-3xl mx-auto space-y-3">
        {students.map((s) => (
          <li
            key={s._id}
            className="flex justify-between items-center bg-gray-50 border p-3 rounded"
          >
            <div className="flex flex-col">
              <span className="font-medium">{s.nombre} {s.apellido}</span>
              <span className="text-sm text-gray-600">{s.email}</span>
            </div>

            <div className="flex gap-2">
              <Button variantType="details" onClick={() => navigate(`/students/${s._id}`)}>
                Detalles
              </Button>

              <Button variantType="delete" onClick={() => askDelete(s._id)}>
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <StudentFormModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAdd}
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
        sx={{ ml: 2, mb: 8 }}
      >
        <Alert severity={snack.severity} variant="filled">{snack.message}</Alert>
      </Snackbar>
    </main>
  );
};
