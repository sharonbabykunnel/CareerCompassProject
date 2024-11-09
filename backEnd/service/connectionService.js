import Connection from "./../repository/connectionRepository.js";

class ConnectionService {
  async buildConnection(requester, recipient) {
    const response = await Connection.buildConnection(requester, recipient);
    return response;
  }

  async getConnections(user, value = "") {
    const response = await Connection.getConnections(user, value);
    return response;
  }

  async findInvitations(user) {
    const response = await Connection.findInvitations(user);
    return response;
  }

  async findRequests(user) {
    const response = await Connection.findRequests(user);
    return response;
  }

  async findWorldWide(user) {
    const response = await Connection.findWorldWide(user);
    return response;
  }

  async findMutuals(user,value = '') {
    const response = await Connection.findMutuals(user,value);
    return response;
  }

  async acceptRequest(id) {
    const response = await Connection.acceptRequest(id);
    return response;
  }

  async rejectRequest(id) {
    const response = await Connection.rejectRequest(id);
    return response;
  }

  async removeConnection(id) {
    const response = await Connection.removeConnection(id);
    if (response.deletedCount > 0) {
      return { message: "Connection Removed Successfully", success: true };
    } else {
      return { message: "Connection Not Removed", success: false };
    }
  }

  async leaveRequest(id) {
    const response = await Connection.removeConnection(id);
    if (response.deletedCount > 0) {
      return { message: "Request Withdrawn", success: true };
    } else {
      return { message: "Request Not Withdrawn", success: false };
    }
  }

  async searchWorldWide(value, user) {
    const response = await Connection.searchWorldWide(value, user);
    return response;
  }
}

export default new ConnectionService();
