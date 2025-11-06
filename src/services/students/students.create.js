const API = import.meta.env.VITE_API_URL;

export  const createStudentService = async (body) => {
  //
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || "Error creating student");
  return data;
}
