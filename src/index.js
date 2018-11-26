const addBtn = document.querySelector('#new-recipe-btn')
const recipeForm = document.querySelector('.container')
let addRecipe = false

//FETCH RECIPES ON PAGE LOAD
document.addEventListener('DOMContentLoaded', getRecipes)

let recipeCollection = document.querySelector('#recipe-collection')



// GET DATA FROM JSON FILE
function getRecipes(){
  return fetch('http://localhost:3000/recipes').then(res => res.json())
  .then(json =>{
    json.forEach(recipe => {
      makeRecipe(recipe)
    })
  })
}

//ADD NEW RECIPE WITH BUTTON CLICK
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addRecipe = !addRecipe
  if (addRecipe) {
    recipeForm.style.display = 'block'
    document.addEventListener('submit', getRecipeData)
  } else {
    recipeForm.style.display = 'none'
  }
})

//MAKE A NEW RECIPE AND APPEND IT
function makeRecipe(recipe){
  recipeCollection.innerHTML +=
  `<div class="card" >
  <h2>${recipe.name}</h2>
  <img src="${recipe.image}" class = "recipe-avatar">
  <p data-likes='${recipe.likes}'>${recipe.likes} likes</p>
  <p>${recipe.Ingredients}</p>
  <p>${recipe.directions}</p>
  <p>${recipe.source}</p>
  <button class='like-btn' data-id='${recipe.id}'> Like </button>
  </div>`

}

// function likeButton(e){
//   if (event.target.className === 'like-btn'){
//     const button = event.target
//     const div = button.parentElement
//     const p = div.querySelector(`p`)
//
//   }
// }

document.addEventListener('click', increaseLikes)

// ADD LIKES (NOT WORKING)
function increaseLikes(event) {
  if (event.target.tagName === "like-btn") {
    // patch request likes
    const button = event.target
    const parent = button.parentElement
    const likeEl = parent.querySelector('p')
    let likes = parseInt(event.target.dataset.likes)
    likeEl.innerText = `${likes + 1} Likes`
    event.target.dataset.likes = likes + 1
    const data = {
      "likes": likes + 1
    }
    updateLikes(data, event.target.dataset.id)
    .then(console.log)
  }
}




//PREVENT REFRESH AND GET DATA FROM USER FOR THEIR RECIPE
function getRecipeData(e){
  e.preventDefault();
// console.log(e);
  let name = document.querySelector('input[name="name"]')
  let imagesource = document.querySelector('input[name="image"]')
  let obj = {name: name, image: imagesource}
  createNewRecipe(obj)
  }


//POST RECIPE TO PAGE
function createNewRecipe(data){
  return fetch('http://localhost:3000/recipes', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json()).then(makeRecipe)
}


//DELETE RECIPE
