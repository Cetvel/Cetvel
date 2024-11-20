'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { motion } from 'framer-motion';
import { fadeIn, slideIn, textVariant } from '@/lib/motion';
import { SectionWrapper } from '@/app/_components';

const questions = [
  {
    question: "Hangi Öğrenciler Cetvel'den  Faydalanabilir?",
    answer:
      'Uygulamamız tüm öğrencilere hizmet verebilmek amacı ile geliştirilmiştir. İlkokul, Ortaokul, Lise ve Üniversite öğrencileri uygulamamızı kullanabilirler.',
  },
  {
    question: 'Sınav Öğrencileri İçin Özel olarak Neler Var?',
    answer:
      'Sınav öğrencileri için özel net hesaplama aracı bulunmaktadır. Öğrenciler dilerlerse girdikleri denemeyi kaydedebilirler ve ilerlemelerini takip edebilirler.',
  },
  {
    question: 'Cetvel platformlarda kullanılabilir?',
    answer:
      'Uygulamamız web üzerinden hizmet vermektedir. Çok yakında mobil uygulamamız ile de hizmet vermeye başlayacağız!',
  },
  {
    question: 'Kaydedilen denemeler nasıl analiz ediliyor?',
    answer:
      'Kaydedilen denemeler, çeşitli tablo ve çizgi grafikleri ile analiz edilmektedir. Bu grafikler sayesinde performansınızı görsel olarak takip edebilirsiniz.',
  },
  {
    question: 'Veri güvenliği nasıl sağlanıyor?',
    answer:
      'Kullanıcı verilerinizin güvenliği bizim için çok önemlidir. Verileriniz güvenli sunucularda saklanmakta ve üçüncü şahıslarla paylaşılmamaktadır. Veri güvenliği sözleşmemizi okuyabilirsiniz.',
  },
  {
    question: "Cetvel'a Nasıl Üye Olabilirim?",
    answer:
      "Cetvel'a üye olmak için platformumuzu ziyaret edin ve 'Kayıt Ol' butonuna tıklayın. Gerekli bilgileri doldurarak üyeliğinizi oluşturabilirsiniz. Üyelik ücretsizdir.",
  },
  {
    question: 'Teknik destek nasıl alabilirim?',
    answer:
      "Herhangi bir sorun yaşadığınızda veya yardıma ihtiyacınız olduğunda, uygulama içindeki anasayfadaki 'İletişim' bölümünden bize ulaşabilirsiniz. Mümkün olan en kısa sürede size geri döneceğiz.",
  },
];

const Faq = () => {
  return (
    <>
      <motion.p
        variants={textVariant(0)}
        className='font-bold text-primary md:text-center'
      >
        Merak ettikleriniz
      </motion.p>
      <motion.h1
        variants={textVariant(0.2)}
        className='text-3xl lg:text-5xl font-bold text-gradient mb-10 md:text-center leading-snug'
      >
        Sıkça Sorulan Sorular
      </motion.h1>

      <motion.div variants={fadeIn('up', '', 0, 0.4)}>
        <Accordion type='single' collapsible className='w-full'>
          {questions.map((q, i) => (
            <AccordionItem key={i} value={i.toString()}>
              <AccordionTrigger>{q.question}</AccordionTrigger>
              <AccordionContent>{q.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Faq, '');
