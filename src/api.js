import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class PlannerApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PlannerApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

   // Individual API routes

  // LOGIN
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token
  }

  //REGISTER USER
  static async register(data) {
    let res = await this.request(`users`, { data }, "post");
    return res.user;
  }

  // Get user details (including all user's appointments)
  static async getUser(username){
    let res = await this.request(`users/${username}`)
    return res;
  }


////////////////////////////APPOINTMENTS////////////
  //Get user appointments only
  static async getUserAppts(username) {
    let res = await this.request(`users/${username}`)
    return res.appointments;
  }

  //Add an appointment
  static async addAppt(data) {
    let res = await this.request(`appointments`, { data }, "post")
    return res.appointments;
  }

  //Updates an appointment
  static async updateAppt(data) {
    let res = await this.request(`appointments`, { data }, "patch")
    return res.appointments;
  }

  //Deletes an appointment
  static async deleteAppt(id) {
    let res = await this.request(`appointments/${id}`, "delete")
    return res;
  }

  ///////////////////////////FORECASTS///////////////
  //Add a forecast for appt by appt_id
  static async addForecast(data) {
    let res = await this.request(`appointments`, { data }, "post")
    return res;
  }

  //Updates a forecast of id for appointment of appt_id
  static async updateForecast(appt_id, id, data) {
    let res = await this.request(`appointments/${appt_id}/forecast/${id}`, { data }, "patch")
    return res;
  }

  //Deletes a forecast of id for appt of appt_id
  static async deleteForecast(appt_id, id) {
    let res = await this.request(`appointments/${appt_id}/forecast/${id}`, "delete")
    return res;
  }

//////////////////// WEATHER API FORECAST //////////////
  //GET FORECAST FROM WEATHER API
  //data is {latitude, longitude, tempUnit=fahrenheit, timezone}
  static async getForecast(data) {
    let res = await this.request(`weatherapi`, { data })
    return res;
  }
}

// PlannerApi.token = token

export default PlannerApi;
