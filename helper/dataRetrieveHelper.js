const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types.ObjectId;
const User = require('../models/User');
const Expense = require('../models/Expense');
const asyncHandler = require('../middleware/async');

// Get total expense cost
exports.getTotalExpenseCost = asyncHandler(async (req) => {
  const expense = await Expense.find({ user: req.user.id });

  const totalCost = expense.reduce((prev, nextValue) => prev + nextValue.cost, 0);
  return totalCost;
});

// Get total meal of a hostel
exports.getTotalMeal = asyncHandler(async (req) => {
  // const allMember = await User.find({ hostelName: req.user.hostelName });
  // let count = 0;

  // allMember.map((singleMealField) => {
  //   singleMealField.meal.map((singleMealCount) => {
  //     count += singleMealCount.mealCount;
  //   });
  // });

  const totalMeal = await User.aggregate([
    { $match: { hostelName: req.user.hostelName } },
    { $unwind: '$meal' },
    {
      $group: {
        _id: req.user.hostelName,
        totalMeal: { $sum: '$meal.mealCount' },
      },
    },
  ]);
  if (totalMeal.length < 1) {
    return 0;
  }
  return totalMeal[0].totalMeal;
});

// Get total deposited amount
// exports.getTotalDepositAmount = asyncHandler(async (req) => {
//   const depositAmount = await User.find({ hostelName: req.user.hostelName });

//   const totalDepositAmount = depositAmount
//     .reduce((prev, nextValue) => prev + nextValue.depositAmount, 0);
//   return totalDepositAmount;
// });

// Get total meal of a boarder
exports.getTotalMealOfaBoarder = asyncHandler(async (req, boarderId) => {
  const totalMeal = await User.aggregate([
    { $match: { _id: ObjectId(boarderId) } },
    { $unwind: '$meal' },
    {
      $group: {
        _id: req.user.hostelName,
        totalMeal: { $sum: '$meal.mealCount' },
      },
    },
  ]);

  if (totalMeal.length < 1) return 0;
  return totalMeal[0].totalMeal;
});
