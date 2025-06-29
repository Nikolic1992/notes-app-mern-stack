import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use user's IP address or a session ID when there is Authentication
    // const userid = req.user ? req.user.id : req.ip; // Example of using
    // const { success } = await ratelimit.limit(userid);

    // Use a unique key for rate limiting
    const { success } = await ratelimit.limit("my-limit-key");

    // If the request exceeds the rate limit, respond with a 429 status code
    // and a message indicating that the user has made too many requests
    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    // If the request is within the rate limit, proceed to the next middleware
    next();
  } catch (error) {
    console.log("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
