import mongoose from "mongoose";

export function connectDB() {
  async function main() {
    await mongoose.connect(process.env.MONGO_CONNECT);
  }

  main()
    .then(() => console.log("db connected successfully"))
    .catch((err) => console.log(err));
}
