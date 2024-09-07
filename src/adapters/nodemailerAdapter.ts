import nodemailer from 'nodemailer';
import { EmailConfirmationType } from '../models/UserModel';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const getEmailBody = (template: string, confirmationCode: string): string => {
  return template.replace('{{your_confirmation_code}}', confirmationCode);
};

export const nodemailerAdapter = {
  async sendEmail(to: string, confirmationCode: string, emailTemplate: EmailConfirmationType): Promise<void> {
    const mailOptions = {
      from: {
        name: 'BLOG',
        address: process.env.EMAIL_USER as string,
      },
      to: to,
      subject: emailTemplate.subject,
      html: getEmailBody(emailTemplate.body, confirmationCode)
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
};

// Email template example
export const emailManager = {
  registrationEmail: {
    subject: 'Confirm Your Registration',
    body: `
   <h1>Thank for your registration</h1>
      <p>To finish registration please follow the link below:
      <a href='https://somesite.com/confirm-email?code={{your_confirmation_code}}'>complete registration</a>
   </p>
    `
  }
};