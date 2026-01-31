/**
 * @swagger
 * /api/requests/create/{requestedTo}:
 *   post:
 *     summary: send Follow request.
 *     description: Send follow request to a user. Requires authentication.
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: requestedTo
 *         required: true
 *         description: ID of the user you want to send follow request
 *     responses:
 *       200:
 *         description: Follow request sent Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isPublic:
 *                   type: boolean
 *                 sender:
 *                   $ref: "#/components/schemas/followUser"
 *                   description: details of logged in user
 *
 *       400:
 *         description: Id of user to be followed is missing or is same as the loggedin user or invalid user Id or request already exists.
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
