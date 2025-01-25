import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Wrapper from "./wrapper";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/*" element={<Wrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
