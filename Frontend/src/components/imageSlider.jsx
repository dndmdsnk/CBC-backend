import { useState } from "react"

export default function ImageSlider(props){
    const images = props.images
    const [currentIndex , setCurrentIndex] = useState(0)
    return(
        <div className="w-[400px] h-[500px] justify-center items-center mt-15  ml-20  ">
            <img src={images[currentIndex]} className="w-full h-[400px] object-cover rounded-3xl border-gray-400 border-2 "/>
            <div className="w-full h-[100px] flex justify-center items-center bg-black">
                {
                    images?.map(
                        (image,index)=>{
                            return(
                                <img key={index} className={"w-[80px] h-[80px] m-2 rounded-2xl object-cover cursor-pointer hover:border-4 hover:border-green-500 "+(index == currentIndex&&"border-green-500 border-4")} src={image} onClick={
                                    ()=>{
                                        setCurrentIndex(index)
                                    }
                                }/>
                            )
                        }
                    )
                }

            </div>
        </div>
    )
} 