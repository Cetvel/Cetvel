import mongoose, { Schema, Model, Document, Types } from "mongoose";
import { reduceEachLeadingCommentRange } from "typescript";

interface IPomodoro extends Document {
    title: string;
    tag: string;
    // description: string;
    duration: number;
    userId: Types.ObjectId;
}

export interface PomodoroDocument extends IPomodoro, Document {
    _id: Types.ObjectId;
}

interface PomodoroModel extends Model<PomodoroDocument> { }



const PomodoroSchema = new Schema({
    title: { type: String, required: true },
    tag: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });


const Pomodoro = mongoose.model<PomodoroDocument, PomodoroModel>('Pomodoro', PomodoroSchema);

export default Pomodoro