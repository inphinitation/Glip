document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-tile').addEventListener('click', addTile);    
    document.getElementById('remove-tile').addEventListener('click', removeSelectedTile);

    function addTile() {
        const tile = document.createElement('div');
        tile.className = 'tile';
        const id = Date.now().toString();
        tile.dataset.id = id;

        const tileSize = 16;
        window.tileData[id] = {
            pixels: Array(tileSize).fill().map(() => Array(tileSize).fill('#FFFFFF'))
        };

        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = 32;
        previewCanvas.height = 32;
        tile.appendChild(previewCanvas);

        tile.addEventListener('click', () => selectTile(tile));
        document.getElementById('tile-grid').appendChild(tile);

        renderTilePreview(id, previewCanvas);
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
