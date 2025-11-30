const recoverPasswordMail = async ({ fullName, verifyLink }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recover your password</title>
  </head>
  <body>
    <h2>Reset Password Link</h2>
    <p>
      Hello ${fullName.firstName}
      <br/>
      To change your password, click this link.
      <br />
      <a href="${verifyLink}" style="background-color:blue;padding:0.3rem;border-radius:0.3rem;">Link</a>
    <br/>
    <b>OR</b>
    <br/>
    Copy the link and paste in the URL if the above link doesn't work
    <br>
    ${verifyLink}
    <br/>
    <b>Regards</b>
    <br />
    <br />
    <br />
    <br />
    <b>DEVANSH RAGHUWANSHI</b>
    <p>Regional Sales Executive</p>
    <b>BlogsEra</b>
  </body>
</html>
`;
};

export default recoverPasswordMail;
