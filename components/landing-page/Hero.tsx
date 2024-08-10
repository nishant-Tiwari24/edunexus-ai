import { FaArrowRight, FaLocationArrow } from "react-icons/fa6";
import MagicButton from "../ui/MagicButton";
import { TextGenerateEffect } from "../ui/TextGenerateEffect";
import { useRouter } from "next/navigation";

const Hero = () => {
  const route = useRouter();
  return (
    <div className="pb-20 pt-36 relative">
      {/* Spotlights */}
      <div></div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover opacity-40 bg-center z-0"
        style={{ backgroundImage: "url(/landing-page/bg.png)" }}
      ></div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic with Next.js
          </p>
          <TextGenerateEffect
            words="Transforming Education into Seamless User Experiences"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            totam?
          </p>

          <div className="flex space-x-4 mb-4">
            <MagicButton
              title="Register Now"
              handleClick={() => route.push("/signup")}
              icon={<FaArrowRight />}
              position="right"
            />
            <MagicButton
              title="Generate a Roadmap"
              handleClick={() => route.push("/roadmap")}
              icon={<FaLocationArrow />}
              position="right"
            />
          </div>

          {/* <div className="flex space-x-4 mt-10">
            <motion.div
              className="bg-blue-500 p-4 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaArrowRight className="text-white" />
            </motion.div>
            <motion.div
              className="bg-red-500 p-4 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaLocationArrow className="text-white" />
            </motion.div>
            <motion.div
              className="bg-green-500 p-4 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaArrowRight className="text-white" />
            </motion.div>
            <motion.div
              className="bg-yellow-500 p-4 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaLocationArrow className="text-white" />
            </motion.div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
