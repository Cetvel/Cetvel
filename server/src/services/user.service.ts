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
			throw new ApiError(httpStatus.BAD_REQUEST, 'Bu email adresi zaten alınmış');
		}
		const user = new User(userBody);
		await user.hashPassword()
		await user.save();
		return await user.save();

	}
	async getUserByEmail(email: string): Promise<IUserDocument> {
		if (! await User.isEmailTaken(email)) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Bu email adresine ait kullanıcı bulunamadı');
		}
		const user = await User.findOne({ email }) as IUserDocument;
		return user;
	}
	async getUserById(userId: string): Promise<IUserDocument> {
		if (! await User.findById(userId)) {
			throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
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
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
		return user!
	}
	async updateUserEmail(userId: string, email: string, password: string): Promise<IUserDocument> {
		const user = await User.findById(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Şifre Yanlış');
		if (await User.isEmailTaken(email)) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Bu email adresi zaten alınmış');
		}
		user.email = email;
		return await user.save();
	}
	async updateUserPassword(userId: string, currentPassword: string, newPassword: string): Promise<IUserDocument> {
		const user = await User.findById(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
		
		if (currentPassword) {
			const isMatch = await bcrypt.compare(currentPassword, user.password);
			if (!isMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Mevcut şifre yanlış');
		} else if (newPassword) {
			throw new ApiError(httpStatus.BAD_REQUEST, 'Şifre değişikliği için mevcut şifre gereklidir');
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);
		
		return await user.save()
	}

	async deleteUserById(userId: string): Promise<void> {
		const user = await User.findByIdAndDelete(userId)
		if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Kullanıcı Bulunamadı');
	}
}


const UserService: IUserService = new UserServiceClass();

export default UserService;
