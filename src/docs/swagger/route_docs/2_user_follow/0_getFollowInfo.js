/**
 * @swagger
 * /api/requests/fetch:
 *   get:
 *     summary: Get all follow info .
 *     description: Get followers, following, sent follow requests and received follow requests of logged in user. Requires authentication.
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Follow information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profiles :
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a9b2e1f7b3a4d9a1c5f9e7"
 *                       requestedBy:
 *                         $ref: "#/components/schemas/followUser"
 *                       requestedTo:
 *                         $ref: "#/components/schemas/followUser"
 *                       status:
 *                         type: string
 *                         enum:
 *                           - accepted
 *                           - pending
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
