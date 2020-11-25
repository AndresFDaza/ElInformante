$(() => {
  //initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //cargar articulos de la base de datos
  const consulta = new Article();
  consulta.consultarArticulos();

  //mostrar modal de inicio sesion
  const userInitButton = document.getElementById("btnInicioSesion");
  const userSignIn = document.getElementById("ModalSesion_btnInicioSesion")
  const vistaModalIniciarSesion = document.getElementById("ModalSesion");

  userInitButton.addEventListener("click", () => {
    vistaModalIniciarSesion.classList.add("modal--mostrar");
  });

  userSignIn.addEventListener("click", () => {
    vistaModalIniciarSesion.classList.remove("modal--mostrar");
  });

  vistaModalIniciarSesion.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal--mostrar"))
      vistaModalIniciarSesion.classList.remove("modal--mostrar");
  });

  //mostrar modal de registro

  const userRegisterButton = document.getElementById("btnRegistro");
  const registerDataButton = document.getElementById("btnRegistrarDatos")
  const vistaModalRegistrarse = document.getElementById("ModalRegistro");

  userRegisterButton.addEventListener("click", () => {
    vistaModalIniciarSesion.classList.remove("modal--mostrar");
    vistaModalRegistrarse.classList.add("modal--mostrar");
  });

  registerDataButton.addEventListener("click", () => {
    vistaModalRegistrarse.classList.remove("modal--mostrar");
  })

  vistaModalRegistrarse.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal--mostrar"))
      vistaModalRegistrarse.classList.remove("modal--mostrar");
  });

  // mostrar modal de publicacion
  const createButton = document.getElementById("CreateArticleButton");
  const vistaModalCreate = document.getElementById("ModalCreate");

  createButton.addEventListener("click", () => {
    vistaModalCreate.classList.add("modal--mostrar");
  });

  vistaModalCreate.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal--mostrar"))
      vistaModalCreate.classList.remove("modal--mostrar");
  });
});
