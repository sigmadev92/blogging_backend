/**
 * @swagger
 * /api/users/update/profile-pic:
 *   put:
 *     summary: Update Profile Pic
 *     description: >
 *            This route will update the profile picture of the user and send the
 *            URL of image live on server.
 *
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: FormData
 *
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
 *                 secure_url:
 *                   type: string
 *                   example: https://cloudinary/project/images/image121212.jpg,
 *                 public_id:
 *                   type: string
 *                   example: project/images/image121212
 *
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
