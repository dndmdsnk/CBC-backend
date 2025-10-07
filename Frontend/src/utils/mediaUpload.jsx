import { createClient } from "@supabase/supabase-js";


const url = "https://fnhwbynyqskhlzikzepz.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaHdieW55cXNraGx6aWt6ZXB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDA5MTQsImV4cCI6MjA3NDM3NjkxNH0.s60BZhOBQXay-TW2m_ugjyK-s60dK_K-12fHwIpp18M";

const supabase = createClient(url, key);

export default function mediaUpload(file){

    const mediaUploadPromise = new Promise(
        (resolve, reject)=>{
            if(file == null){
                reject("No file Selected")
                return
            }

            const timestamp = new Date().getTime()
            const newName = timestamp+file.name

            supabase.storage
            .from("images")
            .upload(newName, file, {
              upsert: false,
              cacheControl: "3600"
            })
            .then(() => {
              const publicUrl = supabase.storage
                .from("images")
                .getPublicUrl(newName).data.publicUrl
      
             
                resolve (publicUrl)
             
            })
            .catch((e) => {
              
              reject("Error occured in supabase connection")
            });
        }
    )

    return mediaUploadPromise
}