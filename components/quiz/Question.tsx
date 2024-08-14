interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  return (
    <div className="text-xl text-light text-zinc-200 mb-4">
      Ques. {question}
    </div>
  );
};

export default Question;
