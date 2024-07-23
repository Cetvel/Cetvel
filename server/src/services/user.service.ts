import httpStatus from 'http-status';
import ApiError from "../utils/ApiError";
import User from "../models/user.model"
import { IUserDocument } from "../models/user.model"


interface IUserService {
	createUser(userBody: any): Promise<IUserDocument>;
	getUserByEmail(email: string): Promise<IUserDocument>;
	getUserById(userId: string): Promise<IUserDocument>;
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
}


const UserService: IUserService = new UserServiceClass();

export default UserService;