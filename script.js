const cardMainElements = document.querySelectorAll(".card-main");

cardMainElements.forEach((cardMain, index) => {
  cardMain.addEventListener("click", () => {
    const cardText = cardMain.querySelector(".card-text");
    const itemName = cardText.querySelector("h3").innerHTML;
    const itemPrice = cardText.querySelector("h5").innerHTML;
    const cardImg = cardMain.querySelector(".card-img img");
    const imgSrc = cardImg.getAttribute("src");

    const selectedItem = {
      name: itemName,
      price: itemPrice,
      image: imgSrc,
    };

    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
    window.location.href = "view.html";
  });
});

function getCookie(mail) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${mail}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const userLoggedIn = getCookie("userLoggedIn");

prfHai();

const profileBtn = document.querySelector("#prof");
profileBtn.addEventListener("click", () => {
  if (!userLoggedIn) {
    alert("You are not logged in");
    window.location.href = "login.html";
  }
});

function prfHai() {
  let prfLogo = document.getElementById("prf-logo");
  if (userLoggedIn) {
    let navRight = document.getElementById("nav-right");
    prfLogo.style.display = "block";
    navRight.style.display = "none";
  }

  prfLogo.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
}


// cart item store ka ra hai



