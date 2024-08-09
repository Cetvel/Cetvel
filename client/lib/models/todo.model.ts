import mongoose, { Schema, Model, Document, Types } from 'mongoose';
import { todoStatics , ITodoStatics } from './plugins/todo.plugins';


interface ITodo {
	userId: Types.ObjectId;
	title: string;
	description?: string;
	status: 'incomplete' | 'in-progress' | 'completed';
	createdAt: Date;
	updatedAt: Date;
	completedAt?: Date;
	tag: string;
	// priority: 'low' | 'medium' | 'high';
	// dueDate?: Date;
	// reminder?: Date;
	// recurring: boolean;
	// attachments: string[];
}

export interface ITodoDocument extends ITodo, Document {
	_id: Types.ObjectId;
}

interface TodoModel extends Model<ITodoDocument>, ITodoStatics { }


const TodoSchema = new Schema<ITodoDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	status: {
		type: String,
		enum: ['incomplete', 'in-progress', 'completed'],
		default: 'incomplete'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	tag: {
		type: String,
		trim: true,
		required: true
	},
	completedAt: {
		type: Date
	}
}, {
	timestamps: true
});


Object.assign(TodoSchema.statics, todoStatics);

const TodoModel= mongoose.model<ITodoDocument,TodoModel>('Todo', TodoSchema);

export default TodoModel;
