/**
 * @swagger
 * tags:
 *   - name: Dashboard Analytics
 *     description: Enterprise dashboard, activity, analytics, and health APIs
 *
 * /dashboard/overview:
 *   get:
 *     summary: Get dashboard overview metrics
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard overview fetched successfully
 *
 * /dashboard/recent-icons:
 *   get:
 *     summary: Get recently uploaded icons
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Recent icons fetched successfully
 *
 * /dashboard/charts:
 *   get:
 *     summary: Get chart datasets for icon analytics
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard charts fetched successfully
 *
 * /dashboard/activity:
 *   get:
 *     summary: Get activity logs
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
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
 *         name: module
 *         schema:
 *           type: string
 *           example: icons
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *           example: created
 *     responses:
 *       200:
 *         description: Activity logs fetched successfully
 *
 * /dashboard/storage:
 *   get:
 *     summary: Get storage analytics
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Storage analytics fetched successfully
 *
 * /dashboard/search-analytics:
 *   get:
 *     summary: Get search analytics
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Search analytics fetched successfully
 *
 * /dashboard/download-analytics:
 *   get:
 *     summary: Get download analytics
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Download analytics fetched successfully
 *
 * /dashboard/system-health:
 *   get:
 *     summary: Get system health status
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System health fetched successfully
 *
 * /dashboard/quick-actions:
 *   get:
 *     summary: Get quick action counts for admin workflows
 *     tags: [Dashboard Analytics]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard quick actions fetched successfully
 */
