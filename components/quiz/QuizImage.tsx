import Image, { StaticImageData } from "next/image";
import quiz1 from "@/public/quiz/quiz1.jpeg";
import quiz2 from "@/public/quiz/quiz2.jpeg";
import quiz3 from "@/public/quiz/quiz3.jpeg";
import quiz4 from "@/public/quiz/quiz4.jpeg";
import quiz5 from "@/public/quiz/quiz5.jpeg";
import quiz6 from "@/public/quiz/quiz6.jpeg";

const quizImages = [quiz1, quiz2, quiz3, quiz4, quiz5, quiz6];

interface QuizImageProps {
  imageSrc: StaticImageData;
}

const QuizImage: React.FC<QuizImageProps> = ({ imageSrc }) => {
  return (
    <div className="relative w-full h-96 mb-4">
      <Image
        src={imageSrc}
        alt="Quiz Background"
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

export default QuizImage;
