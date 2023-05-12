class BubbleSort extends ASort implements ISort  {
    public BubbleSort(int[] array) {
        super(array); 
    }

    public ChangedArray NextSortStep() {
        if (this.isSorted) {
            return null;
        }

        for (; this.i < this.array.length - 1; this.i = this.i + 1) {
            for (; this.j < this.array.length - this.i - 1; this.j = this.j + 1) {
                if (this.array[this.j] > this.array[this.j + 1]) {
                    Swap(j);
                    j = j + 1;
                    return new ChangedArray(array, this.j -1 , this.j);
                }    
            }

            this.j = 0;
        }

        this.isSorted = true;
    
        return new ChangedArray(this.array, this.j -1, this.j);
    }
    
    public ChangedArray GetArray(){
      return new ChangedArray(this.array, -1, -1);
    }
}
