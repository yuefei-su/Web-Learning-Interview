// [[1,2,3],[3],[3],[4],[]]
// 3


let nodes = [[1, 2, 3], [3], [3], [4], []];


function DagPathNum(nodes) {
    let result = 0;
    nodes[0].forEach((element) => {
        if (digui(nodes[element])===undefined) {
            result++
        }
    });
    return result;
    function digui(val) {
        val.forEach(element => {
            if (val === []) {
                return 1;
            } else {
                digui(nodes[element])
            }
        })
    }
}



console.log(DagPathNum(nodes));




