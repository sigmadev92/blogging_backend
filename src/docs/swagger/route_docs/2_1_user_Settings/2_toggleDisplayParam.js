/**
 * @swagger
 * /api/settings/users/toggle/display/{param}:
 *   put:
 *     summary: toggle display of details .
 *     description: A logged in user can toggle the visibility of details. Which details to be followed
 *     tags:
 *       - User Settings
 *     parameters:
 *       - in: path
 *         name: param
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the parameter to be toggled
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The visibility of field toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newValue :
 *                   type: boolen
 *
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
