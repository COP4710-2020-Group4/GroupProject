
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");
const url = "http://localhost:8080";



const login = (event) => {
  event.preventDefault();

  fetch(`${url}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {

             if (res.success & res.token) {
              localstorage.setItem('token', res.token)
            }
            else if (res.failure || res.status === "wrong user or pass") {
              console.log("error", res.status);

            }
          })
          .catch((err) => console.log("error occurred", err));
};

document.getElementById("login-form").addEventListener("submit", login);
