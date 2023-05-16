class SortingCanvas {
    #canvas;
    #sort_and_draw;
    #values;
    #draw_array_func_reference
    #parent_id
    #delayTimeMS

    getParentId() {
        return this.#parent_id;
    }

    constructor(canvas, parent_id, sort_function_name, values_array, delayTimeMS = 50) {
        this.#parent_id = parent_id;
        this.#canvas = canvas;
        this.#sort_and_draw = sort_function_name;
        this.#values = values_array;
        this.#draw_array_func_reference = this.drawValues;
        this.#delayTimeMS = delayTimeMS;
        this.reset();
    }

    drawValues(array, canvas, redValueIndex_1, redValueIndex_2) {
        const canvasContext = canvas.getContext('2d');
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.lineWidth = 1;
        let i = 0;
        for (i = 0; i < array.length; i++) {
            canvasContext.strokeStyle = 'white';

            if (i == redValueIndex_1 || i == redValueIndex_2) {
                canvasContext.strokeStyle = 'red';
            }
            canvasContext.beginPath();
            canvasContext.moveTo(i * 8, canvas.height);
            canvasContext.lineTo(i * 8, canvas.height - array[i]);
            canvasContext.stroke();
        }
    }
    sortAndDraw() {
        window[this.#parent_id].is_sort_stopped = false;
        window[this.#sort_and_draw](this.#values, this.#canvas, this.#draw_array_func_reference, this.#delayTimeMS);
        this.drawValues(this.#values, this.#canvas);
    }
    stopSortVisualization() {
        window[this.#parent_id].is_sort_stopped = true;
    }

    continueSortVisualization() {
        this.sortAndDraw()
    }

    reset() {
        this.stopSortVisualization();
        if (typeof (this.#values) === "undefined") {
            this.#values = generateArray(this.#canvas.width, this.#canvas.height);
        } else {
            this.#values = generateArray(this.#values.length, this.#canvas.height);
        }
        this.drawValues(this.#values, this.#canvas);
    }
}

let canvasArray = [];

function setup() {

    const canvArr = Array.from(document.querySelectorAll('.sortVisualizer'));

    for (let i = 0; i < canvArr.length; i++) {
        canvArr[i].width = window.innerWidth;
        canvasArray.push(new SortingCanvas(
            canvArr[i],
            canvArr[i].id,
            canvArr[i].id,
            generateArray(
                floor(window.innerWidth * 0.12),
                canvArr[i].height
            ))
        );
    }
}

function findCanvasIndexByParentId(canvas_parent_id) {
    for (let i = 0; i < canvasArray.length; i++) {
        if (canvasArray[i].getParentId() == canvas_parent_id) {
            return i;
        }
    }
    return -1;
}

function startSortVisualization(canvas_parent_id) {
    let index = this.findCanvasIndexByParentId(canvas_parent_id);
    if (index >= 0) {
        canvasArray[index].sortAndDraw();
    }
}

function resetSortVisualization(canvas_parent_id) {
    let index = this.findCanvasIndexByParentId(canvas_parent_id);
    if (index >= 0) {
        canvasArray[index].reset();
    }
}

function stopSortVisualization(canvas_parent_id) {
    let index = this.findCanvasIndexByParentId(canvas_parent_id);
    if (index >= 0) {
        canvasArray[index].stopSortVisualization();
    }
}

function continueSortVisualization(canvas_parent_id) {
    let index = this.findCanvasIndexByParentId(canvas_parent_id);
    if (index >= 0) {
        canvasArray[index].continueSortVisualization();
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function generateArray(size, maxHeight) {
    values = [];
    for (let i = 0; i < size; i++) {
        values.push(Math.floor(Math.random() * maxHeight));
    }
    return values;
}
