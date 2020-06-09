let toyContainer = "";

document.addEventListener("DOMContentLoaded", () => {
  toyContainer = document.getElementById("toy-collection");

  toggleToyForm();
  fetchToys();
  listenToToyFormSubmit();
  listenToLikeButtonClicks();
});

function listenToLikeButtonClicks() {
  toyContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const toyId = e.target.id;
      const likePTag = e.target.previousSibling;
      const likes = +likePTag.innerText.split(" ")[0];
      const newLikes = likes + 1;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          likes: newLikes,
        }),
      });

      likePTag.innerText = `${newLikes} Likes`;
    }
  });
}

// PATCH http://localhost:3000/toys/:id
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": <new number>
// })

function listenToToyFormSubmit() {
  const toyForm = document.querySelector(".add-toy-form");

  toyForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = event.target.toyName;
    const imageInput = event.target.image;

    const name = nameInput.value;
    const image = imageInput.value;

    const toyData = {
      name: name,
      image: image,
      likes: 0,
    };

    fetchPostToy(toyData);

    nameInput.value = "";
    imageInput.value = "";
  });
}

function fetchPostToy(toyData) {
  const url = "http://localhost:3000/toys";
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyData),
  };

  fetch(url, reqObj)
    .then((resp) => resp.json())
    .then((toy) => appendToy(toy));
}

// POST http://localhost:3000/toys
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })

function fetchToys() {
  // 1. fetch all toys from the backend
  // const fetchPromise = fetch("http://localhost:3000/toys");
  // const jsonPromise = fetchPromise.then((resp) => resp.json());
  // jsonPromise.then((data) => console.log(data));

  // fetch("http://localhost:3000/toys")
  //   .then((resp) => resp.json())
  //   .then((data) => console.log(data));

  fetch("http://localhost:3000/toys")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (toys) {
      appendToys(toys);
    });
}

function appendToys(toys) {
  // 2. append those toys to the page
  // const toyContainer = document.getElementById("toy-collection");

  // toys.forEach((toy) => {
  //   toyContainer.innerHTML += renderSingleToy(toy);
  // });

  toys.forEach((toy) => {
    appendToy(toy);
  });
}

function appendToy(toy) {
  // const toyContainer = document.getElementById("toy-collection");
  const toyCard = renderSingleToy(toy);

  toyContainer.append(toyCard);
}

function renderSingleToy(toy) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("class", "card");

  const title = document.createElement("h2");
  title.innerText = toy.name;

  const image = document.createElement("img");
  image.setAttribute("src", toy.image);
  image.setAttribute("class", "toy-avatar");

  const pTag = document.createElement("p");
  pTag.innerText = `${toy.likes} Likes`;

  const button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.setAttribute("id", toy.id);
  button.innerText = "Like <3";

  wrapperDiv.append(title);
  wrapperDiv.append(image);
  wrapperDiv.append(pTag);
  wrapperDiv.append(button);

  return wrapperDiv;
}

// function renderSingleToy(toy) {
//   return ` <div class="card">
//   <h2>${toy.name}</h2>
//   <img src="${toy.image}" class="toy-avatar" />
//   <p>${toy.likes} Likes </p>
//   <button class="like-btn" id="${toy.id}">Like <3</button>
// </div>`;
// }

function toggleToyForm() {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
}