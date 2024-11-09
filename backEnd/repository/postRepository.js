import Post from "./../models/postModel.js";
import Comment from "./../models/commentModel.js";
import User from "./../models/userModel.js";
import Connection from "./../models/connectionModel.js";

class PostRepository {
  async addPost(obj) {
    return await Post.create(obj);
  }

  async findAllPostByUid(uid) {
    const posts = await Post.aggregate([
      {
        $match: {
          $and: [
            {
              user_id: uid,
            },
            {
              status: { $ne: "deleted" },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postUid: "$uid" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$post", "$$postUid"],
                },
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 10,
            },
          ],
          as: "comments",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          let: { likedUid: { $slice: ["$likes", 3] } },
          pipeline: [{ $match: { $expr: { $in: ["$uid", "$$likedUid"] } } }],
          as: "likedBy",
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
    ]);

    return posts;
  }

  async getAllPost(current) {
    try {
      return await Post.aggregate([
        {
          $match: {
            status: "active",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "uid",
            as: "user",
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
        {
          $skip: (current - 1) * 10,
        },
        {
          $limit: 10,
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  async changeLike(_id, userId) {
    try {
      const result = await Post.findByIdAndUpdate(
        _id,
        [
          {
            $set: {
              likes: {
                $cond: {
                  if: { $in: [userId, "$likes"] },
                  then: { $setDifference: ["$likes", [userId]] },
                  else: { $concatArrays: ["$likes", [userId]] },
                },
              },
            },
          },
        ],
        {
          new: true,
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(uid) {
    try {
      const post = await Post.findOneAndUpdate(
        { uid: uid },
        {
          $set: { status: "deleted" },
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }

  async hidePost(uid) {
    try {
      const post = await Post.findOneAndUpdate(
        { uid: uid },
        {
          $set: { status: "archived" },
        }
      );
      return post;
    } catch (error) {
      throw error;
    }
  }

  async savePost(user, post) {
    try {
      const postDoc = await Post.findOne({ uid: post });

      if (!postDoc) {
        throw new Error("Post not found");
      }

      const isUserSaved = postDoc.saved.includes(user);

      if (isUserSaved) {
        return await Post.updateOne({ uid: post }, { $pull: { saved: user } });
      } else {
        return await Post.updateOne(
          { uid: post },
          { $addToSet: { saved: user } }
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async connections(user) {
    return await Connection.find({
      $or: [
        { requester: user, status: "accepted" },
        { recipient: user, status: "accepted" },
      ],
    }).select("requester recipient");
  }

  async getPosts(uid, skip) {
    return await Connection.aggregate([
      {
        $match: {
          $or: [
            { requester: uid, status: "accepted" },
            { recipient: uid, status: "accepted" },
          ],
        },
      },
      {
        $project: {
          uid: {
            $cond: {
              if: { $eq: ["$requester", uid] },
              then: "$recipient",
              else: "$requester",
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          userUids: { $addToSet: "$uid" },
        },
      },
      {
        $addFields: {
          userUids: { $concatArrays: ["$userUids", [uid]] },
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { userUids: "$userUids" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$status", "active"],
                    },
                    {
                      $in: ["$user_id", "$$userUids"],
                    },
                    {
                      $ne: ["$isBlocked", true],
                    },
                    {
                      $not: {
                        $in: [uid, { $ifNull: ["$notInterest", []] }],
                      },
                    },
                    {
                      $not: {
                        $in: [uid, { $ifNull: ["$reported.user", []] }],
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "posts",
        },
      },
      {
        $unwind: "$posts",
      },
      {
        $sort: {
          "posts.createdAt": -1,
        },
      },
      {
        $skip: skip * 10,
      },
      {
        $limit: 10,
      },
      {
        $replaceRoot: {
          newRoot: "$posts",
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
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "uid",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "users",
          let: { likeUids: { $slice: ["$likes", 3] } },
          pipeline: [
            { $match: { $expr: { $in: ["$uid", "$$likeUids"] } } },
            { $project: { _id: 0, uid: 1, name: 1, profilePhoto: 1 } },
          ],
          as: "likedBy",
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: 'uid',
          foreignField: 'post',
          as:'commentsCount'
        }
      }
    ]);
  }

  async repost(user, post) {
    return await Post.updateOne(
      { _id: post },
      { $addToSet: { reposted: user } }
    );
  }

  async checkRepost(user, post) {
    return await Post.findOne({
      _id: post,
      reposted: { $elemMatch: { $eq: user } },
    });
  }

  async checkReport(user, post) {
    return await Post.findOne({
      uid: post,
      reported: { $elemMatch: { user: user } },
    });
  }

  async report(user, post, reason) {
    return await Post.updateOne(
      { uid: post },
      { $addToSet: { reported: { user: user, reason: reason } } }
    );
  }

  async notInterest(user, post) {
    return await Post.updateOne(
      { uid: post },
      { $addToSet: { notInterest: user } }
    );
  }

  async getSavedPosts(user) {
    return await Post.aggregate([
      {
        $match: { saved: { $in: [user] } },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "uid",
          as: "user",
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
      {
        $lookup: {
          from: "users",
          let: { likeUids: { $slice: ["$likes", 3] } },
          pipeline: [
            { $match: { $expr: { $in: ["$uid", "$$likeUids"] } } },
            { $project: { _id: 0, uid: 1, name: 1, profilePhoto: 1 } },
          ],
          as: "likedBy",
        },
      },
    ]);
  }

  async rePosted(user) {
    return await Post.aggregate([
      {
        $match: { reposted: { $in: [user] } },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "uid",
          as: "user",
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
      {
        $lookup: {
          from: "users",
          let: { likeUids: { $slice: ["$likes", 3] } },
          pipeline: [
            { $match: { $expr: { $in: ["$uid", "$$likeUids"] } } },
            { $project: { _id: 0, uid: 1, name: 1, profilePhoto: 1 } },
          ],
          as: "likedBy",
        },
      },
    ]);
  }

  async removeRePost(user, uid) {
    return await Post.updateOne({ uid }, { $pull: { reposted: user } });
  }

  async getLikedUsers(id) {
    return await Post.aggregate([
      {
        $match: { uid: id },
      },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "uid",
          as: "users",
        },
      },
    ]);
  }

  async count(user_id) {
    return !user_id
      ? await Post.countDocuments()
      : await Post.find({ user_id }).countDocuments();
  }

  async blockPost(uid) {
    return await Post.updateOne({ uid }, { $set: { isBlocked: true } });
  }

  async unblockPost(uid) {
    return await Post.updateOne({ uid }, { $set: { isBlocked: false } });
  }

  async getDetails(uid) {
    return await Post.aggregate([
      {
        $match: { uid },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "uid",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $lookup: {
          from: "comments",
          localField: "uid",
          foreignField: "post",
          as: "comments",
        },
      },
    ]);
  }

  async getChartData() {
    return await Post.aggregate([
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

  async getSinglePost(uid){
    return await Post.aggregate([
      {
        $match: { uid },
      },
      {
        $lookup: {
          from: "comments",
          let:{id:'$uid'},
          pipeline: [
            {
              $match: { $expr: { $eq: ['$$id', '$post'] } }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: 'uid',
                as:'user'
              }
            },
            {
              $unwind:'$user'
            }
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "likes",
          foreignField: "uid",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "saved",
          foreignField: "uid",
          as: "saved",
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
    ]);
  }

  async getArchives(uid) {
    return await Post.aggregate([
      {
        $match: {
          status: 'archived',
          user_id:uid
         },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "uid",
          as: "user",
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
      {
        $lookup: {
          from: "users",
          let: { likeUids: { $slice: ["$likes", 3] } },
          pipeline: [
            { $match: { $expr: { $in: ["$uid", "$$likeUids"] } } },
            { $project: { _id: 0, uid: 1, name: 1, profilePhoto: 1 } },
          ],
          as: "likedBy",
        },
      },
    ]);
  }
}

export default new PostRepository();
