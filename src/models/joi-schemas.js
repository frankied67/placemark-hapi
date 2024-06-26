import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const MonumentSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Bunratty Castle"),
    latitude: Joi.number().optional().example(52),
    longitude: Joi.number().optional().example(8),
    category: Joi.string().required().example("castle"),
    locationid: IdSpec,
  })
  .label("Monument");

export const MonumentSpecPlus = MonumentSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("MonumentPlus");

export const MonumentArraySpec = Joi.array().items(MonumentSpecPlus).label("MonumentArray");

export const LocationSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Waterford"),
    userid: IdSpec,
    monuments: MonumentArraySpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
