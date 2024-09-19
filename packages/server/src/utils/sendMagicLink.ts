import AWS from "aws-sdk";

const accessKey = process.env.SES_AWS_ACCESS_KEY_ID;
const secretKey = process.env.SES_AWS_SECRET_ACCESS_KEY;
const magicLinkUrl = process.env.MAGIC_LINK_URL;

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
        <p>Hi!,</p>
        <br></br>
        <p>We hope you're doing well!</p>
        <br></br>
        <p>To securely access your account, please use the login link below:</p>
        <br></br>
        <a href="${magicLinkUrl}/${options.authCode}">Click here to login</a>
        <br></br>
        <p>For your security, this link will expire in 10 minutes and can only be used once.</p>
        <p>If you didn't request this link, please ignore this email or contact us for assistance.</p>
        <br></br>
        <p>Best Regards</p>

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
