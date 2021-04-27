import "./sass/style.scss";

import { post } from "./javascripts/post.js";

const formPersonal = document.querySelector("#personal");
const formGaming = document.querySelector("#gaming");
const formImprove = document.querySelector("#improve");
const thanks = document.querySelector(".thanks");

const forms = [formPersonal, formGaming, formImprove, thanks];

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("window loaded");

  //local storage set up and clear initially
  let myStorage = window.localStorage;
  myStorage.clear();

  //hide all but first form
  hideSwitch(formGaming);
  hideSwitch(formImprove);
  hideSwitch(thanks);

  //check progress and update dots
  checkProgress();

  //next + submit buttons
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      postToLocal(myStorage, e);
      checkProgress();
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
        checkProgress();
      } else if (formImprove.style.display !== "none") {
        hideSwitch(formGaming);
        hideSwitch(formImprove);
        checkProgress();
      }
    });
  });
}

function checkProgress() {
  console.log("checking progrees");
  let dots = document.querySelectorAll(".dot");
  for (let i = 0; i < forms.length; i++) {
    if (forms[i].style.display == "none") {
      dots[i].classList = "dot";
    } else {
      dots[i].classList = "dot chosen";
    }
    console.log("for loop");
  }
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
    console.log(formEls);
    console.log(formEls.name.value);
    storage.setItem("name", formEls.name.value);
    storage.setItem("email", formEls.email.value);
    storage.setItem("age", formEls.age.value);
    storage.setItem("contry", formEls.contry.value);
    storage.setItem("city", formEls.city.value);

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
    displayThanks();

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
    country: myStorage.getItem("contry"),
    city: myStorage.getItem("city"),
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
  hideSwitch(formImprove);
  hideSwitch(thanks);
}
