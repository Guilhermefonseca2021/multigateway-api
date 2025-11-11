import "dotenv/config"

const config = {
    port: process.env.PORT,
    auth: `removeAuth: ${process.env.REMOVE_AUTH}`,
    jwt_secretKey: process.env.JWT_SECRET
}
 
export default config;