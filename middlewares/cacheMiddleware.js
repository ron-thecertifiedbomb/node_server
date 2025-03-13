import cache from "memory-cache";

const cacheMiddleware = (req, res, next) => {
  const key = `data:${req.url}`;
  const cachedData = cache.get(key);

  if (cachedData) {
    console.log("Cache hit! Returning cached data...");
    console.log("Cached Data:", JSON.parse(cachedData)); 
    return res.json(JSON.parse(cachedData));
  }

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    console.log("Storing data in cache...");
    cache.put(key, JSON.stringify(data), 3600000); 
    console.log("Data stored in cache:", data);
    originalJson(data);
  };

  next();
};

export default cacheMiddleware;
