import React from "react"
// import memesData from "../../memesData.js"

export default function Meme() {
    const [allMemeImages, setAllMemeImages] = React.useState()
    
    React.useEffect( () => {
        fetch(`https://api.imgflip.com/get_memes`)
            .then( res => res.json())
            .then( data => setAllMemeImages(data.data.memes))
    }, [])
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    console.log(allMemeImages)
    
    function handleChange (event) {
        setMeme( oldMeme => ({
            ...oldMeme,
            [event.target.name]: event.target.value
        }))
    }
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}