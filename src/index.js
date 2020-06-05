let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  fetchToys();
  listenToFormSubmit();
  listenToLikeClick();
});


function toyInfoCard(toy) {
  return `
  <div class="card" id="${toy.id}">
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
</div>
  `
}

function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => appendToy(data))
}

function appendToy(toys) {
  const displayToys = document.querySelector('#toy-collection');
  toys.forEach(toy => {
    displayToys.innerHTML += toyInfoCard(toy);
  });
}



function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => appendToy(data))
}

function appendToy(toys) {
  const displayToys = document.querySelector('#toy-collection');
  toys.forEach(toy => {
    displayToys.innerHTML += toyInfoCard(toy);
  });
}


function listenToFormSubmit() {
  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameInput = event.target.name;
    const imgInput = event.target.image;

    const name = nameInput.value
    const image = imgInput.value

    const bodyData = {
      name: name,
      image: image,
      likes: 0
    }

    const configObj = {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    };

  fetch('http://localhost:3000/toys', configObj)
  .then(res => res.json())
  .then(toys => toyInfoCard(toys))
  });
}

function listenToLikeClick() {
  const toyContainer = document.querySelector('#toy-collection');
  toyContainer.addEventListener('click', (e) => {
    if (e.target.className === 'like-btn') {
      const toyId = e.target.id;
      const likePTag = e.target.previousElementSibling;
      const likes = +likePTag.innerText.split(" ")[0];
      const newLikes = likes + 1;

      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body : JSON.stringify({
          likes: newLikes,
        }),
      });
      likePtag.innerText = `${newLikes} Likes`
    }
  });
}

