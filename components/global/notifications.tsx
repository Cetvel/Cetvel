import React, { useState, useEffect } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/tr';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';

moment.locale('tr');

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  _id: Id<'notification'>;
  _creationTime: number;
  type: string;
  clerkId: string;
  title: string;
  message: string;
  timeStamp: string;
  read: boolean;
  _ttl: number;
}

interface NotificationItemProps extends Notification {
  onDismiss: (id: Id<'notification'>) => void;
  onRead: (id: Id<'notification'>) => void;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  _id,
  type,
  title,
  message,
  timeStamp,
  onDismiss,
  onRead,
}) => {
  const icons: Record<NotificationType, JSX.Element> = {
    success: <CheckCircle className='w-5 h-5 text-green-500' />,
    error: <AlertCircle className='w-5 h-5 text-destructive' />,
    info: <Info className='w-5 h-5 text-blue-500' />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className='bg-secondary rounded-lg shadow-md p-4 mb-3'
    >
      <div className='flex items-start'>
        <div className='ml-3 flex-1'>
          <h3 className='text-sm font-medium'>{title}</h3>
          <p className='text-sm text-muted-foreground mt-1'>{message}</p>
          <p className='text-xs text-secondary-foreground mt-2'>
            {moment(timeStamp).toNow()}
          </p>
        </div>
        <div className='flex flex-col space-y-2'>
          <Button variant='ghost' size='icon' onClick={() => onRead(_id)}>
            <CheckCircle size={20} />
          </Button>
          <Button variant='ghost' size='icon' onClick={() => onDismiss(_id)}>
            <X size={20} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const { user } = useUser();

  const notificationData = useQuery(
    api.notification.notification.getNotifications,
    {
      clerkId: user?.id!,
    }
  );

  useEffect(() => {
    if (notificationData) {
      setNotifications(notificationData);
    }
  }, [notificationData]);

  const dismissNotification = (id: Id<'notification'>) => {
    setNotifications(
      notifications.filter((notification) => notification._id !== id)
    );
  };

  const markAsRead = (id: Id<'notification'>) => {
    setNotifications(
      notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='right' className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>Bildirimler</SheetTitle>
        </SheetHeader>
        <Tabs
          defaultValue='all'
          className='w-full mt-4'
          onValueChange={setActiveTab}
        >
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='unread'>Okunmayan</TabsTrigger>
            <TabsTrigger value='all'>Tümü</TabsTrigger>
          </TabsList>
          <TabsContent value='all' className='mt-4'>
            <ScrollArea className='h-[calc(100vh-200px)]'>
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    {...notification}
                    onDismiss={dismissNotification}
                    onRead={markAsRead}
                  />
                ))}
              </AnimatePresence>
              {filteredNotifications.length === 0 && (
                <p className='text-gray-500 text-center'>Bildirim yok</p>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value='unread' className='mt-4'>
            <ScrollArea className='h-[calc(100vh-200px)]'>
              <AnimatePresence>
                {filteredNotifications.map((notification) => (
                  <NotificationItem
                    key={notification._id}
                    {...notification}
                    onDismiss={dismissNotification}
                    onRead={markAsRead}
                  />
                ))}
              </AnimatePresence>
              {filteredNotifications.length === 0 && (
                <p className='text-gray-500 text-center'>
                  Okunmayan bildirim yok
                </p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <div className='flex justify-between items-center mt-4'>
          <Button variant='outline' onClick={() => setNotifications([])}>
            <Trash2 className='w-4 h-4 mr-2' />
            Tümünü temizle
          </Button>
          <Button variant='outline'>
            <Settings className='w-4 h-4 mr-2' />
            Ayarlar
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface NotificationsButtonProps {}

const NotificationsButton: React.FC<NotificationsButtonProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(3);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      <Button
        variant='ghost'
        size='icon'
        className='relative'
        onClick={togglePanel}
      >
        <Bell className='w-5 h-5' />
        {unreadCount > 0 && (
          <Badge
            variant='destructive'
            className='absolute -top-2 -right-2 px-2 py-1'
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default NotificationsButton;
