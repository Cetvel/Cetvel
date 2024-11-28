'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionWrapper } from '@/app/_components';
import { fadeIn, slideIn, textVariant } from '@/lib/motion';

const About: React.FC = () => {
  return (
    <>
      <motion.div
        variants={slideIn('up', 'easeOut', 0, 0.4)}
        className='text-center mb-16'
      >
        <motion.h2
          variants={textVariant(0)}
          className='text-4xl xl:text-6xl font-bold mb-4 text-gradient'
        >
          Mihver Hakkında
        </motion.h2>
        <motion.p
          variants={textVariant(0.2)}
          className='text-xl text-muted-foreground max-w-2xl mx-auto'
        >
          Öğrencileri akıllı araçlarla destekleyerek verimli çalışma ve başarılı
          sonuçlar için güçlendiriyoruz.
        </motion.p>
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
        <motion.div variants={fadeIn('right', '', 0, 0.4)}>
          <h3 className='text-2xl font-semibold mb-4'>
            Akıllı Çalışma Asistanı
          </h3>
          <p className='text-lg mb-12 text-muted-foreground'>
            Yapay zeka destekli ders programı oluşturma ve görev önceliklendirme
            özelliklerimiz, daha etkili ve verimli çalışmanıza yardımcı olur.
            Mihver&apos;in akıllı çalışma asistanı ile yeni bir verimlilik
            seviyesi deneyimleyin.
          </p>
          <Image
            src='/image/work.svg'
            alt='Akıllı Çalışma Görseli'
            width={400}
            height={200}
            className='rounded-lg mx-auto'
          />
        </motion.div>

        <motion.div variants={fadeIn('left', '', 0.4, 0.4)}>
          <h3 className='text-2xl font-semibold mb-4'>
            Kişiselleştirilmiş Öğrenme Deneyimi
          </h3>
          <p className='text-lg mb-12 text-muted-foreground'>
            Mihver&apos;in kişiselleştirme özellikleri, öğrenme sürecinizi size
            özel hale getirir. Zayıf yönlerinizi belirleyin, ilerlemenizi takip
            edin ve AI destekli önerilerle performansınızı artırın. Kendi
            hızınızda, daha etkili öğrenin.
          </p>
          <Image
            src='/image/personal.svg'
            alt='Kişiselleştirilmiş Öğrenme Görseli'
            width={400}
            height={200}
            className='rounded-lg mx-auto'
          />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about');
