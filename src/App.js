import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddAppointment from "./components/AddAppointment";
import Appointment from "./components/Appointment";
import AppointmentsList from "./components/AppointmentsList";
function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/appointments" className="navbar-brand">
          JUMP Jet Auto
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/appointments"} className="nav-link">
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Appointment
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route
            exact
            path={["/", "/appointments"]}
            component={AppointmentsList}
          />
          <Route exact path="/add" component={AddAppointment} />
          <Route path="/tutorials/:id" component={Appointment} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
