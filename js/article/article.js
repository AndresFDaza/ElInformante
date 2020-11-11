class Article {
  constructor() {
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
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
        console.log(`Id del post => ${refDoc.id}`);
      })
      .catch((error) => {
        console.error(`Error creando el post => ${error}`);
      });
  }
}
