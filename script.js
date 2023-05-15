class SortingCanvas {
    #canvas;
    #sort_and_draw;
    #values;
    #draw_array_func_reference
    #parent_id

    constructor(width, height, parent_id, sort_function_name, values_array) {
        this.#parent_id = parent_id;
        this.#canvas = createCanvas(width, height);
        this.#canvas.parent(parent_id);
        this.#sort_and_draw = sort_function_name;
        this.#values = values_array;
        this.#draw_array_func_reference = SortingCanvas.drawValues;
        this.reset();
    }

    getParentId() { return this.#parent_id; }

    static drawValues(array, canvas, red_value_index_1, red_value_index_2) {
        background(0);
        for (let i = 0; i < array.length; i++) {
            stroke(255);
            if (i == red_value_index_1 || i == red_value_index_2) {
                stroke(255, 0, 0);
            }
            canvas.line(i * 8, canvas.height, i * 8, canvas.height - array[i]);
        }
    }
    sortAndDraw() {
        window[this.#sort_and_draw](this.#values, this.#canvas, this.#draw_array_func_reference);
        SortingCanvas.drawValues(this.#values, this.#canvas);

    }

    reset() {
        if (typeof (this.#values) == "undefined") {
            this.#values = generateArray(this.#canvas.width * 0.12);
        } else {
            this.#values = generateArray(this.#values.length);
        }
        SortingCanvas.drawValues(this.#values, this.#canvas);
    }
}

let canvasArray = [];
let isSorting = [];

function setup() {
    const ids = Array
        .from(document.querySelectorAll('.sortVisualizer'))
        .map(element => element.id);

    for (let i = 0; i < ids.length; i++) {
        canvasArray.push(new SortingCanvas(
            window.innerWidth,
            window.innerHeight,
            ids[i],
            ids[i],
            generateArray(
                floor(window.innerWidth * 0.12)
            ))
        );
    }
}

function draw() {
}

function findCanvasIndexByParentId(canvas_parent_id) {
    for (let i = 0; i < canvasArray.length; i++) {
        if (canvasArray[i].getParentId() == canvas_parent_id) {
            return i;
        }
    }
}

function startSortVisualization(canvas_parent_id) {
    canvasArray[this.findCanvasIndexByParentId(canvas_parent_id)].sortAndDraw();
}

function resetSortVisualization(canvas_parent_id) {
    canvasArray[this.findCanvasIndexByParentId(canvas_parent_id)].reset();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function generateArray(size) {
    values = [];
    for (let i = 0; i < size; i++) {
        values.push(random(height));
    }
    return values;
}
