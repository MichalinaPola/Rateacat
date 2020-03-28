
// THIS CODE TRANSFORMS THE DROPDOWN MENUS
var x, i, j, selElmnt, a, b, c;
// Look for any elements with the class "custom-select":
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  // For each element, create a new DIV that will act as the selected item:
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  // For each element, create a new DIV that will contain the option list:
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    // For each option, create a new DIV that will act as an option item: 
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        // When an item is clicked, update the original select box and the selected item:
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    // When the select box is clicked, close any other select boxes, and open/close current box:
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  // A function that will close all select boxes, except the current one
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

// If the user clicks anywhere outside the select box, close all select boxes:
document.addEventListener("click", closeAllSelect);


//THIS CODE DEALS WITH STAR RATINGS
const star2 = ["Sstar2", "Pstar2", "Cstar2", "Astar2", "Hstar2"]
const star3 = ["Sstar3", "Pstar3", "Cstar3", "Astar3", "Hstar3"]
const star4 = ["Sstar4", "Pstar4", "Cstar4", "Astar4", "Hstar4"]
const star5 = ["Sstar5", "Pstar5", "Cstar5", "Astar5", "Hstar5"]


function showStars() {
  //with this it knows which category we're in
  let category = this.id[0]
  // figuring out how many stars to add
  let fullStars = 1
  if (star2.includes(this.id)) {
    fullStars = 2;
  } else if (star3.includes(this.id)) {
    fullStars = 3
  } else if (star4.includes(this.id)) {
    fullStars = 4
  } else if (star5.includes(this.id)) {
    fullStars = 5
  }
  // hide the original stars
  this.parentNode.classList.toggle("hidden");
  // instead show new stars, full ones and then empty ones
  let newStars = document.createElement("DIV");
  this.parentNode.parentNode.appendChild(newStars);
  for (i = 0; i < fullStars; i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("fas", "fa-star");
    newStar.setAttribute("id", category+"star"+(i+1))
    this.parentNode.parentNode.lastChild.appendChild(newStar);
  }
  for (i = 0; i < (5 - fullStars); i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("far", "fa-star");
    newStar.setAttribute("id", category+"star"+(i+fullStars+1))
    this.parentNode.parentNode.lastChild.appendChild(newStar);
  }
  // assign event listener on them too so ratings can be changed many times
  document.querySelectorAll('.fa-star').forEach(item => {
    item.addEventListener('click', showStars)
  })
}

document.querySelectorAll('.fa-star').forEach(item => {
  item.addEventListener('click', showStars)
})

// SENDING A NEW REVIEW TO BACKEND
let beforeLook = document.getElementById("add-form-end");
let afterLook = document.getElementById("success-add-form");
let addingError = document.getElementById("user-error")
let addButton = document.getElementById("add-btn");
//elements of the review specified by the user
let name = document.getElementById("cat-name");
let colour = document.getElementById("colour");
let age = document.getElementById("age");
let gender = document.getElementById("gender");
let summary = document.getElementById("review-summary");
let sstars = document.getElementById("Sstars");
let pstars = document.getElementById("Pstars");
let cstars = document.getElementById("Cstars");
let astars = document.getElementById("Astars");
let hstars = document.getElementById("Hstars");
let body = document.getElementById("review-body");

function howManyStars (starsOuter) {
  let starsArray = starsOuter.lastChild.querySelectorAll("span");
  let starsCounter = 0
  for (const e of starsArray) {
    if (e.className.includes("fas")) {
      starsCounter = starsCounter + 1;
    }
  }
  return starsCounter;
}

function inputValid () {
  if (name.value == "" || colour.value == "colour" || age.value == "age" || 
  gender.value == "gender" || summary.value == "" || body.value == "") {
    return 0
  }
  return 1
}

addButton.addEventListener("click", function() {
  // gathering and checking user input
  let stars = [howManyStars(sstars), howManyStars(pstars), howManyStars(cstars), 
    howManyStars(astars), howManyStars(hstars)];
  let ovStars = (stars[0] + stars[1] + stars[2] + stars[3] + stars[4])/5
  if (inputValid()) {
    // sending the new review to backend
    let fetchNewReview = {
        method: 'POST',
        body: JSON.stringify({name: name.value, colour: colour.value, age: age.value, 
          gender: gender.value, summary: summary.value, sstars: stars[0], pstars: stars[1],
           cstars: stars[2], astars: stars[3], hstars: stars[4], overall: ovStars, revbody: body.value}),
        headers: {"Content-Type": "application/json"}
    }
    fetch('/new-review', fetchNewReview)
            .then(res => {
                if (res.ok){
                    beforeLook.style.display = "none";
                    addingError.style.display = "none";
                    afterLook.style.display = "flex";;
                } else {
                    console.log("There was a problem with backend")
                }
            })
    } else {addingError.style.display = "block";}
});
