abstract public class ASort {
    protected int[] array;
    protected int i;
    protected int j;
    protected boolean isSorted;

    protected void Swap(int index) {
        int temp = array[index];
        array[index] = array[index + 1];
        array[index + 1] = temp;
    }

    public ASort(int[] array) {
        i = 0;
        j = 0;
        isSorted = false;
        this.array = new int[array.length];
        arrayCopy(array, this.array, array.length);
    }
}