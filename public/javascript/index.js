
// SING UP FORM
let initial = document.getElementById("before-sing-up");
let success = document.getElementById("success");
let submit = document.getElementById("sing-up-btn");
let email = document.getElementById("email");
let error = document.getElementById("sign-up-error")
let emailExists = document.getElementById("email-already-exists")

function emailIsValid (emailAddress) {
  return /\S+@\S+\.\S+/.test(emailAddress)
}

submit.addEventListener("click", function() {
    event.preventDefault();
    if (emailIsValid(email.value)) {
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email: email.value}),
            headers: {"Content-Type": "application/json"}
        }
        fetch('/sign-up', fetchData)
            .then(res => {
                console.log(res);
                if (res.ok){
                    console.log("response ok")
                    initial.style.display = "none";
                    success.style.display = "block";
                } 
                 if (res.status === 409) {
                    emailExists.style.display = "block";
                } else {
                    console.log("Unknown problem")
                }
            })
    } else {error.style.display = "block";}
});

// youtube videos
var videos = ["https://www.youtube.com/embed/EKa093BiHYo", "https://www.youtube.com/embed/W86cTIoMv2U", "https://www.youtube.com/embed/pdrtgIMlx2k",
"https://www.youtube.com/embed/XyNlqQId-nk", "https://www.youtube.com/embed/nl8o9PsJPAQ", "https://www.youtube.com/embed/CYPJzQppANo",
"https://www.youtube.com/embed/9QHp7lFT-WY", "https://www.youtube.com/embed/IYxvrSs4TYk", "https://www.youtube.com/embed/sI8NsYIyQ2A",];
var randomVideo = videos[Math.floor(Math.random()*videos.length)];
document.getElementById("video").src = randomVideo;
