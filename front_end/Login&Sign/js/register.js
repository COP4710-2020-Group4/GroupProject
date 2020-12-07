const myForm = document.getElementById("registration-form")
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const username = document.getElementById("username");
  const mobile = document.getElementById("phone-no");
  const password = document.getElementById("password");
  // const confirm_password = document.getElementById('confirm_password')
  const url = "http://localhost:8080";

const submitForm = (event)=> {
     event.preventDefault()

 fetch(`${url}/createuser`, {
   // mode: "no-cors",
   method: "POST",
   headers: {
     Accept: "application/json, text/plain, */*",
     "content-type": "application/json",
   },
   // credentials: "include",
   body: JSON.stringify({
     first_name: firstname.value,
     last_name: lastname.value,
     email: email.value,
     username: username.value,
     phoneNumber: mobile.value,
     password: password.value,
     // confirm_password: confirm_password.value
   }),
 })
   .then((res) => res.json())
   .then((res) => {
                if (res.success & res.token) {
             alert('user created successfully')
             localstorage.setItem('token', res.token)
             localStorage.setItem("user", res.data);
             window.location.href = "./profile.html";
           } else if (res.status === "invalid username") {
             console.log("error", res.status);

           }
         })
         .catch((err) => console.log("error occurred", err));

};


myForm.addEventListener("submit", submitForm)
