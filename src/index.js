// write your code here

document.addEventListener('DOMContentLoaded', () => {
  getRamenData();
})

function getRamenData() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(data => showRamenData(data))
}

function showRamenData(ramenArray) {
  const ramenMenu = document.getElementById('ramen-menu');
  ramenArray.map(ramen => {
    const ramenImage = document.createElement('img');
    ramenImage.src = ramen.image;
    ramenMenu.append(ramenImage);
  })
  clickRamenImg(ramenArray, ramenMenu);
}

function clickRamenImg(ramenArray, ramenMenu) {
  const menuArray = [...ramenMenu.childNodes];
  const menuImages = menuArray.slice(3);
  menuImages.map(image => image.addEventListener('click', e => handleClickRamenImg(e, ramenArray)));
}

function handleClickRamenImg(e, ramenArray) {
  console.log(e.target.src);
  console.log(ramenArray);
  const ramenDetailDiv = document.getElementById('ramen-detail');
  console.log(ramenDetailDiv);
  ramenDetailDiv.querySelector('img').src = e.target.src
}

// add all the ramen info to the #ramen-detail div
// image -> .detail-image img
// name -> .name h2
// restaurant -> .restaurant h3
// rating -> #rating-display span
// comment -> #comment-display p



// Click on an image from the #ramen-menu div and see all the info about that ramen displayed inside the #ramen-detail div and where it says insert comment here and insert rating here.
// Create a new ramen after submitting the new-ramen form. The new ramen should be added to the#ramen-menu div. The new ramen does not need to persist; in other words, if you refresh the page, it's okay that the new ramen is no longer on the page.


// See the details for the first ramen as soon as the page loads (without clicking on an image)
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