/**
 * @swagger
 * /api/blogs/thumbnail/{blogId}:
 *   put:
 *     summary: Update Thumbnail of Blog
 *     description: This route adds or updates the thumbnail of an existing blog.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *           length: 24
 *         description: The ID of the blog to update.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Thumbnail updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 secure_url:
 *                   type: string,
 *                   description: The URL of thumbnail,
 *                 publicId:
 *                   type: string,
 *                   description: The public Id of image
 *       403:
 *         description: Bad Request — Missing auth details or Invalid blogId
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
 *                   example: "Missing auth credentials"
 *       500:
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
 *                   example: "Internal Server Error"
 *
 *
 */
