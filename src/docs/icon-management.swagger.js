/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Navigation
 *         slug:
 *           type: string
 *           example: navigation
 *         description:
 *           type: string
 *           nullable: true
 *           example: Icons used for app and website navigation.
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Home
 *         slug:
 *           type: string
 *           example: home
 *     Icon:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         uuid:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Home
 *         slug:
 *           type: string
 *           example: home
 *         description:
 *           type: string
 *           nullable: true
 *         category_id:
 *           type: integer
 *           nullable: true
 *           example: 1
 *         style:
 *           type: string
 *           enum: [outlined, filled, rounded, sharp, two-tone]
 *           example: outlined
 *         file_name:
 *           type: string
 *           example: home.svg
 *         file_path:
 *           type: string
 *           example: /storage/icons/home/home.svg
 *         preview_url:
 *           type: string
 *           example: http://localhost:5000/storage/icons/home/home.svg
 *         width:
 *           type: integer
 *           example: 24
 *         height:
 *           type: integer
 *           example: 24
 *         file_size:
 *           type: integer
 *           example: 312
 *         mime_type:
 *           type: string
 *           example: image/svg+xml
 *         version:
 *           type: integer
 *           example: 1
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           example: published
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *
 * tags:
 *   - name: Categories
 *     description: Icon category management
 *   - name: Tags
 *     description: Icon tag management
 *   - name: Icons
 *     description: Icon master and SVG upload management
 *
 * /categories:
 *   get:
 *     summary: List categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Navigation
 *               slug:
 *                 type: string
 *                 example: navigation
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Category created successfully
 *
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *   delete:
 *     summary: Soft delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *
 * /tags:
 *   get:
 *     summary: List tags
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tags fetched successfully
 *   post:
 *     summary: Create tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Home
 *               slug:
 *                 type: string
 *                 example: home
 *     responses:
 *       201:
 *         description: Tag created successfully
 *
 * /icons:
 *   get:
 *     summary: List icons with pagination, search, filters, and sorting
 *     tags: [Icons]
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
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: style
 *         schema:
 *           type: string
 *           enum: [outlined, filled, rounded, sharp, two-tone]
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           example: created_at
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *     responses:
 *       200:
 *         description: Icons fetched successfully
 *   post:
 *     summary: Upload and create icon
 *     tags: [Icons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, file]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Home
 *               slug:
 *                 type: string
 *                 example: home
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               style:
 *                 type: string
 *                 enum: [outlined, filled, rounded, sharp, two-tone]
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               tag_ids:
 *                 type: string
 *                 example: "[1,2]"
 *               cdn_url:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Icon created successfully
 *
 * /icons/{id}:
 *   get:
 *     summary: Get icon details
 *     tags: [Icons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Icon fetched successfully
 *   put:
 *     summary: Update icon metadata and optionally replace SVG
 *     tags: [Icons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               category_id:
 *                 type: integer
 *               style:
 *                 type: string
 *                 enum: [outlined, filled, rounded, sharp, two-tone]
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *               tag_ids:
 *                 type: string
 *                 example: "1,2"
 *               cdn_url:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Icon updated successfully
 *   delete:
 *     summary: Soft delete icon
 *     tags: [Icons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Icon deleted successfully
 */
