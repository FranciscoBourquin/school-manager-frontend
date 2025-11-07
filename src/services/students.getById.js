const API = import.meta.env.VITE_API_URL;

export const getStudentByIdService = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || data.error);

  return {
    message: data.message,
    data: data.student
  };
}
