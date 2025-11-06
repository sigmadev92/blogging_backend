/**
 * @swagger
 * /api/blogs/new:
 *   post:
 *     summary: Add New Blog
 *     description: >
 *       Adds a new blog to the database without thumbnail. Saves the data and returns the blog ID.
 *     tags:
 *       - Blogs
 *     security:
 *       - cookieAuth: []
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
 *         description: Blog saved successfully but thumbnail is not yet added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 blogId:
 *                   type: string
 *                   description: The blog ID of the saved blog
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
