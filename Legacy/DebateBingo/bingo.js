var tiles = base_tiles;
var displayed_tiles = [];
var selected_tiles = [];
var board_catagory = "harris_v_trump"; 

/* Don't come for me for the quality of this code, I made it on the couch watching youtube. */

function shuffle() {
    for (var i = 0; i < tiles.length; i++)
    {
        var rand = Math.floor(Math.random() * (tiles.length - 1));
        var tile = tiles[i];
        tiles[i] = tiles[rand];
        tiles[rand] = tile;
    }

    console.log(tiles);
}

function new_board() {
    displayed_tiles = select_tiles_for_board();
}

function update_table(id) {
    var table = document.getElementById(id);

    var tileIndex = 0;
    for (var row = 1; row <= 5; row++)
    {
        for (var col = 0; col < 5; col++)
        {
            table.rows[row].cells[col].innerText = displayed_tiles[tileIndex];

            table.rows[row].cells[col].setAttribute('class', 'unselected');

            for (var selected_tile_index = 0; selected_tile_index < selected_tiles.length; selected_tile_index++) {
                if (((row * 5) - 5 + col) == selected_tiles[selected_tile_index]) {
                    table.rows[row].cells[col].setAttribute('class', 'selected');
                    break;
                } 
            }

            tileIndex++;
            if (tileIndex >= tiles.length)
                tileIndex = 0;
        }
    }
}

function select_tiles_for_board() {
    shuffle();

    var random_tiles = [];
    for (var i = 0; i < 25; i++) {
        if (i === 12) {
            random_tiles.push("FREE SPACE");
        } else {
            random_tiles.push(tiles[i]);
        }
    }

    return random_tiles; 
}

function make_pdf() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#bingo_board' });
    doc.save('bingo.pdf')
}

function swap_board_type(board_type) {

    console.log("Change to: " + board_type);

    switch (board_type)
    {
        case "fetterman_v_oz":
            tiles = base_tiles.concat(fetterman_vs_oz);
            break;
        case "mandela_v_johnson":
            tiles = base_tiles.concat(mandela_vs_johnson);
            break;
        case "pence_v_kamala":
            tiles = base_tiles.concat(kamala_vs_pence);
            break;
        case "harris_v_trump":
            tiles = base_tiles.concat(harris_vs_trump);
            break;
        case "trump_v_biden":
            tiles = base_tiles.concat(trump_vs_biden);
            break;
    }

    board_catagory = board_type;

    update_table("bingo_board");
}

function clear_selected() {
    selected_tiles = [];
    update_table("bingo_board");
}

function toggle_selected_index(_index) {
    if (selected_tiles.includes(_index)) {
        selected_tiles = selected_tiles.filter((item => item != _index));
    } else {
        selected_tiles.push(_index);
    }

    console.log("Selected tiles: " + selected_tiles)

    update_table('bingo_board');
}

function save_board_to_cookie() {
    console.log("Saving cookie");
    document.cookie = ("tiles=" + displayed_tiles + ";path=/"); 
    document.cookie = ("selected_tiles=" + selected_tiles + ";path=/");
}

function load_from_cookie() {
    let cookie = document.cookie;

    console.log("Cookie is -> " + cookie);

    let cookie_crumbs = cookie.split(";");
    if (cookie_crumbs.length < 2) {
        console.log("Not enough crumbs! [" + cookie_crumbs.length + "]");
        return; 
    }

    let first_half = cookie_crumbs[0].split("=");
    let second_half = cookie_crumbs[1].split("=");

    if (first_half[0] == "tiles") {
        tiles = first_half[1].split(',');
        selected_tiles = second_half[1].split(',');
    }

    if (second_half[0] == "tiles") {
        tiles = second_half[1].split(',');
        selected_tiles = first_half[1].split(',');
    }

}

function clear_cookies() {

}
