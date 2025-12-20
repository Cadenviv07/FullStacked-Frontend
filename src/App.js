import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import DashboardPage from "./pages/DashboardPage";
import WorkoutPage from "./pages/WorkoutPage";
import ExercisePage from "./pages/ExercisePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/verify" element={<VerifyPage/>} />
                <Route path = "/" element={<DashboardPage />} />
                <Route path = "/workout:id" element={<WorkoutPage />} />
                <Route path = "/exercise:id" element={<ExercisePage />} />
            </Routes>
        </Router>
    );
}

export default App;
