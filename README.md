# PlaceMark

PlaceMark is an assignment for a module on the Higher Diploma In Computer Science
in South East Technological University Waterford. The application is based on the
labs for the module where a music application called Playtime is built.

This is the source for the module on the [Higher Diploma in Computer Science](https://tutors.dev/course/wit-hdip-comp-sci-2023)

The course is deployed here:

- [https://tutors.dev/course/full-stack-1-2023](https://tutors.dev/course/full-stack-1-2023)

The course is built using [Tutors](https://tutors.dev/)

PlaceMark is an application for recording a "point of interest" (POI).
The POI that has been the focus of this project are historical landmarks, buildings,
and monuments.

It is build using the Hapi.js framework and handlebars to create reusable webpage templates.
The Joi module was used to provide validation for form entry while mocha and chai were
used to tun unit tests.

## PlaceMark Installation

Clone the repo from GitHub `git clone https://github.com/frankied67/PlaceMark `

Open a terminal/integarated terminal and run `npm install`

To run the application, enter the following command

```
npm run start

> placemark@0.1.0 start
> node src/server.js

Server running on http://localhost:3000
```

You can now browse to the app on localhost:3000

## Features

- Sign up / log in to service
- Create, Read, Update, Delete
- Categories

### Future Features to be added

- Map Location
- PlaceMark Images

## Technologies used

- node
- Hapi framework
- Joi
- Mocha
- Chai
