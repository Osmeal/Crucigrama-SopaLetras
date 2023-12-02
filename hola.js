const words = ["software", "developer", "system", "app", "phone", "mobile"]
let containsAll = false;



const board = () => {
    let array1 = [];
    for (let i = 0; i < 12; i++) {
      let array2 = [];
      for (let j = 0; j < 10; j++) {
        array2.push(String.fromCharCode(Math.floor(Math.random() * 25 + 97)));
      }
      array1.push(array2);
    }
    return array1;
  
};


console.log(board.join());
