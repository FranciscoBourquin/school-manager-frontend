const API = import.meta.env.VITE_API_URL;

export const deleteStudentService = async (id) => {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Error deleting student");
  return true;
}
