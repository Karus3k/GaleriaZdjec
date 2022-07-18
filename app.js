const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup__arrow--left");
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const schowNextImg = () => {
  if (currentImgIndex === THUMBNAILS.length - 1) {
    currentImgIndex = 0;
  } else {
    currentImgIndex++;
  }
  POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};
const schowPreviousImg = () => {
  if (currentImgIndex === 0) {
    currentImgIndex = THUMBNAILS.length - 1;
  } else {
    currentImgIndex--;
  }
  POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};
const closePopup = () => {
  POPUP.classList.add("fade-out");
  setTimeout(() => {
    POPUP.classList.add("hidden");
    POPUP.classList.remove("fade-out");
    THUMBNAILS.forEach((element) => {
      element.setattribute("tabindex", 1);
    });
  }, 300);
};

THUMBNAILS.forEach((thumbnail, index) => {
  let showPopup = (e) => {
    POPUP.classList.remove("hidden");
    POPUP_IMG.src = e.target.src;
    currentImgIndex = index;
    THUMBNAILS.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });
  };
  thumbnail.addEventListener("click", showPopup);

  thumbnail.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.keyCode == 13) {
      showPopup(e);
    }
  });
});

POPUP_CLOSE.addEventListener("click", closePopup);
ARROW_RIGHT.addEventListener("click", schowNextImg);
ARROW_LEFT.addEventListener("click", schowPreviousImg);

document.addEventListener("keydown", (e) => {
  if (!POPUP.classList.contains("hidden")) {
    if (e.code === "ArrowRight" || e.keycode === 39) {
      schowNextImg();
    }
    if (e.code === "ArrowLeft" || e.keycode === 37) {
      schowPreviousImg();
    }
    if (e.code === "Escape" || e.keycode === 27) {
      closePopup();
    }
  }
});
POPUP.addEventListener("click", (e) => {
  if (e.target === POPUP) {
    closePopup();
  }
});
