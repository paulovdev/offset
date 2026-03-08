import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import Lenis from "lenis";
import TextAnimated from "@/components/ui/text-animated";
import { IoClose } from "react-icons/io5";
import { fade, textSlide } from "@/animations/sections/navigation.animations";
import { modalContainer } from "@/animations/sections/home.animations";
import { textSlide2 } from "@/animations/shared/global-anim";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import ImageComponent from "@/components/ui/image";

const Modal = ({ setModal, modal, activeItem }) => {
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: scrollRef,
    offset: ["start start", "end start"],
  });
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
    root: scrollRef.current,
  });
  const y = useTransform(scrollYProgress, [0, 0.5], [22, 0]);
  const h = useTransform(scrollYProgress, [0, 0.5], ["100%", "150%"]);
  const y2 = useTransform(scrollYProgress, [0.25, 1], [22, 0]);
  const h2 = useTransform(scrollYProgress, [0.25, 1], ["100%", "150%"]);

  useEffect(() => {
    if (!modal || !scrollRef.current) return;

    const lenis = new Lenis({
      wrapper: scrollRef.current,
      content: scrollRef.current.firstElementChild,
      smoothWheel: true,
      lerp: 0.1,
      syncTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [modal]);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modal]);
  console.log(activeItem);
  return (
    <>
      <motion.div
        className="fixed bottom-0 right-0 w-[50vw] bg-s/15 backdrop-blur-3xl select-none z-[100] max-ds:w-[70vw] max-lg:w-full"
        variants={modalContainer}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div ref={scrollRef} className="size-full overflow-hidden">
          <div
            className="absolute top-0 right-0 px-10 pt-10 text-s mix-blend-exclusion text-[42px] cursor-pointer
              max-ds:px-8 max-lg:px-5 max-lg:pt-5 z-20"
          >
            <button
              className="text-s font-general text-[14px] leading-none tracking-[-0.03em] uppercase max-md:text-[12px] cursor-pointer flex items-center gap-2"
              onClick={() => setModal(false)}
            >
              <IoClose className="text-[16px] max-md:text-[14px]" /> close
            </button>
          </div>
          <div className="relative px-10 pt-10 pb-10 w-full flex flex-col items-start justify-between gap-10 max-md:px-2 max-ds:px-8 max-lg:px-5 max-lg:pt-5 max-lg:flex-col">
            <div className="relative w-full">
              <div className="mb-12 overflow-hidden h-fit ">
                <motion.p
                  className=" text-s/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]"
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={{ animate: 0.4 }}
                >
                  — Number°{activeItem.number}
                </motion.p>
              </div>
              <TextAnimated
                phrases={[activeItem.title + activeItem.mark]}
                variants={textSlide}
                as="h2"
                className="max-w-[1400px] w-full flex flex-col"
                lineClassName="
          text-s text-[62px] tracking-[-0.03em] leading-none 
          max-ds:text-[52px] 
          max-lg:text-[48px] 
          max-md:text-[32px] 
          flex flex-wrap mb-6
        "
                wordClassName="mr-2"
                wordDelay={0.025}
                lineDelay={0.015}
              />

              <div className="overflow-hidden h-fit ">
                <motion.p
                  className="text-s/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]"
                  variants={textSlide}
                  initial="initial"
                  animate="animate"
                  custom={{ animate: 0.6 }}
                >
                  {activeItem.year} — {activeItem.meta}
                </motion.p>
              </div>
            </div>

            {/*  */}
            <div className="w-full flex flex-col items-end">
              <div className="w-full flex flex-col">
                {activeItem.sections?.map((block, i) => {
                  switch (block._type) {
                    case "labImage":
                      return (
                        <LabImageBlock key={i} block={block} modal={modal} />
                      );

                    case "labText":
                      return (
                        <LabTextBlock key={i} block={block} modal={modal} />
                      );

                    case "labSystem":
                      return (
                        <div ref={ref} key={i} className="w-full">
                          <AnimatePresence mode="wait">
                            <LabSystemBlock block={block} inView={inView} />
                          </AnimatePresence>
                        </div>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-0 left-0 w-full h-dvh bg-p/50 z-[90]"
        variants={fade}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={{ animate: 0, exit: 0.5 }}
        onClick={() => setModal(false)}
      />
    </>
  );
};

export default Modal;

const LabImageBlock = ({ block, modal }) => {
  return (
    <motion.figure className="relative mb-4 w-full h-[40vh] overflow-hidden max-lg:h-[35vh]">
      <ImageComponent image={block.image} className="size-full object-cover" />

      {block.overlayText && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: modal ? 1 : 0, y: modal ? 0 : 20 }}
          transition={{
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2,
          }}
          className="absolute bottom-5 right-5 text-s font-general font-medium text-[14px] uppercase"
        >
          {block.overlayText}
        </motion.p>
      )}
    </motion.figure>
  );
};

const LabTextBlock = ({ block, modal }) => (
  <div className="mt-10 mb-20 flex items-start max-md:flex-col">
    <div className="flex-1 max-md:mb-6">
      <div className="overflow-hidden h-fit">
        <motion.p
          className=" text-s/50 font-general font-medium text-[14px] tracking-[-0.03em] uppercase max-md:text-[12px]"
          variants={textSlide}
          initial="initial"
          animate="animate"
          custom={{ animate: 0.4 }}
        >
          {block.label}
        </motion.p>
      </div>
    </div>

    <div className="flex-[1.25]">
      <TextAnimated
        phrases={[block.text]}
        variants={textSlide2}
        animate={modal}
        as="h2"
        className="w-full flex flex-col"
        lineClassName="font-inter font-normal text-s text-[22px] tracking-[-0.03em] max-lg:text-[22px] leading-[1.11] flex flex-wrap "
        wordClassName="mr-2"
        wordDelay={0.025}
        lineDelay={0.025}
      />
    </div>
  </div>
);

const LabSystemBlock = ({ block, inView }) => (
  <div className="space-y-2">
    {block.items.map((item, i) => (
      <div key={i} className="h-[14px] overflow-hidden">
        <motion.p
          className="w-full flex items-center justify-between text-s font-general font-medium text-[14px] leading-none tracking-[-0.03em] uppercase"
          variants={textSlide}
          initial="initial"
          animate={inView ? "animate" : "initial"}
          custom={{ animate: i * 0.05 }}
        >
          <span>{item.label}</span>
          <span>{item.value}</span>
        </motion.p>
      </div>
    ))}
  </div>
);
