import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/molecules/NavBar";
import Reviews from "./components/pages/Reviews";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import AllReviews from "./components/templates/AllRevies";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/reviews/:category" element={<AllReviews />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
