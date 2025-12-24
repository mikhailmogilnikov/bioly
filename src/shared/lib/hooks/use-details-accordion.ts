import { type RefObject, useEffect } from "react";

class Accordion {
  private readonly el: HTMLDetailsElement;
  private readonly summary: HTMLElement;
  private readonly content: HTMLElement | null;
  private animation: Animation | null = null;
  private isClosing = false;
  private isExpanding = false;

  constructor(el: HTMLDetailsElement) {
    this.el = el;
    const summaryElement = el.querySelector("summary");
    if (!summaryElement) {
      throw new Error("Details element must have a summary");
    }
    this.summary = summaryElement;
    this.content = el.querySelector('[data-type="detailsContent"]');

    this.summary.addEventListener("click", (e: MouseEvent) => this.onClick(e));
  }

  private onClick(e: MouseEvent) {
    e.preventDefault();
    this.el.style.overflow = "hidden";

    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  private shrink() {
    this.isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 150,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => {
      this.isClosing = false;
    };
  }

  private open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  private expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${
      this.summary.offsetHeight + (this.content?.offsetHeight ?? 0)
    }px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = this.el.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 100,
        easing: "linear",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => {
      this.isExpanding = false;
    };
  }

  private onAnimationFinish(open: boolean) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = "";
    this.el.style.overflow = "";
  }

  cancelAnimation() {
    if (this.animation) {
      this.animation.cancel();
    }
  }
}

export function useDetailsAccordion(
  containerRef: RefObject<HTMLElement | null>
): void {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const detailsElements = container.querySelectorAll<HTMLDetailsElement>(
      ".tiptap-static .details"
    );

    const accordions = Array.from(detailsElements).map(
      (el) => new Accordion(el)
    );

    return () => {
      // Отменяем все активные анимации при размонтировании
      for (const accordion of accordions) {
        accordion.cancelAnimation();
      }
    };
  }, [containerRef]);
}
