const API = import.meta.env.VITE_API_URL;

export const createStudentService = async (payload) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || data.error);

  return {
    message: data.message,
    data: data.student
  };
}
