import React, { useEffect, useState } from "react";
import "css-doodle";
import "./UwU.css";

function UwU() {
    const [vis, setVis] = useState(false); // For showing "Yes"
    const [vin, setVin] = useState(true); // For showing "No"
    const [img1, showimg1] = useState(true);
    const [img2, showimg2] = useState(false); 
    const [img3, showimg3] = useState(false); 
    const [visques, setVisques] = useState(true); // For showing Ques
    const [No, setNo] = useState("No :(");
    let [count, setCount] = useState(0);
    const [showDoodle, setShowDoodle] = useState(false); 
    const [showYayy, setShowYayy] = useState(false);

    useEffect(() => {
        const container = document.querySelector(".button-container");
        let no = document.querySelector(".No");

        function randomPosition() {
            const vpWidth = container.offsetWidth;
            const vpHeight = container.offsetHeight;
            no = document.querySelector(".No");

            const question = document.querySelector(".Ques");
            const questionX = question.offsetLeft;
            const questionY = question.offsetTop;
            const questionWidth = question.offsetWidth;
            const questionHeight = question.offsetHeight;     
            let overlap = true;
            let randomX, randomY;

            while (overlap) {
                randomX = Math.random() * (vpWidth - no.offsetWidth);
                randomY = Math.random() * (vpHeight - no.offsetHeight);

                const noRect = {
                    left: randomX,
                    top: randomY,
                    right: randomX + no.offsetWidth,
                    bottom: randomY + no.offsetHeight,
                };

                overlap = !(noRect.right < questionX || noRect.left > questionX+questionWidth 
                    ||noRect.bottom < questionY ||noRect.top > questionHeight+questionY );
            }
            no.style.position = "absolute";
            no.style.left = `${randomX}px`;
            no.style.top = `${randomY}px`;
        }

        no.addEventListener("click", randomPosition);

        return () => no.removeEventListener("click", randomPosition);
    }, []);

    function visA() 
    {
        if (count <=2){
            setCount(++count);
            setNo(txt=>txt+"(");
            showimg1(false);        
            showimg2(true);
        }
        else{
            setVin(false); // hide "No" button
            setVis(true); // hide "No" button
        }
    }

    function handleYesClick() {
        showimg2(false);
        setVis(false); // Hide all buttons
        showimg3(true);
        setVisques(false);
        setShowYayy(true);
    }

    return (
        <div className="frame">
            {showDoodle && (
                <css-doodle>
                    {`
                        <css-doodle><style>
                        --color: #51eaea, #fffde1, #ff9d76, #FB3569;
                        @grid: 30x1 / 100vw 100vh / #270f34;
                        
                        :container {
                            perspective: 30vmin;
                            --deg: @p(-180deg, 180deg);
                        }
                        
                        :after, :before {
                            content: '';
                            background: @p(--color); 
                            @place: @r(100%) @r(100%);
                            @size: @r(10px);
                            @shape: @p(star, heart);
                        }

                        @place: center;
                        @size: 18vmin;

                        box-shadow: @m2(0 0 50px @p(--color));
                        background: @m100(
                            radial-gradient(@p(--color) 50%, transparent 0) 
                            @r(-20%, 120%) @r(-20%, 100%) / 1px 1px
                            no-repeat
                        );

                        will-change: transform, opacity;
                        animation: scale-up 12s linear infinite;
                        animation-delay: calc(-12s / @I * @i);

                        @keyframes scale-up {
                            0%, 95.01%, 100% {
                            transform: translateZ(0) rotate(0);
                            opacity: 0;
                            }
                            10% { 
                            opacity: 1; 
                            }
                            95% {
                            transform: 
                                translateZ(35vmin) rotateZ(var(--deg));
                            }
                        }
                        </style></css-doodle>
                    `}
                </css-doodle>
            )}

            <div className="button-container">
                <div className="Ques" style={{ display: visques ? "block" : "none" }}>Will you be my girlfriend?</div>
                <div className="Yes" id="Yes" style={{ display: vis ? "block" : "none" }} onClick={handleYesClick}>Yes :p</div>
                <div className="No" id="No" style={{ display: vin ? "block" : "none" }} onClick={visA}>{No}</div>
            </div>

            <div className="image-container">
                {img1 && (
                    <div className="img1"><img src="https://i.imgur.com/vLl6Jc3.gif" alt="weird" /></div>
                )}
                {img2 && (
                    <div className="img2"><img src="https://i.imgur.com/RXvgXqf.gif" alt="cri" /></div>
                )}
                {img3 && (
                    <div className="img3"><img src="https://i.imgur.com/uiE3jO6.gif" alt="hepi" /></div>
                )}
            </div>

            {showYayy && (
                <div className="YAYY">YAYYY :))</div>
            )}
        </div>
    );
}

export default UwU;
