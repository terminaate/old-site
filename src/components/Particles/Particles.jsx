import React, { useEffect, useRef, useState } from 'react';
import cl from './Particles.module.css';
import classes from '@/hooks/classes';

const Particles = ({
										 backgroundColor = '#0b0b0b',
										 particlesCount = 100,
										 particlesSize = Math.random() * 2,
										 particlesColor = '#fff',
										 particlesVelocity = 0.4,
										 className,
										 height = '100%',
										 width = '100%'
									 }) => {
	const canvasRef = useRef(null);

	const getHeight = () => {
		if (typeof height === 'number') {
			return height;
		}

		if (height === '100%') {
			return innerHeight;
		}

		let heightString = '';
		for (const i of height) {
			if (Number(i)) {
				heightString += i;
			}
		}

		return Number(heightString);
	};

	const getWidth = () => {
		if (typeof width === 'number') {
			return width;
		}

		if (width === '100%') {
			return innerWidth;
		}

		let widthString = '';
		for (const i of width) {
			if (Number(i)) {
				widthString += i;
			}
		}

		return Number(widthString);
	};

	const getParticlesSize = () => {
		if (particlesSize < 1.2) {
			particlesSize = Math.random() * 2;
			getParticlesSize();
		}

		return particlesSize;
	};

	const [config] = useState({
		backgroundColor,
		particlesSize: getParticlesSize(),
		particlesCount,
		particlesColor,
		particlesVelocity
	});

	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d');
		ctx.canvas.width = getWidth();
		ctx.canvas.height = getHeight();
		const particles = [];
		let animationRequestFrameId;

		init();

		window.onresize = () => {
			ctx.canvas.width = getWidth();
			ctx.canvas.height = getHeight();
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
			animationRequestFrameId = requestAnimationFrame(loop);
		}

		function init() {
			for (let i = 0; i < config.particlesCount; i++) {
				particles.push(new Particle);
			}
			loop();
		}

		return () => cancelAnimationFrame(animationRequestFrameId);
	}, []);

	return (
		<div style={{ height, width }} className={classes(cl.particlesContainer, className)}>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Particles;