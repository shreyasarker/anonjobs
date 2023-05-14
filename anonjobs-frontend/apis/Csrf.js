import Cookie from "js-cookie";
import Api from "./Api";

const Csrf = () => {
  let token = Cookie.get("XSRF-TOKEN");

  if (token) {
    return new Promise((resolve) => {
      resolve(token);
    });
  }
  return Api.get("/api/csrf-cookie");
};

export default Csrf;
