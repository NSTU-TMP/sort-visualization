window["bubbleSort"] = async function bubbleSort(values, drawingCanwas, drawValuesFunc, sleepTimeMS = 50) {
    let sleepTime = 50;

    if (typeof (sleepTimeMS) !== "undefined") {
        sleepTime = sleepTimeMS;
    }
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length - i - 1; j++) {
            if (window.bubbleSort.is_sort_stopped) {
                return;
            }
            let a = values[j];
            let b = values[j + 1];
            if (values[j] > values[j + 1]) {
                let tmp = values[j];
                values[j] = values[j + 1];
                values[j + 1] = tmp;
                drawValuesFunc(values, drawingCanwas, j, j + 1);
                await sleep(sleepTime);
            }
        }

    }
};