import React, { useEffect, useRef, useState } from 'react';
import cl from './Particles.module.css';

const Particles = ({
										 backgroundColor = '#0b0b0b',
										 particlesCount = 100,
										 particlesSize = Math.random() * 2,
										 particlesColor = '#fff',
										 particlesVelocity = 0.4
									 }) => {
	const canvasRef = useRef(null);

	const [config, setConfig] = useState({
		backgroundColor,
		particlesSize: particlesSize > 1 ? particlesSize : Math.random() * 2,
		particlesCount,
		particlesColor,
		particlesVelocity
	});

	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.canvas.width = innerWidth;
		ctx.canvas.height = innerHeight;
		const particles = [];

		init();

		window.onresize = () => {
			ctx.canvas.width = innerWidth;
			ctx.canvas.height = innerHeight;
		};

		function Particle() {
			this.x = Math.random() * ctx.canvas.width;
			this.y = Math.random() * ctx.canvas.height;
			this.velocityX = Math.random() * (config.particlesVelocity * 2) - config.particlesVelocity;
			this.velocityY = Math.random() * (config.particlesVelocity * 2) + config.particlesVelocity;

			this.position = () => {
				this.x += this.velocityX;

				this.y -= this.velocityY;
				if (this.y < 0) {
					this.y = ctx.canvas.height - this.y;
				}
			};

			this.reDraw = () => {
				ctx.beginPath();
				ctx.arc(this.x, this.y, config.particlesSize, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fillStyle = config.particlesColor;
				ctx.fill();
			};
		}

		function drawBackground() {
			ctx.fillStyle = config.backgroundColor;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		}

		function drawParticles() {
			for (const particle of particles) {
				particle.position();
				particle.reDraw();
			}
		}

		function loop() {
			drawBackground();
			drawParticles();
			requestAnimationFrame(loop);
		}

		function init() {
			for (let i = 0; i < config.particlesCount; i++) {
				particles.push(new Particle);
			}

			loop();
		}
	}, []);

	return (
		<div className={cl.particlesContainer}>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Particles;