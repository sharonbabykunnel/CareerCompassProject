import Admin from "./../models/adminModel.js";
import User from './../models/userModel.js';

class AdminRepository {
  async findByUid(uid) {
    try {
      return await Admin.findOne({ uid });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createAdmin(obj) {
    try {
      return await Admin.create(obj);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      return await Admin.findOne({ email });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getChartData() {
    return await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
  }
}

// Export an instance of AdminRepository using ES6 syntax
export default new AdminRepository();
