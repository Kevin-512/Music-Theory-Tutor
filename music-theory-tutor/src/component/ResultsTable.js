import React, { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const ResultsTable = ({ userID }) => {
  const [results, setResults] = useState(null);

  // Retrieve a user's past quiz results when they login which is denoted by the userID changing
  useEffect(() => {
    axios(`http://localhost:8000/api/results/${userID}`)
      .then((response) => {
        setResults(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  }, [userID]);

  return (
    // Declares the table and all the fields in the table
    <Table size="small">
      <TableHead style={{ backgroundColor: "#975504" }}>
        <TableRow>
          <TableCell style={{ color: "white" }}>Quiz Type</TableCell>
          <TableCell style={{ color: "white" }}>Key Signature</TableCell>
          <TableCell style={{ color: "white" }}>Score</TableCell>
          <TableCell style={{ color: "white" }}>Time</TableCell>
        </TableRow>
      </TableHead>
      {/* Loops through the data retrieved from the database and displays each individual row */}
      {results && (
        <TableBody>
          {results.map((row) => (
            <TableRow
              key={row.id}
              style={{
                backgroundColor: row.id % 2 === 0 ? "#fccb8f" : "#fbaf50",
              }}
            >
              <TableCell>{row.quizType}</TableCell>
              <TableCell>{row.keySig}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
};

export default ResultsTable;
