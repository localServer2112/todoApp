// function vowelsAndConsonants(s) {
//     let temp= []; 
//     for (const ch of s) {
//         if (ch.match(/[aeiou]/gi)){
//             console.log(ch)
//         }
//         else{
//             temp.push(ch)
//         }
//     }
//     temp.forEach((ch)=>{
//           console.log(ch);
//     })
          
// }
// vowelsAndConsonants("xyzrtywqa")
function testam(i,j,k){
    let revNum = 0;
    let beautifulDays = 0;
    for(let num=i; num<=j; num++){
        let rev = num.toString().split("").reverse().join("");
        revNum = parseInt(rev) // number reversed
        if (Math.abs(num - revNum) % k === 0) {
            beautifulDays++;
        }
    }
    return beautifulDays;
}
console.log(testam(20,23,6))