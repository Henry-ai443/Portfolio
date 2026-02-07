import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import SingleProject from "./components/SingleProject";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/projects/:id" element={<SingleProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
