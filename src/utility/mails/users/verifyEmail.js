const emailVerificatinMail = ({ fullName, verifyLink }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Email</title>
  </head>
  <body>
    <h2>Email Verification Link</h2>
    <p>
      Hello ${fullName.firstName}
      <br/>
      We recieved a request you want to verify your mail. This is a 
      great step.
      <br />
      Here is the verification link.
      <br/>

      <a href="${verifyLink}" style="background-color:blue;padding:0.3rem;border-radius:0.3rem;">Link</a>
    <br/>
    Copy the link and paste in the URL if the above link doesn't work
    <br>
    ${verifyLink}
    <br/>
    <b>Regards</b>
    <br />
    <b>Team BlogsEra</b>
  </body>
</html>
`;
};

export default emailVerificatinMail;
