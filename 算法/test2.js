function FirstNotRepeatingChar(str) {
    let arr = str.split('')
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (j == arr.length - 1) {
                if (arr[i] != arr[j]) {
                    return arr[i]
                }
            }
            if (i == j) {
                if(j== arr.length - 1){
                    return arr[i]//最后为输出结果时
                }
                continue
            }
            if (arr[i] == arr[j]) {
                j = arr.length//有重复则跳出此次j循环，开始下次i循环
            }
        }
    }
    return -1

}

console.log(FirstNotRepeatingChar('2adaw1dwqq'))