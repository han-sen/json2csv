const jsonBox = document.getElementById("text-json");
const csvBox = document.getElementById("text-csv");
const fileName = document.getElementById("file-name");
const typeSelect = document.getElementById("type-select");

const sendJSON = () => {
  const boxValue = jsonBox.value;
  if (validJSON(boxValue) && boxValue != "") {
    const input = JSON.parse(boxValue);
    const header = Object.keys(input[0]);
    const dataLines = input.map(x => {
      return Object.values(x)
        .toString()
        .replace(/,/g, ", ");
    });
    csvBox.innerHTML =
      header.toString().replace(/,/g, ", ") + "\r\n" + dataLines.join("\r\n");
  } else {
    csvBox.innerHTML = "Must be valid, flattened JSON!";
  }
};

const validJSON = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const clearJSON = () => {
  jsonBox.value = "";
};

const saveCSV = () => {
  const fileType =
    typeSelect.value === "txt" ? ["plain", "txt"] : ["csv", "csv"];
  const blob = new Blob([csvBox.value], {
    type: `text/${fileType[0]};charset=utf-8`
  });
  if (fileName.value === "") fileName.value = "json";
  saveAs(blob, `${fileName.value}.${fileType[1]}`);
  fileName.value = "";
};
