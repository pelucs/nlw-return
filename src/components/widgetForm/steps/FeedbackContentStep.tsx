import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepsProps{
  feedbackType: FeedbackType;
  onFeedbackSent: () => void; 
  onFeedbackRestartRequest: () => void;
}

export function FeedbackContentStep({ feedbackType, 
  onFeedbackRestartRequest, 
  onFeedbackSent, }: FeedbackContentStepsProps){

  const [comments, setComments] = useState("");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleSubmitFeedback(event: FormEvent){
    event.preventDefault();

    api.post("/feedbacks", {
      type: feedbackType,
      comments,
      screenshot,
    })
    .then(() => {
      onFeedbackSent();
    })
    .catch(() => {
      alert("ERRO")
    })
  }

  return(
    <>
      <header>
        <button 
          type="button"
          onClick={onFeedbackRestartRequest}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft/>
        </button>
        <span className="text-xl leading-6 flex items-center justify-center gap-1 ">
          <img className="w-6 h-6" src={feedbackTypeInfo.image.src} alt={feedbackTypeInfo.image.alt}/>
          {feedbackTypeInfo.title}
        </span>
        <CloseButton/>
      </header>
      
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 
          text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500
          focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none" 
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={event => setComments(event.target.value)}
        ></textarea>

        <footer className="flex gap-2 mb-4">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comments.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex items-center justify-center
            text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
            focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}