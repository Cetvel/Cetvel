import { NextResponse } from "next/server";
import AuthService from "@/lib/services/auth.service";
import catchAsync from "@/lib/utils/catchAsync";
import httpStatus from "http-status";
import userService from "@/lib/services/user.service";
import tokenService from "@/lib/services/token.service";

// POST request handler
// export async function POST(request: Request) {
//     try {
//         const body = await request.json();  // Body'yi JSON olarak alın
//         const createdUser = await userService.createUser(body);  // Asenkron işlem
//         return NextResponse.json({ data: createdUser }, { status: httpStatus.CREATED });
//     } catch (error) {
//         return NextResponse.json(
//             { error: 'Method Not Allowed' },
//             { status: httpStatus.METHOD_NOT_ALLOWED }
//         );
//     }
// }

// GET request handler
export async function GET(request:Request) {
    return NextResponse.json({ message: "Hello World" });
}


// export const register = catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
//     console.log("I got the register request")

//     if (req.method === "POST") {
//         const createdUser = await userService.createUser(req.body);
//         res.status(httpStatus.CREATED).json({ data: createdUser });
//     } else {
//         res.setHeader("Allow", ["POST"]);
//         res.status(httpStatus.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
//     }
// });

