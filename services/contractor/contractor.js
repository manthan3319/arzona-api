/**
 * This is for Contain function layer for contractor service.
 * @author manthann vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
const { isDate } = require("lodash");
const dbService = require("../../utilities/dbService");
const messages = require("../../utilities/messages");

/*************************** addContractor ***************************/
const listRamount = async (req, mainUserId, createdBy) => {

  let walletaddress = req.body.walletaddress;
  if(walletaddress){
    const RamountData = await dbService.findAllRecords("rewardaddModel", {referraladdress:walletaddress});

    if(RamountData){
      return{
        messages:"Ramount data get sucessfuly",
        data:RamountData
      }
    }else{
      return{
        messages:"Ramount data not get"
      }
    }
  }
}

/*************************** addContractor ***************************/
const addContractor = async (req, mainUserId, createdBy) => {
  let walletaddress = req.body.walletaddress;

  let UserAdd = await dbService.createOneRecord("contractorModel", req.body);
  console.log("UserAdd",UserAdd);
  if (UserAdd) {
    return {
      messages: "user login sucessfuly"
    }
  } else {
    return {
      messages: "user not login"
    }
  }
};

/*************************** rewardadd ***************************/
const rewardadd = async (req, mainUserId, createdBy) => {
  const walletaddress = req.body.walletaddress;
  const Amount = req.body.amount;

  const where = {
    isDeleted: false
  };

  const walletaddressRefaralGetData = await dbService.findAllRecords("contractorModel", where);
  console.log("walletaddressRefaralGetData", walletaddressRefaralGetData);

  const rewardPercentages = [
    40, 20, 10, 5, 2.5, 1.25, 1.25, 1.25, 1.25, 1.25,
    1.25, 1.25, 1.25, 1.25, 1.25, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1
  ];

  let currentWalletAddress = walletaddress;
  let baseAmount = Amount * 20 / 100;
  let messages = [];

  for (let level = 0; level < rewardPercentages.length; level++) {
    let referralAddress = null;

    for (let record of walletaddressRefaralGetData) {
      if (record.walletaddress === currentWalletAddress) {
        referralAddress = record.referraladdress;
        break;
      }
    }

    if (!referralAddress) {
      messages.push(`No referral address found for level ${level + 1}, skipping this level`);
      break;
    }

    const rewardAmount = (baseAmount * rewardPercentages[level] / 100);

    const rewardData = {
      walletaddress: currentWalletAddress,
      referraladdress: referralAddress,
      Ramount: rewardAmount,
      level: level + 1
    };

    console.log(`Level ${level + 1} Reward Data`, rewardData);

    // Save the reward data to the database
    const data = await dbService.createOneRecord("rewardaddModel", rewardData);
    console.log("data", data);

    if (data) {
      messages.push(`Level ${level + 1}: Deposit and Ramount added successfully`);
    } else {
      messages.push(`Level ${level + 1}: Deposit not added`);
    }

    currentWalletAddress = referralAddress;
  }

  return {
    messages: messages.join('\n')
  };
};








module.exports = {
  addContractor,
  rewardadd,
  listRamount
};
