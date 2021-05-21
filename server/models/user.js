// This class represents the user models that mongodb keeps track of
import mongoose from "mongoose";

// for now a user has the following fields:
/* username - String
 * email - String
 * password - String
 * id - String
 */
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required:true},
    id: {type: String},
});

export default mongoose.model("User", userSchema);
