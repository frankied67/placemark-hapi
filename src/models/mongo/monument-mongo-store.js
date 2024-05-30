import { Monument } from "./monument.js";
import { Location } from "./location.js";

export const monumentMongoStore = {
  async getAllMonuments() {
    const monuments = await Monument.find().lean();
    return monuments;
  },

  async addMonument(locationId, monument) {
    monument.locationid = locationId;
    const newMonument = new Monument(monument);
    const monumentObj = await newMonument.save();
    return this.getMonumentById(monumentObj._id);
  },

  async getMonumentsByLocationId(id) {
    const monuments = await Monument.find({ locationid: id }).lean();
    return monuments;
  },

  async getMonumentById(id) {
    if (id) {
      const monument = await Monument.findOne({ _id: id }).lean();
      return monument;
    }
    return null;
  },

  async deleteMonument(id) {
    try {
      await Monument.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllMonuments() {
    await Monument.deleteMany({});
  },

  async updateMonument(monument, updatedMonument) {
    monument.title = updatedMonument.title;
    monument.latitude = updatedMonument.latitude;
    monument.longitude = updatedMonument.longitude;
    monument.category = updatedMonument.category;
    await monument.save();
  },

  // async getCastleMonuments(id) {
  //   const monuments = Monument.find({ category: "castle" }, { locationid: id });
  //   return monuments;
  // },
};
