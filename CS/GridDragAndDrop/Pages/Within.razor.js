var gridTbodySelector = ".dxbl-grid .dxbl-grid-table > tbody";

var dotNetHelper;
function setDotNetHelper(helper) {
    dotNetHelper = helper;
}
function initialize() {
    var draggableElementContainer = createDraggableElementContainer();
    var draggableElementTable = draggableElementContainer.querySelector("table");
    var draggableElementTBody = draggableElementContainer.querySelector("tbody");

    $(function () {
        $(gridTbodySelector).sortable({
            items: "tr[data-visible-index]",
            cursor: 'move',
            helper: "clone",
            appendTo: draggableElementTBody,
            placeholder: "ui-state-highlight",

            start: function (e, ui) {
                var originalTable = ui.item[0].parentNode.parentNode;

                draggableElementTable.className = originalTable.className;
                draggableElementTable.style.width = originalTable.offsetWidth + "px";

                var cols = originalTable.querySelectorAll(":scope > colgroup > col");
                var row = ui.helper[0];
                for (var i = 0; i < cols.length; i++) {
                    row.cells[i].style.width = cols[i].offsetWidth + "px";
                }

                row.style.backgroundColor = "white";
            },
            stop: function (e, ui) {
                var row = ui.item[0];
                var prevRow = row.previousElementSibling;
                var nextRow = row.nextElementSibling;

                window.setTimeout(async function () {
                    await dotNetHelper.invokeMethodAsync("ReorderGridRows", getVisibleIndex(row), getVisibleIndex(prevRow), getVisibleIndex(nextRow));
                }, 50);
            }
        });
    });
}
function getVisibleIndex(row) {
    var visibleIndex = -1;
    if (row && row.getAttribute("data-visible-index") && Object.keys(row.dataset).length > 0)
        visibleIndex = parseInt(row.dataset.visibleIndex);
    return visibleIndex;
}
function createDraggableElementContainer() {
    var container = document.createElement("DIV");
    container.innerHTML = "<table style='position: absolute; left: -10000px; top: -10000px;'><tbody></tbody></table>";
    document.body.appendChild(container);
    return container;
}

export { setDotNetHelper, initialize }
