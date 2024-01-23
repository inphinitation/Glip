let canvas, ctx, selectedColor, selectedTile, tileData;

function initializeCanvas() {
    canvas = document.getElementById('pixelCanvas');
    ctx = canvas.getContext('2d');
    selectedColor = '#000000';
    selectedTile = null;
    tileData = {};

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        colorPixel(x, y, selectedColor);
    });
}

function renderTileOnCanvas(tile) {
    const tileSize = 16;
    const scale = canvas.width / tileSize / 2;
    const x = (canvas.width - tileSize * scale) / 2;
    const y = (canvas.height - tileSize * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tileId = tile.dataset.id;
    if (tileData[tileId] && tileData[tileId].pixels) {
        const pixels = tileData[tileId].pixels;
        for (let row = 0; row < pixels.length; row++) {
            for (let col = 0; col < pixels[row].length; col++) {
                ctx.fillStyle = pixels[row][col];
                ctx.fillRect(x + col * scale, y + row * scale, scale, scale);
            }
        }
    }

    drawGrid(ctx, x, y, tileSize, scale);
}

function renderTilePreview(tileId, canvas) {
    const ctx = canvas.getContext('2d');
    const pixels = window.tileData[tileId].pixels;
    const scale = canvas.width / pixels.length;

    for (let row = 0; row < pixels.length; row++) {
        for (let col = 0; col < pixels[row].length; col++) {
            ctx.fillStyle = pixels[row][col];
            ctx.fillRect(col * scale, row * scale, scale, scale);
        }
    }
}

function drawGrid(ctx, x, y, tileSize, scale) {
    ctx.strokeStyle = 'white';
    for (let i = 0; i <= tileSize; i++) {
        ctx.beginPath();
        ctx.moveTo(x + i * scale, y);
        ctx.lineTo(x + i * scale, y + tileSize * scale);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y + i * scale);
        ctx.lineTo(x + tileSize * scale, y + i * scale);
        ctx.stroke();
    }
}

function colorPixel(x, y, color) {
    const tileSize = 16;
    const scale = canvas.width / tileSize / 2;
    const startX = (canvas.width - tileSize * scale) / 2;
    const startY = (canvas.height - tileSize * scale) / 2;

    const gridX = Math.floor((x - startX) / scale);
    const gridY = Math.floor((y - startY) / scale);

    if (gridX >= 0 && gridX < tileSize && gridY >= 0 && gridY < tileSize) {
        ctx.fillStyle = color;
        ctx.fillRect(startX + gridX * scale, startY + gridY * scale, scale, scale);

        if (selectedTile && tileData[selectedTile.dataset.id]) {
            tileData[selectedTile.dataset.id].pixels[gridY][gridX] = color;

            const previewCanvas = selectedTile.querySelector('canvas');
            if (previewCanvas) {
                renderTilePreview(selectedTile.dataset.id, previewCanvas);
            }
        }
    }
}

window.initializeCanvas = initializeCanvas;
window.renderTileOnCanvas = renderTileOnCanvas;
window.setSelectedColor = (color) => { selectedColor = color; };
window.setSelectedTile = (tile) => { selectedTile = tile; tileData = window.tileData; };

document.addEventListener('DOMContentLoaded', initializeCanvas);