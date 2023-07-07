# aoz_project

Backend API handling of an apartment app. Uses JavaScript, Node.JS, Express, MySQL and Sequelize.
Sensitive information is stored in .env file.
Apartment API supports CRUD with getAll, getByID, create, update and delete.
Room API supports the same functionalities, mostly called through Apartment functions.
Users API supports register and login.
Backend tests whether a user is connected through a token.

Assumptions:
- ID is sent through parameters when necessary, the remaining info are sent through the body.
- Input that involves images is sent throught form data.
- Input that does not involve images is sent through urlencoded form.
- Front end sends the list of rooms as two arrays, types[] and counts[], which contain strings and integers respectively, to describe the fields of each room.
- The two aforementioned arrays must have the same size (back end checks this).
