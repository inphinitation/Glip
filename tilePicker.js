document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-tile').addEventListener('click', addTile);    
    document.getElementById('remove-tile').addEventListener('click', removeSelectedTile);

    let selectedTile = null;
    let tileData = {};

    function addTile() {
        const tile = document.createElement('div');
        tile.className = 'tile';

        const id = Date.now().toString();
        tile.dataset.id = id;
        tileData[id] = {};

        tile.addEventListener('click', () => selectTile(tile));
        document.getElementById('tile-grid').appendChild(tile);
    }

    function selectTile(tile) {
        if (selectedTile) {
            selectedTile.classList.remove('selected');
        }
        selectedTile = tile;
        selectedTile.classList.add('selected');
        renderTileOnCanvas(selectedTile);
    }

    function removeSelectedTile() {
        if (selectedTile) {
            delete tileData[selectedTile.dataset.id];
            selectedTile.remove();
            selectedTile = null;
        }
    }

    function renderTileOnCanvas(tile) {
        const canvas = document.getElementById('pixelCanvas');
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, 60, 60);
    }
});