import { BrowserRouter as Router } from "react-router-dom";

import { getApps } from "./utils/utils";

function App() {
  const CurrentRouter = getApps();
  return (
    <Router>
      <CurrentRouter />
    </Router>
  );
}

export default App;
