import uploadToS3 from "../utils/aws.js";
import Chat from "./../repository/chatRepository.js";

class ChatService {
  async searchUser(value, which) {
    try {
      let users;
      if (which === "group") {
        users = await Chat.searchGroup(value);
      } else {
        users = await Chat.searchUsers(value);
      }
      return users || [];
    } catch (error) {
      throw error;
    }
  }

  async getChat(uid, user) {
    try {
      let chat = await Chat.getChat(uid, user);
      if (!chat) {
        chat = await Chat.createChat(user, uid);
      }
      let messages = await Chat.getMessages(chat?._id, 0);
      return { chat, messages };
    } catch (error) {
      throw error;
    }
  }

  async getCommunityChat(id) {
    try {
      const chat = await Chat.getMessages(id, 0);
      return chat;
    } catch (error) {
      throw error;
    }
  }

  async uploadMessage(chat, user, content, uid) {
    try {
      if (!chat) {
        const newChat = await Chat.createChat(user, uid);
        chat = newChat._id;
      }
      let response = await Chat.uploadMessage(chat, user, content);
      response = await response.populate("chat");
      const update = await Chat.updateLastMessage(chat, response._id);
      return { response, update };
    } catch (error) {
      throw error;
    }
  }

  async uploadMessageInCommunity(chat, user, content) {
    try {
      let response = await Chat.uploadMessage(chat, user, content);
      const update = await Chat.updateCommunityLastMessage(chat, response._id);
      return { response, update };
    } catch (error) {
      throw error;
    }
  }

  async createGroup(
    user,
    groupName,
    groupDescription,
    communityPicture,
    participants,
  ) {
    try {

      const community = await Chat.createGroup(
        user,
        groupName,
        groupDescription,
        communityPicture,
        participants,
    
      );
      const content = `Wellcome to ${groupName}`
      const message = await Chat.uploadMessage(community._id, user, content)
      const updatedComm = await Chat.updateCommunityLastMessage(community._id, message._id)
      updatedComm.lastMessage = message
      return updatedComm
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(chat, user, caption, url, contentType, uid) {
    try {
      if (!chat) {
        const newChat = await Chat.createChat(user, uid);
        chat = newChat._id;
      }
      let response = await Chat.uploadFile(
        chat,
        user,
        caption,
        url,
        contentType
      );
      response = await response.populate("chat");
      const update = await Chat.updateLastMessage(chat, response._id);
      return { response, update };
    } catch (error) {
      throw error;
    }
  }

  async getAllChat(user, which) {
    try {
      let response;
      if (which === "group") {
        response = await Chat.getAllGroupChat(user);
      } else {
        response = await Chat.getAllChat(user);
      }
      if (response && Array.isArray(response)) return response;
      return [];
    } catch (error) {
      throw error;
    }
  }

  async getMoreMessage(chat, skip) {
    skip = Number(skip);
    const response = await Chat.getMessages(chat, skip);
    return response;
  }

  async sharePost(user, selectedUsers,post,caption) {
    const promises = selectedUsers.map(
      async (selectedUser) => {
        let chat = await Chat.getChat(user, selectedUser);
        if(!chat) chat = await Chat.createChat(user, selectedUser);
        const response = await Chat.sharePost(user, chat._id, caption, post)
        await Chat.updateLastMessage(chat._id, response._id);
        return response
      }
    );
    const result = await Promise.all(promises);
    return result;
  }
}

export default new ChatService();
