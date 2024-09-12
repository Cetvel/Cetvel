import mongoose, { Schema, Document, Model, Types } from 'mongoose';

interface ITodo {
	userId: Types.ObjectId;
	clerkId: string;
	title: string;
	description?: string;
	tag: string;
	status: 'incomplete' | 'in-progress' | 'completed';
	updatedAt: Date;
	startsAt: Date;
	endsAt: Date;
	completedAt?: Date;
	createdAt: Date;
}

export interface ITodoDocument extends ITodo, Document {
	_id: Types.ObjectId;
}

interface TodoModel extends Model<ITodoDocument> { }

const TodoSchema = new Schema<ITodoDocument>({
	clerkId: {
		type: String,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: String,
		enum: ['incomplete', 'in-progress', 'completed'],
		default: 'incomplete'
	},
	tag: {
		type: String,
		trim: true,
		required: true
	},
	startsAt: { type: Date, required: true },
	endsAt: { type: Date, required: true },
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	completedAt: {
		type: Date
	}
}, {
	timestamps: true
});


// Modeli oluşturma ve export etme
const Todo = mongoose.models.Todo ||mongoose.model<ITodoDocument, TodoModel>('Todo', TodoSchema)
export default Todo;

