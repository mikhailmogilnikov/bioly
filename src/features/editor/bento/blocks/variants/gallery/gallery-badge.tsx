export const GalleryBadge = ({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) => (
  <div className="absolute top-2.5 right-2.5 rounded-full bg-black/40 px-1.5 py-0.5 text-white backdrop-blur-lg">
    <p className="font-medium text-xs">
      {currentIndex}/{total}
    </p>
  </div>
);
