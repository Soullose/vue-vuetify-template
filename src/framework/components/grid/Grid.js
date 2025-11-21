/* eslint-disable no-unused-vars */
import '@ag-grid-community/styles/ag-grid.min.css';
import '@ag-grid-community/styles/ag-theme-material.min.css';
// import { ModuleRegistry, createGrid } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { AgGridVue } from '@ag-grid-community/vue';

import GridCellBoolRender from './GridCellBoolRender';
import GridCellLineNumRender from './GridCellLineNumRender';
import GridCellRender from './GridCellRender';

import GridCellInlineEditor from './GridCellInlineEditor';
import GridCellPopEditor from './GridCellPopEditor';

// eslint-disable-next-line no-unused-vars
import _, { camelCase, clone, defer, isFunction, isNil, map, transform, uniqueId } from 'lodash';
const COLUMN_FIELD_PARSERS = {
  flex: (columnDef, value, name) => (columnDef[name] = value === '' ? 1 : value),
  default: (columnDef, value, name) => (columnDef[name] = value)
};

function parseColumn(column) {
  // 统一名称
  var attrs = transform(
    column.data.attrs,
    (attrs, value, name) => {
      attrs[camelCase(name)] = value;
    },
    {}
  );

  // 处理
  var columnDef = _.transform(attrs, (columnDef, value, name) => {
    COLUMN_FIELD_PARSERS[name] !== undefined ? COLUMN_FIELD_PARSERS[name](columnDef, value, name) : COLUMN_FIELD_PARSERS.default(columnDef, value, name);
  });

  return columnDef;
}

export default {
  props: {
    dm: { type: Object, require: true },
    rowSelectable: { type: [Function, Boolean], default: true }
  },

  components: {
    GridCellRender,
    GridCellBoolRender,
    GridCellLineNumRender,
    GridCellInlineEditor,
    GridCellPopEditor
  },

  data() {
    var vm = this;

    return {
      cellediting: false,

      transaction: {
        add: [],
        remove: [],
        update: []
      },

      needSetRowData: false, // 是否需要重新设置数据

      columnDefs: [],
      modules: [ClientSideRowModelModule],
      gridOptions: {
        // context: this, // 将 AgGrid 的上下文指向 Vue 控件
        rowModelType: 'clientSide', // 'clientSide', 'infinite', 'viewport', 'serverSide'
        pagination: true, // 分页
        singleClickEdit: false, // 单击开始编辑
        suppressRowDeselection: true, // 禁用单击行取消选择,
        headerHeight: 40,
        rowHeight: 40,
        animateRows: true, // 行动画
        readOnlyEdit: true, // 只读编辑
        stopEditingWhenCellsLoseFocus: false, // 表格失去焦点，自动停止编辑
        rowSelection: 'multiple', // single: 单行选择; multiple: 多行选择
        isRowSelectable: function ({ data }) {
          return isFunction(vm.rowSelectable) ? vm.rowSelectable(data) : vm.rowSelectable;
        }, // 是否行可选

        // groupDefaultExpanded: 1, // 分组行自动展开，-1表示全部展开, 其他表示展开到第几层
        // groupDisplayType: "custom", // 组的显示形式，custom: 自定义, singleColumn
        // groupDisplayType: "groupRows",
        // rowGroupPanelShow: true,
        // sideBar: true, // 显示右侧面板
        getRowId: function (params) {
          return params.data[this.idField];
        }.bind(this),
        // treeData: false, // 显示树
        // getDataPath: _vm.getDataPath,
        // localeText: Object.freeze(ZH_CN),
        defaultColDef: {
          // type: ['string'], ?colType
          // defaultWidth: 40,
          // minWidth: 32,
          width: 120,
          headerName: 'Header Name',
          editable: false,
          sortable: false,
          resizable: true,
          filter: false
          // enableRowGroup: true,
        },
        // icons: ICONS,
        columnTypes: {
          lineNum: {
            headerName: 'No',
            width: 64,
            cellRenderer: 'GridCellLineNumRender',
            sortable: false,
            filter: false,
            editable: false
          },
          checkbox: {
            headerName: '',
            width: 72,
            checkboxSelection: true,
            headerCheckboxSelection: true,
            resizable: false,
            suppressMovable: true,
            pinned: 'left'
          },
          action: {
            width: 64,
            headerName: '',
            suppressMovable: true,
            pinned: 'right'
          },

          bool: {
            width: 80,
            cellRenderer: 'GridCellBoolRender'
          }
        },
        // autoGroupColumnDef: {
        //   width: 360,
        //   headerName: "分组",
        // },

        onGridReady(e) {
          vm.handleGridReady(e);
        },

        onRowDataUpdated({ api }) {
          var idField = vm.idField;

          // var row = _.first(this.rowData);
          // _.isNil(row) || api.getRowNode(row[idField]).setSelected(true);
        },

        onRowSelected({ api, node }) {
          vm.$emit('row-selected', {
            row: node.data,
            selected: node.selected
          });

          // console.log(node.rowIndex);
        },

        onSelectionChanged({ api }) {
          var selectedRows = api.getSelectedRows();
          vm.$emit('selection-changed', selectedRows);
        },

        onCellEditRequest(e) {
          vm.cellediting = true;
          const row = e.data;
          const field = e.colDef.field;
          const newValue = e.newValue;

          var t = {};
          t[field] = newValue;
          t.groupName = uniqueId('XXX_');
          vm.dm.update(row, t);
          e.node.setData(row);
          vm.cellediting = false;
          return true;
        }
      }
    };
  },

  computed: {
    needApplyTransaction() {
      return this.transaction.add.length !== 0 || this.transaction.remove.length !== 0 || this.transaction.update.length !== 0;
    },

    idField() {
      return 'id';
    }
  },

  created() {
    // 绑定数据模型事件

    // init columns
    this.columnDefs = map(this.$slots.default, (column) => {
      //
      var columnDef = parseColumn(column);

      if (!isNil(column.data.scopedSlots)) {
        var scopedSlots = column.data.scopedSlots;
        if (!isNil(scopedSlots.render)) {
          columnDef.cellRenderer = 'GridCellRender';
          columnDef.cellRendererParams = {
            slot: scopedSlots.render
          };
        }

        if (!isNil(scopedSlots.editor)) {
          columnDef.cellEditor = 'GridCellInlineEditor';
          columnDef.cellEditorParams = { slot: scopedSlots.editor };
        }

        console.log(scopedSlots);
        if (!isNil(scopedSlots['pop-editor'])) {
          columnDef.cellEditor = 'GridCellPopEditor';
          columnDef.cellEditorParams = { slot: scopedSlots['pop-editor'] };
        }
      }

      return columnDef;
    });
  },

  destroyed() {
    this.dm.off('rows-changed', this.handleModelRowsChanged);
    this.dm.off('row-added', this.handleModelRowAdded);
    this.dm.off('row-removed', this.handleModelRowRemoved);
    this.dm.off('row-updated', this.handleModelRowUpdated);
  },

  render() {
    var vm = this;

    console.debug('grid render');

    return <AgGridVue class="ag-theme-material" gridOptions={vm.gridOptions} columnDefs={vm.columnDefs} modules={vm.modules} />;
  },

  methods: {
    handleGridReady(grid) {
      this.$grid = grid;
      this.$grid.api.setGridOption('rowData', this.dm.rows);

      this.selectFirstDisplayRow();

      this.dm.on('rows-changed', this.handleModelRowsChanged);
      this.dm.on('row-added', this.handleModelRowAdded);
      this.dm.on('row-removed', this.handleModelRowRemoved);
      this.dm.on('row-updated', this.handleModelRowUpdated);

      this.$emit('ready'); // grid-ready
    },

    selectNextDisplayRow(rowIndex) {
      const rowCount = this.$grid.api.getDisplayedRowCount();
      rowIndex = rowIndex >= rowCount ? rowCount - 1 : rowIndex;

      var rowNode = undefined;

      while (rowIndex >= 0) {
        rowNode = this.$grid.api.getDisplayedRowAtIndex(rowIndex);

        if (rowNode.selectable === true) {
          break;
        }
        rowIndex--;
      }

      isNil(rowNode) || rowNode.setSelected(true, true);
    },

    selectFirstDisplayRow() {
      var index = this.$grid.api.getFirstDisplayedRow();
      var rowNode = this.$grid.api.getDisplayedRowAtIndex(index);
      isNil(rowNode) || rowNode.setSelected(true, true);
    },

    handleModelRowsChanged() {
      this.needSetRowData = true;
    },

    handleModelRowAdded(row) {
      this.transaction.add.push(row);
    },

    handleModelRowRemoved(row) {
      this.transaction.remove.push(row);
    },

    handleModelRowUpdated(row) {
      if (!this.cellediting) {
        this.transaction.update.push(row);
      } else {
        // 单元格编辑引起的修改，需立即更新
        // this.$grid.api.applyTransaction({ update: [row] });
        // this.cellediting = false;
      }
    }
  },

  watch: {
    needApplyTransaction(newValue) {
      if (newValue) {
        defer(() => {
          console.debug('grid apply transaction: ', clone(this.transaction));

          var row = this.transaction.remove[0];
          var rowIndex = -1;
          if (!isNil(row)) {
            var rowNode = this.$grid.api.getRowNode(row[this.idField]);
            rowIndex = rowNode.rowIndex;
          }

          this.$grid.api.applyTransactionAsync(this.transaction, () => {
            this.selectNextDisplayRow(rowIndex);
          });

          this.transaction = {
            add: [],
            remove: [],
            update: []
          };
        });
      }
    },

    needSetRowData(newValue) {
      if (newValue) {
        defer(() => {
          this.needSetRowData = false;

          console.debug('grid refresh row data');
          this.$grid.api.setGridOption('rowData', this.dm.rows);
          this.selectFirstDisplayRow();
        });
      }
    }
  }
};
