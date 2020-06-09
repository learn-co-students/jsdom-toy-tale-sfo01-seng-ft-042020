let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newBtn = document.getElementById('newToyBtn')
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  newBtn.addEventListener('click', newToyPOST)
  
  });

  fetch('http://localhost:3000/toys')
    .then(resp=>resp.json())
    .then(json=>addAllToPage(json))
});

function addAllToPage(toys) {
  const toyList = document.getElementById('toy-collection')
  
  toys.forEach((toy)=>toyList.appendChild(createToy(toy)))
  toyList.addEventListener('click', (e)=>addLike(e))
}

function createToy(toy) {
  const oh_yay = document.createElement('div')
  oh_yay.setAttribute('class', 'card')
  oh_yay.setAttribute('data-toyId', toy.id)
  oh_yay.innerHTML = `<h2>${toy.name}</h2>`
  oh_yay.innerHTML += `<img src='${toy.image}' class='toy-avatar'>`
  oh_yay.innerHTML += `<p>Likes: <span>${toy.likes}</span></p>`
  oh_yay.innerHTML += `<button class='like-btn'>Like <3</button>`
  return oh_yay
}

function newToyPOST() {
  event.preventDefault()
  const form = document.querySelector('.add-toy-form')
  const [name, image] = form.querySelectorAll('input')
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
  const config = {
    headers: headers,
    method: "POST",
    body: JSON.stringify({"name": name.value, "image": image.value, "likes": 0})
  }
  fetch('http://localhost:3000/toys', config)
}

function addLike(e) {
  event.preventDefault()
  debugger
  if (e.target.className === 'like-btn') {
    const divLiked = e.target.parentElement
    const likesDisplay = divLiked.querySelector('p > span')
    const id = divLiked.dataset.toyid
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    const config = {
      headers: headers,
      method: "PATCH",
      body: JSON.stringify({"likes": parseInt(likesDisplay.innerHTML, 10) + 1})
    }
    fetch(`http://localhost:3000/toys/${id}`, config)
  } 
}