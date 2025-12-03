/**
 * @swagger
 * /api/requests/delete/my/{requestedTo}:
 *   delete:
 *     summary: Delete sent follow request.
 *     description: Delete follow request that you sent to a user. Requires authentication.
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestedTo
 *         required: true
 *         description: ID of the user you want to delete the sent follow request
 *     responses:
 *       200:
 *         description: Follow request sent Successfully
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
 *         description: Id of user for send follow request to be deleted is missing or is same as the loggedin user or invalid user Id
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
 *                   example: "Invalid credentials or userId"
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
