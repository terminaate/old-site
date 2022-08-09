import React, {useEffect, useRef} from 'react';
import cl from "./Particles.module.css"

const Particles = () => {
    const canvasRef = useRef(null);

    const draw = (ctx) => {
        const drawCircle = (x=Math.random() * ctx.canvas.width, y=ctx.canvas.height, radius = Math.floor(Math.random() * 7)) => {
            ctx.fillStyle = "#fff";
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill()
        }

        for (let i = 0; i < 101; i++) {
            drawCircle();
        }
    }

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        window.onresize = (e) => {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            draw(ctx)
        }

        draw(ctx);
    }, [])

    return (
        <div className={cl.particlesContainer}>
            <canvas ref={canvasRef}/>
        </div>
    );
};

export default Particles;