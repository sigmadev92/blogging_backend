const passwordResetDoneMail = ({ fullName }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Registration Successful</title>
  </head>
  <body>
    <h2>Reset Password Link</h2>
    <p>
      Hello ${fullName.firstName}
      <br/>
      Your password has been reset successfully.
      <br />
      
    <b>Regards</b>
    <br />
  
    <b>Team BlogsEra</b>
  </body>
</html>
`;
};

export default passwordResetDoneMail;
