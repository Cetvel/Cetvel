import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Users, init } from '@kinde/management-api-js';
import MongoUsers from '@/features/users/models/user.model';
import bcrypt from 'bcrypt';
   

init();

export async function PUT(req: NextRequest) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id) {
      console.warn('Yetkilendirme Hatası: Kullanıcı girişi yapılmamış');
      return NextResponse.json(
        { error: 'Yetkilendirme hatası' },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Mevcut şifre ve yeni şifre gereklidir.' },
        { status: 400 }
      );
    }

    if (typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { message: 'Geçersiz şifre. Şifre en az 8 karakter olmalıdır.' },
        { status: 400 }
      );
    }

       ;
    const mongoUser = await MongoUsers.findOne({ userId: user.id });

    if (!mongoUser) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      mongoUser.password
    );
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Mevcut şifre yanlış.' },
        { status: 400 }
      );
    }

    const isSameAsOld = await bcrypt.compare(newPassword, mongoUser.password);
    if (isSameAsOld) {
      return NextResponse.json(
        { message: 'Yeni şifre mevcut şifre ile aynı olamaz.' },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await MongoUsers.updateOne(
      { userId: user.id },
      { $set: { password: hashedPassword } }
    );

    await Users.setUserPassword({
      userId: user.id,
      requestBody: {
        hashed_password: hashedPassword,
        hashing_method: 'bcrypt',
        salt: salt,
      },
    });

    console.log(`${user.id} ID'li kullanıcının şifresi başarıyla güncellendi`);
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Şifre güncelleme hatası:', error);
    return NextResponse.json(
      { message: 'Şifre güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
