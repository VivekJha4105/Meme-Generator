import React from "react"
// import memesData from "./memesData"

export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText:"", bottomText:"" , randomImage:"http://i.imgflip.com/1bij.jpg"
    })
    
    const [allMeme, setAllMeme] = React.useState([])
    
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data.data.memes))
    }, [])

    function handleChange(Event){
        const {name, value} = Event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    // console.log(meme)
    

    // const [memeImage, setMemeImage] = React.useState("");

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    return (
        <main className="main">
            <form className="form">
                <input type="text" className="form-input" placeholder="Top Text" onChange={handleChange} name="topText" value={meme.topText}></input> 
                <input type="text" className="form-input" placeholder="Bottom Text" onChange={handleChange} name="bottomText" value={meme.bottomText}></input> 
                <button className="form-btn" onClick={getMemeImage}> Get a new meme image 🖼 </button>
            </form>
            <div className="meme-container">
                <img src={meme.randomImage} alt="Meme Image" className="meme-image" />
                <h1 className="meme-text top">{meme.topText}</h1>
                <h2 className="meme-text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}