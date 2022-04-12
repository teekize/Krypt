import React,{useState, useEffect} from "react";

// make a function given a keyword, it gets the gif
const API_KEY="RgXwtRI4bLiPtMOv2TO7WOJuTOllCMqe"

const useFetch = ({message}) =>{
    const [gifUrl, setGifUrl]=useState(""); 
   
    const fetchGif=async(message)=>{
        try{
            const response=await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${message.toString().split(" ").join("")}&limit=1`);
            const {data}=await response.json();
            console.log(data);
            if(data.length){

                setGifUrl(data[0]?.images?.downsized_medium.url);
            }else{
                setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");

            }
        }catch(e) {
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
        }
    }

    useEffect(() => {
        if(message) fetchGif(message)
    },[message])

    return gifUrl;
}

export default useFetch;