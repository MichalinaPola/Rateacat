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
  let category = this.id[0]
  console.log(category)
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
  // instead showing new stars, full ones and then empty ones
  let newStars = document.createElement("DIV");
  this.parentNode.parentNode.appendChild(newStars);
  for (i = 0; i < fullStars; i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("fas", "fa-star", "new-star");
    newStar.setAttribute("id", category+"star"+(i+1))
    this.parentNode.parentNode.lastChild.appendChild(newStar);
  }
  for (i = 0; i < (5 - fullStars); i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("far", "fa-star", "new-star");
    newStar.setAttribute("id", category+"star"+(i+fullStars+1))
    this.parentNode.parentNode.lastChild.appendChild(newStar);
  }
  document.querySelectorAll('.fa-star').forEach(item => {
    item.addEventListener('click', showStars)
  })
}

document.querySelectorAll('.fa-star').forEach(item => {
  item.addEventListener('click', showStars)
})