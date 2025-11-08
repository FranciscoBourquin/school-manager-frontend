import { useState } from "react";
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
import { StudentFormModal } from "../components/StudentFormModal";
import { useStudents } from "../hooks/useStudents";
import { useNavigate } from "react-router-dom";

export const Students = () => {
  const { students, loading, error, message, addStudent, deleteStudent } = useStudents();

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
    <main className="p-4 sm:p-6 flex flex-col gap-4">
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl sm:text-2xl font-bold">Administrar Estudiantes</h1>

        <div className="w-full sm:w-auto">
          <Button
            variantType="add"
            className="w-full sm:w-auto"
            onClick={() => setOpenAdd(true)}
          >
            Agregar estudiante
          </Button>
        </div>
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
            className="bg-white border rounded p-3 sm:p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <span className="block font-medium truncate">
                {s.nombre} {s.apellido}
              </span>
              <span className="block text-sm text-gray-600 truncate">
                {s.email}
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 w-full sm:w-auto">
              <Button
                variantType="details"
                className="w-full sm:w-auto"
                onClick={() => navigate(`/students/${s._id}`)}
              >
                Detalles
              </Button>

              <Button
                variantType="delete"
                className="w-full sm:w-auto"
                onClick={() => askDelete(s._id)}
              >
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
        <Alert severity={snack.severity} variant="filled">
          {snack.message}
        </Alert>
      </Snackbar>
    </main>
  );
};
