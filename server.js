const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

// Add a route for /auth/login
server.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  // Read the users data
  const users = router.db.get("users").value();

  // Find the user
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // User found, generate a token and return it
    const token = jwt.sign({ userId: user.id }, "your-secret-key", {
      expiresIn: "1h",
    });
    res.status(200).json({
      userId: user.id,
      token: token,
      role: username === "admin" ? "admin" : "user",
    });
  } else {
    // User not found, return an error
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Add a middleware function to check for a valid JWT
server.use("/protected-endpoint", (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header
      const decoded = jwt.verify(token, "your-secret-key"); // Verify the token
      req.user = decoded; // Add the decoded payload to the request object
      next(); // Continue to the next middleware function
    } catch (err) {
      res.status(401).json({ message: "Invalid token" }); // If the token is invalid, return an error
    }
  } else {
    res.status(401).json({ message: "No token provided" }); // If no token is provided, return an error
  }
});

// Add a route for /protected-endpoint
server.get("/protected-endpoint", (req, res) => {
  // This code will only be reached if a valid token is provided
  res.json({ message: "This is a protected endpoint" });
});

// Add a route for /fitnessPlans
server.get("/fitness-plans", (req, res) => {
  const fitnessPlans = router.db.get("fitness-plans").value();
  res.status(200).json(fitnessPlans);
});

// Get user profile
server.get("/profile", (req, res) => {
  const { userId } = req.query;
  const user = router.db.get("users").find({ id: userId }).value();

  if (user) {
    res.status(200).json(user.profile);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Update user profile
server.put("/profile", (req, res) => {
  const { userId, password, profile } = req.body;
  const user = router.db.get("users").find({ id: userId });

  if (user.value()) {
    user.assign({ password, profile }).write();
    res.status(200).json({ message: "Profile updated" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

server.get("/fitness-plans/search", (req, res) => {
  const term = req.query.name_like;
  const fitnessPlans = router.db
    .get("fitness-plans")
    .filter((plan) => plan.name.includes(term))
    .value();
  res.status(200).json(fitnessPlans);
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
