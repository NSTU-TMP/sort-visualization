window["quickSort"] = async function quickSort(values, drawingCanvas, drawValuesFunc, sleepTimeMS = 50) {
    let sleepTime = 50;
    if (typeof sleepTimeMS !== "undefined") {
        sleepTime = sleepTimeMS;
    }
    let states = []
    for (let i = 0; i < values.length; i++) {
        states[i] = -1;
    }

    async function qSort(values, start, end) {
        if (start >= end || window.quickSort.is_sort_stopped) {
            return;
        }

        let index = await partition(values, start, end);
        states[index] = -1;

        if (window.quickSort.is_sort_stopped) {
            return;
        }
        await Promise.all([
            await qSort(values, start, index - 1),
            await qSort(values, index + 1, end)
        ]);


    };

    async function partition(values, start, end) {
        for (let i = start; i < end; i++) {
            states[i] = 1;
        }

        let pivotValue = values[end];
        let pivotIndex = start;
        states[pivotIndex] = 0;
        for (let i = start; i < end; i++) {
            if (values[i] < pivotValue) {
                if (window.quickSort.is_sort_stopped) {
                    return;
                }
                await swap(values, i, pivotIndex);
                await sleep(sleepTime);
                drawValuesFunc(values, drawingCanvas, i, pivotIndex);

                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 0;
            }
        }
        if (window.quickSort.is_sort_stopped) {
            return;
        }
        await swap(values, pivotIndex, end);
        await sleep(sleepTime);
        drawValuesFunc(values, drawingCanvas, pivotIndex, end);


        for (let i = start; i < end; i++) {
            if (i != pivotIndex) {
                states[i] = -1;
            }
        }

        return pivotIndex;
    }
    async function swap(values, a, b) {
        let temp = values[a];
        values[a] = values[b];
        values[b] = temp;
    }

    qSort(values, 0, values.length - 1);
}







