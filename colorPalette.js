document.addEventListener('DOMContentLoaded', () => {
    const colorGrid = document.getElementById('color-grid');
    let selectedSquare = null;
    let colorData = {};

    document.getElementById('add-color').addEventListener('click', () => addColorSquare('#FFFFFF', 'New Color'));
    document.getElementById('remove-color').addEventListener('click', removeSelectedColorSquare);
    document.getElementById('edit-color').addEventListener('click', openModalForEditing);

    function addColorSquare(color, name) {
        const square = document.createElement('div');
        square.className = 'color-square';
        square.style.backgroundColor = color;
        square.title = name;

        square.addEventListener('click', () => selectColorSquare(square));

        const id = Date.now().toString();
        square.dataset.id = id;
        colorData[id] = { color, name };

        colorGrid.appendChild(square);
    }

    function selectColorSquare(square) {
        if (selectedSquare) {
            selectedSquare.classList.remove('selected');
        }
        selectedSquare = square;
        selectedSquare.classList.add('selected');
        window.setSelectedColor(square.style.backgroundColor);
    }

    function removeSelectedColorSquare() {
        if (selectedSquare && colorGrid.contains(selectedSquare)) {
            delete colorData[selectedSquare.dataset.id];
            colorGrid.removeChild(selectedSquare);
            selectedSquare = null;
        }
    }

    function openModalForEditing() {
        if (selectedSquare) {
            const picker = document.getElementById('modalColorPicker');
            const nameInput = document.getElementById('modalColorName');
            picker.value = rgbToHex(selectedSquare.style.backgroundColor);
            nameInput.value = selectedSquare.title;
            document.getElementById('colorModal').style.display = 'flex'; // Use 'flex' here
        }
    }

    function closeModal() {
        document.getElementById('colorModal').style.display = 'none';
    }

    document.getElementById('saveColor').addEventListener('click', () => {
        if (selectedSquare) {
            const picker = document.getElementById('modalColorPicker');
            const nameInput = document.getElementById('modalColorName');
            selectedSquare.style.backgroundColor = picker.value;
            selectedSquare.title = nameInput.value || 'New Color';
            colorData[selectedSquare.dataset.id] = { color: picker.value, name: nameInput.value };
        }
        closeModal();
    });

    function clearExistingColors() {
        const colorGrid = document.getElementById('color-grid');
         while (colorGrid.firstChild) {
            colorGrid.removeChild(colorGrid.firstChild);
        }

        colorData = {};
    }

    document.querySelector('.close').addEventListener('click', closeModal);

    function rgbToHex(rgb) {
        if (!rgb) return '#FFFFFF';
        let [r, g, b] = rgb.match(/\d+/g).map(Number);
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    addColorSquare('#FFFFFF', 'New Color');

    document.getElementById('load-colors').addEventListener('click', () => {
        document.getElementById('file-input').click();
    });

    document.getElementById('file-input').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            clearExistingColors();

            const reader = new FileReader();
            reader.onload = (e) => {
                const lines = e.target.result.split('\n');
                lines.forEach(line => {
                    if (line) {
                        const colorData = JSON.parse(line);
                        addColorSquare(colorData.color, colorData.name);
                    }
                });
            };
            reader.readAsText(file);
        }
    });

    document.getElementById('save-colors').addEventListener('click', () => {
        const colorDataArray = Object.values(colorData);
        const jsonlString = colorDataArray.map(data => JSON.stringify(data)).join('\n');

        const blob = new Blob([jsonlString], { type: 'text/jsonl' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'colors.jsonl';
        a.click();
        URL.revokeObjectURL(url);
    });
});