export default function cutOutTable(str) {
  return str.substring(str.indexOf('<tr>'), str.lastIndexOf('</tr>') + 5);
}
