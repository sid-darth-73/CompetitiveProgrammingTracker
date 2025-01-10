import React, { useState } from "react";
import CountdownTimer from "./timer";

const ContestPage = () => {
  const [rating, setRating] = useState("");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateContest = async () => {
    if (!rating) {
      alert("Please enter a rating!");
      return;
    }

    setLoading(true);
    setProblems([]);

    try {
      // Fetch problems with the specified rating
      const response = await fetch(
        `https://codeforces.com/api/problemset.problems`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const filteredProblems = data.result.problems.filter(
          (problem) => problem.rating === parseInt(rating)
        );

        if (filteredProblems.length < 5) {
          alert(
            `Not enough problems with rating ${rating}. Found ${filteredProblems.length}.`
          );
          setLoading(false);
          return;
        }

        // Randomly pick 5 unique problems
        const selectedProblems = [];
        const indices = new Set();
        while (selectedProblems.length < 5) {
          const randomIndex = Math.floor(Math.random() * filteredProblems.length);
          if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            selectedProblems.push(filteredProblems[randomIndex]);
          }
        }

        setProblems(selectedProblems);
      } else {
        alert("Error fetching problems: " + data.comment);
      }
    } catch (error) {
      alert("An error occurred while fetching problems.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }} className="text-center">
      <h1>Generate Random Contest</h1>
      <label style={{ display: "block", marginTop: "20px" }} className="text-left">
        Enter Problem Rating:
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="e.g., 1500"
          style={{ marginLeft: "10px", padding: "5px" }}
        />
      </label>
      <br />
      <button
        onClick={generateContest}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={loading}
        className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
      >
        {loading ? "Generating..." : "Generate Contest"}
      </button>
      <CountdownTimer/>
      {problems.length > 0 && (
        <div style={{ marginTop: "30px" }} className="text-left">
          <h2>Random Contest Problems</h2>
          <ol style={{ paddingLeft: "20px" }} className="list-decimal">
            {problems.map((problem, index) => (
              <li key={index} style={{ marginTop: "10px" }} className="text-blue-500 hover:underline">
                <a
                  href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {problem.name} ({problem.contestId}/{problem.index})
                </a>
              </li>
            ))}
          </ol>
          <p style={{ marginTop: "20px" }} className="text-blue-500 hover:underline">
            Estimated Duration: <b>2 hours</b>
          </p>
        </div>
      )}
    </div>
  );
};

export default ContestPage;
