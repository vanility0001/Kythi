import mailer from 'nodemailer';
import {User} from '../Models/User';

const mailInfo = JSON.parse(process.env.MAIL_INFO);
const transporter = mailer.createTransport(mailInfo);

/**
  Sends an email to the user with a verification link.
  @param {User} user The user to send the email to.
  @return {boolean | Promise<mailer.SentMessageInfo>} The result
*/
export function sendVerifyMail(
    user: User,
): boolean | Promise<mailer.SentMessageInfo> {
  if (
    !user.verificationCode ||
    user.verified ||
    user.verifiedAt !== null ||
    !user.email
  ) {
    return false;
  }

  const mailOptions = {
    from: mailInfo.auth.user,
    to: user.email,
    subject: 'Verify your email',
    html: `Hey ${user.username}!<br><br>Thank you for your intrest in using our serivces. To complete your registration, please verify your email by clicking the link below.<br><br>${process.env.HOST}verify/${user.verificationCode}<br><br>Thanks,<br>The Developer Team at Kythi ❤️<br><br><small>If you did not request this email, feel free to ignore it.</small>`,
  };

  return transporter.sendMail(mailOptions);
}
