import {canvas} from "./config.js"
export const clearCanvas = () => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([64, 18]);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
};