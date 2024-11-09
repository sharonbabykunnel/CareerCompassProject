import Chat from "./../models/chatModel.js";
import Group from "./../models/groupModel.js";
import User from "./../models/userModel.js";
import Message from "./../models/messageModel.js";

class ChatRepository {
  async searchUsers(value) {
    try {
      const regex = new RegExp(`^${value}`, "i");
      const result = await User.find({ name: regex });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async searchGroup(value) {
    try {
      const regex = new RegExp(`^${value}`, "i");
      const result = await Group.find({ groupName: regex });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createGroup(
    user,
    groupName,
    groupDiscrip,
    communityPicture,
    participents
  ) {
    try {
      return await Group.create({
        groupName,
        groupDiscrip,
        communityPicture,
        participants: [user, ...participents],
        admins: [user],
        state: "active",
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllGroupChat(user) {
    try {
      return await Group.aggregate([
        {
          $match: {
            participants: user,
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "lastMessage",
            foreignField: "_id",
            as: "lastMessage",
          },
        },
        {
          $unwind:'$lastMessage'
        },
        {
          $sort:{createdAt:-1}
        }
      ]);
    } catch (error) {
      throw error;
    }
  }

  async getChat(uid, user) {
    return await Chat.findOne({ participants: { $all: [uid, user] } });
  }

  async getMessages(chat, skip) {
    try {
      chat = chat.toString();
      return await Message.aggregate([
        { $match: { chat: chat } },
        { $sort: { createdAt: -1 } },
        { $skip: skip * 5 },
        { $limit: 5 },
        { $sort: { createdAt: 1 } },
        {
          $addFields: {
            contentObjectId: {
              $cond: {
                if: { $eq: ["$contentType", "post"] },
                then: {
                  $toObjectId: "$content",
                },
                else: null,
              },
            },
          },
        },
        {
          $lookup: {
            from: "posts",
            let: {
              contentObjectId: "$contentObjectId",
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $ne: ["$$contentObjectId", null] },
                      { $eq: ["$_id", "$$contentObjectId"] },
                    ],
                  },
                },
              },
              {
                $addFields: {
                  files: {
                    $concatArrays: [
                      { $ifNull: ["$content.images", []] },
                      { $ifNull: ["$content.video", []] },
                    ],
                  },
                },
              },
            ],
            as: "postDetails",
          },
        },
        {
          $addFields: {
            contentData: {
              $cond: {
                if: { $eq: ["$contentType", "post"] },
                then: { $arrayElemAt: ["$postDetails", 0] },
                else: "$content",
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "contentData.user_id",
            foreignField: "uid",
            as: "postedUser",
          },
        },
        {
          $project: {
            postDetails: 0,
            contentObjectId: 0,
          },
        },
      ]);
    } catch (error) {
      console.error("Error in getMessages:", error);
      throw error;
    }
  }

  async createChat(firstUser, secondUser) {
    try {
      return await Chat.create({ participants: [firstUser, secondUser] });
    } catch (error) {
      throw error;
    }
  }

  async updateLastMessage(chat, message) {
    try {
      return await Chat.findOneAndUpdate(
        { _id: chat },
        { $set: { lastMessage: message } }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateCommunityLastMessage(chat, message) {
    try {
      return await Group.findOneAndUpdate(
        { _id: chat },
        { $set: { lastMessage: message } },
        {new: true}
      );
    } catch (error) {
      throw error;
    }
  }

  async uploadMessage(chat, user, content) {
    return await Message.create({ content, sender: user, chat });
  }

  async uploadFile(chat, user, caption, url, contentType) {
    return await Message.create({
      content: url,
      caption,
      sender: user,
      chat,
      contentType,
    });
  }

  async getAllChat(user) {
    try {
      return await Chat.aggregate([
        {
          $match: {
            participants: user,
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "lastMessage",
            foreignField: "_id",
            as: "lastMessageData",
          },
        },
        {
          $addFields: {
            receivingUserId: {
              $filter: {
                input: "$participants",
                as: "participant",
                cond: { $ne: ["$$participant", user] },
              },
            },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "receivingUserId",
            foreignField: "uid",
            as: "receivingUserData",
          },
        },
        {
          $project: {
            _id: 1,
            lastMessage: "$lastMessageData",
            receivingUser: "$receivingUserData",
            createdAt: 1,
            updatedAt: 1,
          },
        },
        {
          $sort: { updatedAt: -1 },
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  async sharePost(user, chat, caption, post) {
    return await Message.create({
      sender: user,
      content: post,
      contentType: "post",
      caption,
      chat,
    });
  }
}

export default new ChatRepository();
