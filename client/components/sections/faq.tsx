"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const questions = [
  {
    question: "Hangi Öğrenciler Cetvel'tan  Faydalanabilir?",
    answer:
      "Uygulamamız tüm öğrencilere hizmet verebilmek amacı ile geliştirilmiştir. İlkokul, Ortaokul, Lise ve Üniversite öğrencileri uygulamamızı kullanabilirler.",
  },
  {
    question: "Sınav Öğrencileri İçin Özel olarak Neler Var?",
    answer:
      "Sınav öğrencileri için özel net hesaplama aracı bulunmaktadır. Öğrenciler dilerlerse girdikleri denemeyi kaydedebilirler ve uygulamamızın zengin analiz algoritmaları eşliğinde çeşitli veri grafikleri ile hazırlık süreçleri en iyi şekilde takip edebilirler.",
  },
  {
    question: "Cetvel platformlarda kullanılabilir?",
    answer:
      "Uygulamamız web üzerinden hizmet vermektedir. Çok yakında mobil uygulamamız ile de hizmet vermeye başlayacağız!",
  },
  {
    question: "Kaydedilen denemeler nasıl analiz ediliyor?",
    answer:
      "Kaydedilen denemeler, çeşitli tablo ve çizgi grafikleri ile analiz edilmektedir. Bu grafikler sayesinde performansınızı görsel olarak takip edebilirsiniz.",
  },
  {
    question: "Veri güvenliği nasıl sağlanıyor?",
    answer:
      "Kullanıcı verilerinizin güvenliği bizim için çok önemlidir. Verileriniz güvenli sunucularda saklanmakta ve üçüncü şahıslarla paylaşılmamaktadır. Veri güvenliği sözleşmemizi okuyabilirsiniz.",
  },
  {
    question: "Cetvel'a Nasıl Üye Olabilirim?",
    answer:
      " 'Fiyatlar' kısmından uygun paketi seçerek üye olabilirsiniz. Üyelik işlemleri oldukça basit ve hızlıdır.",
  },
  {
    question: "Teknik destek nasıl alabilirim?",
    answer:
      "Herhangi bir sorun yaşadığınızda veya yardıma ihtiyacınız olduğunda, uygulama içindeki 'Destek' bölümünden bize ulaşabilirsiniz. Mümkün olan en kısa sürede size geri döneceğiz.",
  },
];

const Faq = () => {
  return (
    <section
      id="faq"
      className="bg-light-400 dark:bg-dark-300 py-24 px-6 md:px-4 flex flex-col gap-10 md:items-center"
    >
      <div>
        <p className="font-bold text-primary-500 mb-4 md:text-center">
          Merak ettikleriniz
        </p>
        <h1 className="text-3xl lg:text-5xl font-bold text-base-content md:text-center leading-snug">
          Sıkça Sorulan Sorular
        </h1>

        <div className="max-w-4xl mt-20">
          <Accordion type="single" collapsible className="w-full">
            {questions.map((q, i) => (
              <AccordionItem key={i} value={i.toString()}>
                <AccordionTrigger>{q.question}</AccordionTrigger>
                <AccordionContent>{q.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
