<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/525275809/22.1.4%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1109419)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->

# Blazor Grid - Incorporate Drag and Drop Support

The DevExpress Blazor Grid allows you to incorporate drag and drop support for the following usage scenarios:

- Drag rows in a single grid (reorder rows)
- Drag rows between two grids
- Drag rows between two grids and drop at a specified position

![Drag between two grids](result.png)

The three options listed above are based on [ObservableCollection](https://docs.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1?view=net-6.0) data sources. When used in this manner, the Grid component reacts to changes instantly. Our drag and drop implementation uses three jQuery widgets ([draggable](https://jqueryui.com/draggable/), [droppable](https://jqueryui.com/droppable/), and [sortable](https://jqueryui.com/sortable/)). To begin, add jQuery links to the Layout.csthml file as follows:

```
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
```

This GitHub sample also applies [CSS styles](./CS/GridDragAndDrop/wwwroot/css/site.css) to visualize drag and drop operations:

```
.ui-state-highlight {
    background-color: rgba(var(--bs-primary-rgb), .3);
}

.ui-state-hover {
    background: rgba(var(--bs-primary-rgb), .3);
}

.ui-draggable-dragging {
    box-shadow: 0 2px 6px 0 rgb(0 0 0 / 12%);
}
```

## Drag Rows in One Grid

When you drop a row, grid rows are automatically reordered. The [ReorderGridRows](./CS/GridDragAndDrop/Pages/Within.razor#L48) method uses the Sortable widget to reorder rows.

## Drag Rows Between Two Grids

The [MoveGridRow](./CS/GridDragAndDrop/Pages/Between.razor#L76) method uses Draggable and Droppable widgets to identify source and target Grids. When you drop a row, a server action is executed to update data collections.

## Drag Rows Between Two Grids and Drop at the Specified Position

The [ReorderGridRows](./CS/GridDragAndDrop/Pages/KeepIndices.razor#L77) method uses Sortable widget and the [connectWith](./CS/GridDragAndDrop/Pages/KeepIndices.razor.js#L23) property to identify and connect the source and target Grids. After a drag/drop operation, the server updates source collections.

## Files to Look At

- [Between.razor](./CS/GridDragAndDrop/Pages/Between.razor)
- [Between.razor.js](./CS/GridDragAndDrop/Pages/Between.razor.js)
- [KeepIndices.razor](./CS/GridDragAndDrop/Pages/KeepIndices.razor)
- [KeepIndices.razor.js](./CS/GridDragAndDrop/Pages/KeepIndices.razor.js)
- [Within.razor](./CS/GridDragAndDrop/Pages/Within.razor)
- [Within.razor.js](./CS/GridDragAndDrop/Pages/Within.razor.js)

## Documentation

- [DxGrid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid)
