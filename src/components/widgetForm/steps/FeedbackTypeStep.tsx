import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeProps{
  onFeedbackTypeChanged: (type: FeedbackType) => void
}

export function FeedbackTypeStep({ onFeedbackTypeChanged }: FeedbackTypeProps){
  return(
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton/>
      </header>
      <div className="flex py-8 gap-2 w-full">
        { Object.entries(feedbackTypes).map(([key, value]) => {
          return(
            <button 
              key={key}
              onClick={() => onFeedbackTypeChanged(key as FeedbackType)} //key as FeedbackType => será sempre o valor dessa variável
              className="bg-zinc-800 py-5 rounded-lg w-24 flex-1 flex flex-col gap-1 items-center border-2
              border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
            >
              <img src={value.image.src} alt={value.image.alt}/>
              <span>{value.title}</span>
            </button>
          );
        }) }
      </div>
    </>
  );
}