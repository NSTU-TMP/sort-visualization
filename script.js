let values = [];
let i = 0;
let j = 0;
let isSorting = false;

function setup() {
    // const canvas = createCanvas(400, 400);
    const canvas = createCanvas(window.innerWidth, window.innerHeight);

    canvas.parent('bubbleSortCanvas');
    resetArray();
}

function draw() {
    background(0);
    if (isSorting) {
        bubbleSort();
    }
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        line(i * 8, height, i * 8, height - values[i]);
    }
}

function bubbleSort() {
    if (i < values.length) {
        for (let j = 0; j < values.length - i - 1; j++) {
            let a = values[j];
            let b = values[j + 1];
            if (a > b) {
                swap(values, j, j + 1);
            }
        }
    } else {
        console.log("Finished");
        noLoop();
    }
    i++;
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function startVisualization() {
    isSorting = true;
}

function resetVisualization() {
    isSorting = false;
    resetArray();
    loop();
}

function resetArray() {
    values = [];
    for (let i = 0; i < width / 8; i++) {
        values.push(random(height));
    }
    i = 0;
}

window.addEventListener('load', setup);