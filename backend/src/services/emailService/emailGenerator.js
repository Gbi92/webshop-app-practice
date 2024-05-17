export const emailGenerator = {
  verificationTemplate(username, url) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Email</title>
    </head>
    <body>
      <h1 style="margin: 10px auto;">Welcome to Friendly Coffee!</h1>
      <h2>Dear ${username},</h2>
      <p>Thank you for registering on our site!</p>
      <div>
        <p>Please verify your email address by clicking on the link below.</p>
        <a href="${url}" style="color: #54d4bc;">Click here to verify!</a>
      </div>
      <p>-The Friendly Coffee Team</p>
    </body>
    </html>
    `;
  }
};
