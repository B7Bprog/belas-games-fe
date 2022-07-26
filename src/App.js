import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reviews from "./components/pages/Reviews";
import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import AllReviews from "./components/templates/AllReviews";
import Header from "./components/organisms/Header";
import SingleReview from "./components/templates/SingleReview";
import { useState } from "react";
import { userContext } from "./contexts/userContext";

function App() {
  const [user, setUser] = useState({});
  return (
    <userContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route
              path="/reviews/categories/:category"
              element={<AllReviews />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reviews/:review_id" element={<SingleReview />} />
          </Routes>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
