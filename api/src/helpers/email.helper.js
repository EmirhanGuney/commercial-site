import { withErrorHandling } from "../utils/errorHandler.js";
import ApiError from "../utils/apiError.js";
import CONFIGS from "../config/config.js";
import nodemailer from "nodemailer";

const mailBuilder = withErrorHandling(async (email, subject, context) => {
    const transporter = nodemailer.createTransport({
        host: CONFIGS.MAIL.mailHost,
        port: CONFIGS.MAIL.mailPort,
        secure: false,
        auth: {
            user: CONFIGS.MAIL.user,
            pass: CONFIGS.MAIL.password, 
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailOptions = {
        from: CONFIGS.MAIL.user,
        to: email,
        subject: subject,
        html: context, 
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(error);
        throw ApiError.internalServerError("An error occurred while sending the email");
    }
})

export const sendLoginKeyUrlToEmail = withErrorHandling(async (email, loginKey) => {

    const loginUrl = `https://nanocamkesmemakinesi.com/set-password/?email=${email}&key=${loginKey}`;

    const context = `
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Şifre Sıfırlama</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    max-width: 500px;
                    margin: auto;
                }
                img {
                    max-width: 150px;
                    margin-bottom: 20px;
                }
                a {
                    display: inline-block;
                    background: #2e3a4d;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 10px;
                }
                a:hover {
                    background: #2e3a4d;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <img
                    src="https://nanocamkesmemakinesi.com/src/assets/logo3.jpg"
                    alt="Logosu"
                />
                <h2>Merhaba,</h2>
                <p>
                    Lütfen şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:
                </p>
                <a
                    href="${loginUrl}"
                    >Şifreyi Sıfırla</a
                >
                <p>Eğer bunu talep etmediyseniz, lütfen bu e-postayı dikkate almayın.</p>
                </div>
            </body>
            </html>
    `
    mailBuilder(email, "Şifre Sıfırlama Talebi", context);
})
