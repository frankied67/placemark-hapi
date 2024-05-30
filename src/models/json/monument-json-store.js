import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const monumentJsonStore = {
  async getAllMonuments() {
    await db.read();
    return db.data.monuments;
  },

  async addMonument(locationId, monument) {
    await db.read();
    monument._id = v4();
    monument.locationid = locationId;
    db.data.monuments.push(monument);
    await db.write();
    return monument;
  },

  async getMonumentsByLocationId(id) {
    await db.read();
    return db.data.monuments.filter((monument) => monument.locationid === id);
  },

  async getMonumentById(id) {
    await db.read();
    return db.data.monuments.find((monument) => monument._id === id);
  },

  async deleteMonument(id) {
    await db.read();
    const index = db.data.monuments.findIndex((monument) => monument._id === id);
    db.data.monuments.splice(index, 1);
    await db.write();
  },

  async deleteAllMonuments() {
    db.data.monuments = [];
    await db.write();
  },

  async updateMonument(monument, updatedMonument) {
    monument.title = updatedMonument.title;
    monument.latitude = updatedMonument.latitude;
    monument.longitude = updatedMonument.longitude;
    await db.write();
  },
};
