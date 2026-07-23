const mongoose = require('mongoose');

/**
 * Connect to MongoDB.
 *
 * Strategy:
 *  1. Try to connect to the MONGODB_URI (local Mongo or Atlas).
 *  2. If that fails (e.g. Mongo isn't installed), fall back to an in-memory
 *     MongoDB provided by "mongodb-memory-server" so the project runs with
 *     zero external setup. Great for quick demos / grading.
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/codealpha_ecommerce';

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(`✅ MongoDB connected: ${uri}`);
    return { uri, inMemory: false };
  } catch (err) {
    console.warn(`⚠️  Could not connect to "${uri}" (${err.message}).`);
    console.warn('   Falling back to in-memory MongoDB (mongodb-memory-server)...');

    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mem = await MongoMemoryServer.create();
      const memUri = mem.getUri();
      await mongoose.connect(memUri);
      console.log(`✅ In-memory MongoDB started: ${memUri}`);
      console.log('   NOTE: data resets when the server stops.');
      return { uri: memUri, inMemory: true };
    } catch (memErr) {
      console.error('❌ Failed to start in-memory MongoDB:', memErr.message);
      console.error('   Install/run MongoDB, or set a valid MONGODB_URI in .env');
      process.exit(1);
    }
  }
}

module.exports = connectDB;
