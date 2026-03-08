import { urlFor } from "@/lib/sanity.image-url";
import Image from "next/image";

const ImageComponent = ({ image, className }) => {
  return (
    <Image
      src={urlFor(image).url()}
      fill
      sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
      alt={image.alt || "Image"}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      className={className}
    />
  );
};
export default ImageComponent;
