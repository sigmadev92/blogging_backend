/**
 * @swagger
 * /api/users/remove/profile-pic:
 *   put:
 *     summary: Remove Profile Pic
 *     description: >
 *            This route will remove the profile picture of the user.
 *     requestBody:
 *       required: false
 *       description: Nothing required to be send in the request body.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: The profile pic is updated successfully;
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *       400:
 *         description: User don't have any profile pic
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
 *                   example: "No profile Pic found"
 *       403:
 *         description: Credentials Missing
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
 *                   example: "Credentials Missing"
 *       503:
 *         description: Server error
 *         content:
 *          application/json:
 *            schema:
 *                properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server Error"
 *
 */
