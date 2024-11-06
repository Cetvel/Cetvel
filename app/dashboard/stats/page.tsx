import PageHeader from '@/components/global/page-header';
import React from 'react';
import ExamsTable from '@/features/exams/tables/exams-table';

const Stats = () => {
  return (
    <>
      <PageHeader title='İstatistikler' />
      <ExamsTable />
    </>
  );
};

export default Stats;
