class Autenticacion {

  autEmailPass(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          $("#User").attr("src", "../../assets/icons/lector.svg");
          alert(`Hola amigo del informante, es un gusto verte por aqui`)
        } else {
          firebase.auth().signOut();
          alert(`Hola, por favor realiza la verificacion de cuenta, la hemos enviado a tu correo`)
        }
      });
  }

  crearCuentaEmailPass(email, password, nombres) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({
          displayName: nombres,
        });

        const configuracion = {
          url: "http://localhost:5500/",
        };

        result.user.sendEmailVerification(configuracion).catch((error) => {
          console.error(error);
        });

        firebase.auth().signOut();
        alert(`hola ${nombres}, por favor verifica tu cuenta con el correo que enviamos a tu email indicado `)
      })

      .catch((error) => {
        console.error(error);
        alert(`Ups... parece que los datos ingresados no son correctos, intenta de nuevo: \n
        error: ${error}`)
      });
  }

  authCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const vistaModalIniciarSesion = document.getElementById("ModalSesion")
    const vistaModalRegistrarse = document.getElementById("ModalRegistro");

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        $("#User").attr("src", result.user.photoURL);
        vistaModalIniciarSesion.classList.remove("modal--mostrar");
        vistaModalRegistrarse.classList.remove("modal--mostrar");
        alert(`Bienvenido ${result.user.displayName} !! `, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  }

}
