import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ExercisePage(){
    const{id} = useParams();
    const[exercise, setExercise] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
      
        setIsLoading(true);
        setError(null);
        setExercise(null);
    
        fetch(`http://localhost:8080/api/workouts/${id}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setExercise(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Fetching error: ", err);
            setError(err.message);
            setIsLoading(false);
          });
    }, [id]);
}
export default ExercisePage;