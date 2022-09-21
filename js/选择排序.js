

function selectionSort(array){
    for(let i=0;i<array.length;i++){
        let minIndex=i;
        for(let j=i+1;j<array.length;j++){
            if(array[j]<array[minIndex]){
                minIndex=j;
            }
        }
        [array[minIndex],array[i]]=[array[i],array[minIndex]];
    }
    return array
}


console.log(selectionSort([2,3,1,5,6]))
