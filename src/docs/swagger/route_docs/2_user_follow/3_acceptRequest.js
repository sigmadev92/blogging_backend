/**
 * @swagger
 * /api/requests/accept/{requestedBy}:
 *   put:
 *     summary: Accept received follow request
 *     description: Accept the received follow request from a user
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestedBy
 *         required: true
 *         description: Id of the user you want to accept the follow request
 *     responses:
 *       200:
 *         description: Follow request accepted successfullly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 me: 
 *                   $ref: "#/components/schemas/followUser"
 *                   

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
 *         description: Request not found
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
