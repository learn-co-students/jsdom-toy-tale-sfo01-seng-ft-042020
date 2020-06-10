let toysContainer;

document.addEventListener("DOMContentLoaded", () => {
  toysContainer = document.getElementById("toy-collection");
  setToyPage();
  fetchToys();
  listenToFormSubmit();
  listenToLikeButtonClick();
});
  
function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((toys) => addToysToPage(toys));
}

function addToysToPage(toys) {
  toys.forEach((toy) => {
    createToyCard(toy)
  });
}

function createToyCard(toy) {
  const toyDiv = document.createElement("div");
  toyDiv.setAttribute("class", "card");

  const title = document.createElement("h2");
  title.innerText = toy.name;

  const toyImage = document.createElement("IMG");
  toyImage.setAttribute("src", toy.image);
  toyImage.setAttribute("class", "toy-avatar");

  const p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`;;

  const button = document.createElement("button");
  button.setAttribute("class", "like-btn");
  button.setAttribute("id", toy.id);
  button.innerHTML = "Like 💛";

  toyDiv.append(title);
  toyDiv.append(toyImage);
  toyDiv.append(p);
  toyDiv.append(button)
  toysContainer.append(toyDiv);
}

function listenToFormSubmit() {
    const toyForm = document.querySelector(".add-toy-form");
    toyForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const nameInput = event.target.toyName;
      const imageInput = event.target.toyImage;

      const name = nameInput.value;
      const image = imageInput.value;

      const toyData = {
        name: name,
        image: image,
        likes: 0
      };
    
      fetchToysPost(toyData);
      
      nameInput.value = "";
      imageInput.value = "";

    });
}

function fetchToysPost(toyData) {
  const destinationUrl = "http://localhost:3000/toys";
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

    fetch(destinationUrl, configObject)
    .then((response) => response.json())
    .then((toy) => createToyCard(toy))
}

function listenToLikeButtonClick() {
  toysContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      const toyId = event.target.id;
      const likeTag = event.target.previousSibling;
      const likeCount =  parseInt(likeTag.innerText.split(" ")[0]);
      const newLikes = likeCount + 1;
      
      // fetch
      let destinationUrl = `http://localhost:3000/toys/${toyId}`;
      const configObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      };

      fetch(destinationUrl, configObject)

      // update like counts on the front-end page
      likeTag.innerText = `${newLikes} Likes`;
    }
  });
}

function setToyPage() {
  let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
          toyFormContainer.style.display = "block";
      } else {
          toyFormContainer.style.display = "none";
      }
  });
}