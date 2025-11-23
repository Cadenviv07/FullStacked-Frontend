import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function DashboardPage() {
  const [workouts, setWorkouts] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/workouts/${email}`);
        setWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      }
    };
    fetchWorkouts();
  }, [email]);
Return(
  <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Workouts</h1>

      <ul className="space-y-4">
        {workouts.map((w) => (
          <li key={w.id}>
            <Link
              to={`/workout/${w.id}`}
              className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <h2 className="text-xl font-bold">{w.name}</h2>
              <p className="text-gray-700 mt-1">
                {w.muscleGroups.join(", ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}