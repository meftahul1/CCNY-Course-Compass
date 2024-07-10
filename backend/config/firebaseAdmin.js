const admin = require('firebase-admin');
require('dotenv').config({path: './config/.env'});

const serviceAccount = {
    "type": "service_account",
    "project_id": "csc318-finalproject-logindb",
    "private_key_id": process.env.private_key_id,
    "private_key": process.env.private_key,
    "client_email": "firebase-adminsdk-v1mb5@csc318-finalproject-logindb.iam.gserviceaccount.com",
    "client_id": process.env.client_id,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-v1mb5%40csc318-finalproject-logindb.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
console.log(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
