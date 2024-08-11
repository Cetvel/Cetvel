import httpStatus from 'http-status';
import ApiError from "../utils/ApiError";
import User from "../models/user.model"
import { IUserDocument } from "../models/user.model"

interface IUserService {
	createUser(userBody: any): Promise<IUserDocument>;
	getUserByClerkId(email: string): Promise<IUserDocument>;
	getUserById(userId: string): Promise<IUserDocument>;
	updateUserById(userId: string, updateBody: any): Promise<IUserDocument>;
	deleteUserById(userId: string): Promise<void>;
}


	async function createUser(userBody: any): Promise<IUserDocument> {
		const user = new User(userBody);
		await user.hashPassword()
		await user.save();
		return await user.save();

	}
	async function getUserByClerkId(clerkId: string): Promise<IUserDocument> {
		const user = await User.findOne({ clerkId }) as IUserDocument;
		return user;
	}
	async function getUserById(userId: string): Promise<IUserDocument> {
		if (! await User.findById(userId)) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
		}
		const user = await User.findById(userId) as IUserDocument;
		return user;
	}
	async function updateUserById(userId: string, updatedBody: any): Promise<IUserDocument> {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $set: updatedBody },
			{ new: true, runValidators: true, context: 'query' }
		);
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
		return user!
	}
	

	async function deleteUserById(userId: string): Promise<void> {
		const user = await User.findByIdAndDelete(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
	}




export  {
	createUser,
	getUserByClerkId,
	getUserById,
	updateUserById,
	deleteUserById
} 


