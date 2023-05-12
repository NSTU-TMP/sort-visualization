class BubbleSort extends ASort implements ISort  {
    public BubbleSort(int[] array) {
        super(array); 
    }

    public ChangedArray NextSortStep() {
        if (isSorted) {
            return null;
        }

        for (; i < array.length - 1; i = i + 1) {
            for (; j < array.length - i - 1; j = j + 1) {
                if (array[j] > array[j + 1]) {
                    Swap(j);
                    return new ChangedArray(array, j - 1, j);
                }    
            }

            j = 0;
        }

        isSorted = true;
    
        return new ChangedArray(array, 0, 0);
    }
}