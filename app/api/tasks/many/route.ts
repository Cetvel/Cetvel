import Todo from '@/lib/models/todo.model';
import { NextResponse } from 'next/server';
export async function DELETE(req: Request) {
    try {
        const { ids } = await req.json();
        if (ids && Array.isArray(ids)) {
            await Todo.deleteMany({ _id: { $in: ids } });
            return NextResponse.json({ message: 'Görevler başarı ile silindi.' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Hatalı istek' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { ids, updateData } = await req.json();

        if (ids && Array.isArray(ids)) {
            // ID'leri ObjectId türüne dönüştür

            // Belirtilen ID'lere sahip tüm todoları updateData ile güncelle
            await Todo.updateMany(
                { _id: { $in: ids } },
                { $set: updateData }
            );
            return NextResponse.json({ message: 'Görevler başarı ile güncellendi.' }, { status: 200 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}