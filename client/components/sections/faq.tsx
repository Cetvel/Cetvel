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
    question: "TanjantPro platformlarda kullanılabilir?",
    answer:
      "Şuanda sadece web uygulamamız mevcut. Çok yakında mobilde de olacağız.",
  },
  {
    question: "TanjantPro'nun temel özellikleri nelerdir?",
    answer:
      "Kullanıcı dostu olması dikkat edilerek tasarlanmış TanjantPro; alışkanlık oluşturma ve takibi, zaman ve çalışma yönetimi, sınav konularını öğrenme ilerlemesi takibi, takvim üzerinden çalışma programı yapma, not alma ve düzenleme, net hesaplama ve netleri kaydedip grafiğe dökme gibi bir sınav öğrencisinin teknik açıdan en büyük ihtiyaçlarını karşılamaya yönelik işlevler sunar.",
  },
  {
    question: "Bu yazılımın ücretli veya ücretsiz sürümleri var mı?",
    answer:
      "TanjantPro'yu 1 haftalık ücretsiz deneme sürümü ile deneyebilirsiniz! Ardından aylık, dönemlik ve yıllık paketlerimizi satın alabilirsiniz.",
  },
  {
    question:
      "Kullanıcılar hangi tür destek ve yardım hizmetlerinden yararlanabilir?",
    answer:
      "Resmi discord sunucumuza katılarak veya sosyal medya hesaplarımızdan bizimle iletişime geçebilirsiniz.",
  },
  {
    question:
      "Yazılımın gelecekteki güncellemeleri veya ek özellikleri hakkında bilgi var mı?",
    answer:
      "Gerekli bilgilendirmeler discord sunucumuzda ve sosyal medya hesaplarımızda yayınlanmaktadır.",
  },
];

const Faq = () => {
  return (
    <section
      id="faq"
      className="bg-light-400 dark:bg-dark-300 py-24 px-6 md:px-4 flex flex-col gap-10 md:items-center"
    >
      <div>
        <p className="font-bold text-primary mb-4 md:text-center">
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
