import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
    @Input() data: boolean[][];
    @Input() rows: number = 16;
    @Input() cols: number = 16;
    @Input() height: number;
    @Input() width: number;
    @Input() editable: boolean = true;
    @Output() updated = new EventEmitter();
    @ViewChild('grid') grid;

    canvas;
    ctx;
    colWidth: number;
    rowHeight: number;

    down: boolean;
    toggleOn: boolean;

    ngOnInit() {
        this.canvas = this.grid.nativeElement;
        this.ctx = this.canvas.getContext('2d');

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.colWidth = this.width / this.cols;
        this.rowHeight = this.height / this.rows;

        if (this.editable) {
            this.canvas.addEventListener('mousedown', this.gridMousedown);
            this.canvas.addEventListener('mouseup', this.gridMouseup);
            this.canvas.addEventListener('mousemove', this.gridMousemove);
            this.canvas.addEventListener('mouseenter', this.gridMouseenter);
            this.canvas.addEventListener('touchstart', this.gridTouchstart);
            this.canvas.addEventListener('touchmove', this.gridTouchmove);
            this.canvas.addEventListener('touchend', this.gridTouchend);
        }

        this.drawGrid();
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let prop in changes) {
            if (!changes[prop].isFirstChange()) {
                this.drawGrid();
                break;
            }
        }
    }

    drawGrid = () => {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                // Draw edge of LED
                this.ctx.strokeStyle = '#44444433';
                this.ctx.beginPath();
                this.ctx.arc(col * this.colWidth + this.colWidth / 2, row * this.rowHeight + this.rowHeight / 2, this.colWidth / 3, 0, 2*Math.PI);
                this.ctx.stroke();

                if (this.data[row][col]) {
                    // Draw the red LED
                    this.ctx.fillStyle = '#FF0000';
                    this.ctx.beginPath();
                    this.ctx.arc(col * this.colWidth + this.colWidth / 2, row * this.rowHeight + this.rowHeight / 2, this.colWidth / 3, 0, 2 * Math.PI);
                    this.ctx.fill();

                    // Color of the glare to be drawn for LED turned on
                    this.ctx.fillStyle = "#FF7777";
                } else {
                    // Color of the glare to be drawn for LED turned off
                    this.ctx.fillStyle = "#F4F4F4DD";
                }
                // Glare, slightly off center
                this.ctx.beginPath();
                this.ctx.arc(col * this.colWidth + this.colWidth / 2 - this.colWidth / 8, row * this.rowHeight + this.rowHeight / 2 - this.rowHeight / 6, this.colWidth / 11, 0, 2*Math.PI);
                this.ctx.fill();
            }
        }
    }

    gridMousedown = (evt) => {
        this.down = true;

        let pos = this.getPos(evt);

        let row = pos.row;
        let col = pos.col;

        this.toggleOn = !this.data[row][col];

        this.data[row][col] = this.toggleOn;
        this.drawGrid();
    }

    gridMouseup = (evt) => {
        this.down = false;
        this.updated.emit(this.data);
    }

    gridMousemove = (evt) => {
        if (!this.down) {
            return;
        }

        let pos = this.getPos(evt);

        let changed = this.data[pos.row][pos.col] !== this.toggleOn;

        if (changed) {
            this.data[pos.row][pos.col] = this.toggleOn;
            this.drawGrid();
        }
    }

    gridMouseenter = (evt) => {
        if (evt.buttons !== 1) {
            this.down = false;
        }
    }

    gridTouchstart = (evt) => {
        evt.preventDefault();
        let touches = evt.changedTouches;
        this.gridMousedown(touches[0]);
    }

    gridTouchmove = (evt) => {
        evt.preventDefault();
        let touches = evt.changedTouches;
        this.gridMousemove(touches[0]);
    }

    gridTouchend = (evt) => {
        evt.preventDefault();
        let touches = evt.changedTouches;
        this.gridMouseup(touches[0]);
    }
        

    getPos = (evt): {row: number, col: number} => {
        let rect = this.canvas.getBoundingClientRect();

        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;

        return {
            row: Math.min(Math.floor(y / this.rowHeight), this.rows - 1),
            col: Math.min(Math.floor(x / this.colWidth), this.rows - 1),
        };
    }
}
