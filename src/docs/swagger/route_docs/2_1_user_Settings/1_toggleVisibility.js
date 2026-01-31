/**
 * @swagger
 * /api/settings/users/toggle/visibility:
 *   put:
 *     summary: Toggle Account Visibility
 *     description: A user account can be public or private. A loggedin user can toggle the visibility anytime. Requires Authentication.
 *     tags:
 *       - User Settings
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully toggled the visibility of account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newStatus:
 *                   type: boolean
 *
 *                 myId:
 *                   type: string
 *       403:
 *         description: User not authenticated
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
 *                   example: "Invalid credentials"
 *
 */
