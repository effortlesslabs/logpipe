import AWS from "aws-sdk";

const accessKey = process.env.SES_AWS_ACCESS_KEY_ID;
const secretKey = process.env.SES_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  region: "ap-southeast-1",
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

function sendEmail(rawParams: AWS.SES.SendEmailRequest) {
  const ses = new AWS.SES({ apiVersion: "2010-12-01" });

  return new Promise((resolve, reject) => {
    ses.sendEmail(rawParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log(data);
        resolve(data);
      }
    });
  });
}

type Options = {
  to: string;
  authCode: string;
};

async function sendMagicLink(options: Options) {
  const fromAddress = "nasim@flashwallet.app";
  const subject = "Your OTP to Login and Use Dobbee";

  const htmlBody = `
        <p>Dear Master!,</p>
        <p>Dobbee is very honored to help you today! To keep everything safe and secure, Dobbee has generated a special One-Time Password (OTP) just for you.<br/> Please use this OTP to log in and start using Dobbee:</p>
        <p><strong>Your OTP: ${options.authCode}</strong></p>
        <p>This OTP is valid for the next 10 minutes, so please be quick, master! If you did not request this, please do not worry; your account is still safe and sound.<br/> Dobbee is always here to help with any questions or concerns.</p>
        <p>Thank you for trusting Dobbee! It is always a pleasure to assist you.</p>
        <p>With utmost loyalty,<br>Dobbee, Your Humble AI Assistant</p>

    `;

  const params = {
    Destination: {
      ToAddresses: [options.to],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
  };

  return await sendEmail(params);
}

export default sendMagicLink;
