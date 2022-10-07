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
    let res = await this.request(`users`, data, "post");
    return res.user;
  }

  // Get user details (including all user's appointments)
  static async getUser(username){
    let res = await this.request(`users/${username}`)
    return res;
  }

  //Update user email and/or password
  static async update(username, data) {
    let res = await this.request(`users/${username}`, data, "patch")
    return res;
  }


////////////////////////////APPOINTMENTS////////////
  //Get user appointments only
  static async getUserAppts(username) {
    let res = await this.request(`users/${username}`)
    return res;
  }

  //Get appointment by id. Includes any stored forecast.
  static async getAppt(id) { 
    let res = await this.request(`appointments/${id}`)
    return res;
  }

  //Add an appointment
  static async addAppt(data) {
    let res = await this.request(`appointments`, data, "post")
    console.log(res)
    return res;
  }

  //Updates an appointment
  static async updateAppt(id, data) {
    let res = await this.request(`appointments/${id}`, data, "patch")
    return res;
  }

  //Deletes an appointment
  static async deleteAppt(id) {
    let res = await this.request(`appointments/${id}`, {}, "delete")
    return res;
  }

  ///////////////////////////FORECASTS///////////////
  //Add a forecast for appt by appt_id
  //data has to be a specific format. Just pass the results of getForecast as data.
  static async addForecast(appt_id, data) {
    let res = await this.request(`appointments/${appt_id}/forecast`, data, "post")
    return res;
  }

  static async getApptForecast(appt_id) {
    let res = await this.request(`appointments/${appt_id}/forecast`)
    return res;
  }

  //Updates a forecast of id for appointment of appt_id
  static async updateForecast(appt_id, id, data) {
    let res = await this.request(`appointments/${appt_id}/forecast/${id}`, data, "patch")
    return res;
  }

  //Deletes a forecast of id for appt of appt_id
  static async deleteForecast(appt_id, id) {
    let res = await this.request(`appointments/${appt_id}/forecast/${id}`, "delete")
    return res;
  }
  

//////////////////// WEATHER API FORECAST //////////////
  //GET FORECAST FROM WEATHER API
  //data is {zipcode, tempUnit}
//   res is result[isoDate] = {
//     latitude: latitude,
//     longitude: longitude,
//     date: isoDate,
//     max_temp: max_temp,
//     min_temp: min_temp,
//     weathercode: weathercode 
// }
// isoDate is yyyy-mm-dd
  static async getForecast(data) {
    let res = await this.request(`weatherapi`, { data }, "post")
    console.log(res)
    return res;
  }
}

// PlannerApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pc3RlcnNudWdnbGVzIiwiaWF0IjoxNjU5NDc1Mzg0fQ.mOzaG3mnPk5KLSR3zT6xkoEE7z5Ev3fOD7zefV1QNTk"

export default PlannerApi;