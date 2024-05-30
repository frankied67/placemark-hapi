import { userApi } from "./api/user-api.js";
import { locationApi } from "./api/location-api.js";
import { monumentApi } from "./api/monument-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },

  { method: "GET", path: "/api/monuments", config: monumentApi.find },
  { method: "GET", path: "/api/monuments/{id}", config: monumentApi.findOne },
  { method: "POST", path: "/api/locations/{id}/monuments", config: monumentApi.create },
  { method: "DELETE", path: "/api/monuments", config: monumentApi.deleteAll },
  { method: "DELETE", path: "/api/monuments/{id}", config: monumentApi.deleteOne },
];
