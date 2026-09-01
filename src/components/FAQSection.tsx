import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./FAQSection.css";
import faqIcon from "../assets/faq_icon.png";

gsap.registerPlugin(ScrollTrigger);

interface FAQQuestionProps {
  question: string;
  answer: string;
  alignLeft: boolean;
}

const FAQQuestion: React.FC<FAQQuestionProps> = ({ question, answer, alignLeft }) => {
  return (
    <div className="faq-row">
      {alignLeft ? (
        <>
          <div className="faq-line"></div>
          <div className="faq-center-content">
            <img src={faqIcon} alt="FAQ Icon" className="faq-icon" />
            <div className="faq-text faq-text-left">
              <h3 className="faq-question-title">
                {question} <span className="faq-dot">●</span>
              </h3>
              <p className="faq-answer">{answer}</p>
            </div>
          </div>
          <div className="faq-spacer"></div>
        </>
      ) : (
        <>
          <div className="faq-spacer"></div>
          <div className="faq-center-content">
            <div className="faq-text faq-text-right">
              <h3 className="faq-question-title">
                <span className="faq-dot">●</span> {question}
              </h3>
              <p className="faq-answer">{answer}</p>
            </div>
            <img src={faqIcon} alt="FAQ Icon" className="faq-icon" />
          </div>
          <div className="faq-line"></div>
        </>
      )}
    </div>
  );
};

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray(".faq-row").forEach((el: any) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
      
      gsap.fromTo(
          ".faq-header",
          { opacity: 0, y: 30 },
          {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                  trigger: ".faq-header",
                  start: "top 85%"
              }
          }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  const faqs = [
    {
      question: "When Will Saturnalia Take Place?",
      answer: "Saturnalia Will Take Place From 21st To 23rd November.",
    },
    {
      question: "When Will Saturnalia Take Place?",
      answer: "Saturnalia Will Take Place From 21st To 23rd November.",
    },
    {
      question: "When Will Saturnalia Take Place?",
      answer: "Saturnalia Will Take Place From 21st To 23rd November.",
    },
    {
      question: "When Will Saturnalia Take Place?",
      answer: "Saturnalia Will Take Place From 21st To 23rd November.",
    },
    {
      question: "When Will Saturnalia Take Place?",
      answer: "Saturnalia Will Take Place From 21st To 23rd November.",
    },
  ];

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="faq-header">
        <h2 className="faq-subtitle">Curious Minds Ask?</h2>
        <h1 className="faq-maintitle">Frequently Asked Questions</h1>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQQuestion 
            key={index}
            question={faq.question}
            answer={faq.answer}
            alignLeft={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
}
