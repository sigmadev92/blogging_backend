/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Route for User Sign Up
 *     description:
 *     tags:
 *       - User
 *     responses:
 *       201:
 *         description: Will Give a new USer on successful registration including _id and role as "reader"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean

 *
 *                 newUser:
 *                   type: Object
 *
 *       400:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: This user is already registered
 */
