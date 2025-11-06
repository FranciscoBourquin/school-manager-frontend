const API = import.meta.env.VITE_API_URL;

export  const updateStudentService = async (id, body) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Error updating student");
  return data; 
}
