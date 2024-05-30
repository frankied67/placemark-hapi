import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, MonumentSpec, MonumentSpecPlus, MonumentArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const monumentApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const monuments = await db.monumentStore.getAllMonuments();
        return monuments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: MonumentArraySpec, failAction: validationError },
    description: "Get all monumentApi",
    notes: "Returns all monumentApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const monument = await db.monumentStore.getMonumentById(request.params.id);
        if (!monument) {
          return Boom.notFound("No monument with this id");
        }
        return monument;
      } catch (err) {
        return Boom.serverUnavailable("No monument with this id");
      }
    },
    tags: ["api"],
    description: "Find a Monument",
    notes: "Returns a monument",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: MonumentSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const monument = await db.monumentStore.addMonument(request.params.id, request.payload);
        if (monument) {
          return h.response(monument).code(201);
        }
        return Boom.badImplementation("error creating monument");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a monument",
    notes: "Returns the newly created monument",
    validate: { payload: MonumentSpec },
    response: { schema: MonumentSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.monumentStore.deleteAllMonuments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all monumentApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const monument = await db.monumentStore.getMonumentById(request.params.id);
        if (!monument) {
          return Boom.notFound("No Monument with this id");
        }
        await db.monumentStore.deleteMonument(monument._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Monument with this id");
      }
    },
    tags: ["api"],
    description: "Delete a monument",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
