import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";  // your homepage component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
