import "./App.css";
import Create from "./components/create";
import Read from "./components/read";
import Update from "./components/update";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {

  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <Link class="nav-link" to="/create">
                Create
              </Link>
              <Link class="nav-link" to="/read">
                Read
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="main">
        <h2 className="main-header">Data Base App</h2>
        <div>
          <Route exact path="/create" component={Create} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Route exact path="/read" component={Read} />
        </div>
        <Route path="/update" component={Update} />
      </div>
    </Router>
  );
}

export default App;
