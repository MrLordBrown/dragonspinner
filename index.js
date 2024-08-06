const hive = 'src/tile000.png'; // 0
const silk = 'src/tile001.png'; // 1
const leaf = 'src/tile002.png'; // 2
const ice = 'src/tile003.png'; // 3
const night = 'src/tile004.png'; // 4
const sky = "src/tile006.png"; // 5
const rain = "src/tile005.png"; // 6
const sand = "src/tile007.png"; // 7
const sea = "src/tile008.png"; // 8
const mud = "src/tile009.png"; // 9
const male = "src/tile010.png"; // 10
const trans = "src/tile011.png"; // 11
const female = "src/tile012.png"; // 12
const magic = "src/magic.png";
const nomagic = "src/nomagic.png";



// points
let result = 1;
let blinkInterval = 0;
// current winning row/rows
let winRow = ['-1', '-1', '-1', '-1'];

const arr = [hive, silk, leaf, ice, night, sky, rain, sand, sea, mud];
const gen = [male, trans, female];
const mag = [magic, nomagic];
let resultArr = [
    [0, 0, 0, 0]
];

// fn to check arrays equality
const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);

function spinEachTableCell(currentSlot, interval, reel, reelIteration) {
    let counter = 0;
    
    let setIntervalId = setInterval(function runSlot() {
        counter++;

        randImgIndex = Math.floor(Math.random() * gen.length);
        document.getElementById('c').setAttribute('src', gen[randImgIndex]);

        randImgIndex = Math.floor(Math.random() * mag.length);
        document.getElementById('d').setAttribute('src', mag[randImgIndex]);

        randImgIndex = Math.floor(Math.random() * arr.length);
        document.getElementById('a').setAttribute('src', arr[randImgIndex]);

        randImgIndex = Math.floor(Math.random() * arr.length);
        document.getElementById('b').setAttribute('src', arr[randImgIndex]);

        if (counter === interval) {
            clearInterval(setIntervalId);
            resultArr[reel][reelIteration] = randImgIndex;
            $(currentSlot).removeClass('blur');
            $(currentSlot).removeClass('top');
            return;
        }

    }, 5);
    return setIntervalId;
}

function spinSlotMachine() {
    let r = $.Deferred();

    $('img').addClass('blur');
    $('img').addClass('top');

    const table = document.getElementById('slotsCollection');
    const numberOfRows = table.rows.length;

    for (let i = 0; i < numberOfRows; i++) {
        let numberOfCells = table.rows[i].cells.length;

        for (let j = 0; j < numberOfCells; j++) {
            let currentCell = table.rows[i].cells[j].getElementsByTagName('*');
            console.log(currentCell);
            spinEachTableCell($(currentCell), 140 * (j + 1), i, j);
        }
    }

    // if spinning must last 2 seconds, then this solution is not so bad
    setTimeout(function() {
        r.resolve();
    }, 2500);
    return r;
}

// initial function. Waits untill animation is finished to start calculate payouts.
function startSlotMachine() {
    clearInterval(blinkInterval);
    spinSlotMachine().done();
}
