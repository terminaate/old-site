import React, { FC, useEffect, useRef, useState } from 'react';
import cl from './Particles.module.css';
import classnames from '@/utils/classnames';

export interface IParticles {
	backgroundColor?: string;
	particlesCount?: number;
	particlesSize?: number;
	particlesColor?: string;
	particlesVelocity?: number;
	className?: string;
	height?: string | number;
	width?: string | number;
}

interface IConfig {
	backgroundColor: string;
	particlesSize: number;
	particlesCount: number;
	particlesColor: string;
	particlesVelocity: number;
}

class Particle {
	x: number;
	y: number;
	velocityX: number;
	velocityY: number;
	ctx: CanvasRenderingContext2D;
	config: IConfig;

	constructor(ctx: CanvasRenderingContext2D, config: IConfig) {
		this.ctx = ctx;
		this.config = config;
		this.x = Math.random() * ctx.canvas.width;
		this.y = Math.random() * ctx.canvas.height;
		this.velocityX = Math.random() * (config.particlesVelocity * 2) - config.particlesVelocity;
		this.velocityY = Math.random() * (config.particlesVelocity * 2) + config.particlesVelocity;
	}

	reDraw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.config.particlesSize, 0, Math.PI * 2);
		this.ctx.closePath();
		this.ctx.fillStyle = this.config.particlesColor;
		this.ctx.fill();
	};

	position() {
		this.x += this.velocityX;
		if (this.x < 0) {
			this.x = this.ctx.canvas.width - (this.x * 10);
		}

		this.y -= this.velocityY;
		if (this.y < 0) {
			this.y = this.ctx.canvas.height - (this.y * 10);
		}
	};
}

const Particles: FC<IParticles> = ({
																		 backgroundColor = '#0b0b0b',
																		 particlesCount = 100,
																		 particlesSize = Math.random() * 2,
																		 particlesColor = '#fff',
																		 particlesVelocity = 0.4,
																		 className = '',
																		 height = '100%',
																		 width = '100%'
																	 }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const getHeight = () => {
		if (typeof height === 'number') return height;
		if (height.endsWith('%')) return (innerHeight / 100) * parseInt(height);
		return parseInt(height);
	};

	const getWidth = () => {
		if (typeof width === 'number') return width;
		if (width.endsWith('%')) return (innerWidth / 100) * parseInt(width);
		return parseInt(width);
	};

	const [localHeight, setLocalHeight] = useState(getHeight());
	const [localWidth, setLocalWidth] = useState(getWidth());

	useEffect(() => {
		setLocalWidth(getWidth());
		setLocalHeight(getHeight());
	}, [width, height]);

	const getParticlesSize = () => {
		if (particlesSize < 1.2) {
			particlesSize = Math.random() * 2;
			getParticlesSize();
		}

		return particlesSize;
	};

	const [config] = useState<IConfig>({
		backgroundColor,
		particlesSize: getParticlesSize(),
		particlesCount,
		particlesColor,
		particlesVelocity
	});

	useEffect(() => {
		const ctx = canvasRef.current!.getContext('2d')!;
		ctx.canvas.width = localWidth;
		ctx.canvas.height = localHeight;
		const particles: Particle[] = [];
		let animationRequestFrameId: number;

		const resizeHandler = () => {
			setLocalHeight(getHeight());
			setLocalWidth(getWidth());
		};

		addEventListener('resize', resizeHandler);

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
				particles.push(new Particle(ctx, config));
			}
			loop();
		}

		init();

		return () => {
			cancelAnimationFrame(animationRequestFrameId);
			removeEventListener('resize', resizeHandler);
		};
	}, []);

	return (
		<div style={{ height: localHeight, width: localWidth }} className={classnames(cl.particlesContainer, className)}>
			<canvas ref={canvasRef} height={localHeight} width={localWidth} />
		</div>
	);
};

export default Particles;