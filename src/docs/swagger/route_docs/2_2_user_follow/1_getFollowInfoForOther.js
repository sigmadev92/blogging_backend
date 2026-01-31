/**
 * @swagger
 * /api/requests/fetch-other/{userId}:
 *   get:
 *     summary: Get followers and following for a user.
 *     description: Get followers and following of a user. Requires authentication and header secret key.
 *     tags:
 *       - Follow
 *     security:
 *       - cookieAuth: []
 *       - clientSecret: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user you want to fetch followers and following
 *       - in: header
 *         name: x-client-header
 *         required: true
 *         description: Client secret for authorized frontend access.
 *         schema:
 *           type: string
 *           example: frontend-client-secret-123
 *     responses:
 *       200:
 *         description: Follow information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profiles:
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
 *                         type: "accepted"
 *
 *       403:
 *         description: User not authenticated and valid headers not present
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
 *                   example: "Invalid credentials or PRIME_DEVELOPER Route"
 *
 */
