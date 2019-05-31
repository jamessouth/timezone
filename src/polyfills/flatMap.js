import './flat';

if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function() {
    return Array.prototype.map.apply(this, arguments).flat(1);
  };
}
