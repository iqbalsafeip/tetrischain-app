import { useEffect, useState } from "react";

const blockType = [
  {
    name: "blockWood",
    price: 1000,
    point: 1.2,
    label: "Wood Block (Lv 1)"
  },
  {
    name: "blockZigzag",
    price: 4000,
    point: 1.7,
    label: "Zap Block (Lv 2)"
  },
  {
    name: "blockGlow",
    price: 10000,
    point: 2,
    label: "Glow Block (Lv 3)"
  },
  {
    name: "blockMetal",
    price: 20000,
    point: 2.5,
    label: "Block Metal (Lv 4)"
  },
  {
    name: "glow_block",
    price: 50000,
    point: 5,
    label: "Neon Block (Lv 5)"
  },


]

export function useBlockImages() {
  const [images, setImages] = useState({});

  useEffect(() => {
    const imgMap = {};
    const total = 7;
    let loaded = 0;

    blockType.map((block)=> {

        const img = new Image();
        img.src = `/images/${block.name}.webp`;
        img.onload = () => {
          loaded++;
          if (loaded === blockType.length) setImages(imgMap);
        };
        imgMap[block.name] = img;
    })
  }, []);

  return images;
}
