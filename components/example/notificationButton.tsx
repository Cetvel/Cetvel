"use client";
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { api } from "@/convex/_generated/api";
import { useAction } from 'convex/react';
const NotificationButton: React.FC = () => {
  const  {userId}  = useAuth()
  console.log('Returned userId:', userId)
  const checkAndSendNotifications = useAction(api.notification.checkAndSendNotifications);
  const [isLoading, setIsLoading] = React.useState(false);
  const handleClick = async () => {
    if (userId && !isLoading) {
      setIsLoading(true);
      try {
        console.log('Sending notification to user on component:', userId);
        const result = await checkAndSendNotifications({ userId });
        alert(result.message);
      } catch (error) {
        alert('Bildirimler gönderilirken bir hata oluştu HAHAHAHAHA.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>    
    <button 
      onClick={handleClick} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      disabled={isLoading}
    >
      {isLoading ? 'Kontrol Ediliyor...' : 'Bildirimleri Kontrol Et'}
    </button>
    {/* <ul>
        {Array.isArray(todos) ? (
          todos.map((todo) => (
            <li key={todo._id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo({ id: todo._id })}
              />
              {todo.text}
            </li>
          ))
        ) : (
          <li>Invalid todos data structure</li>
        )}
      </ul> */}
    </>

  );
};

export default NotificationButton;