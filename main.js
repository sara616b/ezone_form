import "./sass/style.scss";

import { post } from "./javascripts/post.js";

//TODO - right form selected
const form = document.querySelector("form");

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("window loaded");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    prepareData();
    displayThanks();
  });
}

function prepareData() {
  console.log("Prepare data and post");

  //TODO - match values with html and restdb
  const platforms = createArrayToPost("platforms");
  const types = createArrayToPost("type");
  const areas = createArrayToPost("area");

  post({
    name: form.elements.name.value,
    mail: form.elements.mail.value,
    age: form.elements.age.value,
    country: form.elements.country.value,
    city: form.elements.city.value,
    niveau: form.elements.niveau.value,
    platforms: platforms,
    types: types,
    areas: areas,
  });
}
function createArrayToPost(name) {
  const arrayToReturn = [];
  const arrayElements = document.querySelectorAll(
    "[name=" + name + "]:checked"
  );
  arrayElements.forEach((el) => arrayToReturn.push(el.value));

  return arrayToReturn;
}

//TODO - idea! make a small popup that says "thanks for signing up"??
function displayThanks() {
  console.log("Show thank you popup");
}
