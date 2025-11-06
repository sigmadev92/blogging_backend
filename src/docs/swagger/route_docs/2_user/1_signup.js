/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: User Sign Up
 *     description: Route for signing Up.
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
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                     minlength: 2
 *                     maxlength: 15
 *                   middleName:
 *                     type: string
 *                     maxLength: 10
 *                   lastName:
 *                     type: string
 *                     minlength: 2
 *                     maxLength: 15
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@-example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "P@ssw0rd123"
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
