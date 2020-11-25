$(() => {
  const objAuth = new Autenticacion();

  // resset all register values

  $("#btnRegistro").click(() => {
    $("#ModalRegistro-input-nombre").val("");
    $("#ModalRegistro-input-correo").val("");
    $("#ModalRegistro-input-contrasena").val("");
  });

  // resset all sign in values

  $("#btnInicioSesion").click(() => {
    $("#ModalSesion__correo-input").val("");
    $("#ModalSesion__contrasena-input").val("");
  });

  //registrar datos en db
  $("#btnRegistrarDatos").click(() => {
    const nombres = $("#ModalRegistro-input-nombre").val();
    const email = $("#ModalRegistro-input-correo").val();
    const password = $("#ModalRegistro-input-contrasena").val();
    const auth = new Autenticacion();
    auth.crearCuentaEmailPass(email, password, nombres);
  });

  //iniciar sesion
  $("#ModalSesion_btnInicioSesion").click(() => {
    const email = $("#ModalSesion__correo-input").val();
    const password = $("#ModalSesion__contrasena-input").val();
    const auth = new Autenticacion();
    auth.autEmailPass(email, password);
  });

  // autenticar con google
  $("#ModalSesion__btn-InicioSesionGoogle").click(() => objAuth.authCuentaGoogle());
  $("#ModalRegistro__btn-InicioSesionGoogle").click(() => objAuth.authCuentaGoogle());

  //cerrar sesion

});
