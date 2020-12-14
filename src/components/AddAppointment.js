import React, { useState } from "react";
// import AppointmentService from "../services/AppointmentService";
import http from "../http-common.js";

const AddAppointment = () => {
  // const getAllAppointments = () => {
  //   return http.get("/appointment");
  // };

  // const getAppointment = (appointmentId) => {
  //   return http.get(`/appointment/${appointmentId}`);
  // };

  const addAppointment = (appointment) => {
    return http.post(
      "http://localhost:9000/api/appointments/appointment",
      appointment
    );
  };

  // const updateAppointment = (appointmentId) => {
  //   return http.put(`/appointment/${appointmentId}`);
  // };

  // const deleteAppointment = (appointmentId) => {
  //   return http.delete(`/appointment/${appointmentId}`);
  // };

  const initialAppointmentState = {
    appointmentId: null,
    customerId: null,
    serviceDate: null,
    storeId: null,
  };
  const [appointment, setAppointment] = useState(initialAppointmentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const saveAppointment = () => {
    var data = {
      appointmentId: appointment.appointmentId,
      customerId: appointment.customerId,
      serviceDate: appointment.serviceDate,
      storeId: appointment.storeId,
    };

    addAppointment(data).then((response) => {
      setAppointment({
        appointmentId: response.data.appointmentId,
        customerId: response.data.customerId,
        serviceDate: response.data.serviceDate,
        storeId: response.data.storeId,
      });
      console.log(response.data);
    });

    setSubmitted(true);
  };

  const newAppointment = () => {
    setAppointment(initialAppointmentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You have made an appointment!</h4>
          <button className="btn btn-success" onClick={newAppointment}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="customer-id">Customer ID</label>
            <input
              type="text"
              className="form-control"
              id="customer-id"
              required
              value={appointment.customerId}
              onChange={handleInputChange}
              name="customer-id"
            />
          </div>

          <div className="form-group">
            <label htmlFor="service-date">Service Date</label>
            <input
              type="text"
              className="form-control"
              id="service-date"
              required
              value={appointment.serviceDate}
              onChange={handleInputChange}
              name="service-date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="store-id">Store ID</label>
            <input
              type="text"
              className="form-control"
              id="store-id"
              required
              value={appointment.storeId}
              onChange={handleInputChange}
              name="store-id"
            />
          </div>

          <button onClick={saveAppointment} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
