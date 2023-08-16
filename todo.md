## requestHandler;

const requestHandler = new RequestHandler();

requestHandler.DefaultRoute(handler);
requestHandler.route({path: "/",method: "GET"},handler);
requestHandler.route({path: "/guest-book",method: "GET"},handler);
requestHandler.route({path: "/guest-book/comment",method: "POST"},handler);
