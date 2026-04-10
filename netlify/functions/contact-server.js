const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nyembojordy@gmail.com",          // ton adresse Gmail
      pass: "yxtb sjee kgpo wlpc"       // le mot de passe d’application généré
    }
  });

  let mailOptions = {
    from: email,
    to: "nyembojordy@gmail.com",              // ton adresse pour recevoir le message
    subject: `Nouveau message de ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message envoyé avec succès !");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l’envoi du message.");
  }
});

app.listen(3000, () => {
  console.log("Serveur backend démarré sur http://localhost:3000");
});
