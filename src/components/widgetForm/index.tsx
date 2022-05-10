import { useState } from "react";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";

import bug from '../../assets/bug.svg';
import idea from '../../assets/idea.svg';
import other from '../../assets/other.svg';
import { FeedbackSucessStep } from "./steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      src: bug,
      alt: "Imagem de um inseto"
    }
  }, 
  IDEA: {
    title: "Ideia",
    image: {
      src: idea,
      alt: "Imagem de uma lâmpada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      src: other,
      alt: "Imagem de um balão de pensamento"
    }
  }
}

// Object.entries(feedbackTypes) =>
/* 
[
  ["BUG", {...}],
  ["IDEA", {...}],
  ["OTHER", {...}]
]
*/

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm(){

  //feedbackTypes será sempre 'BUG', 'IDEA', 'OTHER' ou 'null'
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  function handleRestartFeedback(){
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return(
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 
    flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      { feedbackSent ? (
        <FeedbackSucessStep
          onFeedbackRestartRequest={handleRestartFeedback}
        />
      ) : (
        <>
          {
            !feedbackType ?
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
            :
              <FeedbackContentStep 
                feedbackType={feedbackType} 
                onFeedbackRestartRequest={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
            />
          } 
        </>
      )}      

      <footer className="text-xs text-neutral-400">
        Feito com amor ♥︎ pela <a className="underline underline-offset-2" target="_blank" href="https://www.rocketseat.com.br">Rocketseat</a>
      </footer>
    </div>
  );
}