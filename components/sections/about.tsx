'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/global/text-generate-effect';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section className='py-24 bg-gradient-to-b from-background to-secondary/20'>
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4'>
            <TextGenerateEffect words='Cetvel Hakkında' />
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
            <p className='text-lg mb-6'>
              Yapay zeka destekli ders programı oluşturma ve görev
              önceliklendirme özelliklerimiz, daha etkili ve verimli çalışmanıza
              yardımcı olur. Cetvel&apos;in akıllı çalışma asistanı ile yeni bir
              verimlilik seviyesi deneyimleyin.
            </p>
            <Image
              src='/images/smart-study-mockup.png'
              alt='Akıllı Çalışma Görseli'
              width={500}
              height={300}
              className='rounded-lg shadow-lg'
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
            <p className='text-lg mb-6'>
              Cetvel&apos;in kişiselleştirme özellikleri, öğrenme sürecinizi
              size özel hale getirir. Zayıf yönlerinizi belirleyin, ilerlemenizi
              takip edin ve AI destekli önerilerle performansınızı artırın.
              Kendi hızınızda, daha etkili öğrenin.
            </p>
            <Image
              src='/images/personalized-learning-mockup.png'
              alt='Kişiselleştirilmiş Öğrenme Görseli'
              width={500}
              height={300}
              className='rounded-lg shadow-lg'
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='mt-16 text-center'
        >
          <Button size='lg' className='group'>
            Daha Fazla Bilgi
            <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
