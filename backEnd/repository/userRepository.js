import User from "./../models/userModel.js";
import bcrypt from "bcrypt";

class UserRepository {
  async verifyPassword(inputPassword, password) {
    return await bcrypt.compare(inputPassword, password);
  }

  async createUser(email, password, name) {
    return await User.create({ email, password, name });
  }

  async createUserForGoogle(name, email, isVerified, profilePhoto, uid) {
    return await User.create({
      name,
      email,
      uid,
      password: uid, // Consider hashing or securing password handling for actual use
      isVerified,
      profilePhoto,
    });
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async findByUid(uid) {
    return await User.findOne({ uid });
  }

  async verifyUser(isVerified, uid) {
    return await User.findOneAndUpdate({ uid }, { $set: { isVerified } });
  }

  async findAll(current) {
    try {
      return await User.find().skip((current-1) * 5).limit(5);
    } catch (error) {
      throw error;
    }
  }

  async findAllByAgg() {
    return await User.countDocuments()
  }

  async deleteAll() {
    return await User.deleteMany();
  }

  async updateCoverPhoto(url, user) {
    return await User.updateOne({uid:user}, { $set: { coverPhoto: url } });
  }

  async updateProfileDetails(values, user) {
    return await User.updateOne({uid:user},{$set:values})
  }

  async getUsers() {
    return await User.find()
  }

  async blockUser(user) {
    return await User.updateOne({ uid: user }, { $set: { isBlocked: true }})
  }

  async unblockUser(user) {
    return await User.updateOne({uid:user},{$set:{isBlocked:false}})
  }

  async getProfileData(uid) {
    return await User.aggregate([
      {
      $match:{uid}
    },
      {
        $project: {
          fieldCount: { $size: { $objectToArray: "$$ROOT" } },
        },
      },
    ]);
  }
}

export default new UserRepository();
