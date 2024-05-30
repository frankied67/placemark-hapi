import { v4 } from "uuid";

let monuments = [];

export const monumentMemStore = {
  async getAllMonuments() {
    return monuments;
  },

  async addMonument(locationId, monument) {
    monument._id = v4();
    monument.locationid = locationId;
    monuments.push(monument);
    return monument;
  },

  async getMonumentsByLocationId(id) {
    return monuments.filter((monument) => monument.locationid === id);
  },

  async getMonumentById(id) {
    return monuments.find((monument) => monument._id === id);
  },

  async getLocationMonuments(locationId) {
    return monuments.filter((monument) => monument.locationid === locationId);
  },

  async deleteMonument(id) {
    const index = monuments.findIndex((monument) => monument._id === id);
    monuments.splice(index, 1);
  },

  async deleteAllMonuments() {
    monuments = [];
  },

  async updateMonument(monument, updatedMonument) {
    monument.title = updatedMonument.title;
    monument.latitude = updatedMonument.latitude;
    monument.longitude = updatedMonument.longitude;
    monument.category = updatedMonument.category;
  },
};
