let signUpBtn = document.getElementById("signUpBtn");
let loginBtn = document.getElementById("loginBtn");
let userName = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let fillInputsError = document.getElementById("fillInputsError");
let existEmailError = document.getElementById("existEmailError");
let successReg = document.getElementById("successReg");
let passwordError = document.getElementById("passwordError");
let userNameView = document.getElementById("userNameView");

let user, users;

if (!localStorage.getItem("users")) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}

if (signUpBtn) {
  signUpBtn.addEventListener("click", () => {
    if (!userName.value || !email.value || !password.value) {
      fillInputsError.classList.remove("d-none");
      setTimeout(() => {
        fillInputsError.classList.add("d-none");
      }, 3000);
    } else {
      let exist = false;
      users.forEach((eachUser) => {
        if (eachUser.email == email.value) exist = true;
      });
      if (!exist) {
        user = {
          userName: userName.value,
          email: email.value,
          password: password.value,
        };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        successReg.classList.remove("d-none");
        setTimeout(() => {
          successReg.classList.add("d-none");
        }, 3000);
      } else {
        existEmailError.classList.remove("d-none");
        setTimeout(() => {
          existEmailError.classList.add("d-none");
        }, 3000);
      }
    }
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    if (!email.value || !password.value) {
      fillInputsError.classList.remove("d-none");
      setTimeout(() => {
        fillInputsError.classList.add("d-none");
      }, 3000);
    } else {
      let exist = false,
        currentUserName = "",
        currentEmail = "",
        currentPassword = "";
      users.forEach((eachUser) => {
        if (eachUser.email == email.value) {
          exist = true;
          currentUserName = eachUser.userName;
          currentEmail = eachUser.email;
          currentPassword = eachUser.password;
          localStorage.setItem("currentUserName", currentUserName);
        }
      });
      if (!exist) {
        existEmailError.classList.remove("d-none");
        setTimeout(() => {
          existEmailError.classList.add("d-none");
        }, 3000);
      } else {
        if (currentPassword != password.value) {
          console.log(currentPassword + "\n" + password.value);
          passwordError.classList.remove("d-none");
          setTimeout(() => {
            passwordError.classList.add("d-none");
          }, 3000);
        } else {
          location.href = "../home.html";
        }
      }
    }
  });
}

// home
if (userNameView)
  userNameView.innerHTML = localStorage.getItem("currentUserName");
