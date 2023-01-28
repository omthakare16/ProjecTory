import React from "react";
import data from "../data.json";
import watermark from "watermarkjs";

const ImageView = () => {
  const rotate = function(target, position, x, y) {
    var context = target.getContext("2d");
    context.font = "24px Josefin Slab";
    context.globalAlpha = 1;
    context.fillStyle = "#000";
    var text = `copyright @ speedy`;
    if (position === "top") {
      context.fillText(text, x * 0.3282, y * 0.0702);
    } else if (position === "bottom") {
      context.fillText(text, x * 0.3582, y * 0.9482);
    } else if (position === "right") {
      context.fillText(text, x * 0.6382, y * 0.5172);
    } else {
      context.fillText(text, x * 0.6382, y * 0.9482);
    }
    return target;
  };

  const AddTag = (index, pos) => {
    let file = data[index].image;
    fetch(file)
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        watermark([blob])
          .image(function(img) {
            let x = img.width;
            let y = img.height;
            // img.setAttribute("height", "580");

            return rotate(img, pos, x, y);
          })
          .then(function(img) {
            const ele = document.getElementById(index);
            ele.innerHTML = "";
            ele.appendChild(img);
            // img.setAttribute("height", '580');

            // console.log(ele.childNodes[0]);

            // ele.childNodes[0].classList.add("d-none");
          });
      });
  };

  return (
    <div>
      <h3>ImageView</h3>

      {data.map((item, index) => (
        <div key={index} className="d-flex position-relative">
          <div className="card p-4 m-5 ">
            <div className="d-flex" id={index}>
              <img src={item.image} className="org" alt="" />
            </div>

            <div className="card-body fs-4 text-uppercase">{item.text}</div>
            <div className="d-flex justify-content-evenly">
              <button
                className="btn btn-primary"
                onClick={() => AddTag(index, "left")}
              >
                Bottom Side
              </button>
              <button
                className="btn btn-primary"
                onClick={() => AddTag(index, "bottom")}
              >
                Bottom
              </button>
              <button
                className="btn btn-primary"
                onClick={() => AddTag(index, "right")}
              >
                Right
              </button>
              <button
                className="btn btn-primary"
                onClick={() => AddTag(index, "top")}
              >
                Top
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageView;
