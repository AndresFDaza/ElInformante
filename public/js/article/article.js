class Article {
  constructor() {
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
    // const convierteFecha = new Utilidad()
  }

  crearArticle(
    uid,
    emailUser,
    title,
    intro,
    text,
    imageLink,
    videoLink,
    section,
    category
  ) {
    return this.db
      .collection("articles")
      .add({
        uid: uid,
        autor: emailUser,
        titulo: title,
        introduccion: intro,
        texto: text,
        imagenLink: imageLink,
        videoLink: videoLink,
        seccion: section,
        etiqueta: category,
        fecha: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((refDoc) => {
        console.log(`Id del article => ${refDoc.id}`);
      })
      .catch((error) => {
        console.error(`Error creando el article => ${error}`);
      });
  }

  subirImagenArticle(file, uid) {
    const refStorage = firebase.refStorage.ref(`imgArticle/${uid}/${file.name}`)
    const task = refStorage.put(file)

    task.on('state_changed',
      snapshot => {
        const porcentaje = snapshot.bytesTransferred(snapshot.totalBytes * 100)
      },
      err => {
        console.error(`Hubo un error subiendo el archivo (err:${err})`)
      },
      () => {
        task.snapshot.ref.getDownloadURL()
          .then(url => {
            console.log(url)
            sessionStorage.setItem("imgNewArticle", url)
          }).catch(err => {
            console.error(`No se ha logrado guardar el archivo en storage (err:${err})`)
          })
      }
    )

  }

  consultarArticulos() {
    this.db.collection("articles").orderBy('fecha', 'desc').onSnapshot((querySnapshot) => {
      $("#publicarLatestNews").empty();
      if (querySnapshot.empty) {
        $("#publicarLatestNews").append(this.obtenerTemplateArticleVacio());
      } else {
        querySnapshot.forEach((article) => {
          let articletHtml = this.obtenerArticleTemplate(
            article.data().autor,
            article.data().titulo,
            article.data().introduccion,
            article.data().texto,
            article.data().imagenLink,
            article.data().videoLink,
            article.data().seccion,
            article.data().etiqueta,
            Utilidad.obtenerFecha(article.data().fecha.toDate())
          );
          $("#publicarLatestNews").append(articletHtml);
        });
      }
    });
  }

  obtenerArticleTemplate(

    autor,
    titulo,
    introduccion,
    texto,
    imagen,
    video,
    seccion,
    etiqueta,
    //fecha
  ) {
    return `
    <article class="article__latest-news">
          <h3 class="article__title--dark">
            ${titulo}
          </h3>
          <p class="article__intro-paragraph">
            ${introduccion}
          </p>
          <p class="article__intro-paragraph">
            ${texto}
          </p>
          <span class="main__category">
            ${etiqueta}
          </span>
          <span class="main__date">
            ${autor}
          </span>
          <div class="article__button--light">LEER MÁS</div>
        </article>
    `
  }

  obtenerTemplateArticleVacio() {
    return `<article class="article">
      <div class="article-titulo">
          <h5>Bienvenido a el Informante, preparate para tener las mejores noticias</h5>
      </div>
      <div class="article-video">
          <iframe type="text/html" src='https://www.youtube.com/embed/lCquV0LYU6o'
              frameborder="0"></iframe>
      </div>
      <div class="post-descripcion">
          <p>Crea el primer Post a la comunidad</p>
      </div>
      <div class="post-footer container">
      </div>
  </article>`;
  }

}
