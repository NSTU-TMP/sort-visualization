window["mergeSort"] = async function mergeSort(values, drawingCanvas, drawValuesFunc, sleepTimeMS) {
    let sleepTime = 15;

    let is_sort_stopped = false;

    if (typeof sleepTimeMS !== "undefined") {
        sleepTime = sleepTimeMS;
    }

    async function merge(arr, left, mid, right) {

        if (is_sort_stopped) {
            return;
        }
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
            drawValuesFunc(arr, drawingCanvas, k);
            await sleep(sleepTime);
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            drawValuesFunc(arr, drawingCanvas, k);
            await sleep(sleepTime);
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            drawValuesFunc(arr, drawingCanvas, k);
            await sleep(sleepTime);
            j++;
            k++;
        }
    }

    async function mergeSortUtil(arr, left, right) {
        if (left < right) {
            if (window.mergeSort.is_sort_stopped == true) {
                return;
            }
            const mid = Math.floor((left + right) / 2);

            if (!window.mergeSort.is_sort_stopped) {
                await mergeSortUtil(arr, left, mid);
            }
            if (!window.mergeSort.is_sort_stopped) {
                await mergeSortUtil(arr, mid + 1, right);
            }
            if (!window.mergeSort.is_sort_stopped) {
                await merge(arr, left, mid, right);
            }
            if (!window.mergeSort.is_sort_stopped) {
                await merge(arr, left, mid, right);
            }
        }
    }

    await mergeSortUtil(values, 0, values.length - 1);
};