const name = document.getElementById("name");
const pronounUpper = document.getElementById("pronoun-upper");
const colour = document.getElementById("colour");
const gender = document.getElementById("gender");
const pronounLower = document.getElementById("pronoun-lower");
const age = document.getElementById("age");
const sum = document.getElementById("summary");
const body = document.getElementById("review-body");
const sstars = document.getElementById("sstars");
const pstars = document.getElementById("pstars");
const cstars = document.getElementById("cstars");
const astars = document.getElementById("astars");
const hstars = document.getElementById("hstars");
const overall = document.getElementById("overall-stars");


// displaying the correct number of stars
function displayStars(starsDiv, value) {
    const starsArray = Array.from(starsDiv.querySelectorAll("span"));
    const fullStarsArray = starsArray.slice(0, value);
    for (const e of fullStarsArray) {
        e.classList.remove('far');
        e.classList.add('fas');
        }
}

// displaying overall score in stars 
function displayOverall (overall, value) {
    displayStars(overall, Math.floor(value));
    const decimal = value - Math.floor(value);
    if (decimal >= 0.5) {
        const theStar = Array.from(overall.querySelectorAll("span"))[Math.floor(value)];
        theStar.classList.remove('fa-star', 'far');
        theStar.classList.add('fa-star-half-alt', 'fas');
    }
}

// requesting data from the database
function displayRandom() {
    fetch('/random-review')
        .then(res => {
            if (res.ok){
                res.json().then(function(data) {
                    const reviewContents = data[0]
                    // This works! I need to adjust the rest of markup and stars too
                    name.innerHTML = reviewContents.name;
                    console.log(reviewContents)
                });
            } else {
                console.log("There was a problem with backend")
            }
        })
};

displayRandom()