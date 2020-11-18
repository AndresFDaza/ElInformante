$(() => {
  // RESET ALL ARTICLE VALUES
  $("#CreateArticleButton").click(() => {
    $("#Modal__create-title-input").val("");
    $("#Modal__create-intro-input").val("");
    $("#Modal__create-text-input").val("");
    $("#linkVideoArticle").val("");
    $("#Modal__create-publicar-button").val("");
    $("#Modal__create-select-section").val("");
    $("#Modal__create-select-category").val("");
    $("#UploadImage").val("");
  });

  // Publicar articulo

  $("#Modal__create-publicar-button").click(() => {
    const vistaModal = document.getElementById("ModalCreate");

    const article = new Article();

    const uid = "admin";
    const emailUser = "developer@test.umng";
    const title = $("#Modal__create-title-input").val();
    const intro = $("#Modal__create-intro-input").val();
    const text = $("#Modal__create-text-input").val();
    const imageLink = $("#UploadImage").val();
    const videoLink = $("#linkVideoArticle").val();
    const section = $("#Modal__create-select-section").val();
    const category = $("#Modal__create-select-category").val();

    article
      .crearArticle(
        uid,
        emailUser,
        title,
        intro,
        text,
        imageLink,
        videoLink,
        section,
        category
      )
      .then(() => {
        console.log("El articulo se ha creado exitosamente!!");
        vistaModal.classList.remove("modal--mostrar");
      })
      .catch((err) => {
        console.error(`Ups, ha suscedido un error, info:${err}`);
        vistaModal.classList.remove("modal--mostrar");
      });
  });
});
