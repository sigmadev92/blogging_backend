const emailVerifiedDoneMail = ({ fullName }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification Successful</title>
  </head>
  <body>
    <b>Hello ${fullName.firstName} </b>

    <p>This is to inform you that your email has been verified successfully</p>
    
     <br/>
      
    <b>Regards</b>
    <br />
    <b>Team BlogsEra</b>
  </body>
</html>
`;
};

export default emailVerifiedDoneMail;
