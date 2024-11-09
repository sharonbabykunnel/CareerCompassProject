import express from 'express'
import connection from './../Controllers/connectionController.js'
const route = express.Router();

route.get('/:user', connection.getConnections);
route.get("/connection/search/:user", connection.getConnections);
route.post("/buildConnection", connection.buildConnection);
route.get("/invitations/:user", connection.findInvitations);
route.get("/requests/:user", connection.findRequests);
route.get("/worldWide/:user", connection.findWorldWide);
route.get("/worldWide/search/:user", connection.searchWorldWide);
route.patch("/acceptRequest/:id", connection.acceptRequest);
route.patch("/rejectRequest/:id", connection.rejectRequest);
route.delete('/removeConnection/:id', connection.removeConnection);
route.delete('/leaveRequest/:id', connection.leaveRequest);
route.get('/mutuals/:user', connection.findMutuals);
export default route;