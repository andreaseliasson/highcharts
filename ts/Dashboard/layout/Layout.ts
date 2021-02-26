import Row from './Row.js';
import Dashboard from '../Dashboard.js';
import GUIElement from './GUIElement.js';

import U from '../../Core/Utilities.js';
const {
    pick
} = U;
class Layout extends GUIElement {
    /* *
    *
    *  Constructors
    *
    * */
    public constructor(
        dashboard: Dashboard,
        options: Layout.Options
    ) {
        super(options);

        this.dashboard = dashboard;
        this.rows = [];

        // GUI structure
        this.setElementContainer(
            'layout',
            dashboard.guiEnabled,
            dashboard.container
        );
        this.setRows();
    }

    /* *
    *
    *  Properties
    *
    * */
    public dashboard: Dashboard;
    public rows: Array<Row>;

    /* *
    *
    *  Functions
    *
    * */
    public setRows(): void {
        const layout = this;

        let rowsElements,
            rowElement,
            i, iEnd;

        rowsElements = pick(
            (layout.options as Layout.Options).rows || [],
            layout?.container?.getElementsByClassName(
                layout.options.rowClassName
            )
        );

        for (i = 0, iEnd = rowsElements.length; i < iEnd; ++i) {
            rowElement = rowsElements[i];
            layout.addRow(
                layout.dashboard.guiEnabled ? rowElement : {},
                rowElement instanceof HTMLElement ? rowElement : void 0
            );
        }
    }

    public addRow(
        options: Row.Options,
        rowElement?: HTMLElement
    ): Row {
        const layout = this,
            row = new Row(layout, options, rowElement);

        layout.rows.push(row);
        return row;
    }
}

interface Layout {
    options: Layout.Options;
}
namespace Layout {
    export interface Options {
        id?: string;
        rowClassName: string;
        columnClassName: string;
        rows: Array<Row.Options>;
    }
}

export default Layout;