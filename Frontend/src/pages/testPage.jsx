import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import mediaUpload from "../utils/mediaUpload"



export default function TestPage() {
  /*const [count, setCount] = useState(0);
  const [status, setStatus] = useState("Passed");
  //a = variable
  //b = function to update the variable

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
        <button
          onClick={() => {
            setCount(count - 1);
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"
        >
          -
        </button>
        <span className="text-[20px] font-bold text-center w-[100px] h-[40px] mx-[20px]">
          {count}
        </span>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"
        >
          +
        </button>
      </div>

      <div className=" w-[450px] h-[250px] shadow flex  justify-center items-center ">
        <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center fixed mb-[150px]">
          {status}
        </span>

        <button
          onClick={() => {
            setStatus("Passed");
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]"
        >
          Passed
        </button>

        <button
          onClick={() => {
            setStatus("Failed");
          }}
          className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]"
        >
          failed
        </button>
      </div>
    </div>
  );*/
  const [image, setImage] = useState(null);

 

  function fileUpload() {
  mediaUpload(image).then(
    (res)=>{
      console.log(res)
    }
  ).catch(
    (res)=>{
      console.log(res)
    }
  )

  }
  return (
    
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <input
        type="file"
        className="file-input file-input-border w-full max-w-xs"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <button
        onClick={fileUpload}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>

  
  );
}
