const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    const { name, email, message } = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // défini dans Netlify
        pass: process.env.GMAIL_PASS  // défini dans Netlify
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.GMAIL_USER,
      subject: `Nouveau message de ${name}`,
      text: message
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message envoyé avec succès !" })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur lors de l'envoi", error: error.message })
    };
  }
};
