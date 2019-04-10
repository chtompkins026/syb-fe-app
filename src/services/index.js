import ax from "axios";

ax.defaults.xsrfCookieName = "CSRF-TOKEN";
ax.defaults.xsrfHeaderName = "X-CSRF-Token";
ax.defaults.withCredentials = true;

export const axiosInstance = ax.create({
  baseURL: `http://localhost:3210`
});
