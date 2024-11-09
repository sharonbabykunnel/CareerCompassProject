import Post from './../repository/postRepository.js';

class PostService{
    async getPosts(uid, skip) {
        const response = await Post.getPosts(uid, skip);
        return response
    } 

    async getArchives(uid) {
        const response = await Post.getArchives(uid);
        return response
    }
}

export default new PostService();