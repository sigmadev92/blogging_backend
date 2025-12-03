/**
 * @swagger
 * /api/requests/unfollow/{requestedTo}:
 *   delete:
 *     summary: Unfollow user
 *     description: Unfollow a user which is in your following . Requires authorization
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestedTo
 *         required: true
 *         description: Id of the user you want to unfollow
 *     responses:
 *       200:
 *         description: unollowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 myId:
 *                   type: string
 *                   description: userId of loggedin User
 *                 hisId:
 *                   type: string 
 *                   description: userId of user to be unfollowed

 *
 *       400:
 *         description: Bad request - may arise due to following
 *           - missing requestedTo
 *           - requestedTo same as loggedin user ID
 *           - invalid requestedTo
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
 *         description: Loggedin user was not a follower
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
