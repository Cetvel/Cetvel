import Modal from '@/components/global/modal';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { calculateNet } from '../utils';
import { useModal } from '@/providers/modal-provider';

const NetCalculationModal: React.FC<{
  onConfirm: (data: any) => void;
  data: any;
  currentConfig: ExamConfig;
  errors: any;
}> = ({ onConfirm, data, currentConfig, errors }) => {
  const { setClose } = useModal();

  const getFilteredSubjects = () => {
    if (currentConfig.type === 'AYT') {
      const selectedField = data.field;
      return currentConfig.subjects.filter(
        (subject) =>
          !subject.forFields || subject.forFields.includes(selectedField)
      );
    }
    return currentConfig.subjects;
  };

  const filteredSubjects = getFilteredSubjects();

  const totalNet = filteredSubjects.reduce((acc, subject) => {
    const subjectData = data[subject.name];
    return acc + calculateNet(subjectData.correct, subjectData.wrong);
  }, 0);

  return (
    <Modal title='Net hesaplama sonuçları'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ders</TableHead>
            <TableHead>Doğru</TableHead>
            <TableHead>Yanlış</TableHead>
            <TableHead>Net</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSubjects.map((subject) => {
            const subjectData = data[subject.name];
            const net = calculateNet(subjectData.correct, subjectData.wrong);
            return (
              <TableRow key={subject.name}>
                <TableCell>{subject.label}</TableCell>
                <TableCell>{subjectData.correct}</TableCell>
                <TableCell>{subjectData.wrong}</TableCell>
                <TableCell>{net.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <p className='mt-4 font-bold text-lg'>
        Toplam Net: {totalNet.toFixed(2)}
      </p>

      {Object.keys(errors).length > 0 && (
        <div className='text-red-500 mt-4'>
          <p>Lütfen aşağıdaki hataları düzeltin:</p>
          <ul>
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>{value as string}</li>
            ))}
          </ul>
        </div>
      )}

      <DialogFooter>
        <Button onClick={setClose} variant='outline'>
          İptal
        </Button>
        <Button
          onClick={() => {
            onConfirm(data);
            setClose();
          }}
          disabled={Object.keys(errors).length > 0}
        >
          Onayla ve kaydet
        </Button>
      </DialogFooter>
    </Modal>
  );
};

export default NetCalculationModal;
