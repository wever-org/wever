import chalk from "../../../utils/chalk";
import typo from "./typo";


export default function createStyle(element, style) {

      /**
      * Test all the parametere.
      */
      if (!element || !(element.nodeType)) {
            chalk.error(`Invalid element : Expect a HTMLElement. But found a ${typeof element}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      if (!style || typeof style !== "object" || Array.isArray(style)) {
            chalk.error(`Invalid style : Expect a Object. But found a ${typeof style}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
      * Add attributes to the element.
      */
      for (let [key, value] of Object.entries(style)) {

            if (key === "mt") key = "marginTop";
            if (key === "mb") key = "marginBottom";
            if (key === "mr") key = "marginRight";
            if (key === "ml") key = "marginLeft";

            if (key === "pt") key = "paddingTop";
            if (key === "pb") key = "paddingBottom";
            if (key === "pr") key = "paddingRight";
            if (key === "pl") key = "paddingLeft";

            if (key === "mx") {
                  if (typeof value === "string") {
                        element.style.marginLeft = value;
                        element.style.marginRight = value;
                  } else {
                        element.style.marginLeft = value + "px";
                        element.style.marginRight = value + "px";
                  } 
            }

            if (key === "my") {
                  if (typeof value === "string") {
                        element.style.marginTop = value;
                        element.style.marginBottom = value;
                  } else {
                        element.style.marginTop = value + "px";
                        element.style.marginBottom = value + "px";
                  } 
            }

            if (key === "px") {
                  if (typeof value === "string") {
                        element.style.paddingLeft = value;
                        element.style.paddingRight = value;
                  } else {
                        element.style.paddingLeft = value + "px";
                        element.style.paddingRight = value + "px";
                  } 
            }

            if (key === "py") {
                  if (typeof value === "string") {
                        element.style.paddingTop = value;
                        element.style.paddingBottom = value;
                  } else {
                        element.style.paddingTop = value + "px";
                        element.style.paddingBottom = value + "px";
                  } 
            }


            if (typeof value === "string") { // If a string, simply add it.
                  element.style[key] = value;
            }
            else if (typeof value === "number") { // If a number, then test the key for being a unitless property.

                  if (typo.unitLessProperty.includes(key) || value === 0) { // If unitless, then add it.
                        element.style[key] = value;
                  }
                  else { // If not unitless, then add it with the unit (default "px").
                        element.style[key] = value + "px";
                  }

            }
            else if (typeof value === "object") { // If an object, then test the key for being a property of the element.
                  createObjectStyle(element, key, value);
            }
            else if (typeof value === "function") {
                  element.style[key] = value(element);
            }

      }

}


function createObjectStyle(element, key, style) {

      /**
       * Test all the parametere.
       */
      if (!element || !(element.nodeType)) {
            chalk.error(`Invalid element : Expect a HTMLElement. But found a ${typeof element}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      if (!style || typeof style !== "object" || Array.isArray(style)) {
            chalk.error(`Invalid style : Expect a Object. But found a ${typeof style}. \n>>>==============>>> Unwillingly ignoring it.`);
            return;
      }

      /**
       * Add attributes to the element.
       */
      if (key === "transform") {
            for (let [key, value] of Object.entries(style)) {

                  if (typeof value === "string") { // If a string, simply add it.

                        element.style.transform += ` ${key}(${value})`;

                  } else if (typeof value === "number") { // If a number, then test the key for being a unitless property.

                        if (["rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"].includes(key)) {

                              element.style.transform += ` ${key}(${value}deg)`;

                        } else if (["scale", "scaleX", "scaleY", "scaleZ"].includes(key)) {

                              element.style.transform += ` ${key}(${value})`;

                        } else {

                              element.style.transform += ` ${key}(${value}px)`;

                        }

                  } else if (Array.isArray(value)) {

                        element.style.transform += ` ${key}(${value.join(", ")})`;

                  } else if (typeof value === "function") { // If a function, then call it and add the result.
                        element.style.transform += ` ${key}(${value(element)})`;
                  }

            }
      } else if (key === "animation") {
            for (let [key, value] of Object.entries(style)) {

                  if (key === "name" || key === "animationName") {
                        element.style.animationName = value;
                  } else if (key === "duration" || key === "animationDuration") {
                        element.style.animationDuration = value;
                  } else if (key === "timing" || key === "animationTimingFunction") {
                        element.style.animationTimingFunction = value;
                  } else if (key === "delay" || key === "animationDelay") {
                        element.style.animationDelay = value;
                  } else if (key === "iteration" || key === "animationIterationCount") {
                        element.style.animationIterationCount = value;
                  } else if (key === "direction" || key === "animationDirection") {
                        element.style.animationDirection = value;
                  } else if (key === "fillMode" || key === "animationFillMode") {
                        element.style.animationFillMode = value;
                  } else if (key === "playState" || key === "animationPlayState") {
                        element.style.animationPlayState = value;
                  } else if (key === "playback" || key === "animationPlayback") {
                        element.style.animationPlayback = value;
                  } else if (key === "playbackRate" || key === "animationPlaybackRate") {
                        element.style.animationPlaybackRate = value;
                  } else if (key === "timeline" || key === "animationTimeline") {
                        element.style.animationTimeline = value;
                  }

            }
      } else if (key === "margin") {
            for (let [key, value] of Object.entries(style)) {

                  value = typeof value === "number" ? value + "px" : value;

                  if (key === "x") {
                        element.style.marginLeft = value;
                        element.style.marginRight = value;
                  } else if (key === "y") {
                        element.style.marginTop = value;
                        element.style.marginBottom = value;
                  } else if (key === "top" || key === "marginTop" || key === "t") {
                        element.style.marginTop = value;
                  } else if (key === "right" || key === "marginRight" || key === "r") {
                        element.style.marginRight = value;
                  } else if (key === "bottom" || key === "marginBottom" || key === "b") {
                        element.style.marginBottom = value;
                  } else if (key === "left" || key === "marginLeft" || key === "l") {
                        element.style.marginLeft = value;
                  }

            }
      } else if (key === "padding") {
            for (let [key, value] of Object.entries(style)) {

                  value = typeof value === "number" ? value + "px" : value;

                  if (key === "x") {
                        element.style.paddingLeft = value;
                        element.style.paddingRight = value;
                  } else if (key === "y") {
                        element.style.paddingTop = value;
                        element.style.paddingBottom = value;
                  } else if (key === "top" || key === "paddingTop" || key === "t") {
                        element.style.paddingTop = value;
                  } else if (key === "right" || key === "paddingRight" || key === "r") {
                        element.style.paddingRight = value;
                  } else if (key === "bottom" || key === "paddingBottom" || key === "b") {
                        element.style.paddingBottom = value;
                  } else if (key === "left" || key === "paddingLeft" || key === "l") {
                        element.style.paddingLeft = value;
                  }

            }
      } else if (key === "background") {
            for (let [key, value] of Object.entries(style)) {

                  if (key === "attachment" || key === "backgroundAttachment") {
                        element.style.backgroundAttachment = value;
                  } else if (key === "clip" || key === "backgroundClip") {
                        element.style.backgroundClip = value;
                  } else if (key === "color" || key === "backgroundColor") {
                        element.style.backgroundColor = value;
                  } else if (key === "image" || key === "backgroundImage") {
                        element.style.backgroundImage = value;
                  } else if (key === "origin" || key === "backgroundOrigin") {
                        element.style.backgroundOrigin = value;
                  } else if (key === "position" || key === "backgroundPosition") {
                        element.style.backgroundPosition = value;
                  } else if (key === "repeat" || key === "backgroundRepeat") {
                        element.style.backgroundRepeat = value;
                  } else if (key === "size" || key === "backgroundSize") {
                        element.style.backgroundSize = value;
                  } else if (key === "blendMode" || key === "backgroundBlendMode") {
                        element.style.backgroundBlendMode = value;
                  }

            }

      } else {
            chalk.error("We don't provide any other objective style properties. Declined access for property: " + key);
      }

}

