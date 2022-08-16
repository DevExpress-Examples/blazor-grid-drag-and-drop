var gridTbodySelector = ".dxbs-grid-table > tbody";

var dotNetHelper;
function setDotNetHelper(helper) {
    dotNetHelper = helper;
}
function initialize(firstGridSelector, secondGridSelector) {
    var firstGridSortableSelector = firstGridSelector + " " + gridTbodySelector;
    var secondGridSortableSelector = secondGridSelector + " " + gridTbodySelector;
    var sortableSelector = firstGridSortableSelector + ", " + secondGridSortableSelector;

    var draggableElementContainer = createDraggableElementContainer();
    var draggableElementTable = draggableElementContainer.querySelector("table");
    var draggableElementTBody = draggableElementContainer.querySelector("tbody");

    $(function () {
        $(sortableSelector).sortable({
            items: "tr[data-visible-index]",
            cursor: "move",
            helper: "clone",
            appendTo: draggableElementTBody,
            placeholder: "ui-state-highlight",
            connectWith: gridTbodySelector,

            start: function (e, ui) {
                var originalRow = ui.item[0];
                originalRow.isFirstGridRow = !!originalRow.closest(firstGridSelector);

                var originalTable = originalRow.parentNode.parentNode;
                draggableElementTable.className = originalTable.className;
                draggableElementTable.style.width = originalTable.offsetWidth + "px";

                var cols = originalTable.querySelectorAll(":scope > colgroup > col");
                var draggableRow = ui.helper[0];
                for (var i = 0; i < cols.length; i++) {
                    draggableRow.cells[i].style.width = cols[i].offsetWidth + "px";
                }
                draggableRow.style.backgroundColor = "white";
            },
            stop: function (e, ui) {
                var row = ui.item[0];
                var prevRow = row.previousElementSibling;
                var nextRow = row.nextElementSibling;

                var isDraggableRowFromFirstGrid = row.isFirstGridRow;
                var isRowDroppedToFirstGrid = !!row.closest(firstGridSelector);

                delete row.isFirstGridRow;

                window.setTimeout(function () {
                    $(sortableSelector).sortable("cancel");
                    $(sortableSelector).sortable("destroy");
                    dotNetHelper.invokeMethodAsync("ReorderGridRows", getVisibleIndex(row), getVisibleIndex(prevRow), getVisibleIndex(nextRow), isDraggableRowFromFirstGrid, isRowDroppedToFirstGrid);
                }, 50);
            }
        });
    });
}
function getVisibleIndex(row) {
    var visibleIndex = -1;
    if (row && Object.keys(row.dataset).length > 0)
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