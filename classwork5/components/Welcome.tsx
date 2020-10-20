import React, { ReactElement, useEffect, useRef } from "react";
import { User } from "../models/User";

interface Props {
  user: User;
}

export default function Welcome({ user }: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const width = canvas.width;
      const height = canvas.height;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = "#4397AC";
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }, []);

  return (
    <div className="welcome">
      <span>Welcome {user.name}, how are you doing?</span>
      <span>Please verify your email ({user.email})</span>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
