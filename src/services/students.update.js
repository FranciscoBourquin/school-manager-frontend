const API = import.meta.env.VITE_API_URL;

export const updateStudentService = async (id, payload) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || data.message);

  return {
    message: data.message,
    updatedStudent: data.updatedStudent
  };
}
