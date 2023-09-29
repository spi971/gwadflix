import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Card } from ".";
import { CardSliderContainer } from "../styles";

export const CardSlider = React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showcontrols, setShowcontrols] = useState(false);

  const handleSliderDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
      
    }
    else if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }

    if (direction === "left" && sliderPosition === 0) {
      listRef.current.style.marginLeft = 50 + "px";
      listRef.current.style.transform = `translateX(0px)`;
      listRef.current.style.transition = `0.3s ease-in-out)`;
    }
  };

  return (
    <CardSliderContainer
      className='flex column'
      showcontrols={showcontrols.toString()}
      onMouseEnter={() => setShowcontrols(true)}
      onMouseLeave={() => setShowcontrols(false)}
    >
      <h1>{title}</h1>
      <div className='wrapper'>
        <div
          className={`slider-action left ${
            !showcontrols ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleSliderDirection("left")} />
        </div>

        <div className='flex slider' ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>

        <div
          className={`slider-action right ${
            !showcontrols ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleSliderDirection("right")} />
        </div>
      </div>
    </CardSliderContainer>
  );
});
