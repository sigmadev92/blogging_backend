/**
 * @swagger
 * /api/users/signout:
 *   get:
 *     summary: Logout User
 *     description: >
 *       Verifies if the request contains a valid JWT token inside cookies.
 *       If valid, logs out user.
 *       If invalid or missing, returns a 403 error.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *       403:
 *         description: Forbidden — Invalid or missing token
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
 *                   example: "Invalid or missing authentication token."
 */
