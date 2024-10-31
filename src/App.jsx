import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import PageOffre from "./components/PageOffre"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={ <Home/> } />
        <Route path="/offre/:id" element={ <PageOffre/> } />
      </Routes>
    
    </Router>
  );
}

export default App;
