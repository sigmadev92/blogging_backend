const registrationHTML = ({ fullName, verifyLink }) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>User Registration Successful</title>
  </head>
  <body>
    <h2>Welcome to BlogsEra</h2>
    <p>
      Hello ${fullName.firstName}, <br />
      We are excited to have you onboard. Initially your profile is created as a
      reader. YOu can ready blogs, like, comment and interact with other
      authors.

      <b>Or, Become an author too.</b>
      <br>

      Please Verify this email by Clicking on the below link.
      <br/>
      <a href="${verifyLink}">Click Here</a>
      <br/>
      If the link doesn't work, copy the below link and paste it the browser.
      <br>
       <span>${verifyLink}</span>
      <br>
    </p>
    <p>
      If You face any problem, just write to us at our official mail
      <b>devanshofficial2000@gmail.com</b>
    </p>
    <p>Thanks for Joining our platform.</p>

    <b>Regards</b>
    <b>Team BlogsEra</b>
  </body>
</html>
`;
};

export default registrationHTML;
