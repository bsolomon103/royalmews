// import { Carousel } from "@trendyol-js/react-carousel";
import ReactSlidy from "react-slidy";

import "react-slidy/lib/styles.css";
import "./carousel.css";

const IMAGES = [
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/-GB-_INV614_SA_Form_1.png",
    value: "Underbite",
  },
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/-GB-_INV614_SA_Form_3.png",
    value: "Open Bite",
  },
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/CrossBite_Charcoal_RGB.jpg",
    value: "Crossbite",
  },
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/-GB-_INV614_SA_Form_5.png",
    value: "Deep Bite",
  },
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/-GB-_INV614_SA_Form_6.png",
    value: "Gapped Bite",
  },
  {
    url: "https://eu-conweb.s3-eu-west-1.amazonaws.com/Content/newsa3/images/-GB-_INV614_SA_Form_7.png",
    value: "Overly Crowded",
  },
];

function Image({ url, title, clickHandler, selectedImage }) {
  return (
    <div
      className={`item__wrapper ${selectedImage === title ? "selected" : ""}`}
      onClick={() => clickHandler(title)}
    >
      <img src={url} alt={title} />
      <p>{title}</p>
    </div>
  );
}

export default function ImageCarousel({ onSelect, selectedImage }) {
  const handleSelect = (value) => {
    onSelect(value);
  };

  return (
    <div>
      <ReactSlidy imageObjectFit="contain" useFullWidth={false}>
        {IMAGES.map((image) => (
          <Image
            title={image.value}
            url={image.url}
            key={image.value}
            selectedImage={selectedImage}
            clickHandler={handleSelect}
          />
        ))}
      </ReactSlidy>
    </div>
  );
}