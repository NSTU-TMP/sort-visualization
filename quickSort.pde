class QuickSort extends ASort implements ISort  {
    private int low;
    private int high;
    private int pivot;

    public QuickSort(int[] array) {
        super(array); 
        this.low = 0;
        this.high = array.length - 1;
    }

    private ChangedArray partition() {
        this.pivot = this.array[this.high]; // Опорный элемент
        int _i = this.low - 1; // Индекс меньшего элемента

        for (int _j = low; _j < this.high; _j++) {
            // Если текущий элемент меньше или равен опорному
            if (this.array[j] <= this.pivot) {
                _i++;
                swap(this.array, _i, _j);
                return new ChangedArray(this.array, _i, _j);
            }
        }

        swap(this.array, _i + 1, this.high); // Перемещаем опорный элемент на правильную позицию
        this.pivot = _i + 1; // Возвращаем индекс опорного элемента
        return new ChangedArray(this.array, _i + 1, this.high);
    }


    private ChangedArray quickSort(int _low, int _high){
        // this.low = _low;
        // this.high = _high;
        if (_low < _high) {
            println(_low, _h)

            ChangedArray changedArray = partition();
            if (changedArray != null){
                return changedArray;
            } 
            
            changedArray = quickSort(_low, this.pivot - 1);
            if (changedArray != null){
                return changedArray;
            } 
            
            changedArray = quickSort(this.pivot + 1, _high);
            if (changedArray != null){
                return changedArray;
            } 
        }
        return null;
    }


    public ChangedArray NextSortStep() {
        if (this.isSorted) {
            return null;
        }
        ChangedArray changedArray = this.quickSort(this.low, this.high);
        if (changedArray != null){
            return changedArray;
        }
        // if (this.low < this.height){

        //     ChangedArray changedArray = partition();
        //     if (changedArray != null){
        //         return changedArray;
        //     } 

        //     quickSort(this.low, this.pivot - 1);
        //     quickSort(this.pivot + 1, this.high);
        // }

       {
        //...
       }

        this.isSorted = true;
    
        return new ChangedArray(this.array, -1, -1);
    }
    
    public ChangedArray GetArray(){
      return new ChangedArray(this.array, -1, -1);
    }

    void swap(int[] array, int i, int j) {
        int temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

}
