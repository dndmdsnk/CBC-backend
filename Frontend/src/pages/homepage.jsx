import Header from "../components/header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/ProductPage";




export default function Homepage() {
  return (
    <div className="w-full  flex flex-col justify-center items-center  data-twe-container bg-gradient-to-b from-gray-950 via-gray-900 to-black">
 
 <Header />

<div className="w-full  flex flex-col justify-center items-center py-20 h-screen mt-2 relative" >

  
 


<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
    
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl dark:text-white">Welcome to Glow Theory</h1>
<p class="mb-6 text-md font-normal text-white lg:text-lg sm:px-8 xl:px-10 dark:text-gray-400">Glow Theory is more than beauty — it’s the art of radiance, elegance, and timeless luxury crafted to make every moment shine brighter.</p>
<a href="#" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-blue-900">
    Learn more
    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>
</a>

  </div>
<Carousel
  opts={{ align: "start", loop: true }}
  orientation="vertical"
  className="w-full max-w-[1448px] mx-auto mb-21  "
  plugins={[
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
    }),
  ]}
>
  
  <CarouselContent className="-mt-1 h-[95vh]">

    {[
      "https://images.pexels.com/photos/6724448/pexels-photo-6724448.jpeg",
      "https://images.pexels.com/photos/7796166/pexels-photo-7796166.jpeg",
      "https://images.pexels.com/photos/4938514/pexels-photo-4938514.jpeg",
      "https://images.pexels.com/photos/6311853/pexels-photo-6311853.jpeg",
      "https://images.pexels.com/photos/4620843/pexels-photo-4620843.jpeg",
    ].map((src, index) => (
      <CarouselItem key={index} className="basis-full">
        <div className="h-[95vh] flex items-center justify-center p-2">
          <Card className="w-full h-[660px] bg-transparent border-none shadow-black">
            <CardContent className="p-0 h-full relative">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover rounded-lg "
              />

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-lg"></div>
              
              
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>

</div>
    </div>
  );
}
