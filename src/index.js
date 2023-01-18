let addToy = false;

let url = "http://localhost:3000/toys"

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



});

const toyCollection = document.querySelector('#toy-collection');

function renderToyData(toyData){
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const likes = document.createElement("p");
  likes.textContent = `${toyData.likes} likes`;
  const toyName = document.createElement("h2");
  toyName.textContent = toyData.name;
  const image = document.createElement("img");
  image.setAttribute("src", toyData.image);
  image.classList.add("toy-avatar");
  const button = document.createElement("button");
  button.classList.add("like-btn");
  button.dataset.id = toyData.id;
  button.textContent = "Like ❤️";

  button.addEventListener("click", (e) => {
    console.log("click");
    fetch(`${url}/${toyData.id}`, {
      method: "PATCH",
      headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": parseInt(toyData.likes = toyData.likes + 1)
        })
    })
    .then(response => response.json())
    .then(likes.textContent = `${toyData.likes} likes`)
  })

  toyCollection.appendChild(cardDiv);

  cardDiv.append(toyName, image, likes, button);
}

fetch(url)
.then(response => response.json())
.then(toyData => {
  console.log(toyData);
  toyData.forEach(renderToyData);
})

const createToyBtn = document.querySelector(".add-toy-form");
console.log(createToyBtn);

createToyBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  // debugger;
  fetch(url, {
    method: "POST",
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify({
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": parseInt(0)
    })
  })
  .then(res => res.json())
  .then(data => renderToyData(data))
})



// const likeBtn = document.querySelector(".like-btn");
// console.log(likeBtn);

// likeBtn.addEventListener("click", (e) => {
//   console.log("click");
//   fetch(url + toys.id, {
//     method: "PATCH",
//     headers:
//       {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "likes": parseInt(e.target.likes++)
//       })
//   })
// })