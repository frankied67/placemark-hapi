import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, waterford, maggieCredentials, testLocations, testMonuments, abbey } from "../fixtures.js";

suite("Monument API tests", () => {
  let user = null;
  let galwayList = null;

  setup(async () => {
    placemarkService.clearAuth();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    await placemarkService.deleteAllLocations();
    await placemarkService.deleteAllUsers();
    await placemarkService.deleteAllMonuments();
    user = await placemarkService.createUser(maggie);
    await placemarkService.authenticate(maggieCredentials);
    waterford.userid = user._id;
    galwayList = await placemarkService.createLocation(waterford);
  });

  teardown(async () => {});

  test("create monument", async () => {
    const returnedMonument = await placemarkService.createMonument(galwayList._id, abbey);
    assertSubset(abbey, returnedMonument);
  });

  test("create Multiple monuments", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMonument(galwayList._id, testMonuments[i]);
    }
    const returnedMonuments = await placemarkService.getAllMonuments();
    assert.equal(returnedMonuments.length, testMonuments.length);
    for (let i = 0; i < returnedMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const monument = await placemarkService.getMonument(returnedMonuments[i]._id);
      assertSubset(monument, returnedMonuments[i]);
    }
  });

  test("Delete MonumentApi", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMonument(galwayList._id, testMonuments[i]);
    }
    let returnedMonuments = await placemarkService.getAllMonuments();
    assert.equal(returnedMonuments.length, testMonuments.length);
    for (let i = 0; i < returnedMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const monument = await placemarkService.deleteMonument(returnedMonuments[i]._id);
    }
    returnedMonuments = await placemarkService.getAllMonuments();
    assert.equal(returnedMonuments.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testMonuments.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await placemarkService.createMonument(galwayList._id, testMonuments[i]);
    }
    const returnedLocation = await placemarkService.getLocation(galwayList._id);
    assert.equal(returnedLocation.monuments.length, testMonuments.length);
    for (let i = 0; i < testMonuments.length; i += 1) {
      assertSubset(testMonuments[i], returnedLocation.monuments[i]);
    }
  });
});
