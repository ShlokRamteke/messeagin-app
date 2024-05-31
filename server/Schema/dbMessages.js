import mongoose from "mongoose";

const messagingSchema = mongoose.Schema({
  name: String,
  message: String,

  timestamp: String,
  received: Boolean,
});

export default mongoose.model("messagingmessages", messagingSchema);
