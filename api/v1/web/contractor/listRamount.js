/**
 * This is Contain Save router/api.
 * @author manthann vaghasiya
 *
 */

const { Router } = require("express");
const commonResolver = require("../../../../utilities/commonResolver");
const { listRamount } = require("../../../../services/contractor/contractor");
const router = new Router();

/**
 * @swagger
 * /api/v1/contractor/listRamount:
 *  post:
 *   tags: ["Contractor"]
 *   summary: get Contractor information.
 *   description: api used for get Contractor information.
 *   parameters:
 *      - in: body
 *        name: lead
 *        description: get Contractor information.
 *        schema:
 *         type: object
 *         properties:
 *           walletaddress:
 *             type: string
 *   responses:
 *    "200":
 *     description: success
 *    "400":
 *     description: fail
 *   security:
 *      - bearerAuth: []
 */

router.post(
  "/listRamount",
  commonResolver.bind({
    modelService: listRamount,
  })
);

module.exports = router;
