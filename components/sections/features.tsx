'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Flashlight,
  Timer,
  Brain,
  Star,
  Target,
  Zap,
  Bell,
} from 'lucide-react';
import { useTheme } from 'next-themes';

const features = [
  {
    icon: <Brain size={20} className='text-white' />,
    title: 'Yapay Zeka Destekli Öğrenme',
    description:
      'Öğrenme sürecinizi iyileştirmek için ai destekli görev ve öneriler.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    icon: <Timer size={20} className='text-white' />,
    title: 'Zaman Yönetimi',
    description:
      'Derslerinizi ve ödevlerinizi düzenlemek için zamanlayıcı sistemi.',
    gradient: 'from-green-400 to-cyan-500',
  },
  {
    icon: <Star size={20} className='text-white' />,
    title: 'İlerleme Takibi',
    description: 'Akademik hedeflerinizi belirleyin ve başarılı olun.',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    icon: <Target size={20} className='text-white' />,
    title: 'Hedef Belirleme',
    description: 'Öğrenme hedeflerinizi belirleyin ve hedeflerinize ulaşın.',
    gradient: 'from-red-400 to-pink-500',
  },
  {
    icon: <Flashlight size={20} className='text-white' />,
    title: 'Sınav Hazırlığı',
    description: 'Girdiğiniz sınavları kaydedin ve analiz edin.',
    gradient: 'from-purple-400 to-violet-500',
  },
  {
    icon: <Bell size={20} className='text-white' />,
    title: 'Bildirimler',
    description: 'Görevleriniz ve sınavlarınız hakkında bildirimler alın.',
    gradient: 'from-pink-400 to-rose-500',
  },
];

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient?: string;
};

const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
}: FeatureCardProps) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${gradient} p-1 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full`}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className='bg-dark-100 p-6 rounded-xl h-full flex flex-col items-center text-center'>
        <div className='bg-white/10 p-4 rounded-full mb-6 backdrop-blur-sm'>
          {icon}
        </div>
        <h3 className='text-xl font-bold mb-3 text-white'>{title}</h3>
        <p className='text-white/85 text-sm flex-grow'>{description}</p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const { resolvedTheme } = useTheme();

  return (
    <section
      id='features'
      className='py-20 md:pt-32 bg-dark-200 flex flex-col items-center px-6 md:px-32 mx-auto relative'
    >
      <div className='absolute inset-0 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent opacity-30' />

      <div className='relative z-10 w-full max-w-6xl'>
        <Image
          src={`/image/app-${resolvedTheme === 'dark' ? 'dark' : 'light'}.png`}
          alt='hero'
          height={720}
          width={1400}
          className='mx-auto -mt-96 rounded-xl border shadow-2xl mb-20'
          draggable={false}
        />

        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
