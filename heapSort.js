window["heapSort"] = async function heapSort(values, drawingCanwas, drawValuesFunc, sleepTimeMS) {
    let sleepTime = 25;
    if (typeof sleepTimeMS !== "undefined") {
        sleepTime = sleepTimeMS;
    }

    async function heapify(arr, n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            let temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;

            drawValuesFunc(arr, drawingCanwas, i, largest);
            await sleep(sleepTime);

            await heapify(arr, n, largest);
        }
    }

    async function buildHeap(arr, n) {
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(arr, n, i);
        }
    }

    async function sort(arr) {
        const n = arr.length;

        await buildHeap(arr, n);

        for (let i = n - 1; i > 0; i--) {
            let temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;

            drawValuesFunc(arr, drawingCanwas, 0, i);
            await sleep(sleepTime);

            await heapify(arr, i, 0);
        }
    }

    await sort(values);
};