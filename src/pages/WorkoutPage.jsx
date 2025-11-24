import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function WorkoutPage() {
  const { id } = useParams();

  const[exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  
    setIsLoading(true);
    setError(null);
    setWorkout(null);
    setExercises([]);

    fetch(`http://localhost:8080/api/workouts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWorkout(data);
        setExercises(data.exercises || []); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div className="p-8 text-center">Loading workout...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-600">Error loading workout: {error}</div>;
  }
  
  if (!workout) {
      return <div className="p-8 text-center">Workout not found.</div>;
  }

  return (
    <div className="p-8">
      {/* Display the workout name if available */}
      <h1 className="text-3xl font-bold mb-4">{workout.name || "Workout Details"}</h1>
      
      <h2 className="text-2xl font-semibold mb-6">Exercises</h2>

      {exercises.length === 0 ? (
          <p>No exercises found for this workout.</p>
      ) : (
        <ul className="space-y-4">
          {exercises.map((e) => (
            <li key={e.id}>
              <Link
                to={`/exercise/${e.id}`}
                className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out shadow-sm"
              >
                <h3 className="text-xl font-bold text-indigo-700">{e.name}</h3>
              
                <p className="text-gray-700 mt-2 text-sm">
                  <span className="font-medium">Muscle:</span> {e.muscle || 'N/A'} <br />
                  <span className="font-medium">Weight:</span> {e.weight ? `${e.weight} kg` : 'N/A'} <br />
                  <span className="font-medium">Reps:</span> {e.reps || 'N/A'} <br />
                  <span className="font-medium">Sets:</span> {e.sets || 'N/A'} 
                </p>
                <div className="mt-2 text-indigo-500 hover:text-indigo-600 text-sm">View Details →</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WorkoutPage;