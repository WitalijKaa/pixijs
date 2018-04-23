<script>
const CODES = {
    "37": "Left",
    "38": "Up",
    "39": "Right",
    "40": "Down",
};

export default {
    data () { return {
        key: {
            left: false,
            right: false,
            up: false,
            down: false,
            horz: 0,
            vert: 0,
        }
    }},
    created () {
        window.addEventListener('keydown', this.keyboardDownHandler);
        window.addEventListener('keyup', this.keyboardUpHandler);
    },
    methods: {
        keyboardHandler(event, type) {
            if (CODES.hasOwnProperty(event.keyCode)) {
                this['key' + CODES[event.keyCode] + type]();
                event.preventDefault();
            }
        },
        keyboardUpHandler(event) { this.keyboardHandler(event, 'Up'); },
        keyboardDownHandler(event) { this.keyboardHandler(event, 'Down'); },

        keyRightDown() { this.key.right = true; this.horizontalChange(); },
        keyRightUp() { this.key.right = false; this.horizontalChange(); },
        keyLeftDown() { this.key.left = true; this.horizontalChange(); },
        keyLeftUp() { this.key.left = false; this.horizontalChange(); },
        horizontalChange() {
            if ((this.key.right || this.key.left) && !(this.key.right && this.key.left)) {
                if (this.key.right) { this.key.horz = 1; }
                else { this.key.horz = -1; }
            }
            else { this.key.horz = 0; }
            this.$emit('unitMoveHorizontally', this.key.horz);
        },
        keyUpDown() { this.key.up = true; this.verticalChange(); },
        keyUpUp() { this.key.up = false; this.verticalChange(); },
        keyDownDown() { this.key.down = true; this.verticalChange(); },
        keyDownUp() { this.key.down = false; this.verticalChange(); },
        verticalChange() {
            if ((this.key.up || this.key.down) && !(this.key.up && this.key.down)) {
                if (this.key.down) { this.key.vert = 1; }
                else { this.key.vert = -1; }
            }
            else { this.key.vert = 0; }
            this.$emit('unitMoveVertically', this.key.vert);
        }
    }
}
</script>