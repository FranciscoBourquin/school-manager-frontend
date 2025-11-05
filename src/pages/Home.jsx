import { Link } from "react-router-dom";

export const Home =() => {
  return (
    <main className="flex flex-col justify-center items-center text-center flex-grow p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6">
        Bienvenido al Administrador Escolar
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/students"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Administrar Estudiantes
        </Link>
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Administrar Cursos
        </Link>
      </div>
    </main>
  );
}
