import useSnapQR from "snap-qr";

export const QrCode = ({ url }: { url: string }) => {
  const { SnapQRComponent } = useSnapQR(url, {
    layoutOptions: {
      type: "svg",
      margin: 0,
      image: "/images/bioly.jpg",
    },
    imageOptions: {
      hideBackgroundDots: true,
      imageSize: 0.25,
      crossOrigin: "anonymous",
      margin: 8,
    },
    backgroundOptions: {
      color: "var(--color-white)",
    },
    dotsOptions: {
      color: "var(--color-black)",
      type: "extra-rounded",
    },
    cornersSquareOptions: {
      color: "var(--color-black)",
      type: "extra-rounded",
    },
    cornersDotOptions: {
      color: "var(--color-black)",
      type: "extra-rounded",
    },
  });

  return <SnapQRComponent />;
};
