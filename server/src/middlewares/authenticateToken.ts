import { getToken } from "next-auth/jwt";

const authenticateToken = async (req: any, res: any, next: any) => {
    try {
        // Dinamik import ile next-auth/jwt modülünü yükle

        const secret = process.env.NEXTAUTH_SECRET;

        // Token'ı doğrulamak için secret ve salt ile getToken fonksiyonunu çağırın
        const token = await getToken({ req, secret });
        console.log("Token:", token);
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.userId = token.id;
        next();
    } catch (error) {
        console.error("Token doğrulama hatası:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default authenticateToken;
