import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Students } from "./pages/Students";
import { StudentDetails } from "./pages/StudentDetails";
import { Courses } from "./pages/Courses";
import "./App.css";

export default function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/students/:id" element={<StudentDetails />} />

          <Route path="/courses" element={<Courses />} />
        </Routes>

        <Footer />
      </div>
  );
}
