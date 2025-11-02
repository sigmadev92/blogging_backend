/**
 * @swagger
 * /api/users/update/profile:
 *   put:
 *     summary: Update Profile Details
 *     description: >
 *            This route will update the details of the user came inside the body. The _id will be fetched from the token and not from body.
 *            Thsi route will not include updating profile pics. Those are in separate routes.
 *
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - gender
 *             properties:
 *               fullName:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     minLength: 2
 *                     maxLength: 15
 *                     example: Rishika
 *                   middleName:
 *                     type: string
 *                     maxLength: 10
 *                     example: Kumari
 *                   lastName:
 *                     type: string
 *                     minlength: 2
 *                     maxLength: 15
 *                     example: Bagga
 *               gender:
 *                  type: string,
 *                  enum:
 *                    - "M"
 *                    - "F"
 *                    - "O"
 *                    - "NS"
 *                  example: "F"
 *     responses:
 *       200:
 *         description: Successful Registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64a9b2e1f7b3a4d9a1c5f9e7"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     fullName:
 *                       type: object
 *                       properties:
 *                         firstName:
 *                           type: string
 *                           minlength: 2
 *                           maxlength: 15
 *                           example: "Rishika"
 *                         middleName:
 *                           type: string
 *                           maxLength: 10
 *                           example: "Kumari"
 *                         lastName:
 *                           type: string
 *                           minlength: 2
 *                           maxLength: 15
 *                           example: "Bagga"
 *                     role:
 *                       type: string
 *                       enum:
 *                         - reader
 *                         - author
 *                         - admin
 *                         - moderator
 *                         - creator
 *                       example: reader
 *                 jwt_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad Request — Missing or invalid input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Email and password are required."
 *
 */
