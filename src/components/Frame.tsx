"use client";

import { useEffect, useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";

import { Label } from "~/components/ui/label";
import { useFrameSDK } from "~/hooks/useFrameSDK";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  image: string;
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    question: "Welche Hunderasse ist bekannt für ihre charakteristische schwarze Zunge?",
    options: ["Dalmatiner", "Chow Chow", "Dackel", "Golden Retriever"],
    correctAnswer: "Chow Chow",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/ChowChow2Szilussi.jpg"
  },
  {
    question: "Welche Rasse wird oft als 'Wiener Hund' bezeichnet?",
    options: ["Beagle", "Dackel", "Pudel", "Shiba Inu"],
    correctAnswer: "Dackel",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dachshund-640.jpg"
  },
  {
    question: "Welcher Hund wurde ursprünglich für die Jagd auf Bären gezüchtet?",
    options: ["Pomeranian", "Japan Chin", "Karelischer Bärenhund", "Shih Tzu"],
    correctAnswer: "Karelischer Bärenhund",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Karelian-bear-dog_01.jpg"
  },
  {
    question: "Welche Rasse ist der kleinste Schäferhund der Welt?",
    options: ["Deutsche Dogge", "Shetland Sheepdog", "Corgi", "Australischer Terrier"],
    correctAnswer: "Corgi",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Welchcorgipembroke.JPG"
  },
  {
    question: "Welcher Hund hat ein faltenreiches Gesicht?",
    options: ["Shar Pei", "Border Collie", "Husky", "Pekingese"],
    correctAnswer: "Shar Pei",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/SharPei.jpg"
  }
];

function QuizCard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === QUIZ_DATA[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion === QUIZ_DATA.length - 1) {
        setIsDone(true);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
      }
    }, 1500);
  };

  if (isDone) {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Quiz abgeschlossen! 🎉</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Ergebnis: {score} von {QUIZ_DATA.length} richtig!</Label>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Hunderassen Quiz</CardTitle>
        <CardDescription>
          Frage {currentQuestion + 1} von {QUIZ_DATA.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <img 
          src={QUIZ_DATA[currentQuestion].image}
          alt="Hunderasse"
          className="h-48 w-full object-cover rounded-lg"
        />
        <Label>{QUIZ_DATA[currentQuestion].question}</Label>
        <div className="flex flex-col gap-2">
          {QUIZ_DATA[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`p-2 text-left rounded-md transition-colors
                ${selectedAnswer 
                  ? option === QUIZ_DATA[currentQuestion].correctAnswer
                    ? "bg-green-500 text-white"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "bg-gray-100"
                  : "bg-gray-100 hover:bg-gray-200"}
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Frame() {
  const { isSDKLoaded } = useFrameSDK();

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto py-2 px-2 flex justify-center">
      <QuizCard />
    </div>
  );
}
