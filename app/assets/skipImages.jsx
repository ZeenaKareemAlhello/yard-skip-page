export default function (imageSize) {
  const skipImages = {
    small:
      "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg",
    big: "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v…object/public/skips/skip-sizes/40-yarder-skip.jpg",
  };
  return skipImages[imageSize];
}
