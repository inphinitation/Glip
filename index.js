// Globals
window.colorData = {};
window.tileData = {};

document.addEventListener('DOMContentLoaded', () => {
	const canvas = document.getElementById('pixelCanvas');
	const ctx = canvas.getContext('2d');
	const viewport = document.getElementById('viewport');

	function resizeCanvas() {
		canvas.width = viewport.clientWidth;
		canvas.height = viewport.clientHeight;

		ctx.fillStyle = 'DimGrey';
		ctx.fillRect(10, 10, canvas.width-20, canvas.height-20);
	}

	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
});