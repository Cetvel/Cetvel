'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section id='about' className='py-24 bg-gradient-to-b bg-secondary'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl xl:text-6xl font-bold mb-4 text-gradient'>
            Cetvel Hakkında
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Öğrencileri akıllı araçlarla destekleyerek verimli çalışma ve
            başarılı sonuçlar için güçlendiriyoruz.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className='text-2xl font-semibold mb-4'>
              Akıllı Çalışma Asistanı
            </h3>
            <p className='text-lg mb-12 text-muted-foreground'>
              Yapay zeka destekli ders programı oluşturma ve görev
              önceliklendirme özelliklerimiz, daha etkili ve verimli çalışmanıza
              yardımcı olur. Cetvel&apos;in akıllı çalışma asistanı ile yeni bir
              verimlilik seviyesi deneyimleyin.
            </p>
            <Image
              src='/image/work.svg'
              alt='Akıllı Çalışma Görseli'
              width={500}
              height={200}
              className='rounded-lg mx-auto'
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className='text-2xl font-semibold mb-4'>
              Kişiselleştirilmiş Öğrenme Deneyimi
            </h3>
            <p className='text-lg mb-12 text-muted-foreground'>
              Cetvel&apos;in kişiselleştirme özellikleri, öğrenme sürecinizi
              size özel hale getirir. Zayıf yönlerinizi belirleyin, ilerlemenizi
              takip edin ve AI destekli önerilerle performansınızı artırın.
              Kendi hızınızda, daha etkili öğrenin.
            </p>
            <Image
              src='/image/personal.svg'
              alt='Kişiselleştirilmiş Öğrenme Görseli'
              width={500}
              height={200}
              className='rounded-lg mx-auto'
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
