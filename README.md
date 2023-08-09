# Flower Catalog
 const requestHandler = new RequestHandler();
  requestHandler.route("/", respondHomePage);
  requestHandler.route("/abeliophyllum", respondAbeliophyllumPage);
  requestHandler.route("/ageratum", respondAgeratumPage);
  requestHandler.handle(request, response);
