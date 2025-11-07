import { Link } from "react-router-dom";

import imgHistoria   from "../assets/courses/historia.jpg";
import imgCiencias   from "../assets/courses/ciencias.jpg";
import imgMatematica from "../assets/courses/matematica.jpg";
import imgArte       from "../assets/courses/arte.jpg";

const CARDS = [
  { id: "historia",   label: "Historia",   img: imgHistoria },
  { id: "ciencias",   label: "Ciencias",   img: imgCiencias },
  { id: "matematica", label: "Matemática", img: imgMatematica },
  { id: "arte",       label: "Arte",       img: imgArte },
];

export const Courses = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Administrar Cursos</h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {CARDS.map((c) => (
          <Link
            key={c.id}
            to={`/courses/${c.id}`}
            className="relative block rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={c.img}
              alt={c.label}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/600x300?text=Curso";
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute bottom-3 left-3 text-white font-semibold text-lg drop-shadow">
              {c.label}
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
