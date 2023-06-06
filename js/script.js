
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

    setDelay(delayTimeMS) {
        this.#delayTimeMS = delayTimeMS;
    }
    setSortingArray(newArray) {
        this.#values = [];
        for (let i = 0; i < newArray.length; i++) {
            this.#values.push(newArray[i]);
        }
        this.drawValues(this.#values, this.#canvas, -1, -1);
        console.log(this.#values);
    }

    drawValues(array, canvas, swapedElementIndex_1, swapedElementIndex_2, elementDefaultColor = 'white', swapedElementColor = 'red') {
        const canvasContext = canvas.getContext('2d');
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        let lWidth = canvas.width / array.length;
        canvasContext.lineWidth = lWidth;
        let bias = canvas.width - array.length * lWidth
        let i = 0;
        for (i = 0; i < array.length; i++) {
            canvasContext.strokeStyle = elementDefaultColor;

            if (i == swapedElementIndex_1 || i == swapedElementIndex_2) {
                canvasContext.strokeStyle = swapedElementColor;
            }
            canvasContext.beginPath();
            canvasContext.moveTo(bias + i * lWidth, canvas.height);
            canvasContext.lineTo(bias + i * lWidth, canvas.height - array[i]);
            canvasContext.stroke();
        }
    }
    sortAndDraw() {
        if (window[this.#parent_id].is_sort_stopped) {
            window[this.#parent_id].is_sort_stopped = false;
            window[this.#sort_and_draw](this.#values, this.#canvas, this.#draw_array_func_reference, this.#delayTimeMS);
            this.drawValues(this.#values, this.#canvas);
        }
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
let arraySize;

function setup() {

    const canvArr = Array.from(document.querySelectorAll('.sortVisualizer'));
    this.arraySize = window.innerWidth * 0.12;
    for (let i = 0; i < canvArr.length; i++) {
        canvArr[i].width = window.innerWidth;
        canvasArray.push(new SortingCanvas(
            canvArr[i],
            canvArr[i].id,
            canvArr[i].id,
            generateArray(
                floor(this.arraySize),
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
        let speed = document.getElementById("inputSpeed" + canvas_parent_id).value;

        if (speed != null) {
            canvasArray[index].setDelay(speed);
        } 

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
        let speed = document.getElementById("inputSpeed" + canvas_parent_id).value;

        if (speed != null) {
            canvasArray[index].setDelay(speed);
        } 

        canvasArray[index].continueSortVisualization();
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function generateArray(size, maxHeight) {
    values = [];
    for (let i = 0; i < size; i++) {
        values.push(Math.floor((Math.random() * maxHeight + maxHeight * 0.01)));
    }
    return values;
}

function startAllSortVisualization() {
    for (let i = 0; i < canvasArray.length; i++) {
        let speed = document.getElementById("inputSpeed").value;

        if (speed != null) {
            canvasArray[i].setDelay(speed);
        }
        
        canvasArray[i].sortAndDraw();
    }
}
function resetAllAndFillSameData() {
    let array = generateArray(this.arraySize, window.height);
    for (let i = 0; i < canvasArray.length; i++) {
        canvasArray[i].stopSortVisualization();
        canvasArray[i].setSortingArray(array);
    }
}
function stopAllSortVisualization() {
    for (let i = 0; i < canvasArray.length; i++) {
        canvasArray[i].stopSortVisualization();
    }
}
function continueAllSortVisualization() {
    for (let i = 0; i < canvasArray.length; i++) {
        let speed = document.getElementById("inputSpeed").value;

        if (speed != null) {
            canvasArray[i].setDelay(speed);
        }
        
        canvasArray[i].continueSortVisualization();
    }
}