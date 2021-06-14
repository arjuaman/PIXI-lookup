"use strict";
exports.__esModule = true;
exports.Progress = void 0;
var Progress = /** @class */ (function () {
    function Progress(p, addBy) {
        this.bar = document.getElementById('prog-bar');
        this.addBy = addBy;
        this.p = p;
        this.update();
    }
    Progress.prototype.update = function () {
        this.bar.style.width = this.p + '%';
    };
    Progress.prototype.countup = function () {
        if (this.p < 100) {
            this.p += this.addBy;
        }
        this.update();
    };
    return Progress;
}());
exports.Progress = Progress;
