let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  toggleForm()
  listenToFormSubmit()
});

function toggleForm (){
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


function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function listenToFormSubmit () {

  const toyForm = document.querySelector(".add-toy-form")
  
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const toyNameInput = e.target.name
    const imgUrlInput = e.target.image
    
    const name = toyNameInput.value
    const img = imgUrlInput.value
    
    postToy(name, img)
    toyNameInput.value = ""
    imgUrlInput.value = ""
  })
}

function listenToLikeButton(){
  const likeButton = document.querySelectorAll("."
  )
}

function postToy(name, img){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
        "name": name,
        "image": img,
        "likes": 0
       })
  
    })
  
}





// //POST http://localhost:3000/toys
// headers: 
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
 
// body: 