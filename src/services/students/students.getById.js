const API = import.meta.env.VITE_API_URL;

export  const getStudentByIdService = async (id) => {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Error getting student");
  // 
  return data?.student || data;
}
