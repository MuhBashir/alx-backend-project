const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle errors
    this.client.on('error', (err) => {
      console.error(`Redis error: ${err}`);
    }).connect;
   
  }

  isAlive() {
    // Check if the Redis client is connected
    let value;
    if (this.client){
        value = true
    }else{
        value = false
    }
    return value

  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();

module.exports = redisClient;
