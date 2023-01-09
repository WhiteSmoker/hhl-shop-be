const Order = require('../models/Order')
const { ORDER_STATUS } = require('../constants/index')

module.exports.revenue = async (req, res) => {
  try {
    const orderPlaced = await Order.countDocuments({
      status: [ORDER_STATUS.PLACED, null]
    })

    const orderDelivered = await Order.countDocuments({
      status: ORDER_STATUS.DELIVERED
    })

    const revenue = await Order.aggregate([
      {
        $match: {}
      },
      {
        $group: {
          _id: null,
          sum: { $sum: '$total' }
        }
      }
    ])

    return res.status(200).json({
      success: true,
      result: {
        orderPlaced,
        orderDelivered,
        revenue: revenue[0].sum
      }
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.message
    })
  }
}
