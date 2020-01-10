
// sing-up form
let initial = document.getElementById("before-sing-up");
let success = document.getElementById("success");
let submit = document.getElementById("sing-up-btn");
let email = document.getElementById("email");
let error = document.getElementById("sign-up-error")

submit.addEventListener("click", function() {
    event.preventDefault();
    if (email.value == null || email.value == "") {
        error.style.display = "block";
    } else {
        let fetchData = {
            method: 'POST',
            body: JSON.stringify({email: email.value}),
            headers: {"Content-Type": "application/json"}
        }
        console.log(fetchData);
        fetch('/sign-up', fetchData)
            .then(res => {
                if (res.ok){
                    console.log("response ok")
                } else {
                    console.log("error occured")
                }
            })
        initial.style.display = "none";
        success.style.display = "block";
    }
});