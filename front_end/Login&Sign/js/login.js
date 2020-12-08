const login_username = document.getElementById("userNameLogin");
const login_password = document.getElementById("passwordLogin");
const login_url = "http://localhost:8080";



const login = (event) => {
  //console.log("Logging In");
  let options = {
          method: "POST",
          headers: {
              Accept: "application/json, x-www-form-urlencoded, text/plain, */*",
              "Content-Type": "aplication/x-www-form-urlencoded",
          },
          body: JSON.stringify({
              username: login_username.value,
              password: login_password.value,
          })};
  //console.log(options);

  fetch(`${login_url}/api/login`, options)
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      if (res.success & res.token) {
        localstorage.setItem('token', res.token)
        window.location.href = "./main.html";
      } else if (!res.success || res.status === "Wrong user or pass") {
        console.log("error", res.status);

      }
    })
    .catch((err) => console.log("error occurred", err));
};
