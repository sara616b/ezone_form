import "./sass/style.scss";

import { post } from "./javascripts/post.js";

const formPersonal = document.querySelector("#personal");
const formGaming = document.querySelector("#gaming");
const formImprove = document.querySelector("#improve");

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("window loaded");

  //local storage set up and clear initially
  let myStorage = window.localStorage;
  myStorage.clear();

  //hide all but first form
  hideSwitch(formGaming);
  hideSwitch(formImprove);

  //next + submit buttons
  const forms = [formPersonal, formGaming, formImprove];
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      postToLocal(myStorage, e);
    });
  });

  //back buttons
  document.querySelectorAll(".back").forEach((e) => {
    e.addEventListener("click", (ev) => {
      console.log("go back");
      ev.preventDefault();
      if (formGaming.style.display !== "none") {
        hideSwitch(formGaming);
        hideSwitch(formPersonal);
      } else if (formImprove.style.display !== "none") {
        hideSwitch(formGaming);
        hideSwitch(formImprove);
      }
    });
  });
}

function hideSwitch(toBeHidden) {
  if (toBeHidden.style.display == "none") {
    toBeHidden.style.display = "flex";
  } else {
    toBeHidden.style.display = "none";
  }
}

function postToLocal(storage, data) {
  const formEls = data.target.elements;
  if (data.target.id == "personal") {
    console.log(formEls.name.value);
    storage.setItem("name", formEls.name.value);
    storage.setItem("email", formEls.email.value);
    storage.setItem("age", formEls.age.value);
    storage.setItem("contry", formEls.contry.value);

    hideSwitch(formPersonal);
    hideSwitch(formGaming);

    console.log(storage);
  } else if (data.target.id == "gaming") {
    //FIX NIVEAU ALL OVER
    const niveaus = createArrayToPost("niveau");
    storage.setItem("niveaus", niveaus);
    const genres = createArrayToPost("genre");
    storage.setItem("genres", genres);
    const platforms = createArrayToPost("platform");
    storage.setItem("platforms", platforms);

    hideSwitch(formGaming);
    hideSwitch(formImprove);

    console.log(storage);
  } else if (data.target.id == "improve") {
    const improve = createArrayToPost("improve");
    storage.setItem("improvements", improve);

    //prepare data and then post to database
    prepareData(storage);
    //set up thank you!
    window.alert("THANKS FOR SIGNING UP!");

    console.log(storage);
  }
}

function prepareData(myStorage) {
  console.log("Prepare data and post");
  console.log(myStorage.getItem("platforms"));

  post({
    name: myStorage.getItem("name"),
    mail: myStorage.getItem("email"),
    age: myStorage.getItem("age"),
    country_city: myStorage.getItem("contry"),
    level: myStorage.getItem("niveaus").split(", "),
    platforms: myStorage.getItem("platforms").split(", "),
    type: myStorage.getItem("genres").split(", "),
    interests: myStorage.getItem("improvements").split(", "),
  });
}

function createArrayToPost(name) {
  const arrayToReturn = [];
  const arrayElements = document.querySelectorAll(
    "[name=" + name + "]:checked"
  );
  arrayElements.forEach((el) => arrayToReturn.push(el.id));

  return arrayToReturn;
}

function displayThanks() {
  console.log("Show thank you popup");
}
