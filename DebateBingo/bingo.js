var tiles = base_tiles;
var isOnPresidentTiles = true;

/* Don't come for me for the quality of this code, I made it on the couch watching youtube. */

function shuffle() {
    for (var i = 0; i < tiles.length; i++)
    {
        var rand = Math.floor(Math.random() * (tiles.length - 1));
        var tile = tiles[i];
        tiles[i] = tiles[rand];
        tiles[rand] = tile;
    }
}

function updateTable(id) {
    shuffle();

    var table = document.getElementById(id);

    var tileIndex = 0;
    for (var row = 1; row <= 5; row++)
    {
        for (var col = 0; col < 5; col++)
        {
            table.rows[row].cells[col].innerText = tiles[tileIndex];

            if (col == 2 && row == 3)
                table.rows[row].cells[col].innerText = "FREE SPACE";

            tileIndex++;
            if (tileIndex >= tiles.length)
                tileIndex = 0;
        }
    }
}

function makePDF() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#bingo_board' });
    doc.save('bingo.pdf')
}

function switchBetweenP_AndVP() {

    var bttn = document.getElementById("changeBttn");

    if (isOnPresidentTiles)
    {
        tiles = base_tiles.concat(vice_presidents);
        bttn.innerText = "Switch to President Board";
    }
    else 
    {
        tiles = base_tiles.concat(presidents);
        bttn.innerText = "Switch to Vice President Board";
    }

    isOnPresidentTiles = !isOnPresidentTiles;
    updateTable("bingo_board");
}