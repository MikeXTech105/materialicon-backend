/**
 * @swagger
 * tags:
 *   - name: Public
 *     description: Public icon library APIs
 *
 * /public/icons:
 *   get:
 *     summary: List published icons
 *     tags: [Public]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: navigation
 *       - in: query
 *         name: style
 *         schema:
 *           type: string
 *           enum: [outlined, filled, rounded, sharp, two-tone]
 *     responses:
 *       200:
 *         description: Icons fetched successfully
 *
 * /public/icons/{slug}:
 *   get:
 *     summary: Get published icon by slug
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Icon fetched successfully
 *
 * /public/icons/{slug}/download:
 *   get:
 *     summary: Track download and redirect to SVG URL
 *     tags: [Public]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirects to CDN or local SVG URL
 *
 * /public/categories:
 *   get:
 *     summary: List active categories
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *
 * /public/tags:
 *   get:
 *     summary: List tags
 *     tags: [Public]
 *     responses:
 *       200:
 *         description: Tags fetched successfully
 *
 * /public/search/track:
 *   post:
 *     summary: Track a public search event
 *     tags: [Public]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [keyword, results_count]
 *             properties:
 *               keyword:
 *                 type: string
 *                 example: home
 *               results_count:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       201:
 *         description: Search tracked successfully
 */
