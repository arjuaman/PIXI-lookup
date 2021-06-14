export class Progress {
    p:number;
    bar = document.getElementById('prog-bar');
    addBy:number;

    constructor(p: number,addBy: number) {
        this.addBy = addBy;
        this.p = p;
        this.update();
    }
    update() {
        this.bar.style.width = this.p + '%';
    }
    countup() {
        if (this.p < 100) { this.p += this.addBy; }
        this.update();
    }
}