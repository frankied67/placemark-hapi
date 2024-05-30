// import { userMemStore } from "./mem/user-mem-store.js";
// import { locationMemStore } from "./mem/location-mem-store.js";
// import { monumentMemStore } from "./mem/monument-mem-store.js";

// import { userJsonStore } from "./json/user-json-store.js";
// import { locationJsonStore } from "./json/location-json-store.js";
// import { monumentJsonStore } from "./json/monument-json-store.js";

import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { monumentMongoStore } from "./mongo/monument-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  monumentStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.monumentStore = monumentJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.monumentStore = monumentMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationMemStore;
        this.monumentStore = monumentMemStore;
    }
  },
};
