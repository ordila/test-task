import { useEffect, useMemo, useState } from "react";

import useEmblaCarousel from "embla-carousel-react";

import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";

type UseEmblaCarouselControlParams = {
  slidesToScroll?: number;
  options?: Partial<EmblaOptionsType>;
};

type UseEmblaCarouselControlReturn = {
  emblaRef: (node: HTMLElement | null) => void;
  emblaApi: EmblaCarouselType | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  scrollSnaps: number[];
  selectedIndex: number;
};

const baseOptions: EmblaOptionsType = {
  align: "start",
  skipSnaps: false,
  dragFree: false,
  containScroll: "trimSnaps",
  loop: true,
  slidesToScroll: 1,
};

type UseEmblaCarouselControlArg = number | UseEmblaCarouselControlParams;

export function useEmblaCarouselControl(): UseEmblaCarouselControlReturn;

export function useEmblaCarouselControl(
  slidesToScroll: number
): UseEmblaCarouselControlReturn;

export function useEmblaCarouselControl(
  params: UseEmblaCarouselControlParams
): UseEmblaCarouselControlReturn;

export function useEmblaCarouselControl(
  arg: UseEmblaCarouselControlArg = {}
): UseEmblaCarouselControlReturn {
  const { slidesToScroll, options } =
    typeof arg === "number" ? { slidesToScroll: arg } : arg;

  const carouselOptions = useMemo<EmblaOptionsType>(
    () => ({
      ...baseOptions,
      ...options,
      slidesToScroll: slidesToScroll ?? baseOptions.slidesToScroll,
    }),
    [options, slidesToScroll]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions);

  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateState = () => {
    if (!emblaApi) {
      return;
    }

    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateState();
    };

    handleReInit();
    emblaApi.on("select", updateState);
    emblaApi.on("reInit", handleReInit);

    return () => {
      emblaApi.off("select", updateState);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    emblaApi.reInit(carouselOptions);
  }, [emblaApi, carouselOptions]);

  return {
    emblaRef,
    emblaApi,
    scrollPrev,
    scrollNext,
    scrollTo,
    scrollSnaps,
    selectedIndex,
  };
}
