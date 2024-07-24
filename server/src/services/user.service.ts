import httpStatus from 'http-status';
import ApiError from "../utils/ApiError";
import User from "../models/user.model"
import { IUserDocument } from "../models/user.model"
import bcrypt from 'bcrypt';

interface IUserService {
	createUser(userBody: any): Promise<IUserDocument>;
	getUserByEmail(email: string): Promise<IUserDocument>;
	getUserById(userId: string): Promise<IUserDocument>;
	updateUserById(userId: string, updateBody: any): Promise<IUserDocument>;
	deleteUserById(userId: string): Promise<void>;
	updateUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<IUserDocument>;
	updateUserEmail(userId: string, email: string, password: string): Promise<IUserDocument>;

}

class UserServiceClass implements IUserService {
	async createUser(userBody: any): Promise<IUserDocument> {
		if (await User.isEmailTaken(userBody.email!)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'qEmail already taken');
		}
		return User.create(userBody);
	}
	async getUserByEmail(email: string): Promise<IUserDocument> {
		if (! await User.isEmailTaken(email)) {
			throw new ApiError(httpStatus.NOT_FOUND, '/*user service*/ User not found');
		}
		const user = await User.findOne({ email }) as IUserDocument;
		return user;
	}
	async getUserById(userId: string): Promise<IUserDocument> {
		if (! await User.findById(userId)) {
			throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
		}
		const user = await User.findById(userId) as IUserDocument;
		return user;
	}
	async updateUserById(userId: string, updatedBody: any): Promise<IUserDocument> {
		const user = await User.findByIdAndUpdate(
			userId,
			{ $set: updatedBody },
			{ new: true, runValidators: true, context: 'query' }
		);
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
		return user!
	}
	async updateUserEmail(userId: string, email: string, password: string): Promise<IUserDocument> {
		const user = await User.findById(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect');
		if (await User.isEmailTaken(email)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
		}
		user.email = email;
		return await user.save();
	}
	async updateUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<IUserDocument> {
		const user = await User.findById(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
		console.log("currentPassword",currentPassword )
		console.log("currentPassword",newPassword )
		if (currentPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Mevcut şifre yanlış');
			console.log("eski sifreyi dogru girdin.")
		} else if (newPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Şifre değişikliği için mevcut şifre gereklidir');
		}

		if (newPassword) {
			const salt = await bcrypt.genSalt(10);
			console.log("salt",salt);
			user.password = await bcrypt.hash(newPassword, salt);
			console.log("newPassword",user.password);
			console.log("yeni sifreyi dogru girdin. artik atanmis oldu.");
		}
		
		const deneme = await bcrypt.compare(newPassword, user.password);
		console.log("deneme",deneme);
		return await user.save();
	}

	async deleteUserById(userId: string): Promise<void> {
		const user = await User.findByIdAndDelete(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
	}
}


const UserService: IUserService = new UserServiceClass();

export default UserService;
