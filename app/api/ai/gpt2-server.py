# gpt2_server.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = FastAPI()

# GPT-2 modeli ve tokenizer kurulumu
model_name = "gpt2"  # gpt2-medium veya gpt2-large gibi farklı boyutları da seçebilirsiniz
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

# Görev önerileri için kullanıcı verilerini temsil eden veri yapısı
class UserData(BaseModel):
    tasks: list

# Görev önerisi oluşturma fonksiyonu
def generate_task_recommendations(user_data):
    # Kullanıcı verisini string'e çevirme
    user_input = f"Kullanıcı görevleri: {user_data}"
    inputs = tokenizer.encode(user_input, return_tensors="pt")

    # GPT-2 modelini kullanarak öneriler üretme
    outputs = model.generate(inputs, max_length=200, num_return_sequences=1)
    recommendations = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Öneriyi işleyip JSON formatında döndürme
    return [{"task": line.strip()} for line in recommendations.split("\n")[:10]]

@app.post("/generate-tasks")
async def generate_tasks(user_data: UserData):
    try:
        recommendations = generate_task_recommendations(user_data.tasks)
        return {"recommended_tasks": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
