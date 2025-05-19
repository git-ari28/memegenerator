import React, { useEffect, useState } from "react";
import { toJpeg } from "html-to-image";

const funnyCaptions = [
  { top: "When code finally works", bottom: "After 7 hours of crying" },
  { top: "Me explaining React", bottom: "To my cat" },
  { top: "404:", bottom: "Motivation not found" },
  { top: "Debugging be like", bottom: "🔥🔥🔥" },
];

function MemeGenerator() {
  const [memes, setMemes] = useState([]);
  const [current, setCurrent] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(30);
  const [fontColor, setFontColor] = useState("#ffffff");

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setMemes(data.data.memes);
        setCurrent(data.data.memes[0]);
      });
  }, []);

  const getRandomMeme = () => {
    const random = memes[Math.floor(Math.random() * memes.length)];
    setCurrent(random);
    // Reset text when new meme chosen
    setTopText("");
    setBottomText("");
  };

  const setRandomCaption = () => {
    const random = funnyCaptions[Math.floor(Math.random() * funnyCaptions.length)];
    setTopText(random.top);
    setBottomText(random.bottom);
  };

  const downloadMeme = () => {
    const memeNode = document.getElementById("meme-preview");
    if (!memeNode) return;
    toJpeg(memeNode, { quality: 0.95 }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-meme.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div>
      <h2>Generate Your Meme 🎉</h2>
      <div className="form">
        <input
          placeholder="Top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          placeholder="Bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />

        <label>
          Font Size: {fontSize}px
          <input
            type="range"
            min="20"
            max="50"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
          />
        </label>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </label>
      </div>

      <div className="button-group">
        <button onClick={getRandomMeme}>🎲 New Meme</button>
        <button onClick={setRandomCaption}>💬 Random Caption</button>
        <button onClick={downloadMeme}>⬇️ Download Meme</button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `Check out my meme: "${topText} ${bottomText}"`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="submit-btn"
          style={{ textDecoration: "none", lineHeight: "2.4rem" }}
        >
          🐦 Share on Twitter
        </a>
      </div>

      {current && (
        <div id="meme-preview" className="meme">
          <img src={current.url} alt="meme" />
          <h3 className="top" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            {topText}
          </h3>
          <h3 className="bottom" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            {bottomText}
          </h3>
        </div>
      )}
    </div>
  );
}

export default MemeGenerator;


