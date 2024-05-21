import logger from '../../logger';
import config from '../../config';
import mail from '@sendgrid/mail';

const sender = config.sendGridSender;
mail.setApiKey(config.sendGridApiKey);

export const emailService = {
  sendEmail(emailTo, subject, htmlContent) {
    const msg = {
      to: emailTo,
      from: {
        name: 'Friendly Coffe',
        email: sender
      },
      subject: subject,
      html: htmlContent,
    }
    mail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        logger.error(`Cannot send email due to: ${error.message}`);
        console.error(error)
      })
  }
}
