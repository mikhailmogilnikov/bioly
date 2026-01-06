import { AdaptiveModalHeader } from "@/shared/ui/kit/overlays/adaptive-modal";
import { useModalViews } from "./modal-views-provider";

export type ModalViewsMap<Views extends string> = Record<
  Views,
  {
    title: string;
    component: React.ReactNode;
    onBack?: () => void;
  }
>;

interface ModalViewsControllerProps<Views extends string> {
  viewsMap: ModalViewsMap<Views>;
}

export function ModalViewsController<Views extends string>({
  viewsMap,
}: ModalViewsControllerProps<Views>) {
  const { views } = useModalViews<Views>();
  // const [height, setHeight] = useState<"auto" | number>("auto");
  // const contentRef = useRef<HTMLDivElement>(null);
  // const prevViewRef = useRef<string | undefined>(undefined);

  const activeView = views.at(-1);
  const activeViewData = activeView ? viewsMap[activeView] : null;

  // useEffect(() => {
  //   if (!contentRef.current) {
  //     return;
  //   }

  //   const updateHeight = () => {
  //     if (!contentRef.current) {
  //       return;
  //     }

  //     const element = contentRef.current;
  //     const computedStyle = window.getComputedStyle(element);
  //     const marginTop = Number.parseFloat(computedStyle.marginTop) || 0;
  //     const marginBottom = Number.parseFloat(computedStyle.marginBottom) || 0;
  //     const fullHeight = element.offsetHeight + marginTop + marginBottom;

  //     if (fullHeight > 0) {
  //       setHeight(fullHeight);
  //     }
  //   };

  //   // Используем ResizeObserver для отслеживания изменений высоты
  //   const resizeObserver = new ResizeObserver(() => {
  //     updateHeight();
  //   });

  //   resizeObserver.observe(contentRef.current);

  //   // При смене вьюшки принудительно обновляем высоту
  //   if (activeView !== prevViewRef.current) {
  //     // Небольшая задержка для того, чтобы новый контент успел отрендериться
  //     const timeoutId = setTimeout(() => {
  //       updateHeight();
  //     }, 0);

  //     prevViewRef.current = activeView;

  //     return () => {
  //       clearTimeout(timeoutId);
  //       resizeObserver.disconnect();
  //     };
  //   }

  //   // Обновляем высоту при монтировании
  //   updateHeight();

  //   return () => {
  //     resizeObserver.disconnect();
  //   };
  // }, [activeView]);

  if (views.length === 0) {
    return null;
  }

  return (
    <>
      <AdaptiveModalHeader onBack={activeViewData?.onBack}>
        {activeViewData?.title}
      </AdaptiveModalHeader>
      {activeViewData?.component}
      {/* 
      <AnimateHeight duration={200} height={height}>
        <div ref={contentRef}>{activeViewData?.component}</div>
      </AnimateHeight> */}
    </>
  );
}
