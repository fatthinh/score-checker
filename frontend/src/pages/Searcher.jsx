import Button from "../components/Button";
import api from "../services/api";
import { useState } from "react";
import { SCORE_LABELS } from "../utils/contants";

function Searcher() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = async () => {
    const target = document.getElementById("error-msg");
    try {
      const res = await api.get("search?registration-num=" + query);
      target.classList.remove("h-8");

      setResult(res.data);
    } catch (error) {
      target.classList.add("h-8");
      setResult(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 border-b-1 border-neutral-500 pb-4">
        <h1 className="text-lg font-medium">User Registration</h1>

        <label className="flex flex-col space-y-1">
          <span className="text-md font-light text-neutral-700">
            Registration number:
          </span>
          <form
            method="POST"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex space-x-2 md:space-x-4 w-full justify-between md:justify-start"
          >
            <input
              className="border-2 rounded border-neutral-300 outline-primary-300 px-1 w-2/3 md:w-1/2"
              placeholder="Enter registration number"
              name="registration_num"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              primary
              type="submit"
              text="Submit"
              onClick={handleSearch}
              loading
            />
          </form>
        </label>

        <h3
          className="text-red-500 h-0 overflow-hidden transition-all"
          id="error-msg"
        >
          The registration number not found.
        </h3>
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-medium">Detailed Scores</h1>

        {result ? (
          <ul className="transition-all duration-300">
            {result.scores.map((item, index) => (
              <li key={index}>
                {SCORE_LABELS[item.subject]}: <span>{item.value}</span>
              </li>
            ))}

            <li >
              {result.foreign["subject"]}: <span>{result.foreign["value"]}</span>
            </li>
          </ul>
        ) : (
          <span>Detailed view of search scores here!</span>
        )}
      </div>
    </div>
  );
}

export default Searcher;
