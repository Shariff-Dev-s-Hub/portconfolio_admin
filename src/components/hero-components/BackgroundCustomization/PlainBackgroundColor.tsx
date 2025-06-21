import { BlockPicker, SketchPicker } from "react-color";
import { useState } from "react";

export function PlainBackgroundColor() {
  //creating state to store our color and also set color using onChange event for sketch picker
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });
  // destructuring rgba from state
  const { r, g, b, a } = sketchPickerColor;

  //creating state to store our color and also set color using onChange event for block picker

  return (
    <div className="flex flex-col md:flex-row justify-around pt-8 pb-6 gap-3 items-center md:items-stretch">
      {/* <h6>Sketch Picker</h6> */}
      {/* Div to display the color  */}

      {/* Sketch Picker from react-color and handling color on onChange event */}
      <SketchPicker
        onChange={(color) => {
          setSketchPickerColor({
            r: color.rgb.r,
            g: color.rgb.g,
            b: color.rgb.b,
            a: color.rgb.a !== undefined ? color.rgb.a : 1,
          });
        }}
        color={sketchPickerColor}
      />
      <div
        style={{
          backgroundColor: `rgba(${r},${g},${b},${a})`,
        }}
        className="flex-grow h-72 md:h-auto w-full xl:w-1/2 border-2"
      />
    </div>
  );
}
