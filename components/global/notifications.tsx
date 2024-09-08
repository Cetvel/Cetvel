import React, { useState, useEffect, useOptimistic } from 'react';
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Settings,
  Trash2,
  CheckCheck,
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
import { useMutation, useQuery } from 'convex/react';
import { useUser } from '@clerk/nextjs';
import { Id } from '@/convex/_generated/dataModel';
import { useToast } from '../ui/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

moment.locale('tr');

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  _id: Id<'notification'>;
  _creationTime: number;
  type: string;
  clerkId: string;
  title: string;
  message: string;
  timeStamp: number;
  read: boolean;
  ttl: number;
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
  title,
  message,
  timeStamp,
  onDismiss,
  onRead,
  read,
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
      className={cn('rounded-lg p-4 mb-3', {
        'bg-secondary': read,
        'border bg-muted/20': !read,
      })}
    >
      <div className='flex items-start'>
        <div className='ml-3 flex-1'>
          <h3 className='text-sm font-medium'>{title}</h3>
          <p className='text-sm text-muted-foreground mt-1'>{message}</p>
          <p className='text-xs text-secondary-foreground mt-2'>
            {moment(timeStamp).fromNow()}
          </p>
        </div>
        <div className='flex flex-col space-y-2'>
          <Button variant='ghost' size='icon-sm' onClick={() => onRead(_id)}>
            <CheckCircle size={18} />
          </Button>
          <Button variant='ghost' size='icon-sm' onClick={() => onDismiss(_id)}>
            <X size={18} />
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
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>('all');
  const { toast } = useToast();

  const notificationData = useQuery(
    api.notification.notification.getNotifications,
    {
      clerkId: user?.id!,
    }
  );

  const deleteNotificationMutation = useMutation(
    api.notification.notification.deleteNotification
  );

  const markAsReadMutation = useMutation(
    api.notification.notification.readNotification
  );

  const clearAllNotificationsMutation = useMutation(
    api.notification.notification.deleteManyNotification
  );

  const readAllNotificationsMutation = useMutation(
    api.notification.notification.readManyNotification
  );

  const [optimisticNotifications, setOptimisticNotifications] = useState<
    Notification[]
  >(notificationData ?? []);

  useEffect(() => {
    if (notificationData) {
      setOptimisticNotifications(notificationData);
    }
  }, [notificationData]);

  const dismissNotification = async (id: Id<'notification'>) => {
    setOptimisticNotifications((prev) =>
      prev.filter((notification) => notification._id !== id)
    );
    try {
      await deleteNotificationMutation({ id });
    } catch (error) {
      console.error('Failed to delete notification:', error);
      toast({
        title: 'Hata',
        description: 'Bildirim silinirken bir hata oluştu.',
        variant: 'destructive',
      });
      setOptimisticNotifications((prev) =>
        [...prev, notificationData?.find((n) => n._id === id)!].sort(
          (a, b) => b._creationTime - a._creationTime
        )
      );
    }
  };

  const handleMarkAsRead = async (id: Id<'notification'>) => {
    setOptimisticNotifications((prev) =>
      prev.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
    try {
      await markAsReadMutation({ id });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      toast({
        title: 'Hata',
        description: 'Bildirim okundu olarak işaretlenirken bir hata oluştu.',
        variant: 'destructive',
      });
      setOptimisticNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: false }
            : notification
        )
      );
    }
  };

  const handleClearAll = async (ids: Id<'notification'>[]) => {
    const previousNotifications = [...optimisticNotifications];
    setOptimisticNotifications([]);
    try {
      await clearAllNotificationsMutation({ ids: ids });
    } catch (error) {
      console.error('Failed to clear all notifications:', error);
      toast({
        title: 'Hata',
        description: 'Bildirimler temizlenirken bir hata oluştu.',
        variant: 'destructive',
      });
      setOptimisticNotifications(previousNotifications);
    }
  };

  const handleReadAll = async (ids: Id<'notification'>[]) => {
    const previousNotifications = [...optimisticNotifications];
    setOptimisticNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    try {
      await readAllNotificationsMutation({ ids: ids });
    } catch (error) {
      console.error('Failed to clear all notifications:', error);
      toast({
        title: 'Hata',
        description: 'Bildirimler temizlenirken bir hata oluştu.',
        variant: 'destructive',
      });
      setOptimisticNotifications(previousNotifications);
    }
  };

  const filteredNotifications = optimisticNotifications.filter(
    (notification) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'unread') return !notification.read;
      return notification.type === activeTab;
    }
  );

  const hasUnreadNotifications = optimisticNotifications.some(
    (notification) => !notification.read
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side='right' className='w-[400px] sm:w-[540px]'>
        <SheetHeader className='flex flex-row items-center gap-4'>
          <SheetTitle>Bildirimler</SheetTitle>
          <Link href={'/dashboard/settings/preferences'}>
            <Button variant={'ghost'} size={'icon-sm'}>
              <Settings size={18} />
            </Button>
          </Link>
        </SheetHeader>
        <Tabs
          defaultValue='unread'
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
                {filteredNotifications.map((notification: Notification) => (
                  <NotificationItem
                    key={notification._id}
                    {...notification}
                    onDismiss={dismissNotification}
                    onRead={handleMarkAsRead}
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
                {filteredNotifications.map((notification: Notification) => (
                  <NotificationItem
                    key={notification._id}
                    {...notification}
                    onDismiss={dismissNotification}
                    onRead={handleMarkAsRead}
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
        <div className='grid grid-cols-2 gap-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              handleReadAll(filteredNotifications.map((n) => n._id));
            }}
            disabled={!hasUnreadNotifications}
          >
            <CheckCheck className='w-4 h-4 mr-2' />
            Tümünü Oku
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              handleClearAll(filteredNotifications.map((n) => n._id));
            }}
            disabled={optimisticNotifications.length === 0}
          >
            <Trash2 className='w-4 h-4 mr-2' />
            Tümünü Temizle
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const NotificationsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const { user } = useUser();

  const notificationData = useQuery(
    api.notification.notification.getNotifications,
    {
      clerkId: user?.id!,
    }
  );

  useEffect(() => {
    if (notificationData) {
      const unreadNotifications = notificationData.filter(
        (notification) => !notification.read
      );
      setUnreadCount(unreadNotifications.length);
    }
  }, [notificationData]);

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
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
