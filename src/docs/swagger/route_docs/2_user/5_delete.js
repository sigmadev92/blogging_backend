/**
 * @swagger
 * /api/users/account:
 *   delete:
 *     summary: Delete account, clear token, delete all the data associated with the account.
 *     description: >
 *       Verifies if the request contains a valid JWT token inside cookies.
 *       If valid, delete the account with Id and logs out user and clear all the data associated with the account
 *       If invalid or missing, returns a 403 error( temporary error)
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Removes token from cookie, deletes the user from database and Logs out successfully.
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
