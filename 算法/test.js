setTimeout(function() {
    console.log(1)
  }, 0);
  new Promise(function(resolve, reject) {
    console.log(2);
    resolve()
  }).then(function() {
    console.log(3)
  });
  process.nextTick(function () {
    console.log(4)
  })
  console.log(5)


//   2,5,4,3,1



// const  myflat= arr=>{
//     return arr.reduce((pre,cur)=>{
//         return pre.concat(Array.isArray(cur)?myflat(cur):cur)
//     },[]);
// };

// console.log(myflat([1,2,[3,4]]))


// 输入: "abcabcbb"
// 输出: 3 
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。



// const maxSubstring =function(s){
//     let map = new Map();
//     let i = -1;
//     let res = 0;
//     for(let j=0;j<s.length;j++){
//         if(map.has(s[j])){
//             i=Math.max(i,map.get(s[j]))
//         }
//         res=Math.max(res,j-i)
//         map.set(s[j],j)
//     }

//     return  res
// }

// console.log(maxSubstring('abcabcbb'))

