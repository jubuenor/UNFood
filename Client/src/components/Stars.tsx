import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Stars({ number }: { number: number }) {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < number) stars.push(true);
    else stars.push(false);
  }
  const renderStars = stars.map((star, index) => {
    if (star)
      return <AiFillStar size={40} color="yellow" key={index}></AiFillStar>;
    else
      return (
        <AiOutlineStar color="yellow" size={40} key={index}></AiOutlineStar>
      );
  });
  return <div>{renderStars}</div>;
}

export default Stars;
