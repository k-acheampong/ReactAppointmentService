import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import http from "../http-common.js";

const AppointmentsList = () => {
  const getAllAppointments = () => {
    return http.get("http://localhost:9000/api/appointments/appointment");
  };

  const getAppointment = (appointmentId) => {
    return http.get(
      `http://localhost:9000/api/appointments/appointment/${appointmentId}`
    );
  };

  const [appointment, setAppointments] = useState([]);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCustomerId, setSearchCustomerId] = useState(null);

  useEffect(() => {
    retrieveAppointments();
  });

  const onSearchCustomerId = (e) => {
    const searchCustomerId = e.target.value;
    setSearchCustomerId(searchCustomerId);
  };

  const retrieveAppointments = () => {
    getAllAppointments()
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshAppointmentsList = () => {
    retrieveAppointments();
    setCurrentAppointment(null);
    setCurrentIndex(-1);
  };

  const setActiveAppointment = (appointment, index) => {
    setCurrentAppointment(appointment);
    setCurrentIndex(index);
  };

  const findAppointmentById = () => {
    getAppointment(searchCustomerId)
      .then((response) => {
        setAppointments(response.data);
        console.log(response.data);
        refreshAppointmentsList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Customer ID"
            value={searchCustomerId}
            onChange={onSearchCustomerId}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findAppointmentById}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Appoinment List</h4>

        <ul className="list-group">
          {appointment &&
            appointment.map((appointment, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveAppointment(appointment, index)}
                key={index}
              >
                {appointment.appointmentId}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentAppointment ? (
          <div>
            <h4>Appointment</h4>
            <div>
              <label>
                <strong>Appointment ID:</strong>
              </label>{" "}
              {currentAppointment.appointmentId}
            </div>
            <div>
              <label>
                <strong>Customer ID:</strong>
              </label>{" "}
              {currentAppointment.customerId}
            </div>
            <div>
              <label>
                <strong>Service Date:</strong>
              </label>{" "}
              {currentAppointment.serviceDate}
            </div>
            <div>
              <label>
                <strong>Store ID:</strong>
              </label>{" "}
              {currentAppointment.storeId}
            </div>

            <Link
              to={"/appointments/" + currentAppointment.appointmentId}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an appointment...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
