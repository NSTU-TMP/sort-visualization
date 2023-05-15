window["mergeSort"] = async function mergeSort(values, drawingCanwas, drawValuesFunc, sleepTimeMS) {
    let sleepTime = 15;
    if (typeof sleepTimeMS !== "undefined") {
        sleepTime = sleepTimeMS;
    }

    async function merge(arr, left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[mid + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            drawValuesFunc(arr, drawingCanwas, k);
            await sleep(sleepTime);
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            drawValuesFunc(arr, drawingCanwas, k);
            await sleep(sleepTime);
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            drawValuesFunc(arr, drawingCanwas, k);
            await sleep(sleepTime);
            j++;
            k++;
        }
    }

    async function mergeSortUtil(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            await mergeSortUtil(arr, left, mid);
            await mergeSortUtil(arr, mid + 1, right);

            await merge(arr, left, mid, right);
        }
    }

    await mergeSortUtil(values, 0, values.length - 1);
};