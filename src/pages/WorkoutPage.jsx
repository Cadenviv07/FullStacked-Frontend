import { useParams } from "react-router-dom";

function WorkoutPage() {
  const { id } = useParams();
  
    UseEffect(() =>{
        fetch(`http://localhost:8080/api/workouts/${id}`)
        .then(res => res.json())
        .then(data => setWorkout(data));
    }, [id]);

  return <div>Showing workout with ID: {id}</div>;
}

export default WorkoutPage;