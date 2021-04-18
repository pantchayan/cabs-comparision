let nodemailer = require("nodemailer");
let fs = require("fs");
async function gmailsend(email) {
  try {
    myEmail = "pantchayan@gmail.com";
    pwd = fs.readFileSync("../password.txt", "utf-8");
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, //587 for false
      secure: true, // use SSL
      service: "gmail",
      auth: {
        user: myEmail,
        pass: pwd,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let message = {
      from: myEmail,
      to: email,
      subject: "Cab comparison",
      text: "Here is your result!",
      attachments: [
        {
          filename: "result.pdf",
          path: `./data/results.pdf`,
        },
      ],
    };
    transport.sendMail(message, function (err) {
      if (err) {
        console.log("Failed to send email.\n" + err.message);
        return;
      }
      console.log(`Email sent to ${email} \n check your email.`);
    });
  } catch (err) {
    console.log("ERROR CAUGHT IN notification.js> gmailsend()  \n", err);
  }
}

let whatsappNotify = (email) => {
  // ACe4fc7777dc740b05ab7194cc75ccd7eb -- > sid
  // 8dfc2054001344e1bc055d371b8fbe5b -- > token
  const accountSid = "ACe4fc7777dc740b05ab7194cc75ccd7eb";
  const authToken = fs.readFileSync("../token.txt", "utf-8");

  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Your cab comparison has been mailed to you. Please check your email: ${email}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919560368433",
    })
    .then((message) => console.log())
    .catch((err) => {
      console.log("ERROR CAUGHT IN notification.js> whatsappNotify()",err);
    });
};

module.exports.gmailsend = gmailsend;
module.exports.whatsappNotify = whatsappNotify;
