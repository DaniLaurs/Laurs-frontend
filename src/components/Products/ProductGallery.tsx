import { useState } from "react";
import type { Product } from "../../types/product";


interface ProductGalleryProps {
  product: Product;
}


export function ProductGallery({ product }: ProductGalleryProps) {

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]?.imageUrl || ""
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [zoom, setZoom] = useState(false);



  function nextImage() {

    const next =
      (currentImageIndex + 1) % product.images.length;

    setCurrentImageIndex(next);
    setSelectedImage(product.images[next].imageUrl);

  }



  function previousImage() {

    const prev =
      (currentImageIndex - 1 + product.images.length) %
      product.images.length;

    setCurrentImageIndex(prev);
    setSelectedImage(product.images[prev].imageUrl);

  }



  return (
    <div>

      <div className="relative overflow-hidden rounded-3xl">

        <img
          src={selectedImage}
          alt={product.name}
          onMouseEnter={() => setZoom(true)}
          onMouseLeave={() => setZoom(false)}
          className={`
            w-full
            h-[450px]
            object-cover
            rounded-3xl
            transition-transform
            duration-300
            cursor-zoom-in
            ${zoom ? "scale-125" : "scale-100"}
          `}
        />


        {product.images.length > 1 && (
          <button
            onClick={previousImage}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              bg-white/80
              hover:bg-white
              w-12
              h-12
              rounded-full
              shadow-lg
              text-2xl
            "
          >
            ◀
          </button>
        )}



        {product.images.length > 1 && (
          <button
            onClick={nextImage}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              bg-white/80
              hover:bg-white
              w-12
              h-12
              rounded-full
              shadow-lg
              text-2xl
            "
          >
            ▶
          </button>
        )}

      </div>



      <div className="flex gap-3 mt-5 flex-wrap">

        {product.images.map((image, index) => (

          <img
            key={image.id}
            src={image.imageUrl}
            alt={product.name}
            onClick={() => {
              setCurrentImageIndex(index);
              setSelectedImage(image.imageUrl);
            }}
            className="
              w-20
              h-20
              object-cover
              rounded-xl
              border-2
              border-red-500
            "
          />

        ))}

      </div>


    </div>
  );
}