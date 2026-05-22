/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Service health checks
 *
 * /health:
 *   get:
 *     summary: Check API health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: IconAPI service is healthy
 *                 data:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       example: 120.51
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 */
