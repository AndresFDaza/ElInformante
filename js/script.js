// mostrar modal de publicacion
const createButton = document.getElementById("CreateArticleButton");
const vistaModal = document.getElementById("ModalCreate");

createButton.addEventListener("click", () => {
  vistaModal.classList.add("modal--mostrar");
});

vistaModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal--mostrar"))
    vistaModal.classList.remove("modal--mostrar");
});
