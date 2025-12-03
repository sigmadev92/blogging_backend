/**
 * @swagger
 * /api/requests/remove-follower/{requestedBy}:
 *   delete:
 *     summary: Remove follower
 *     description: Remove a user from your followers list . Requires authorization
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestedBy
 *         required: true
 *         description: Id of the user you want to unfollow
 *     responses:
 *       200:
 *         description: Follower removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 myId:
 *                   type: string
 *                   description: userId of loggedin User

 *
 *       400:
 *         description: Bad request - may arise due to following
 *           - missing requestedBy
 *           - requestedBy same as loggedin user ID
 *           - invalid requestedBy
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
 *       404:
 *         description: Loggedin User is not in the follower list of the user to be removed
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
 *                   example: "Request not found"
 *       500:
 *         description: System error
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
 *                   example: "system error"
 *
 *
 */
