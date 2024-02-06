import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const Results = (props) => {
  const total = props.correct + props.wrong;
  const accuracy = props.correct / total;
  const navigate = useNavigate();
  const data = [
    { name: "Correct", value: props.correct },
    { name: "Wrong", value: props.wrong },
  ];
  const COLORS = ["#47b86d", "#dc2a23"];
  function onClick() {
    if (props.origin === "SightReading") {
      navigate("/sightreading");
    } else if (props.origin === "Quizzes") {
      navigate("/quizmap");
    } else {
      navigate("/");
    }
  }

  return (
    <Container>
      <h2>Results</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <ResponsiveContainer width="20%" height={250}>
          <PieChart >
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <h3>{"Correct: " + props.correct}</h3>
      <h3>{"Mistakes: " + props.wrong}</h3>
      <h3>{"Accuracy: " + (accuracy * 100).toFixed(3) + '%'}</h3>
      <h3>{"Total Answered: " + total}</h3>
      <Button onClick={onClick} variant="contained">
        Return
      </Button>
    </Container>
  );
};

export default Results;
