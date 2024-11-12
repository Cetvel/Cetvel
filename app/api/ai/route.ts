// app/api/generate-tasks/route.ts
import { NextResponse } from 'next/server';

type Task = {
  name: string;
  due_date: string;
  priority: 'high' | 'medium' | 'low';
  duration_estimate: number;
};

type UserData = {
  tasks: Task[];
};

// Veriyi hazırlayan sınıf
class UserDataService {
  private data: UserData;

  constructor(data: UserData) {
    this.data = data;
  }

  // Kullanıcı verilerini istenen formata dönüştürme
  getFormattedData(): string {
    return JSON.stringify(
      this.data.tasks.map((task) => ({
        name: task.name,
        due_date: task.due_date,
        priority: task.priority,
        duration_estimate: task.duration_estimate,
      }))
    );
  }
}

// GPT-2 öneri servisi sınıfı
class TaskRecommendationService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Python API ile iletişim kurarak görev önerilerini alma
  async fetchRecommendations(userData: UserDataService) {
    const formattedData = userData.getFormattedData();

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tasks: formattedData }),
    });

    if (!response.ok) {
      throw new Error(`GPT-2 servisi hatası: ${response.statusText}`);
    }

    const data = await response.json();
    return data.recommended_tasks;
  }
}

// API Endpoint
export async function POST(request: Request) {
  const userData: UserData = await request.json();
  const userDataService = new UserDataService(userData);
  const taskRecommendationService = new TaskRecommendationService(
    'http://localhost:8000/generate-tasks'
  ); // Python API URL

  try {
    const recommendations =
      await taskRecommendationService.fetchRecommendations(userDataService);
    return NextResponse.json({ recommended_tasks: recommendations });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
