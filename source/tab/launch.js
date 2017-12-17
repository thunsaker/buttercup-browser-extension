import { el, mount, setStyle } from "redom";
import { CLEAR_STYLES, findBestZIndexInContainer } from "./styles.js";
import { toggleSearchDialog } from "./dialog.js";
import { onBodyWidthResize } from "./resize.js";

const BUTTON_BACKGROUND_IMAGE = require("../../resources/content-button-background.png");

export function attachLaunchButton(input) {
    const { height: rawHeight, width: rawWidth, zIndex: zIndexRaw, backgroundColor } = window.getComputedStyle(
        input,
        null
    );
    const bounds = input.getBoundingClientRect();
    // const height = Math.max(parseInt(rawHeight, 10), 14);
    // const width = parseInt(rawWidth, 10);
    const { width, height } = bounds;
    const buttonWidth = 0.8 * height;
    const newInputWidth = width - buttonWidth;
    let left = input.offsetLeft + newInputWidth;
    let top = input.offsetTop;
    const buttonZ = findBestZIndexInContainer(input.offsetParent);
    // Update input style
    setStyle(input, {
        width: `${newInputWidth}px`
    });
    // Create and add button
    const button = el("button", {
        style: {
            ...CLEAR_STYLES,
            position: "absolute",
            width: `${buttonWidth}px`,
            height: `${height}px`,
            left: `${left}px`,
            top: `${top}px`,
            borderRadius: "0px",
            background: `rgb(0, 183, 172) url(${BUTTON_BACKGROUND_IMAGE})`,
            backgroundSize: `${buttonWidth / 2}px`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "50% 50%",
            border: "1px solid rgb(0, 155, 145)",
            cursor: "pointer",
            zIndex: buttonZ,
            outline: "none"
        }
    });
    button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();
        toggleSearchDialog(input);
    };
    mount(input.offsetParent, button);
    onBodyWidthResize(() => {
        left = input.offsetLeft + newInputWidth;
        top = input.offsetTop;
        setStyle(button, {
            top: `${top}px`,
            left: `${left}px`
        });
    });
}
