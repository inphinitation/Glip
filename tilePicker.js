document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-tile').addEventListener('click', addTile);    
    document.getElementById('remove-tile').addEventListener('click', removeSelectedTile);

    function addTile() {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const id = Date.now().toString();
        tile.dataset.id = id;

        const previewCanvas = document.createElement('canvas');
        tile.appendChild(previewCanvas);

        tile.addEventListener('click', () => selectTile(tile));
        document.getElementById('tile-grid').appendChild(tile);

        updateCanvasSize(previewCanvas, tile);
        window.addEventListener('resize', () => updateCanvasSize(previewCanvas, tile))

        const tileSize = 16;
        window.tileData[id] = {
            pixels: Array(tileSize).fill().map(() => Array(tileSize).fill('#FFFFFF'))
        };

        renderTilePreview(id, previewCanvas);
    }

    function updateCanvasSize(canvas, tile) {
        const rect = tile.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        const tileId = tile.dataset.id;
        if (tileId && window.tileData[tileId]) {
            renderTilePreview(tileId, canvas);
        }
    }

    function selectTile(tile) {
        if (window.selectedTile) {
            window.selectedTile.classList.remove('selected');
        }
        window.selectedTile = tile;
        tile.classList.add('selected');
        window.setSelectedTile(tile);
        window.renderTileOnCanvas(tile);
    }

    function removeSelectedTile() {
        if (window.selectedTile) {
            delete window.tileData[window.selectedTile.dataset.id];
            window.selectedTile.remove();
            window.selectedTile = null;
        }
    }
});
