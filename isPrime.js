function isPrime(){
    var p = 193;
    if (p < 2) {
        return false;
    }
    for (var i = 2; i < Math.sqrt(p); i++) {
        if (p % i == 0) {
            return false;
        }
    }   
    return true;
}
console.log(isPrime())