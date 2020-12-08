const login_username = document.getElementById("userNameLogin");
const login_password = document.getElementById("passwordLogin");
const login_url = "http://localhost:8080";



const login = (event) => {
  let options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: login_username.value,
              password: login_password.value,
          })};

  fetch(`${login_url}/api/login`, options)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "success" && res.token != null) {
        window.localStorage.setItem('token', res.token);
        window.location.href = "./main.html";
        return true;
      } else if (res.status === "Wrong user or pass") {
        console.log("error", res.status);
        alert("Invalid Username or Password.");
        return false;
      }
    })
    .catch((err) => {
        console.log("error occurred", err);
        alert("Error occurred.");
        return false;
    });
};
