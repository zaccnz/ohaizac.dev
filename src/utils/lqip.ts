import { getImage } from "astro:assets";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

export const generateLQIP = async (image: string) => {
  const images = import.meta.glob<{ default: ImageMetadata }>(
    "/src/assets/images/" + "*.{jpeg,jpg,png,gif}",
  );

  const imagePath = "/src/assets/images/" + image;
  if (images[imagePath]) {
    const imageBuffer = await readFile("./" + imagePath);
    const imageSharp = sharp(imageBuffer);

    const dimensions = await imageSharp.metadata();
    const aspect = `${dimensions.width} / ${dimensions.height}`;

    const lqip = await imageSharp.resize(12).toBuffer();
    const placeholder = `data:image/png;base64,${lqip.toString("base64")}`;

    const { src } = await getImage({
      src: (await images[imagePath]()).default,
    });

    return {
      aspect,
      placeholder,
      src,
    };
  } else {
    throw `Could not find image ${image} at ${imagePath}`;
  }
};
