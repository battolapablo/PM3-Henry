import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export const sendConfirmationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: "pablod_ferrero@hotmail.com",
      pass: "uyrt jyqg jvfq nien",
    },
  });

  const mailOptions = {
    from: "pablod_ferrero@hotmail.com",
    to: email,
    subject: "Confirma tu cuenta",
    text: `Por favor confirma tu cuenta haciendo clic en el siguiente enlace: 
    http://localhost:3000/confirm/${token}`,
    html: `
    <html>
      <body style="margin: 0; padding: 0; text-align: center; background-color: #f4f4f4;">
        <div style="width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #ffffff;">
          <div style="text-align: center;">
            <img src="https://img.freepik.com/premium-vector/ok-green-sign-icon-web-app-check-mark-sign-vector-stock-illustration_100456-5938.jpg" alt="Imagen de Confirmación" style="width: 100%; max-width: 600px; height: auto;" />
            <h1 style="margin: 20px 0; color: #333333;">¡Gracias por registrarte a BATTO Salud Integral!</h1>
            <p style="font-size: 18px; color: #666666;">Hemos recibido tu registro. Para confirmar tu cuenta, por favor haz clic en el siguiente enlace:</p>
            <a href="http://localhost:3000/confirm/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirmar cuenta</a>
            <p style="font-size: 16px; color: #666666;">Si no te registraste en nuestro sitio, por favor ignora este mensaje.</p>
          </div>
        </div>
      </body>
    </html>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado");
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};

export const generateConfirmationToken = (userId: string): string => {
  const token = jwt.sign({ userId }, "tu-secreto", { expiresIn: "1h" });
  return token;
};