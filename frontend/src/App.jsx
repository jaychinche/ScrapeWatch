import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import PageNotFound from "./PageNotFound";
import Dashboard from "./Dashboard";
import SplashScreen from "./SplashScreen";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute"; // ⬅️ Import this

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
