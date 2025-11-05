import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="w-full bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-700 font-bold text-xl px-3 py-1 rounded">
            SM
          </div>
          <span className="font-semibold text-lg hidden sm:block">School Manager</span>
        </div>

        <nav className="flex gap-4 text-sm sm:text-base">
          <Link
            to="/students"
            className="hover:text-gray-200 transition-colors"
          >
            Administrar Estudiantes
          </Link>
          <Link
            to="/courses"
            className="hover:text-gray-200 transition-colors"
          >
            Administrar Cursos
          </Link>
        </nav>
      </div>
    </header>
  );
}
