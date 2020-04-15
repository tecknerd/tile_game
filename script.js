window.onload = function () {

    Vue.component('confetti', {
        template: '<div></div>'
    });

    Vue.component('tile-component', {
        props: ['tile'],
        template: `
            <div :class="['tile', 'tile-' + tile.id, 'row-' + (tile.row + 1) + '-col-' + (tile.col + 1)]" 
            @click="$emit('is-adjacent')">
            </div>
            `,
        watch: {
            'tile.row': function (newVal, oldVal) {
                this.class = 'row-' + (newVal + 1) + '-col-' + (this.tile.col + 1);

            },

            'tile.col': function (newVal, oldVal) {
                this.class = 'row-' + (this.tile.row + 1) + '-col-' + (newVal + 1);
            }
        }
    });

    new Vue({
        el: '#app',
        data: {
            tiles: [
                {
                    'id': 1,
                    'row': 0,
                    'col': 0
                },
                {
                    'id': 2,
                    'row': 0,
                    'col': 1
                },
                {
                    'id': 3,
                    'row': 0,
                    'col': 2
                },
                {
                    'id': 4,
                    'row': 1,
                    'col': 0
                },
                {
                    'id': 5,
                    'row': 1,
                    'col': 1
                },
                {
                    'id': 6,
                    'row': 1,
                    'col': 2
                },
                {
                    'id': 7,
                    'row': 2,
                    'col': 0
                },
                {
                    'id': 8,
                    'row': 2,
                    'col': 1
                }
            ],
            emptySlot: {
                'id': 9,
                'row': 2,
                'col': 2
            },
            answer: [
                [5, 8, 1],
                [7, 6, 2],
                [4, 3, 9],
            ],
            userAnswer: [
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1]
            ],
            playerWon: false,
            playerMoves: 0
        },
        methods: {
            isAdjacent: function (row, col) {
                return Math.abs(row - this.emptySlot.row) + Math.abs(col - this.emptySlot.col) === 1 ? true : false;
            },

            slideTile: function (tile) {
                if (this.isAdjacent(tile.row, tile.col) && !this.playerWon) {
                    [tile.row, tile.col, this.emptySlot.row, this.emptySlot.col] =
                        [this.emptySlot.row, this.emptySlot.col, tile.row, tile.col];
                    this.userAnswer[tile.row][tile.col] = tile.id;
                    this.userAnswer[this.emptySlot.row][this.emptySlot.col] = this.emptySlot.id;
                    this.playerMoves++;

                    //  Vue cannot detect array changes such as arr[i][j] = x so I made 
                    //  checkAnswer a method and call it  instead of a watch or compute
                    this.checkAnswer();
                }
            },

            checkAnswer: function () {
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (this.userAnswer[i][j] !== this.answer[i][j]) {
                            return;
                        }
                    }
                }

                this.playerWon = true;
            }
        },
    });
}