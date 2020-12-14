import React, { useState, useEffect } from "react";
import http from "../http-common.js";

const Tutorial = (props) => {
  const getAppointment = (appointmentId) => {
    return http.get(
      `http://localhost:9000/api/appointments/appointment/${appointmentId}`
    );
  };

  const updateAppointment = (appointmentId, appointment) => {
    return http.put(
      `http://localhost:9000/api/appointments/appointment/${appointmentId}`,
      appointment
    );
  };

  const deleteAppointment = (appointmentId) => {
    return http.delete(
      `http://localhost:9000/api/appointments/appointment/${appointmentId}`
    );
  };

  const initialAppointmentState = {
    appointmentId: null,
    customerId: null,
    serviceDate: null,
    storeId: null,
  };

  const [currentAppointment, setCurrentAppointment] = useState(
    initialAppointmentState
  );
  const [message, setMessage] = useState("");

  const getAppointmentById = (appointmentId) => {
    getAppointment(appointmentId)
      .then((response) => {
        setCurrentAppointment(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAppointmentById(props.match.params.appointmentId);
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentAppointment({ currentAppointment, [name]: value });
  };

  const updateAppointmentById = (appointmentId) => {
    var appointment = {
      appointmentId: currentAppointment.appointmentId,
      customerId: currentAppointment.customerId,
      localDate: currentAppointment.localDate,
      storeId: currentAppointment.storeId,
    };

    updateAppointment(appointmentId, appointment)
      .then((response) => {
        setCurrentAppointment({ currentAppointment });
        console.log(response.data);
        setMessage("The appointment was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAppointmentById = () => {
    deleteAppointment(currentAppointment.appointmentId)
      .then((response) => {
        console.log(response.data);
        props.history.push("/appointment");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentAppointment ? (
        <div className="edit-form">
          <h4>Appointment</h4>
          <form>
            <div className="form-group">
              <label htmlFor="appointment-id">Appointment ID</label>
              <input
                type="text"
                className="form-control"
                id="appointment-id"
                name="appointment-id"
                value={currentAppointment.appointmentId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customer-id">Customer ID</label>
              <input
                type="text"
                className="form-control"
                id="customer-id"
                name="customer-id"
                value={currentAppointment.customerId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="service-date">Service Date</label>
              <input
                type="text"
                className="form-control"
                id="service-date"
                name="service-date"
                value={currentAppointment.serviceDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="service-date">Store ID</label>
              <input
                type="text"
                className="form-control"
                id="store-id"
                name="store-id"
                value={currentAppointment.storeId}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button
            className="badge badge-danger mr-2"
            onClick={deleteAppointmentById}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateAppointmentById}
          >
            Update Appointment
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial</p>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
