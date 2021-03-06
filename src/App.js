import "./App.css";
import "./Styles.scss";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AllApartmentsPage from "./pages/AllApartmentsPage/AllApartmentsPage";
import AddApartmentPage from "./pages/AddApartmentPage/AddApartmentPage";
import ApartmentDetailsPage from "./pages/ApartmentDetailsPage/ApartmentDetailsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import IsPrivate from './components/IsPrivate/IsPrivate';
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/allapartments" element={<IsPrivate> <AllApartmentsPage /> </IsPrivate>} />
        <Route path="/addapartment" element={<IsPrivate> <AddApartmentPage /> </IsPrivate>} />
        <Route path="/apartment/details/:apartmentId" element={<IsPrivate> <ApartmentDetailsPage /> </IsPrivate>} />

        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
