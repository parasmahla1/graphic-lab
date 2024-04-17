import { Camera, Color, Point, Side, XYWH } from "@/types/canvas";
import { type ClassValue, clsx } from "clsx";
import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";

const COLORS = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
  "#008000", // Dark Green
  "#000080", // Navy Blue
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ConnectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: Camera
) => {
  return {
    x: Math.round(e.clientX - camera.x),
    y: Math.round(e.clientY - camera.y),
  };
};

export function colorToCSS(color: Color) {
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`;
}


export function resizeBounds(
  bounds: XYWH,
  corner: Side,
  point: Point
): XYWH {
   const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
   }

   if((corner && Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width)
    result.width = Math.abs(bounds.x + bounds.width - point.x)
   }

   if((corner && Side.Right) === Side.Right) {
    result.x = Math.min(bounds.x, point.x)
    result.width = Math.abs(point.x - bounds.x)
   }

   if((corner && Side.Top) === Side.Top) {
     result.y = Math.min(point.y, bounds.y + bounds.height)
      result.height = Math.abs(bounds.y + bounds.height - point.y)
   }

   if((corner && Side.Bottom) === Side.Bottom) {
     result.y = Math.min(bounds.y, point.y)
     result.height = Math.abs(point.y - bounds.y)
   } 
   return result;
}
