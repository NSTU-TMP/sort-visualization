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
        this.i = 0;
        this.j = 0;
        this.isSorted = false;
        this.array = new int[array.length];
        arrayCopy(array, this.array, array.length);
    }
}
