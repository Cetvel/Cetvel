import ExamCalculationForm from '@/features/exams/forms/exam-calculation-form';
import PageHeader from '@/components/global/page-header';
import React from 'react';

const Calculation = () => {
  return (
    <>
      <PageHeader title='Hesaplama' />
      <ExamCalculationForm />
    </>
  );
};

export default Calculation;
