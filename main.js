import "./sass/style.scss";

// import { post } from "./javascripts/post.js";

//TODO - right form selected
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

  const forms = [formPersonal, formGaming, formImprove];
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      postToLocal(myStorage, e);
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

  post({
    name: myStorage.getItem("name"),
    mail: myStorage.getItem("email"),
    age: myStorage.getItem("age"),
    country_city: myStorage.getItem("contry"),
    level: myStorage.getItem("niveaus"),
    platforms: myStorage.getItem("platforms"),
    type: myStorage.getItem("genres"),
    interests: myStorage.getItem("improvements"),
  });
}

function post(data) {
  console.log("Posts data to backend");
  const postData = JSON.stringify(data);
  fetch("https://ezone-765c.restdb.io/rest/info", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "6085ef4128bf9b609975a699",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function createArrayToPost(name) {
  const arrayToReturn = [];
  const arrayElements = document.querySelectorAll(
    "[name=" + name + "]:checked"
  );
  arrayElements.forEach((el) => arrayToReturn.push(el.id));

  return arrayToReturn;
}

//TODO - idea! make a small popup that says "thanks for signing up"??
function displayThanks() {
  console.log("Show thank you popup");
}
