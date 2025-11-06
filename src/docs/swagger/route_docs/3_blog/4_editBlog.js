/**
 * @swagger
 * /api/blogs/edit/{blogId}:
 *   put:
 *     summary: Edit blog
 *     description: >
 *      Can edit the fields like title, description, searchTags and topics. Other fields cannot be edited with this route. Passing other fields will return error and not changes will be saved.
 *     tags:
 *       - Blogs
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *           length: 24
 *         description: The ID of the blog to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 50
 *                 maxLength: 250
 *               description:
 *                 type: string
 *                 minLength: 100
 *               topics:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["summer", "Tea", "Drinks"]
 *               searchTags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["How to make tea", "How to make a cool drink in summer"]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad Request — Missing or invalid input fields
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
 *                   example: "Title and description are required."
 *       403:
 *         description: Authentication required
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
 *                   example: "Authentication failed"
 *
 *       500:
 *         description: Internal Server Error
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
 */
