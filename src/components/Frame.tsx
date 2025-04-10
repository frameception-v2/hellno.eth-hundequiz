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
}

const QUIZ_DATA: QuizQuestion[] = [
  {
    question: "Welche Hunderasse ist bekannt für ihre charakteristische schwarze Zunge?",
    options: ["Dalmatiner", "Chow Chow", "Dackel", "Golden Retriever"],
    correctAnswer: "Chow Chow",
  },
  {
    question: "Welche Rasse wird oft als 'Wiener Hund' bezeichnet?",
    options: ["Beagle", "Dackel", "Pudel", "Shiba Inu"],
    correctAnswer: "Dackel",
  },
  {
    question: "Welcher Hund wurde ursprünglich für die Jagd auf Bären gezüchtet?",
    options: ["Pomeranian", "Japan Chin", "Karelischer Bärenhund", "Shih Tzu"],
    correctAnswer: "Karelischer Bärenhund",
  },
  {
    question: "Welche Rasse ist der kleinste Schäferhund der Welt?",
    options: ["Deutsche Dogge", "Shetland Sheepdog", "Corgi", "Australischer Terrier"],
    correctAnswer: "Corgi",
  },
  {
    question: "Welcher Hund hat ein faltenreiches Gesicht?",
    options: ["Shar Pei", "Border Collie", "Husky", "Pekingese"],
    correctAnswer: "Shar Pei",
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
          <CardDescription className="text-green-600">
            Du hast {score} von {QUIZ_DATA.length} Fragen richtig beantwortet!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all" 
              style={{ width: `${(score / QUIZ_DATA.length) * 100}%` }}
            ></div>
          </div>
          <Label className="text-center text-sm text-gray-500">
            {score >= 4 ? "Ausgezeichnet! 🐶" :
             score >= 2 ? "Gute Arbeit! 🐾" : 
             "Versuche es nochmal! 🦴"}
          </Label>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>HundeQuiz</CardTitle>
        <CardDescription>
          Frage {currentQuestion + 1} von {QUIZ_DATA.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label className="text-3xl font-bold mb-4 text-center">
          {QUIZ_DATA[currentQuestion].question}
        </Label>
        <div className="flex flex-col gap-2">
          {QUIZ_DATA[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
              className={`p-3 text-left rounded-md transition-all
                ${selectedAnswer 
                  ? option === QUIZ_DATA[currentQuestion].correctAnswer
                    ? "bg-green-500 text-white ring-2 ring-green-600"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white ring-2 ring-red-600"
                    : "bg-gray-100 opacity-75"
                  : "bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-blue-500"}
                ring-offset-2
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
