function create2DArray(cols, rows){
    let arr = new Array(cols)

    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows)
    }
    return arr
}

let grid;
let cols;
let rows;
let size = 20;
let canvas, ctx
let generations = 0

function init(){
    
    canvas = document.getElementById('gameCanvas')
    ctx = canvas.getContext('2d')

    // calculate numbers of cols and rows
    cols = canvas.width / size
    rows = canvas.height / size

    grid = create2DArray(cols, rows)
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            // set random 0 or 1
            grid[i][j] = Math.round(Math.random(2))            
        }
    }

    setInterval(draw, 100, ctx);
}

function draw(ctx){

    // Clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x = i * size
            let y = j * size
            // if grid[i][j] position is equal to 1
            if (grid[i][j] == 1) {
                // ctx.beginPath();
                ctx.fillStyle = 'rgb(82, 190, 128)';
                // // set position and rect size
                ctx.fillRect(x, y, size - 1, size - 1); 
                ctx.closePath();
            }     
        }
    }

    nextGrid()    
}


function nextGrid(){
    let next = create2DArray(cols, rows)

    // Compute next based on grid
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            // get value of the position
            let isAlive = grid[i][j]

            // Count live neighbours
            let sum = countNeighbours(grid, i , j)
                       
            // If any dead cell with 3 live neighbours becomes alive cell
            if(isAlive == 0 && sum == 3){
                next[i][j] = 1
            }else if(isAlive == 1 && (sum < 2 || sum > 3)){
                // If any live cell with less than two or more than three live neighbours dies.
                next[i][j] = 0
            } else {
                next[i][j] = isAlive
            }
        }
    }
    // set new grid
    grid = next
}

function countNeighbours(grid, x, y){
    let sum = 0
    // -1 0 1
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            // x + i + columns % columns
            // 1 + -1 + 40 % 40 = 0
            // 0 + -1 + 40 % 40 = 9
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            // sum all the neighbours
            sum += grid[col][row]
        }
    }
    // minus myself
    sum-= grid[x][y]
    return sum
}

document.addEventListener('DOMContentLoaded', init)