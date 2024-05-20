/**
 * This is Contain Save router/api.
 * @author manthann vaghasiya
 *
 */

const { Joi } = require("../../../../utilities/schemaValidate");
const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { rewardadd } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/contractor/rewardadd:
 *  post:
 *   tags: ["Contractor"]
 *   summary: Save Contractor information.
 *   description: api used for Save Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: Save Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           walletaddress:
 *             type: string
 *           amount:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 */

const dataSchema = Joi.object({
  walletaddress: Joi.string().required().label("walletaddress"),
  amount: Joi.string().required("amount"),
});

router.post(
  "/rewardadd",
  commonResolver.bind({
    modelService: rewardadd,
    isRequestValidateRequired: true,
    schemaValidate: dataSchema,
  })
);

module.exports = router;
