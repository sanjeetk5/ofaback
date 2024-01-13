/* eslint-disable prettier/prettier */
// mailerService.js
import { Transporter, createTransport } from 'nodemailer';


class MailerService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service:'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mastersanjeetkumar@gmail.com',
        pass: 'hdlf cvof bdql oemk',
        clientId: '808242103255-o9cvhgvhaqo196r0qhhu02tkt90ala1a.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04Obolgpc9m3sCgYIARAAGAQSNwF-L9IrfEVfGVr4La25esFsBjhtclXLmfe5zUWi-ksUWFfltDtXC0RX0mEGYYT1weEZJ_DueG0'
      } as any  // Use 'as any' to bypass type checking for the time being
    });
  }

  async sendVerificationEmail(to: any, verificationLink: any) {
    const subject = 'Verify Your Email';
    const text = `Click on the following link to verify your email: ${verificationLink}`;
    const html = `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`;

    try {
      const info = await this.transporter.sendMail({ from: 'mastersanjeetkumar@gmail.com', to, subject, text, html });
      console.log('Verification email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  }
}

export default new MailerService();
