export const CONFIGS = {
    Port: process.env.PORT,
    DB_URI: process.env.DB_URI,
    ACCESS_SECRET: process.env.ACCESS_SECRET,
    URL_SECRET: process.env.URL_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    SUPER_ADMIN: {
        username: process.env.SUPER_ADMIN_USERNAME,
        password: process.env.SUPER_ADMIN_PASSWORD
    },
    MAIL: {
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        reportEmail: process.env.REPORT_EMAIL,
        mailHost: "smtp.gmail.com",
        mailPort: 587,
    }
}

export default CONFIGS;