import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Drawings from "./pages/drawings";
import Projects from "./pages/projects";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/drawings" element={<Drawings />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}
