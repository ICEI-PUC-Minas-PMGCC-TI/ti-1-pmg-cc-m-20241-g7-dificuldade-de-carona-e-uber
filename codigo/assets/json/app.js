const hamburger = document.querySelector(".hamburger");
const menuMobile = document.querySelector(".menu-mobile");
const subMenuItems = document.querySelectorAll(".sub-menu a");

hamburger.addEventListener("click", () => {
    menuMobile.classList.toggle("active");
});

// Adiciona um evento de clique a cada item do submenu
subMenuItems.forEach(item => {
    item.addEventListener("click", () => {
        menuMobile.classList.remove("active");
    });
});
