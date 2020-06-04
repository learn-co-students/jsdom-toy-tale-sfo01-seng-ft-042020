let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  fetchToys();
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault();
        postToy(e.target);
        document.querySelector('form').reset();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});



async function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(obj => renderToys(obj))
}

function postToy(toy) {
  const toy_obj = {
    name: toy.name.value,
    image: toy.image.value,
    likes: 0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy_obj)
  })
  .then(res => res.json())
  .then(obj => createCard(obj))
}


function likeToy(toy) {
  toy.preventDefault()
  // console.log(toy)
  const likes_par = document.getElementById(`p-${toy.target.id}`)
  let current = likes_par.innerText.split(' ')[0]
  console.log(current)
  let newCount = parseInt(current) + 1
  console.log(newCount)
  
  const likes_obj = {
    likes: newCount
  }
  fetch(`http://localhost:3000/toys/${toy.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify(likes_obj)
  })
  .then(res => res.json())
  .then((obj => {
    likes_par.innerText = `${obj.likes} likes`;
  }))

  
  
}

function renderToys(toys) {
  
  for (const toy of toys) {
    createCard(toy)
   
  }
}

function createCard(toy) {
  const toyDisplay = document.getElementById('toy-collection');
  
  const toyCard = document.createElement('div');
  toyCard.className = "card";
  toyDisplay.appendChild(toyCard);
  
  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  toyCard.appendChild(img)
  
  const name = document.createElement('h2')
  name.innerHTML = toy.name
  toyCard.appendChild(name)

  const likes = document.createElement('p')
  likes.innerHTML = `${toy.likes} likes`
  likes.setAttribute('id', `p-${toy.id}`) 
  toyCard.appendChild(likes)

  const button = document.createElement('button')
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  button.setAttribute('id', toy.id)
  toyCard.appendChild(button)
  button.addEventListener('click', e => { 
    // debugger;
    likeToy(e)
  })
  
}