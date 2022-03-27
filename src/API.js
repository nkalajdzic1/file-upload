import axios from "axios";

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getInstance() {
    return this.instance;
  }
}
