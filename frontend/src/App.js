import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./auth/Auth.js";
import NavigationComponent from "./shared/NavigationComponent.js";

function App() {
  return (
    <Router>
      <NavigationComponent></NavigationComponent>
      <Switch>
        <Route path="/auth">
          <Auth></Auth>
        </Route>
      </Switch>
    </Router>
  );
}

// function Home() {
//   return <div>Home Page</div>;
// }

export default App;
