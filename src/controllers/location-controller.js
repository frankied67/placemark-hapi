import { MonumentSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  },

  addMonument: {
    validate: {
      payload: MonumentSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("location-view", { title: "Add monument error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newMonument = {
        title: request.payload.title,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        category: request.payload.category,
      };
      await db.monumentStore.addMonument(location._id, newMonument);
      return h.redirect(`/location/${location._id}`);
    },
  },

  deleteMonument: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.monumentStore.deleteMonument(request.params.monumentid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};
