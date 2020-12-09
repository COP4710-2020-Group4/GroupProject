const myForm = document.getElementById("registration-form")
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const username = document.getElementById("username");
const mobile = document.getElementById("phone-no");
const password = document.getElementById("password");
// const confirm_password = document.getElementById('confirm_password')
const url = "http://localhost:8080";

const submitForm = (event) => {

  fetch(`${url}/api/createuser`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        first_name: firstname.value,
        last_name: lastname.value,
        email: email.value,
        username: username.value,
        phoneNumber: mobile.value,
        password: password.value,
      }),
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success" && res.token !== undefined) {
        alert('user created successfully');
        window.localStorage.setItem('token', res.token);
        window.location.href = "./Exhibition%20Center/index.html";

      } else if (res.status === "invalid username") {
        console.log("error", res.status);
        return false;
      }
    })
    .catch((err) => console.log("error occurred", err));
    return false;
};
