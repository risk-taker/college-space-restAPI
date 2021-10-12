import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    notes_name: { type: String, required: true },
    desc: { type: String, required: true },
    teacher_name: { type: String, required: true },
    myfile: { type: String, required: true}
})


export default mongoose.model('File', fileSchema, 'files');