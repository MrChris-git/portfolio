// src/utils/bcryptHash.js
import bcrypt from "bcryptjs";

const saltRounds = 10;

bcrypt.hash("MyOwnPortfolio", saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hash for 'name':", hash);
});

bcrypt.hash("eob31sn@pFjds", saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Hash for 'password':", hash);
});
