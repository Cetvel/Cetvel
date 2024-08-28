import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import Todo from "@/lib/models/todo.model";

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Tag } from "lucide-react";

if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Sen bir öğrenci koçusun. Öğrenci sana daha önce yaptığı todoları atıyor ve sen de ona 3 tane todo tavsiyesinde bulunuyorsun. Todoların message kısmında neden bu todoyu önerdiğini açıkla. JSON formatında bir response dön.",
    generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.OBJECT,
                properties: {
                    title: {
                        type: SchemaType.STRING,
                    },
					message: {
						type: SchemaType.STRING,
					},
					tag: {
						type: SchemaType.STRING,						
					},
					startsAt:{
						type: SchemaType.STRING
					},
					endsAt : {
						type: SchemaType.STRING
					}
                },
            },
        },
    }
});

export async function GET() {
	try {
	  const { userId } = auth();
	  if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	  }
  
	  const todos = await Todo.find({ clerkId: userId })
  
	  const prompt = `
		Bunlar benim yaptığım todo  listem: ${todos}.
		Gönderdiğim todoları inceleyerek bana 3 tane todo tavsiyesinde bulunabilir misin?
		Gönderdiğin todoların message kısmında neden bu todoyu önerdiğini açıklamanı da istiyorum ve
		vereceğin öneriler detaylı öneriler olsun. 
		"Matematik çalış" veya "Kitap oku" gibi basit öneriler istemiyorum.
		{
        "title": "Tüm Fizik Konularını Tekrar Et",
        "tag": "Fizik",
        "message": "Çembersel Harekete çalıştığını gördüm. Muhtemelen Fizik dersinde bu konuyu işliyorsunuz.  Tüm Fizik konularını tekrar ederek bu konuyu daha iyi anlayabilir ve sınavlara daha iyi hazırlanabilirsin."
		"startsAt": "2024-08-26T12:00:00Z",
		"endsAt": "2024-08-26T12:00:00Z"
 	   }
	   	Bu senden istediğim örnek tarzda bir response. Bu kurallara uymaya çalış. Konudan bağımsız öneriler verme.


	  `;
  
	  const result = await model.generateContent(prompt);
	  const text = result.response.text();
	  
	  // JSON formatını doğrula ve parse et
	  const parsedResponse = JSON.parse(text);
  
	  console.log(parsedResponse);
	  return NextResponse.json(parsedResponse);
	} catch (error) {
	  console.error("Error in GET request:", error);
	  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
  }