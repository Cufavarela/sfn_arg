import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { Home } from "./screens/Home";
import AdminView from "./screens/Admin";
import AboutUs from "./screens/AboutUs";
import Contact from "./screens/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/admin">
            <AdminView />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/aboutUs">
            <AboutUs />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
