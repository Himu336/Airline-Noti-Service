const nodemailer = require('nodemailer');

const { GMAIL_EMAIL,GMAIL_PASS } = require('./server-config');

const mailsender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_EMAIL,
        pass: GMAIL_PASS
    }
});

module.exports = {
    mailsender
};