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


// THIS PART DEALS WITH SEARCHING THROUGH REVIEWS
const chosenColour = document.getElementById("chosen-colour");
const chosenAge = document.getElementById("chosen-age");
const chosenGender = document.getElementById("chosen-gender");
const chosenRating = document.getElementById("chosen-rating");
const searchButton = document.getElementById("search-button");
const errorSearch = document.getElementById("error-search");

searchButton.addEventListener("click", function() {
    if (chosenColour.value == "any" || chosenAge.value == "any" || chosenGender.value == "any" || chosenRating.value == "any") {
        errorSearch.style.display = "block";
    } else {
        errorSearch.style.display = "none";
        let fetchSearch = {
            method: 'POST',
            body: JSON.stringify({colour: chosenColour.value, age: chosenAge.value, gender: chosenGender.value, rating: chosenRating.value}),
            headers: {"Content-Type": "application/json"}
        }
        fetch('/search-reviews', fetchSearch)
            .then(res => {
                if (res.ok) {
                    res.json().then(function(data) {
                        // here there might be a function to actually do something with the results
                        console.log(data);
                    })
                } else {
                    console.log("There was a problem with backend")
                }
            })
    }
});