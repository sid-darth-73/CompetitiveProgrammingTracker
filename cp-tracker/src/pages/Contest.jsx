import React, { useState, useEffect } from "react";

const Contest = () => {
  const [rating, setRating] = useState("");
  const [problem, setProblem] = useState(null);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch("https://codeforces.com/api/problemset.problems")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          setProblems(data.result.problems);
        }
      });
  }, []);

  const handleGenerate = () => {
    if (!rating) return;
    const filtered = problems.filter((p) => p.rating === parseInt(rating));
    if (filtered.length === 0) {
      alert("No problems found for this rating.");
      return;
    }

    const randomProblem = filtered[Math.floor(Math.random() * filtered.length)];
    setProblem(randomProblem);
  };

  return (
    <div style={{ padding: "20px" }} className="text-center">
      <h1>Codeforces Problem Finder</h1>
      <input
        type="number"
        placeholder="Enter Rating (e.g., 800)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
        className="border text-black border-gray-300 dark:border-gray-700 rounded-md p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
      />
      <button onClick={handleGenerate} style={{ padding: "5px 10px" }} className="bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
        Get Problem
      </button>
      {problem && (
        <div style={{ marginTop: "20px" }} className="text-center">
          <h3>Random Problem:</h3>
          <a
            href={`https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", marginTop: "10px" }}
            className="text-blue-500 hover:underline"
          >
            {problem.name}
          </a>
        </div>
      )}
    </div>
  );
};

export default Contest;
