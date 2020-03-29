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
                    const reviewContents = data[0];
                    // all relevent html elements are updated
                    name.innerHTML = reviewContents.name;
                    colour.innerHTML = reviewContents.colour;
                    sum.innerHTML = reviewContents.summary;
                    body.innerHTML = reviewContents.body;
                    if (reviewContents.age == "mature") {
                        age.innerHTML = "mature cat"
                    } else {
                        age.innerHTML = reviewContents.age
                    }
                    if (reviewContents.gender == "boy") {
                        pronounUpper.innerHTML = "He";
                        pronounLower.innerHTML = "he";
                        gender.innerHTML = "male";
                    } else {
                        pronounUpper.innerHTML = "She";
                        pronounLower.innerHTML = "she";
                        gender.innerHTML = "female";
                    }
                    displayStars(sstars, reviewContents.sstars);
                    displayStars(pstars, reviewContents.pstars);
                    displayStars(cstars, reviewContents.cstars);
                    displayStars(astars, reviewContents.astars);
                    displayStars(hstars, reviewContents.hstars);
                    displayOverall(overall, parseFloat(reviewContents.overall));
                });
            } else {
                console.log("There was a problem with backend")
            }
        })
};

displayRandom()