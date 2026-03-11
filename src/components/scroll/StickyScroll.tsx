import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StickyScrollProps {
  graphic: (activeStep: number, progress: number) => ReactNode;
  steps: ReactNode[];
  className?: string;
  graphicClassName?: string;
}

const StepWrapper = ({
  children,
  index,
  onActive,
}: {
  children: ReactNode;
  index: number;
  onActive: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <div ref={ref} className="min-h-[80vh] flex items-center py-16 md:py-24">
      <motion.div
        className="pointer-events-auto bg-background/85 backdrop-blur-md p-6 md:p-8 rounded-lg max-w-sm md:max-w-md mx-4 md:mx-8 border border-persian-gold/10 shadow-2xl"
        initial={{ opacity: 0.15 }}
        animate={{ opacity: inView ? 1 : 0.15 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StickyScroll = ({ graphic, steps, className, graphicClassName }: StickyScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => setProgress(v));
    return unsub;
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} className={cn("relative", className)}>
      <div className={cn("sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden", graphicClassName)}>
        {graphic(activeStep, progress)}
      </div>
      <div className="relative z-10">
        {steps.map((step, i) => (
          <StepWrapper key={i} index={i} onActive={() => setActiveStep(i)}>
            {step}
          </StepWrapper>
        ))}
      </div>
    </section>
  );
};

/* Simple reveal-on-scroll wrapper */
export const RevealOnScroll = ({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* Parallax layer */
export const ParallaxLayer = ({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
