import Connection from "./../models/connectionModel.js";
import User from "./../models/userModel.js";

class ConnectionClass {
  async buildConnection(requester, recipient) {
    return await Connection.create({ requester, recipient });
  }

  async getConnections(user, value) {
    const regex = new RegExp(`^${value}`, "i");
    return await Connection.aggregate([
      {
        $match: {
          $and: [
            { $or: [{ requester: user }, { recipient: user }] },
            { status: "accepted" },
          ],
        },
      },
      {
        $addFields: {
          otherUser: {
            $cond: {
              if: { $eq: ["$requester", user] },
              then: "$recipient",
              else: "$requester",
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "otherUser",
          foreignField: "uid",
          as: "otherUser",
        },
      },
      {
        $unwind: "$otherUser",
      },
      {
        $match: {
          "otherUser.name": regex,
        },
      },
    ]);
  }

  async findInvitations(user) {
    return await Connection.aggregate([
      {
        $match: { $and: [{ recipient: user }, { status: "pending" }] },
      },
      {
        $lookup: {
          from: "users",
          localField: "requester",
          foreignField: "uid",
          as: "requester",
        },
      },
    ]);
  }

  async findRequests(user) {
    return await Connection.aggregate([
      {
        $match: { $and: [{ requester: user }, { status: "pending" }] },
      },
      {
        $lookup: {
          from: "users",
          localField: "recipient",
          foreignField: "uid",
          as: "recipient",
        },
      },
    ]);
  }

  async findWorldWide(user) {
    return await User.aggregate([
      {
        $match: { uid: { $ne: user } },
      },
      {
        $lookup: {
          from: "connections",
          let: { userId: "$uid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ["$requester", "$$userId"] },
                        { $eq: ["$recipient", user] },
                        { $in: ["$status", ["pending", "accepted"]] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ["$requester", user] },
                        { $eq: ["$recipient", "$$userId"] },
                        { $in: ["$status", ["pending", "accepted"]] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "connections",
        },
      },
      {
        $match: { connections: { $size: 0 } },
      },
      {
        $project: { connection: 0 },
      },
      {
        $sort: { updateAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  }

  async findMutuals(userId,value) {
    const regex = new RegExp(`^${value}`, "i");
    return await Connection.aggregate([
      {
        $match: {
          $or: [{ requester: userId }, { recipient: userId }],
          status: "accepted",
        },
      },
      {
        $project: {
          connectedUser: {
            $cond: {
              if: { $eq: ["$requester", userId] },
              then: "$recipient",
              else: "$requester",
            },
          },
        },
      },
      {
        $lookup: {
          from: "connections",
          let: { connectedUser: "$connectedUser" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        { $eq: ["$requester", "$$connectedUser"] },
                        { $eq: ["$recipient", "$$connectedUser"] },
                      ],
                    },
                    { $ne: ["$requester", userId] },
                    { $ne: ["$recipient", userId] },
                    { $eq: ["$status", "accepted"] },
                  ],
                },
              },
            },
          ],
          as: "secondDegreeConnections",
        },
      },
      { $unwind: "$secondDegreeConnections" },
      {
        $group: {
          _id: {
            $cond: {
              if: {
                $eq: ["$secondDegreeConnections.requester", "$connectedUser"],
              },
              then: "$secondDegreeConnections.recipient",
              else: "$secondDegreeConnections.requester",
            },
          },
          commonConnections: { $addToSet: "$connectedUser" },
        },
      },
      {
        $match: {
          $expr: { $gte: [{ $size: "$commonConnections" }, 2] },
        },
      },
      {
        $lookup: {
          from: "connections",
          let: { mutualUser: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $or: [
                        { $eq: ["$requester", userId] },
                        { $eq: ["$recipient", userId] },
                      ],
                    },
                    {
                      $or: [
                        { $eq: ["$requester", "$$mutualUser"] },
                        { $eq: ["$recipient", "$$mutualUser"] },
                      ],
                    },
                    // Exclude users who are already connected or have pending/rejected requests
                    {
                      $in: ["$status", ["pending", "accepted", "rejected"]],
                    },
                  ],
                },
              },
            },
          ],
          as: "existingConnection",
        },
      },
      {
        // Exclude users who already have a connection with the current user
        $match: {
          existingConnection: { $size: 0 }, // If no connection exists, size will be 0
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "uid",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          user: "$userDetails",
          commonConnectionsCount: { $size: "$commonConnections" },
        },
      }, {
        $match:{'user.name':regex}
      }
    ]);
  }

  async acceptRequest(id) {
    return await Connection.findOneAndUpdate(
      { _id: id },
      { $set: { status: "accepted" } }
    );
  }

  async rejectRequest(id) {
    return await Connection.deleteOne({ _id: id });
  }

  async removeConnection(id) {
    return await Connection.deleteOne({ _id: id });
  }

  async searchWorldWide(value, user) {
    const regex = new RegExp(`^${value}`, "i");
    return await User.aggregate([
      {
        $match: {
          uid: { $ne: user },
          name: regex,
        },
      },
      {
        $lookup: {
          from: "connections",
          let: { userId: "$uid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    {
                      $and: [
                        { $eq: ["$requester", "$$userId"] },
                        { $eq: ["$recipient", user] },
                        { $in: ["$status", ["pending", "accepted"]] },
                      ],
                    },
                    {
                      $and: [
                        { $eq: ["$requester", user] },
                        { $eq: ["$recipient", "$$userId"] },
                        { $in: ["$status", ["pending", "accepted"]] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
          as: "connections",
        },
      },
      {
        $match: { connections: { $size: 0 } },
      },
      {
        $project: { connection: 0 },
      },
      {
        $sort: { updateAt: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  }

  async count(uid) {
    return await Connection.find({
      $or: [{ recipient: uid }, { requester: uid }],
    }).countDocuments();
  }
}

export default new ConnectionClass();
