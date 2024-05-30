import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testMonuments, galway, waterford, abbey, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Monument Model tests", () => {
  let galwayList = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.monumentStore.deleteAllMonuments();
    galwayList = await db.locationStore.addLocation(galway);
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testMonuments[i] = await db.monumentStore.addMonument(galwayList._id, testMonuments[i]);
    }
  });

  test("create single monument", async () => {
    const waterfordList = await db.locationStore.addLocation(waterford);
    const monument = await db.monumentStore.addMonument(waterfordList._id, abbey);
    assert.isNotNull(monument._id);
    assertSubset(abbey, monument);
  });

  test("create multiple monumentApi", async () => {
    const monuments = await db.locationStore.getLocationById(galwayList._id);
    assert.equal(testMonuments.length, testMonuments.length);
  });

  test("delete all monumentApi", async () => {
    const monuments = await db.monumentStore.getAllMonuments();
    assert.equal(testMonuments.length, monuments.length);
    await db.monumentStore.deleteAllMonuments();
    const newMonuments = await db.monumentStore.getAllMonuments();
    assert.equal(0, newMonuments.length);
  });

  test("get a monument - success", async () => {
    const waterfordList = await db.locationStore.addLocation(waterford);
    const monument = await db.monumentStore.addMonument(waterfordList._id, abbey);
    const newMonument = await db.monumentStore.getMonumentById(monument._id);
    assertSubset(abbey, newMonument);
  });

  test("delete One Monument - success", async () => {
    await db.monumentStore.deleteMonument(testMonuments[0]._id);
    const monuments = await db.monumentStore.getAllMonuments();
    assert.equal(monuments.length, testLocations.length - 1);
    const deletedMonument = await db.monumentStore.getMonumentById(testMonuments[0]._id);
    assert.isNull(deletedMonument);
  });

  test("get a monument - bad params", async () => {
    assert.isNull(await db.monumentStore.getMonumentById(""));
    assert.isNull(await db.monumentStore.getMonumentById());
  });

  test("delete one monument - fail", async () => {
    await db.monumentStore.deleteMonument("bad-id");
    const monuments = await db.monumentStore.getAllMonuments();
    assert.equal(monuments.length, testLocations.length);
  });
});
