window["quickSort"] = async function quickSort(values, drawingCanwas, drawValuesFunc, sleepTimeMS) {

    let sleepTime = 0;
    if (typeof (sleepTimeMS) != "undefined") {
        sleepTime = sleepTimeMS;
    }
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values.length - i - 1; j++) {
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



