import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button as MUIButton,
} from "@mui/material";

export const StudentFormModal = ({
  open,
  onClose,
  onSubmit,
  initialValues = null,
  title = "Agregar estudiante",
  submitLabel = "Guardar",
}) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [cursosText, setCursosText] = useState("");

  useEffect(() => {
    if (open) {
      if (initialValues) {
        setNombre(initialValues.nombre || "");
        setApellido(initialValues.apellido || "");
        setEmail(initialValues.email || "");
        setCursosText(Array.isArray(initialValues.cursos) ? initialValues.cursos.join(", ") : "");
      } else {
        setNombre("");
        setApellido("");
        setEmail("");
        setCursosText("");
      }
    }
  }, [open, initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cursos =
      cursosText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    onSubmit({ nombre, apellido, email, cursos });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <TextField
              label="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              size="small"
              fullWidth
              required
            />
            <TextField
              label="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              size="small"
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              fullWidth
              required
            />
            <TextField
              label="Cursos (separados por coma)"
              placeholder="Matemática, Inglés, Programación"
              value={cursosText}
              onChange={(e) => setCursosText(e.target.value)}
              size="small"
              fullWidth
            />
          </div>
        </DialogContent>

        <DialogActions>
          <MUIButton onClick={onClose}>Cancelar</MUIButton>
          <MUIButton variant="contained" type="submit">{submitLabel}</MUIButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
