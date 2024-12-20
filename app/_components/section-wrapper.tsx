'use client';

import { motion } from 'framer-motion';

import { staggerContainer } from '@/lib/motion';

const StarWrapper = (Component: React.FC, idName: string) =>
  function HOC() {
    return (
      <motion.section
        /* @ts-ignore */
        variants={staggerContainer()}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className={`p-6 max-w-7xl mx-auto my-20 relative z-0`}
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
