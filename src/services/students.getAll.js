const API = import.meta.env.VITE_API_URL; 

export const getStudentsService = async () => {
  const res = await fetch(API);
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Error getting students");
  return data?.students || [];
}
