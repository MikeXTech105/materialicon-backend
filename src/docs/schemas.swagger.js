/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Validation failed
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *     SuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Request completed successfully
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         uuid:
 *           type: string
 *           format: uuid
 *           example: 00000000-0000-4000-8000-000000000001
 *         first_name:
 *           type: string
 *           example: System
 *         last_name:
 *           type: string
 *           nullable: true
 *           example: Admin
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "+91 9876543210"
 *         profile_image:
 *           type: string
 *           nullable: true
 *           example: https://example.com/avatar.png
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         role:
 *           type: string
 *           enum: [admin, manager, user]
 *           example: admin
 *         last_login:
 *           type: string
 *           nullable: true
 *           format: date-time
 *         created_by:
 *           type: integer
 *           nullable: true
 *         updated_by:
 *           type: integer
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *     CreateUserRequest:
 *       type: object
 *       required: [first_name, email, password]
 *       properties:
 *         first_name:
 *           type: string
 *           example: Jane
 *         last_name:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           example: jane@example.com
 *         phone:
 *           type: string
 *           example: "+91 9876543210"
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPass@123
 *         profile_image:
 *           type: string
 *           example: https://example.com/profile/jane.png
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         role:
 *           type: string
 *           enum: [admin, manager, user]
 *           example: user
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *           example: Jane
 *         last_name:
 *           type: string
 *           example: Smith
 *         email:
 *           type: string
 *           format: email
 *           example: jane.smith@example.com
 *         phone:
 *           type: string
 *           example: "+91 9876543211"
 *         password:
 *           type: string
 *           format: password
 *           example: NewStrongPass@123
 *         profile_image:
 *           type: string
 *           example: https://example.com/profile/jane-smith.png
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         role:
 *           type: string
 *           enum: [admin, manager, user]
 *           example: manager
 *     PaginationMeta:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 100
 *         totalPages:
 *           type: integer
 *           example: 10
 */
