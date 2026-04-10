// test-mail.js
const nodemailer = require("nodemailer");

async function sendTestMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nyembojordy@gmail.com",          // ton adresse Gmail
      pass: "yxtb sjee kgpo wlpc"       // le mot de passe d’application généré
    }
  });

  let mailOptions = {
    from: "nyembojordy@gmail.com",
    to: "nyembojordy@gmail.com",              // tu te l’envoies à toi-même
    subject: "Test d’envoi Nodemailer",
    text: "Ceci est un test pour vérifier que la configuration fonctionne."
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message envoyé :", info.response);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

sendTestMail();
