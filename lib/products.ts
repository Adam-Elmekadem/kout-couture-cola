export type Product = {
  id: string;
  name: string;
  type: "Outerwear" | "Fleece" | "Bottoms";
  price: number;
  image: string;
  alt: string;
  color: string;
  description: string;
  details: string[];
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "block-varsity",
    name: "Block Varsity",
    type: "Outerwear",
    price: 260,
    image: "/images/block-varsity.webp",
    alt: "Cream varsity jacket with oxblood sleeves and an original interlocking CC patch",
    color: "Cream / oxblood",
    description: "A campus classic with a sharper cut and a mark of its own.",
    details: ["Wool blend body", "Gloss leather sleeves", "Original chenille CC patch"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "spill-hoodie",
    name: "Spill Hoodie",
    type: "Fleece",
    price: 145,
    image: "/images/spill-hoodie.webp",
    alt: "Washed black oversized hoodie with a red brushstroke across the front",
    color: "Washed black / red",
    description: "Heavyweight fleece with one unruly stroke across the body.",
    details: ["470 gsm cotton fleece", "Oversized dropped shoulder", "Textured red appliqué"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "cutline-cargo",
    name: "Cutline Cargo",
    type: "Bottoms",
    price: 185,
    image: "/images/cutline-cargo.webp",
    alt: "Oxblood wide-leg cargo trousers with sculptural pockets and black webbing",
    color: "Oxblood",
    description: "A generous leg, engineered pockets, and a deep lacquer-red finish.",
    details: ["Garment-washed cotton twill", "Wide adjustable leg", "Utility pockets and webbing"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
];
