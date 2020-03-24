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

//I'll think about a smarter way of doing it, but this works for now
const Sstar1 = document.getElementById("Sstar1");
const Sstar2 = document.getElementById("Sstar2");
const Sstar3 = document.getElementById("Sstar3");
const Sstar4 = document.getElementById("Sstar4");
const Sstar5 = document.getElementById("Sstar5");
const Pstar1 = document.getElementById("Pstar1");
const Pstar2 = document.getElementById("Pstar2");
const Pstar3 = document.getElementById("Pstar3");
const pstar4 = document.getElementById("Pstar4");
const Pstar5 = document.getElementById("Pstar5");
const Cstar1 = document.getElementById("Cstar1");
const Cstar2 = document.getElementById("Cstar2");
const Cstar3 = document.getElementById("Cstar3");
const Cstar4 = document.getElementById("Cstar4");
const Cstar5 = document.getElementById("Cstar5");
const Astar1 = document.getElementById("Astar1");
const Astar2 = document.getElementById("Astar2");
const Astar3 = document.getElementById("Astar3");
const Astar4 = document.getElementById("Astar4");
const Astar5 = document.getElementById("Astar5");
const Hstar1 = document.getElementById("Hstar1");
const Hstar2 = document.getElementById("Hstar2");
const Hstar3 = document.getElementById("Hstar3");
const Hstar4 = document.getElementById("Hstar4");
const Hstar5 = document.getElementById("Hstar5");

const star2 = [Sstar2, Pstar2, Cstar2, Astar2, Hstar2]
const star3 = [Sstar3, Pstar3, Cstar3, Astar3, Hstar3]
const star4 = [Sstar4, Pstar4, Cstar4, Astar4, Hstar4]
const star5 = [Sstar5, Pstar5, Cstar5, Astar5, Hstar5]

function showStars() {
  // figuring out how many stars to add
  let fullStars = 1
  if (star2.includes(this)) {
    fullStars = 2;
  } else if (star3.includes(this)) {
    fullStars = 3
  } else if (star4.includes(this)) {
    fullStars = 4
  } else if (star5.includes(this)) {
    fullStars = 5
  }
  // hide the original stars
  this.parentNode.classList.toggle("hidden");
  // instead showing new stars, full and then empty
  // they need to be packed into a div somehow for reassignment to work
  for (i = 0; i < fullStars; i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("fas", "fa-star", "new-star");
    newStar.setAttribute("id", "star"+(i+1))
    this.parentNode.parentNode.appendChild(newStar);
    // note that this will be problematic when reassigning the stars
  }
  for (i = 0; i < (5 - fullStars); i++) {
    let newStar = document.createElement("SPAN");
    newStar.classList.add("far", "fa-star", "new-star");
    newStar.setAttribute("id", "star"+(i+fullStars+1))
    this.parentNode.parentNode.appendChild(newStar);
  }
  document.querySelectorAll('.fa-star').forEach(item => {
    item.addEventListener('click', showStars)
  })
}

document.querySelectorAll('.fa-star').forEach(item => {
  item.addEventListener('click', showStars)
})