
// sing-up form
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
                } if (res.status === 400) {
                    emailExists.style.display = "block";
                } else {
                    console.log("Other error occured")
                }
            })
    } else {error.style.display = "block";}
});