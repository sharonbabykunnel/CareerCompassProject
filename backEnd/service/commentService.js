import Comment from "./../repository/commentRepository.js";

class CommentService {
  async getComments(postId) {
    try {
      const response = await Comment.getComments(postId);
      return response;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw new Error("Unable to retrieve comments.");
    }
    }
    
    async addReply(post, text, mention, user) {
        const response = await Comment.addReply(post, text, mention, user);
        return response;
    }
}

export default new CommentService();
