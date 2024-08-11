import mongoose, { Schema, Model, Document, Types } from "mongoose";

interface IPomodoro extends Document {
    clerkId?: string
    title: string;
    tag: string;
    userId: Types.ObjectId;
    description: string;
    duration: number;
}

export interface PomodoroDocument extends IPomodoro, Document {
    _id: Types.ObjectId;
}

interface PomodoroModel extends Model<PomodoroDocument> { }



const PomodoroSchema = new Schema({
    clerkId: { type: String, required: false },
    title: { type: String, required: true },
    tag: { type: String, required: true },
    description: { type: String, required: false }, 
    duration: { type: Number, required: true },
    userId: { type: Types.ObjectId, required: false, ref: 'User' }
}, { timestamps: true });


const Pomodoro = mongoose.models.Pomodoro || mongoose.model<PomodoroDocument, PomodoroModel>('Pomodoro', PomodoroSchema);

export default Pomodoro