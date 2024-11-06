import { Card, CardContent, CardHeader } from '@/components/ui/card';
import FocusSessionsTable from '../tables/focus-sessions';
import { History } from 'lucide-react';

const FocusingHistory = () => {
  return (
    <Card className='mt-6'>
      <CardHeader>
        <h3 className='flex items-center gap-3'>
          <div className='border rounded-md p-1.5'>
            <History size={18} className='text-muted-foreground' />
          </div>
          Odaklanma geçmişi
        </h3>
      </CardHeader>
      <CardContent>
        <FocusSessionsTable />
      </CardContent>
    </Card>
  );
};

export default FocusingHistory;
