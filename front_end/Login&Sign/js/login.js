const login_username = document.getElementById("userNameLogin");
const login_password = document.getElementById("passwordLogin");
const url = "http://localhost:8080";



const login = (event) => {
  event.preventDefault();

  fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "aplication/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        username: login_username.value,
        password: login_password.value,
      }),
    })
    .then((res) => res.json())
    .then((res) => {

      if (res.success & res.token) {
        localstorage.setItem('token', res.token)
        window.location.href = "./main.html";
      } else if (res.failure || res.status === "wrong user or pass") {
        console.log("error", res.status);

      }
    })
    .catch((err) => console.log("error occurred", err));
};

document.getElementById("login-form").addEventListener("submit", login);
