// write your code here

document.addEventListener('DOMContentLoaded', () => {
  getRamenData();
  updateRamen();
})

function getRamenData() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => {
      const ramenDetail = document.getElementById('ramen-detail');

      ramenDetail.querySelector('img').src = data[0].image;
      ramenDetail.dataset.id = data[0].id;
      ramenDetail.querySelector('h2').textContent = data[0].name;
      ramenDetail.querySelector('h3').textContent = data[0].restaurant;
      document.getElementById('rating-display').textContent = data[0].rating;
      document.getElementById('comment-display').textContent = data[0].comment;

      showRamenData(data)
      addNewRamen(data);
    })
}

function showRamenData(ramenArray) {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';
  ramenArray.map(ramen => {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenImage.dataset.id = ramen.id;
    ramenMenu.append(ramenImage);
  })
  clickRamenImg(ramenArray, ramenMenu);
}

function clickRamenImg(ramenArray, ramenMenu) {
  const menuArray = [...ramenMenu.childNodes];
  menuArray.map(image => image.addEventListener('click', e => handleClickRamenImg(e, ramenArray)));
}

function handleClickRamenImg(e, ramenArray) {
  const imageDataId = e.target.dataset.id;
  const numImageDataId = parseInt(imageDataId);
  const currentRamen = ramenArray.find(ramen => ramen.id === numImageDataId)

  const ramenDetailDiv = document.getElementById('ramen-detail');

  ramenDetailDiv.querySelector('img').src = e.target.src
  ramenDetailDiv.dataset.id = e.target.dataset.id
  ramenDetailDiv.querySelector('h2').textContent = currentRamen.name;
  ramenDetailDiv.querySelector('h3').textContent = currentRamen.restaurant;
  document.getElementById('rating-display').textContent = currentRamen.rating;
  document.getElementById('comment-display').textContent = currentRamen.comment;
}

function addNewRamen(ramenArray) {
  
  const newRamenForm = document.getElementById('new-ramen');
  const newNameInput = document.getElementById('new-name');
  const newRestaurantInput = document.getElementById('new-restaurant');
  const newImageInput = document.getElementById('new-image');
  const newRatingInput = document.getElementById('new-rating');
  const newCommentInput = document.getElementById('new-comment');
  const createNewRamenButton = document.getElementById('btn-create');

  createNewRamenButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(ramenArray);
    let ramenMenuDiv = document.getElementById('ramen-menu');
    let ramenMenuDivArray = [...ramenMenuDiv.getElementsByTagName('img')];

    let newRamenObj = {};

    newRamenObj.name = newNameInput.value;
    newRamenObj.restaurant = newRestaurantInput.value;
    newRamenObj.image = newImageInput.value;
    newRamenObj.rating = parseInt(newRatingInput.value);
    newRamenObj.comment = newCommentInput.value;
    newRamenObj.id = ramenMenuDivArray.length + 1;

    console.log(newRamenObj);

    ramenArray.push(newRamenObj);
    console.log(ramenArray);
    showRamenData(ramenArray);
    newRamenForm.reset();
  })
}

function updateRamen() {
  const editForm = document.getElementById('edit-ramen');
  console.log(editForm);
  const updateRatingInput = document.getElementById('edit-rating');
  const updateCommentInput = document.getElementById('edit-comment');
  const updateButton = document.getElementById('btn-update');

  updateButton.addEventListener('click', (e) => {
    e.preventDefault();
    let ratingValue = document.getElementById('rating-display');
    let commentValue = document.getElementById('comment-display')

    ratingValue.textContent = updateRatingInput.value;
    commentValue.textContent = updateCommentInput.value;
    console.log(updateRatingInput.value);
    console.log(updateCommentInput.value);
    editForm.reset();
  })
}

// Update the rating and comment for a ramen by submitting a form. Changes should be reflected on the frontend. No need to persist. You can add this HTML to the index.html file to create the edit form:
// <form id="edit-ramen">
//   <h4>Update the Featured Ramen</h4>
//   <label for="rating">Rating: </label>
//   <input type="number" name="rating" id="new-rating" />
//   <label for="new-comment">Comment: </label>
//   <textarea name="new-comment" id="new-comment"></textarea>
//   <input type="submit" value="Update" />
// </form>
// Delete a ramen (you can add a "delete" button if you'd like, or use an existing element to handle the delete action). The ramen should be removed from the ramen-menu div, and should not be displayed in the ramen-detail div. No need to persist.


// You'll need a these endpoints for these advanced deliverables:
// POST /ramens
// DELETE /ramens/:id
// PATCH /ramens/:id
// As a user, I can:
// persist my updates to a ramen's rating and comment. (PATCH request)
// persist new ramens that I create (POST request)
// persist any ramen deletions (DELETE request)