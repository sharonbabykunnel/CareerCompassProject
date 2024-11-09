import Comment from "./../models/commentModel.js";
import mongoose from "mongoose";

class CommentRepository {
  async createComment(text, user, post) {
    try {
      return await Comment.create({ post, user, text });
    } catch (error) {
      throw error;
    }
  }

  async likeComment(post, user, comment) {
    try {
      const commentDoc = await Comment.findById(comment);

      if (!commentDoc) {
        throw new Error("Comment not found");
      }

      if (commentDoc.likes.includes(user)) {
        // If user already liked the comment, remove the like
        return await Comment.updateOne(
          { _id: comment },
          { $pull: { likes: user } }
        );
      } else {
        // If user hasn't liked the comment, add the like
        return await Comment.updateOne(
          { _id: comment },
          { $addToSet: { likes: user } }
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getComments(post) {
    return await Comment.aggregate([
      {
        $match: { post },
      },
      {
        $sort: { createdAt: -1 }, 
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
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
          let: { parentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$post", "$$parentId"],
                },
              },
            },
            {
              $sort: { createdat: -1 },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "uid",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
          ],
          as: "replies",
        },
      },
    ]);
  }

  async addReply(post, text, mention, user) {
    return await Comment.create({ post, text, mention, user });
  }
}

export default new CommentRepository();
