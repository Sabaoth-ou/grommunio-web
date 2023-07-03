/*
This file is part of Ext JS 3.4

Copyright (c) 2011-2013 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as
published by the Free Software Foundation and appearing in the file LICENSE included in the
packaging of this file.

Please review the following information to ensure the GNU General Public License version 3.0
requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department
at http://www.sencha.com/contact.

Build date: 2013-04-03 15:07:25
*/
Ext.ns("Ext.ux.grid");
Ext.ux.grid.BufferView = Ext.extend(Ext.grid.GridView, {
  rowHeight: 19,
  borderHeight: 2,
  scrollDelay: 100,
  cacheSize: 20,
  cleanDelay: 500,
  initTemplates: function () {
    Ext.ux.grid.BufferView.superclass.initTemplates.call(this);
    var a = this.templates;
    a.rowHolder = new Ext.Template(
      '<div class="x-grid3-row {alt}" style="{tstyle}"></div>'
    );
    a.rowHolder.disableFormats = true;
    a.rowHolder.compile();
    a.rowBody = new Ext.Template(
      '<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
      "<tbody><tr>{cells}</tr>",
      this.enableRowBody
        ? '<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>'
        : "",
      "</tbody></table>"
    );
    a.rowBody.disableFormats = true;
    a.rowBody.compile();
  },
  getStyleRowHeight: function () {
    return Ext.isBorderBox
      ? this.rowHeight + this.borderHeight
      : this.rowHeight;
  },
  getCalculatedRowHeight: function () {
    return this.rowHeight + this.borderHeight;
  },
  getVisibleRowCount: function () {
    var b = this.getCalculatedRowHeight(),
      a = this.scroller.dom.clientHeight;
    return a < 1 ? 0 : Math.ceil(a / b);
  },
  getVisibleRows: function () {
    var a = this.getVisibleRowCount(),
      b = this.scroller.dom.scrollTop,
      c = b === 0 ? 0 : Math.floor(b / this.getCalculatedRowHeight()) - 1;
    return {
      first: Math.max(c, 0),
      last: Math.min(c + a + 2, this.ds.getCount() - 1),
    };
  },
  doRender: function (g, k, u, a, s, A, l) {
    var b = this.templates,
      f = b.cell,
      h = b.row,
      x = b.rowBody,
      n = s - 1,
      t = this.getStyleRowHeight(),
      z = this.getVisibleRows(),
      d = "width:" + this.getTotalWidth() + ";height:" + t + "px;",
      D = [],
      w,
      E,
      v = {},
      m = { tstyle: d },
      q;
    for (var y = 0, C = k.length; y < C; y++) {
      q = k[y];
      w = [];
      var o = y + a,
        e = o >= z.first && o <= z.last;
      if (e) {
        for (var B = 0; B < s; B++) {
          E = g[B];
          v.id = E.id;
          v.css =
            B === 0
              ? "x-grid3-cell-first "
              : B == n
              ? "x-grid3-cell-last "
              : "";
          v.attr = v.cellAttr = "";
          v.value = E.renderer(q.data[E.name], v, q, o, B, u);
          v.style = E.style;
          if (v.value === undefined || v.value === "") {
            v.value = "&#160;";
          }
          if (q.dirty && typeof q.modified[E.name] !== "undefined") {
            v.css += " x-grid3-dirty-cell";
          }
          w[w.length] = f.apply(v);
        }
      }
      var F = [];
      if (A && (o + 1) % 2 === 0) {
        F[0] = "x-grid3-row-alt";
      }
      if (q.dirty) {
        F[1] = " x-grid3-dirty-row";
      }
      m.cols = s;
      if (this.getRowClass) {
        F[2] = this.getRowClass(q, o, m, u);
      }
      m.alt = F.join(" ");
      m.cells = w.join("");
      D[D.length] = !e ? b.rowHolder.apply(m) : l ? x.apply(m) : h.apply(m);
    }
    return D.join("");
  },
  isRowRendered: function (a) {
    var b = this.getRow(a);
    return b && b.childNodes.length > 0;
  },
  syncScroll: function () {
    Ext.ux.grid.BufferView.superclass.syncScroll.apply(this, arguments);
    this.update();
  },
  update: function () {
    if (this.scrollDelay) {
      if (!this.renderTask) {
        this.renderTask = new Ext.util.DelayedTask(this.doUpdate, this);
      }
      this.renderTask.delay(this.scrollDelay);
    } else {
      this.doUpdate();
    }
  },
  onRemove: function (d, a, b, c) {
    Ext.ux.grid.BufferView.superclass.onRemove.apply(this, arguments);
    if (c !== true) {
      this.update();
    }
  },
  doUpdate: function () {
    if (this.getVisibleRowCount() > 0) {
      var f = this.grid,
        b = f.colModel,
        h = f.store,
        e = this.getColumnData(),
        a = this.getVisibleRows(),
        j;
      for (var d = a.first; d <= a.last; d++) {
        if (!this.isRowRendered(d) && (j = this.getRow(d))) {
          var c = this.doRender(
            e,
            [h.getAt(d)],
            h,
            d,
            b.getColumnCount(),
            f.stripeRows,
            true
          );
          j.innerHTML = c;
        }
      }
      this.clean();
    }
  },
  clean: function () {
    if (!this.cleanTask) {
      this.cleanTask = new Ext.util.DelayedTask(this.doClean, this);
    }
    this.cleanTask.delay(this.cleanDelay);
  },
  doClean: function () {
    if (this.getVisibleRowCount() > 0) {
      var b = this.getVisibleRows();
      b.first -= this.cacheSize;
      b.last += this.cacheSize;
      var c = 0,
        d = this.getRows();
      if (b.first <= 0) {
        c = b.last + 1;
      }
      for (var a = this.ds.getCount(); c < a; c++) {
        if ((c < b.first || c > b.last) && d[c].innerHTML) {
          d[c].innerHTML = "";
        }
      }
    }
  },
  removeTask: function (b) {
    var a = this[b];
    if (a && a.cancel) {
      a.cancel();
      this[b] = null;
    }
  },
  destroy: function () {
    this.removeTask("cleanTask");
    this.removeTask("renderTask");
    Ext.ux.grid.BufferView.superclass.destroy.call(this);
  },
  layout: function () {
    Ext.ux.grid.BufferView.superclass.layout.call(this);
    this.update();
  },
});
Ext.ns("Ext.ux.layout");
Ext.ux.layout.CenterLayout = Ext.extend(Ext.layout.FitLayout, {
  setItemSize: function (b, a) {
    this.container.addClass("ux-layout-center");
    b.addClass("ux-layout-center-item");
    if (b && a.height > 0) {
      if (b.width) {
        a.width = b.width;
      }
      b.setSize(a);
    }
  },
});
Ext.Container.LAYOUTS["ux.center"] = Ext.ux.layout.CenterLayout;
Ext.ns("Ext.ux.grid");
Ext.ux.grid.CheckColumn = Ext.extend(Ext.grid.Column, {
  processEvent: function (c, f, d, g, b) {
    if (c == "mousedown") {
      var a = d.store.getAt(g);
      a.set(this.dataIndex, !a.data[this.dataIndex]);
      return false;
    } else {
      return Ext.grid.ActionColumn.superclass.processEvent.apply(
        this,
        arguments
      );
    }
  },
  renderer: function (b, c, a) {
    c.css += " x-grid3-check-col-td";
    return String.format(
      '<div class="x-grid3-check-col{0}">&#160;</div>',
      b ? "-on" : ""
    );
  },
  init: Ext.emptyFn,
});
Ext.preg("checkcolumn", Ext.ux.grid.CheckColumn);
Ext.grid.CheckColumn = Ext.ux.grid.CheckColumn;
Ext.grid.Column.types.checkcolumn = Ext.ux.grid.CheckColumn;
Ext.ns("Ext.ux.grid");
Ext.ux.grid.ColumnHeaderGroup = Ext.extend(Ext.util.Observable, {
  constructor: function (a) {
    this.config = a;
  },
  init: function (a) {
    Ext.applyIf(a.colModel, this.config);
    Ext.apply(a.getView(), this.viewConfig);
  },
  viewConfig: {
    initTemplates: function () {
      this.constructor.prototype.initTemplates.apply(this, arguments);
      var a = this.templates || {};
      if (!a.gcell) {
        a.gcell = new Ext.XTemplate(
          '<td class="x-grid3-hd x-grid3-gcell x-grid3-td-{id} ux-grid-hd-group-row-{row} {cls}" style="{style}">',
          '<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',
          this.grid.enableHdMenu
            ? '<a class="x-grid3-hd-btn" href="#"></a>'
            : "",
          "{value}</div></td>"
        );
      }
      this.templates = a;
      this.hrowRe = new RegExp("ux-grid-hd-group-row-(\\d+)", "");
    },
    renderHeaders: function () {
      var h = this.templates,
        d = [],
        l = this.cm,
        p = l.rows,
        j = "width:" + this.getTotalWidth() + ";";
      for (var o = 0, k = p.length; o < k; o++) {
        var a = p[o],
          n = [];
        for (var f = 0, e = 0, g = a.length; f < g; f++) {
          var m = a[f];
          m.colspan = m.colspan || 1;
          var b = this.getColumnId(
              m.dataIndex ? l.findColumnIndex(m.dataIndex) : e
            ),
            c = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupStyle.call(
              this,
              m,
              e
            );
          n[f] = h.gcell.apply({
            cls: "ux-grid-hd-group-cell",
            id: b,
            row: o,
            style:
              "width:" +
              c.width +
              ";" +
              (c.hidden ? "display:none;" : "") +
              (m.align ? "text-align:" + m.align + ";" : ""),
            tooltip: m.tooltip
              ? (Ext.QuickTips.isEnabled() ? "ext:qtip" : "title") +
                '="' +
                m.tooltip +
                '"'
              : "",
            istyle: m.align == "right" ? "padding-right:16px" : "",
            btn: this.grid.enableHdMenu && m.header,
            value: m.header || "&nbsp;",
          });
          e += m.colspan;
        }
        d[o] = h.header.apply({ tstyle: j, cells: n.join("") });
      }
      d.push(this.constructor.prototype.renderHeaders.apply(this, arguments));
      return d.join("");
    },
    onColumnWidthUpdated: function () {
      this.constructor.prototype.onColumnWidthUpdated.apply(this, arguments);
      Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this);
    },
    onAllColumnWidthsUpdated: function () {
      this.constructor.prototype.onAllColumnWidthsUpdated.apply(
        this,
        arguments
      );
      Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this);
    },
    onColumnHiddenUpdated: function () {
      this.constructor.prototype.onColumnHiddenUpdated.apply(this, arguments);
      Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this);
    },
    getHeaderCell: function (a) {
      return this.mainHd.query(this.cellSelector)[a];
    },
    findHeaderCell: function (a) {
      return a
        ? this.fly(a).findParent("td.x-grid3-hd", this.cellSelectorDepth)
        : false;
    },
    findHeaderIndex: function (b) {
      var a = this.findHeaderCell(b);
      return a ? this.getCellIndex(a) : false;
    },
    updateSortIcon: function (b, a) {
      var d = this.sortClasses,
        c = this.mainHd.select(this.cellSelector).removeClass(d);
      c.item(b).addClass(d[a == "DESC" ? 1 : 0]);
    },
    handleHdDown: function (h, d) {
      var f = Ext.get(d);
      if (f.hasClass("x-grid3-hd-btn")) {
        h.stopEvent();
        var g = this.findHeaderCell(d);
        Ext.fly(g).addClass("x-grid3-hd-menu-open");
        var c = this.getCellIndex(g);
        this.hdCtxIndex = c;
        var b = this.hmenu.items,
          a = this.cm;
        b.get("asc").setDisabled(!a.isSortable(c));
        b.get("desc").setDisabled(!a.isSortable(c));
        this.hmenu.on(
          "hide",
          function () {
            Ext.fly(g).removeClass("x-grid3-hd-menu-open");
          },
          this,
          { single: true }
        );
        this.hmenu.show(d, "tl-bl?");
      } else {
        if (
          f.hasClass("ux-grid-hd-group-cell") ||
          Ext.fly(d).up(".ux-grid-hd-group-cell")
        ) {
          h.stopEvent();
        }
      }
    },
    handleHdMove: function (h, d) {
      var g = this.findHeaderCell(this.activeHdRef);
      if (
        g &&
        !this.headersDisabled &&
        !Ext.fly(g).hasClass("ux-grid-hd-group-cell")
      ) {
        var b = this.splitHandleWidth || 5,
          f = this.activeHdRegion,
          a = h.getPageX(),
          c = g.style,
          j = "";
        if (this.grid.enableColumnResize !== false) {
          if (a - f.left <= b && this.cm.isResizable(this.activeHdIndex - 1)) {
            j = Ext.isAir ? "move" : Ext.isWebKit ? "e-resize" : "col-resize";
          } else {
            if (
              f.right - a <= (!this.activeHdBtn ? b : 2) &&
              this.cm.isResizable(this.activeHdIndex)
            ) {
              j = Ext.isAir ? "move" : Ext.isWebKit ? "w-resize" : "col-resize";
            }
          }
        }
        c.cursor = j;
      }
    },
    handleHdOver: function (d, a) {
      var c = this.findHeaderCell(a);
      if (c && !this.headersDisabled) {
        this.activeHdRef = a;
        this.activeHdIndex = this.getCellIndex(c);
        var b = this.fly(c);
        this.activeHdRegion = b.getRegion();
        if (
          !(
            this.cm.isMenuDisabled(this.activeHdIndex) ||
            b.hasClass("ux-grid-hd-group-cell")
          )
        ) {
          b.addClass("x-grid3-hd-over");
          this.activeHdBtn = b.child(".x-grid3-hd-btn");
          if (this.activeHdBtn) {
            this.activeHdBtn.dom.style.height =
              c.firstChild.offsetHeight - 1 + "px";
          }
        }
      }
    },
    handleHdOut: function (c, a) {
      var b = this.findHeaderCell(a);
      if (b && (!Ext.isIE || !c.within(b, true))) {
        this.activeHdRef = null;
        this.fly(b).removeClass("x-grid3-hd-over");
        b.style.cursor = "";
      }
    },
    handleHdMenuClick: function (q) {
      var l = this.hdCtxIndex,
        o = this.cm,
        d = this.ds,
        b = q.getItemId();
      switch (b) {
        case "asc":
          d.sort(o.getDataIndex(l), "ASC");
          break;
        case "desc":
          d.sort(o.getDataIndex(l), "DESC");
          break;
        default:
          if (b.substr(0, 6) == "group-") {
            var h = b.split("-"),
              s = parseInt(h[1], 10),
              e = parseInt(h[2], 10),
              a = this.cm.rows[s],
              p,
              f = 0;
            for (var h = 0, k = a.length; h < k; h++) {
              p = a[h];
              if (e >= f && e < f + p.colspan) {
                break;
              }
              f += p.colspan;
            }
            if (q.checked) {
              var m = o.getColumnsBy(this.isHideableColumn, this).length;
              for (var h = f, k = f + p.colspan; h < k; h++) {
                if (!o.isHidden(h)) {
                  m--;
                }
              }
              if (m < 1) {
                this.onDenyColumnHide();
                return false;
              }
            }
            for (var h = f, k = f + p.colspan; h < k; h++) {
              if (
                o.config[h].fixed !== true &&
                o.config[h].hideable !== false
              ) {
                o.setHidden(h, q.checked);
              }
            }
          } else {
            if (b.substr(0, 4) == "col-") {
              l = o.getIndexById(b.substr(4));
              if (l != -1) {
                if (
                  q.checked &&
                  o.getColumnsBy(this.isHideableColumn, this).length <= 1
                ) {
                  this.onDenyColumnHide();
                  return false;
                }
                o.setHidden(l, q.checked);
              }
            }
          }
          if (b.substr(0, 6) == "group-" || b.substr(0, 4) == "col-") {
            q.checked = !q.checked;
            if (q.menu) {
              var j = function (r) {
                r.items.each(function (t) {
                  if (!t.disabled) {
                    t.setChecked(q.checked, false);
                    if (t.menu) {
                      j(t.menu);
                    }
                  }
                });
              };
              j(q.menu);
            }
            var g = q,
              c;
            while ((g = g.parentMenu)) {
              if (
                !g.parentMenu ||
                !(c = g.parentMenu.items.get(g.getItemId())) ||
                !c.setChecked
              ) {
                break;
              }
              var n =
                g.items.findIndexBy(function (r) {
                  return r.checked;
                }) >= 0;
              c.setChecked(n, true);
            }
            q.checked = !q.checked;
          }
      }
      return true;
    },
    beforeColMenuShow: function () {
      var h = this.cm,
        j = this.cm.rows;
      this.colMenu.removeAll();
      for (var d = 0, m = h.getColumnCount(); d < m; d++) {
        var a = this.colMenu,
          x = h.getColumnHeader(d),
          l = [];
        if (h.config[d].fixed !== true && h.config[d].hideable !== false) {
          for (var e = 0, s = j.length; e < s; e++) {
            var n = j[e],
              g,
              p = 0;
            for (var t = 0, u = n.length; t < u; t++) {
              g = n[t];
              if (d >= p && d < p + g.colspan) {
                break;
              }
              p += g.colspan;
            }
            if (g && g.header) {
              if (h.hierarchicalColMenu) {
                var o = "group-" + e + "-" + p,
                  v = a.items ? a.getComponent(o) : null,
                  k = v ? v.menu : null;
                if (!k) {
                  k = new Ext.menu.Menu({ itemId: o });
                  k.on("itemclick", this.handleHdMenuClick, this);
                  var f = false,
                    b = true;
                  for (var w = p, q = p + g.colspan; w < q; w++) {
                    if (!h.isHidden(w)) {
                      f = true;
                    }
                    if (h.config[w].hideable !== false) {
                      b = false;
                    }
                  }
                  a.add({
                    itemId: o,
                    text: g.header,
                    menu: k,
                    hideOnClick: false,
                    checked: f,
                    disabled: b,
                  });
                }
                a = k;
              } else {
                l.push(g.header);
              }
            }
          }
          l.push(x);
          a.add(
            new Ext.menu.CheckItem({
              itemId: "col-" + h.getColumnId(d),
              text: l.join(" "),
              checked: !h.isHidden(d),
              hideOnClick: false,
              disabled: h.config[d].hideable === false,
            })
          );
        }
      }
    },
    afterRenderUI: function () {
      this.constructor.prototype.afterRenderUI.apply(this, arguments);
      Ext.apply(
        this.columnDrop,
        Ext.ux.grid.ColumnHeaderGroup.prototype.columnDropConfig
      );
      Ext.apply(
        this.splitZone,
        Ext.ux.grid.ColumnHeaderGroup.prototype.splitZoneConfig
      );
    },
  },
  splitZoneConfig: {
    allowHeaderDrag: function (a) {
      return !a.getTarget(null, null, true).hasClass("ux-grid-hd-group-cell");
    },
  },
  columnDropConfig: {
    getTargetFromEvent: function (b) {
      var a = Ext.lib.Event.getTarget(b);
      return this.view.findHeaderCell(a);
    },
    positionIndicator: function (b, f, d) {
      var c = Ext.ux.grid.ColumnHeaderGroup.prototype.getDragDropData.call(
        this,
        b,
        f,
        d
      );
      if (c === false) {
        return false;
      }
      var a = c.px + this.proxyOffsets[0];
      this.proxyTop.setLeftTop(a, c.r.top + this.proxyOffsets[1]);
      this.proxyTop.show();
      this.proxyBottom.setLeftTop(a, c.r.bottom);
      this.proxyBottom.show();
      return c.pt;
    },
    onNodeDrop: function (o, A, v, C) {
      var u = C.header;
      if (u != o) {
        var x = Ext.ux.grid.ColumnHeaderGroup.prototype.getDragDropData.call(
          this,
          u,
          o,
          v
        );
        if (x === false) {
          return false;
        }
        var j = this.grid.colModel,
          z = x.oldIndex < x.newIndex,
          k = j.rows;
        for (var f = x.row, p = k.length; f < p; f++) {
          var l = k[f],
            t = l.length,
            B = 0,
            q = 1,
            D = t;
          for (var s = 0, m = 0; s < t; s++) {
            var g = l[s];
            if (x.oldIndex >= m && x.oldIndex < m + g.colspan) {
              B = s;
            }
            if (
              x.oldIndex + x.colspan - 1 >= m &&
              x.oldIndex + x.colspan - 1 < m + g.colspan
            ) {
              q = s - B + 1;
            }
            if (x.newIndex >= m && x.newIndex < m + g.colspan) {
              D = s;
            }
            m += g.colspan;
          }
          var w = l.splice(B, q);
          k[f] = l
            .splice(0, D - (z ? q : 0))
            .concat(w)
            .concat(l);
        }
        for (var y = 0; y < x.colspan; y++) {
          var b = x.oldIndex + (z ? 0 : y),
            a = x.newIndex + (z ? -1 : y);
          j.moveColumn(b, a);
          this.grid.fireEvent("columnmove", b, a);
        }
        return true;
      }
      return false;
    },
  },
  getGroupStyle: function (g, c) {
    var e = 0,
      f = true;
    for (var d = c, a = c + g.colspan; d < a; d++) {
      if (!this.cm.isHidden(d)) {
        var b = this.cm.getColumnWidth(d);
        if (typeof b == "number") {
          e += b;
        }
        f = false;
      }
    }
    return {
      width:
        (Ext.isBorderBox || (Ext.isWebKit && !Ext.isSafari2)
          ? e
          : Math.max(e - this.borderWidth, 0)) + "px",
      hidden: f,
    };
  },
  updateGroupStyles: function (b) {
    var g = this.mainHd.query(".x-grid3-header-offset > table"),
      e = this.getTotalWidth(),
      k = this.cm.rows;
    for (var j = 0; j < g.length; j++) {
      g[j].style.width = e;
      if (j < k.length) {
        var h = g[j].firstChild.firstChild.childNodes;
        for (var d = 0, c = 0; d < h.length; d++) {
          var f = k[j][d];
          if (typeof b != "number" || (b >= c && b < c + f.colspan)) {
            var a = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupStyle.call(
              this,
              f,
              c
            );
            h[d].style.width = a.width;
            h[d].style.display = a.hidden ? "none" : "";
          }
          c += f.colspan;
        }
      }
    }
  },
  getGroupRowIndex: function (b) {
    if (b) {
      var a = b.className.match(this.hrowRe);
      if (a && a[1]) {
        return parseInt(a[1], 10);
      }
    }
    return this.cm.rows.length;
  },
  getGroupSpan: function (g, c) {
    if (g < 0) {
      return { col: 0, colspan: this.cm.getColumnCount() };
    }
    var e = this.cm.rows[g];
    if (e) {
      for (var d = 0, b = 0, a = e.length; d < a; d++) {
        var f = e[d];
        if (c >= b && c < b + f.colspan) {
          return { col: b, colspan: f.colspan };
        }
        b += f.colspan;
      }
      return { col: b, colspan: 0 };
    }
    return { col: c, colspan: 1 };
  },
  getDragDropData: function (f, d, g) {
    if (f.parentNode != d.parentNode) {
      return false;
    }
    var o = this.grid.colModel,
      l = Ext.lib.Event.getPageX(g),
      a = Ext.lib.Dom.getRegion(d.firstChild),
      m,
      s;
    if (a.right - l <= (a.right - a.left) / 2) {
      m = a.right + this.view.borderWidth;
      s = "after";
    } else {
      m = a.left;
      s = "before";
    }
    var k = this.view.getCellIndex(f),
      p = this.view.getCellIndex(d);
    if (o.isFixed(p)) {
      return false;
    }
    var q = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupRowIndex.call(
        this.view,
        f
      ),
      b = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(
        this.view,
        q,
        k
      ),
      c = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(
        this.view,
        q,
        p
      ),
      k = b.col;
    p = c.col + (s == "after" ? c.colspan : 0);
    if (p >= b.col && p <= b.col + b.colspan) {
      return false;
    }
    var j = Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(
      this.view,
      q - 1,
      k
    );
    if (p < j.col || p > j.col + j.colspan) {
      return false;
    }
    return {
      r: a,
      px: m,
      pt: s,
      row: q,
      oldIndex: k,
      newIndex: p,
      colspan: b.colspan,
    };
  },
});
Ext.ns("Ext.ux.tree");
Ext.ux.tree.ColumnTree = Ext.extend(Ext.tree.TreePanel, {
  lines: false,
  borderWidth: Ext.isBorderBox ? 0 : 2,
  cls: "x-column-tree",
  onRender: function () {
    Ext.tree.ColumnTree.superclass.onRender.apply(this, arguments);
    this.headers = this.header.createChild({ cls: "x-tree-headers" });
    var f = this.columns,
      g;
    var b = 0;
    var d = 19;
    for (var e = 0, a = f.length; e < a; e++) {
      g = f[e];
      b += g.width;
      this.headers.createChild({
        cls: "x-tree-hd " + (g.cls ? g.cls + "-hd" : ""),
        cn: { cls: "x-tree-hd-text", html: g.header },
        style: "width:" + (g.width - this.borderWidth) + "px;",
      });
    }
    this.headers.createChild({ cls: "x-clear" });
    this.headers.setWidth(b + d);
    this.innerCt.setWidth(b);
  },
});
Ext.reg("columntree", Ext.ux.tree.ColumnTree);
Ext.tree.ColumnTree = Ext.ux.tree.ColumnTree;
Ext.ux.tree.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
  focus: Ext.emptyFn,
  renderElements: function (d, m, h, o) {
    this.indentMarkup = d.parentNode ? d.parentNode.ui.getChildIndent() : "";
    var p = d.getOwnerTree();
    var l = p.columns;
    var k = p.borderWidth;
    var j = l[0];
    var b = [
      '<li class="x-tree-node"><div ext:tree-node-id="',
      d.id,
      '" class="x-tree-node-el x-tree-node-leaf ',
      m.cls,
      '">',
      '<div class="x-tree-col" style="width:',
      j.width - k,
      'px;">',
      '<span class="x-tree-node-indent">',
      this.indentMarkup,
      "</span>",
      '<img src="',
      this.emptyIcon,
      '" class="x-tree-ec-icon x-tree-elbow">',
      '<img src="',
      m.icon || this.emptyIcon,
      '" class="x-tree-node-icon',
      m.icon ? " x-tree-node-inline-icon" : "",
      m.iconCls ? " " + m.iconCls : "",
      '" unselectable="on">',
      '<a hidefocus="on" class="x-tree-node-anchor" href="',
      m.href ? m.href : "#",
      '" tabIndex="1" ',
      m.hrefTarget ? ' target="' + m.hrefTarget + '"' : "",
      ">",
      '<span unselectable="on">',
      d.text ||
        (j.renderer ? j.renderer(m[j.dataIndex], d, m) : m[j.dataIndex]),
      "</span></a>",
      "</div>",
    ];
    for (var e = 1, g = l.length; e < g; e++) {
      j = l[e];
      b.push(
        '<div class="x-tree-col ',
        j.cls ? j.cls : "",
        '" style="width:',
        j.width - k,
        'px;">',
        '<div class="x-tree-col-text">',
        j.renderer ? j.renderer(m[j.dataIndex], d, m) : m[j.dataIndex],
        "</div>",
        "</div>"
      );
    }
    b.push(
      '<div class="x-clear"></div></div>',
      '<ul class="x-tree-node-ct" style="display:none;"></ul>',
      "</li>"
    );
    if (o !== true && d.nextSibling && d.nextSibling.ui.getEl()) {
      this.wrap = Ext.DomHelper.insertHtml(
        "beforeBegin",
        d.nextSibling.ui.getEl(),
        b.join("")
      );
    } else {
      this.wrap = Ext.DomHelper.insertHtml("beforeEnd", h, b.join(""));
    }
    this.elNode = this.wrap.childNodes[0];
    this.ctNode = this.wrap.childNodes[1];
    var f = this.elNode.firstChild.childNodes;
    this.indentNode = f[0];
    this.ecNode = f[1];
    this.iconNode = f[2];
    this.anchor = f[3];
    this.textNode = f[3].firstChild;
  },
});
Ext.tree.ColumnNodeUI = Ext.ux.tree.ColumnNodeUI;
Ext.DataView.LabelEditor = Ext.extend(Ext.Editor, {
  alignment: "tl-tl",
  hideEl: false,
  cls: "x-small-editor",
  shim: false,
  completeOnEnter: true,
  cancelOnEsc: true,
  labelSelector: "span.x-editable",
  constructor: function (a, b) {
    Ext.DataView.LabelEditor.superclass.constructor.call(
      this,
      b ||
        new Ext.form.TextField({
          allowBlank: false,
          growMin: 90,
          growMax: 240,
          grow: true,
          selectOnFocus: true,
        }),
      a
    );
  },
  init: function (a) {
    this.view = a;
    a.on("render", this.initEditor, this);
    this.on("complete", this.onSave, this);
  },
  initEditor: function () {
    this.view.on({
      scope: this,
      containerclick: this.doBlur,
      click: this.doBlur,
    });
    this.view
      .getEl()
      .on("mousedown", this.onMouseDown, this, {
        delegate: this.labelSelector,
      });
  },
  doBlur: function () {
    if (this.editing) {
      this.field.blur();
    }
  },
  onMouseDown: function (d, c) {
    if (!d.ctrlKey && !d.shiftKey) {
      var b = this.view.findItemFromChild(c);
      d.stopEvent();
      var a = this.view.store.getAt(this.view.indexOf(b));
      this.startEdit(c, a.data[this.dataIndex]);
      this.activeRecord = a;
    } else {
      d.preventDefault();
    }
  },
  onSave: function (a, b) {
    this.activeRecord.set(this.dataIndex, b);
  },
});
Ext.DataView.DragSelector = function (f) {
  f = f || {};
  var j, h, l;
  var d,
    k,
    m = new Ext.lib.Region(0, 0, 0, 0);
  var b = f.dragSafe === true;
  this.init = function (q) {
    j = q;
    j.on("render", p);
  };
  function n() {
    d = [];
    j.all.each(function (q) {
      d[d.length] = q.getRegion();
    });
    k = j.el.getRegion();
  }
  function e() {
    return false;
  }
  function g(q) {
    return !b || q.target == j.el.dom;
  }
  function o(q) {
    j.on("containerclick", e, j, { single: true });
    if (!h) {
      h = j.el.createChild({ cls: "x-view-selector" });
    } else {
      if (h.dom.parentNode !== j.el.dom) {
        j.el.dom.appendChild(h.dom);
      }
      h.setDisplayed("block");
    }
    n();
    j.clearSelections();
  }
  function c(z) {
    var A = l.startXY;
    var E = l.getXY();
    var C = Math.min(A[0], E[0]);
    var B = Math.min(A[1], E[1]);
    var D = Math.abs(A[0] - E[0]);
    var u = Math.abs(A[1] - E[1]);
    m.left = C;
    m.top = B;
    m.right = C + D;
    m.bottom = B + u;
    m.constrainTo(k);
    h.setRegion(m);
    for (var t = 0, v = d.length; t < v; t++) {
      var q = d[t],
        s = m.intersect(q);
      if (s && !q.selected) {
        q.selected = true;
        j.select(t, true);
      } else {
        if (!s && q.selected) {
          q.selected = false;
          j.deselect(t);
        }
      }
    }
  }
  function a(q) {
    if (!Ext.isIE) {
      j.un("containerclick", e, j);
    }
    if (h) {
      h.setDisplayed(false);
    }
  }
  function p(q) {
    l = new Ext.dd.DragTracker({
      onBeforeStart: g,
      onStart: o,
      onDrag: c,
      onEnd: a,
    });
    l.initEl(q.el);
  }
};
Ext.ns("Ext.ux.form");
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField, {
  buttonText: "Browse...",
  buttonOnly: false,
  buttonOffset: 3,
  readOnly: true,
  autoSize: Ext.emptyFn,
  initComponent: function () {
    Ext.ux.form.FileUploadField.superclass.initComponent.call(this);
    this.addEvents("fileselected");
  },
  onRender: function (c, a) {
    Ext.ux.form.FileUploadField.superclass.onRender.call(this, c, a);
    this.wrap = this.el.wrap({ cls: "x-form-field-wrap x-form-file-wrap" });
    this.el.addClass("x-form-file-text");
    this.el.dom.removeAttribute("name");
    this.createFileInput();
    var b = Ext.applyIf(this.buttonCfg || {}, { text: this.buttonText });
    this.button = new Ext.Button(
      Ext.apply(b, {
        renderTo: this.wrap,
        cls: "x-form-file-btn" + (b.iconCls ? " x-btn-icon" : ""),
      })
    );
    if (this.buttonOnly) {
      this.el.hide();
      this.wrap.setWidth(this.button.getEl().getWidth());
    }
    this.bindListeners();
    this.resizeEl = this.positionEl = this.wrap;
  },
  bindListeners: function () {
    this.fileInput.on({
      scope: this,
      mouseenter: function () {
        this.button.addClass(["x-btn-over", "x-btn-focus"]);
      },
      mouseleave: function () {
        this.button.removeClass(["x-btn-over", "x-btn-focus", "x-btn-click"]);
      },
      mousedown: function () {
        this.button.addClass("x-btn-click");
      },
      mouseup: function () {
        this.button.removeClass(["x-btn-over", "x-btn-focus", "x-btn-click"]);
      },
      change: function () {
        var a = this.fileInput.dom.value;
        this.setValue(a);
        this.fireEvent("fileselected", this, a);
      },
    });
  },
  createFileInput: function () {
    this.fileInput = this.wrap.createChild({
      id: this.getFileInputId(),
      name: this.name || this.getId(),
      cls: "x-form-file",
      tag: "input",
      type: "file",
      size: 1,
    });
  },
  reset: function () {
    if (this.rendered) {
      this.fileInput.remove();
      this.createFileInput();
      this.bindListeners();
    }
    Ext.ux.form.FileUploadField.superclass.reset.call(this);
  },
  getFileInputId: function () {
    return this.id + "-file";
  },
  onResize: function (a, b) {
    Ext.ux.form.FileUploadField.superclass.onResize.call(this, a, b);
    this.wrap.setWidth(a);
    if (!this.buttonOnly) {
      var a =
        this.wrap.getWidth() -
        this.button.getEl().getWidth() -
        this.buttonOffset;
      this.el.setWidth(a);
    }
  },
  onDestroy: function () {
    Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
    Ext.destroy(this.fileInput, this.button, this.wrap);
  },
  onDisable: function () {
    Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
    this.doDisable(true);
  },
  onEnable: function () {
    Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
    this.doDisable(false);
  },
  doDisable: function (a) {
    this.fileInput.dom.disabled = a;
    this.button.setDisabled(a);
  },
  preFocus: Ext.emptyFn,
  alignErrorIcon: function () {
    this.errorIcon.alignTo(this.wrap, "tl-tr", [2, 0]);
  },
});
Ext.reg("fileuploadfield", Ext.ux.form.FileUploadField);
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;
Ext.ux.GMapPanel = Ext.extend(Ext.Panel, {
  initComponent: function () {
    var a = {
      plain: true,
      zoomLevel: 3,
      yaw: 180,
      pitch: 0,
      zoom: 0,
      gmapType: "map",
      border: false,
    };
    Ext.applyIf(this, a);
    Ext.ux.GMapPanel.superclass.initComponent.call(this);
  },
  afterRender: function () {
    var b = this.ownerCt.getSize();
    Ext.applyIf(this, b);
    Ext.ux.GMapPanel.superclass.afterRender.call(this);
    if (this.gmapType === "map") {
      this.gmap = new GMap2(this.body.dom);
    }
    if (this.gmapType === "panorama") {
      this.gmap = new GStreetviewPanorama(this.body.dom);
    }
    if (typeof this.addControl == "object" && this.gmapType === "map") {
      this.gmap.addControl(this.addControl);
    }
    if (typeof this.setCenter === "object") {
      if (typeof this.setCenter.geoCodeAddr === "string") {
        this.geoCodeLookup(this.setCenter.geoCodeAddr);
      } else {
        if (this.gmapType === "map") {
          var a = new GLatLng(this.setCenter.lat, this.setCenter.lng);
          this.gmap.setCenter(a, this.zoomLevel);
        }
        if (
          typeof this.setCenter.marker === "object" &&
          typeof a === "object"
        ) {
          this.addMarker(a, this.setCenter.marker, this.setCenter.marker.clear);
        }
      }
      if (this.gmapType === "panorama") {
        this.gmap.setLocationAndPOV(
          new GLatLng(this.setCenter.lat, this.setCenter.lng),
          { yaw: this.yaw, pitch: this.pitch, zoom: this.zoom }
        );
      }
    }
    GEvent.bind(this.gmap, "load", this, function () {
      this.onMapReady();
    });
  },
  onMapReady: function () {
    this.addMarkers(this.markers);
    this.addMapControls();
    this.addOptions();
  },
  onResize: function (a, b) {
    if (typeof this.getMap() == "object") {
      this.gmap.checkResize();
    }
    Ext.ux.GMapPanel.superclass.onResize.call(this, a, b);
  },
  setSize: function (c, a, b) {
    if (typeof this.getMap() == "object") {
      this.gmap.checkResize();
    }
    Ext.ux.GMapPanel.superclass.setSize.call(this, c, a, b);
  },
  getMap: function () {
    return this.gmap;
  },
  getCenter: function () {
    return this.getMap().getCenter();
  },
  getCenterLatLng: function () {
    var a = this.getCenter();
    return { lat: a.lat(), lng: a.lng() };
  },
  addMarkers: function (c) {
    if (Ext.isArray(c)) {
      for (var b = 0; b < c.length; b++) {
        var a = new GLatLng(c[b].lat, c[b].lng);
        this.addMarker(a, c[b].marker, false, c[b].setCenter, c[b].listeners);
      }
    }
  },
  addMarker: function (c, d, b, a, e) {
    Ext.applyIf(d, G_DEFAULT_ICON);
    if (b === true) {
      this.getMap().clearOverlays();
    }
    if (a === true) {
      this.getMap().setCenter(c, this.zoomLevel);
    }
    var f = new GMarker(c, d);
    if (typeof e === "object") {
      for (evt in e) {
        GEvent.bind(f, evt, this, e[evt]);
      }
    }
    this.getMap().addOverlay(f);
  },
  addMapControls: function () {
    if (this.gmapType === "map") {
      if (Ext.isArray(this.mapControls)) {
        for (i = 0; i < this.mapControls.length; i++) {
          this.addMapControl(this.mapControls[i]);
        }
      } else {
        if (typeof this.mapControls === "string") {
          this.addMapControl(this.mapControls);
        } else {
          if (typeof this.mapControls === "object") {
            this.getMap().addControl(this.mapControls);
          }
        }
      }
    }
  },
  addMapControl: function (b) {
    var a = window[b];
    if (typeof a === "function") {
      this.getMap().addControl(new a());
    }
  },
  addOptions: function () {
    if (Ext.isArray(this.mapConfOpts)) {
      var a;
      for (i = 0; i < this.mapConfOpts.length; i++) {
        this.addOption(this.mapConfOpts[i]);
      }
    } else {
      if (typeof this.mapConfOpts === "string") {
        this.addOption(this.mapConfOpts);
      }
    }
  },
  addOption: function (b) {
    var a = this.getMap()[b];
    if (typeof a === "function") {
      this.getMap()[b]();
    }
  },
  geoCodeLookup: function (a) {
    this.geocoder = new GClientGeocoder();
    this.geocoder.getLocations(a, this.addAddressToMap.createDelegate(this));
  },
  addAddressToMap: function (a) {
    if (!a || a.Status.code != 200) {
      Ext.MessageBox.alert(
        "Error",
        "Code " + a.Status.code + " Error Returned"
      );
    } else {
      place = a.Placemark[0];
      addressinfo = place.AddressDetails;
      accuracy = addressinfo.Accuracy;
      if (accuracy === 0) {
        Ext.MessageBox.alert(
          "Unable to Locate Address",
          "Unable to Locate the Address you provided"
        );
      } else {
        if (accuracy < 7) {
          Ext.MessageBox.alert(
            "Address Accuracy",
            "The address provided has a low accuracy.<br><br>Level " +
              accuracy +
              " Accuracy (8 = Exact Match, 1 = Vague Match)"
          );
        } else {
          point = new GLatLng(
            place.Point.coordinates[1],
            place.Point.coordinates[0]
          );
          if (
            typeof this.setCenter.marker === "object" &&
            typeof point === "object"
          ) {
            this.addMarker(
              point,
              this.setCenter.marker,
              this.setCenter.marker.clear,
              true,
              this.setCenter.listeners
            );
          }
        }
      }
    }
  },
});
Ext.reg("gmappanel", Ext.ux.GMapPanel);
Ext.namespace("Ext.ux.grid");
Ext.ux.grid.GridFilters = Ext.extend(Ext.util.Observable, {
  autoReload: true,
  filterCls: "ux-filtered-column",
  local: false,
  menuFilterText: "Filters",
  paramPrefix: "filter",
  showMenu: true,
  stateId: undefined,
  updateBuffer: 500,
  constructor: function (a) {
    a = a || {};
    this.deferredUpdate = new Ext.util.DelayedTask(this.reload, this);
    this.filters = new Ext.util.MixedCollection();
    this.filters.getKey = function (b) {
      return b ? b.dataIndex : null;
    };
    this.addFilters(a.filters);
    delete a.filters;
    Ext.apply(this, a);
  },
  init: function (a) {
    if (a instanceof Ext.grid.GridPanel) {
      this.grid = a;
      this.bindStore(this.grid.getStore(), true);
      if (this.filters.getCount() == 0) {
        this.addFilters(this.grid.getColumnModel());
      }
      this.grid.filters = this;
      this.grid.addEvents({ filterupdate: true });
      a.on({
        scope: this,
        beforestaterestore: this.applyState,
        beforestatesave: this.saveState,
        beforedestroy: this.destroy,
        reconfigure: this.onReconfigure,
      });
      if (a.rendered) {
        this.onRender();
      } else {
        a.on({ scope: this, single: true, render: this.onRender });
      }
    } else {
      if (a instanceof Ext.PagingToolbar) {
        this.toolbar = a;
      }
    }
  },
  applyState: function (b, d) {
    var a, c;
    this.applyingState = true;
    this.clearFilters();
    if (d.filters) {
      for (a in d.filters) {
        c = this.filters.get(a);
        if (c) {
          c.setValue(d.filters[a]);
          c.setActive(true);
        }
      }
    }
    this.deferredUpdate.cancel();
    if (this.local) {
      this.reload();
    }
    delete this.applyingState;
    delete d.filters;
  },
  saveState: function (a, c) {
    var b = {};
    this.filters.each(function (d) {
      if (d.active) {
        b[d.dataIndex] = d.getValue();
      }
    });
    return (c.filters = b);
  },
  onRender: function () {
    this.grid.getView().on("refresh", this.onRefresh, this);
    this.createMenu();
  },
  destroy: function () {
    this.removeAll();
    this.purgeListeners();
    if (this.filterMenu) {
      Ext.menu.MenuMgr.unregister(this.filterMenu);
      this.filterMenu.destroy();
      this.filterMenu = this.menu.menu = null;
    }
  },
  removeAll: function () {
    if (this.filters) {
      Ext.destroy.apply(Ext, this.filters.items);
      this.filters.clear();
    }
  },
  bindStore: function (a, b) {
    if (!b && this.store) {
      if (this.local) {
        a.un("load", this.onLoad, this);
      } else {
        a.un("beforeload", this.onBeforeLoad, this);
      }
    }
    if (a) {
      if (this.local) {
        a.on("load", this.onLoad, this);
      } else {
        a.on("beforeload", this.onBeforeLoad, this);
      }
    }
    this.store = a;
  },
  onReconfigure: function () {
    this.bindStore(this.grid.getStore());
    this.store.clearFilter();
    this.removeAll();
    this.addFilters(this.grid.getColumnModel());
    this.updateColumnHeadings();
  },
  createMenu: function () {
    var a = this.grid.getView(),
      b = a.hmenu;
    if (this.showMenu && b) {
      this.sep = b.addSeparator();
      this.filterMenu = new Ext.menu.Menu({
        id: this.grid.id + "-filters-menu",
      });
      this.menu = b.add({
        checked: false,
        itemId: "filters",
        text: this.menuFilterText,
        menu: this.filterMenu,
      });
      this.menu.on({
        scope: this,
        checkchange: this.onCheckChange,
        beforecheckchange: this.onBeforeCheck,
      });
      b.on("beforeshow", this.onMenu, this);
    }
    this.updateColumnHeadings();
  },
  getMenuFilter: function () {
    var a = this.grid.getView();
    if (!a || a.hdCtxIndex === undefined) {
      return null;
    }
    return this.filters.get(a.cm.config[a.hdCtxIndex].dataIndex);
  },
  onMenu: function (b) {
    var a = this.getMenuFilter();
    if (a) {
      this.menu.menu = a.menu;
      this.menu.setChecked(a.active, false);
      this.menu.setDisabled(a.disabled === true);
    }
    this.menu.setVisible(a !== undefined);
    this.sep.setVisible(a !== undefined);
  },
  onCheckChange: function (a, b) {
    this.getMenuFilter().setActive(b);
  },
  onBeforeCheck: function (a, b) {
    return !b || this.getMenuFilter().isActivatable();
  },
  onStateChange: function (b, a) {
    if (b === "serialize") {
      return;
    }
    if (a == this.getMenuFilter()) {
      this.menu.setChecked(a.active, false);
    }
    if ((this.autoReload || this.local) && !this.applyingState) {
      this.deferredUpdate.delay(this.updateBuffer);
    }
    this.updateColumnHeadings();
    if (!this.applyingState) {
      this.grid.saveState();
    }
    this.grid.fireEvent("filterupdate", this, a);
  },
  onBeforeLoad: function (a, b) {
    b.params = b.params || {};
    this.cleanParams(b.params);
    var c = this.buildQuery(this.getFilterData());
    Ext.apply(b.params, c);
  },
  onLoad: function (a, b) {
    a.filterBy(this.getRecordFilter());
  },
  onRefresh: function () {
    this.updateColumnHeadings();
  },
  updateColumnHeadings: function () {
    var b = this.grid.getView(),
      c,
      a,
      d;
    if (b.mainHd) {
      for (c = 0, a = b.cm.config.length; c < a; c++) {
        d = this.getFilter(b.cm.config[c].dataIndex);
        Ext.fly(b.getHeaderCell(c))[d && d.active ? "addClass" : "removeClass"](
          this.filterCls
        );
      }
    }
  },
  reload: function () {
    if (this.local) {
      this.grid.store.clearFilter(true);
      this.grid.store.filterBy(this.getRecordFilter());
    } else {
      var b,
        a = this.grid.store;
      this.deferredUpdate.cancel();
      if (this.toolbar) {
        b = a.paramNames.start;
        if (a.lastOptions && a.lastOptions.params && a.lastOptions.params[b]) {
          a.lastOptions.params[b] = 0;
        }
      }
      a.reload();
    }
  },
  getRecordFilter: function () {
    var c = [],
      a,
      b;
    this.filters.each(function (d) {
      if (d.active) {
        c.push(d);
      }
    });
    a = c.length;
    return function (d) {
      for (b = 0; b < a; b++) {
        if (!c[b].validateRecord(d)) {
          return false;
        }
      }
      return true;
    };
  },
  addFilter: function (a) {
    var c = this.getFilterClass(a.type),
      b = a.menu ? a : new c(a);
    this.filters.add(b);
    Ext.util.Observable.capture(b, this.onStateChange, this);
    return b;
  },
  addFilters: function (f) {
    if (f) {
      var c,
        b,
        e,
        a = false,
        d;
      if (f instanceof Ext.grid.ColumnModel) {
        f = f.config;
        a = true;
      }
      for (c = 0, b = f.length; c < b; c++) {
        e = false;
        if (a) {
          d = f[c].dataIndex;
          e = f[c].filter || f[c].filterable;
          if (e) {
            e = e === true ? {} : e;
            Ext.apply(e, { dataIndex: d });
            e.type = e.type || this.store.fields.get(d).type.type;
          }
        } else {
          e = f[c];
        }
        if (e) {
          this.addFilter(e);
        }
      }
    }
  },
  getFilter: function (a) {
    return this.filters.get(a);
  },
  clearFilters: function () {
    this.filters.each(function (a) {
      a.setActive(false);
    });
  },
  getFilterData: function () {
    var c = [],
      b,
      a;
    this.filters.each(function (e) {
      if (e.active) {
        var g = [].concat(e.serialize());
        for (b = 0, a = g.length; b < a; b++) {
          c.push({ field: e.dataIndex, data: g[b] });
        }
      }
    });
    return c;
  },
  buildQuery: function (b) {
    var a = {},
      c,
      h,
      j,
      e,
      k,
      d,
      g = b.length;
    if (!this.encode) {
      for (c = 0; c < g; c++) {
        h = b[c];
        j = [this.paramPrefix, "[", c, "]"].join("");
        a[j + "[field]"] = h.field;
        e = j + "[data]";
        for (k in h.data) {
          a[[e, "[", k, "]"].join("")] = h.data[k];
        }
      }
    } else {
      d = [];
      for (c = 0; c < g; c++) {
        h = b[c];
        d.push(Ext.apply({}, { field: h.field }, h.data));
      }
      if (d.length > 0) {
        a[this.paramPrefix] = Ext.util.JSON.encode(d);
      }
    }
    return a;
  },
  cleanParams: function (c) {
    if (this.encode) {
      delete c[this.paramPrefix];
    } else {
      var b, a;
      b = new RegExp("^" + this.paramPrefix + "[[0-9]+]");
      for (a in c) {
        if (b.test(a)) {
          delete c[a];
        }
      }
    }
  },
  getFilterClass: function (a) {
    switch (a) {
      case "auto":
        a = "string";
        break;
      case "int":
      case "float":
        a = "numeric";
        break;
      case "bool":
        a = "boolean";
        break;
    }
    return Ext.ux.grid.filter[
      a.substr(0, 1).toUpperCase() + a.substr(1) + "Filter"
    ];
  },
});
Ext.preg("gridfilters", Ext.ux.grid.GridFilters);
Ext.namespace("Ext.ux.grid.filter");
Ext.ux.grid.filter.Filter = Ext.extend(Ext.util.Observable, {
  active: false,
  dataIndex: null,
  menu: null,
  updateBuffer: 500,
  constructor: function (a) {
    Ext.apply(this, a);
    this.addEvents("activate", "deactivate", "serialize", "update");
    Ext.ux.grid.filter.Filter.superclass.constructor.call(this);
    this.menu = new Ext.menu.Menu();
    this.init(a);
    if (a && a.value) {
      this.setValue(a.value);
      this.setActive(a.active !== false, true);
      delete a.value;
    }
  },
  destroy: function () {
    if (this.menu) {
      this.menu.destroy();
    }
    this.purgeListeners();
  },
  init: Ext.emptyFn,
  getValue: Ext.emptyFn,
  setValue: Ext.emptyFn,
  isActivatable: function () {
    return true;
  },
  getSerialArgs: Ext.emptyFn,
  validateRecord: function () {
    return true;
  },
  serialize: function () {
    var a = this.getSerialArgs();
    this.fireEvent("serialize", a, this);
    return a;
  },
  fireUpdate: function () {
    if (this.active) {
      this.fireEvent("update", this);
    }
    this.setActive(this.isActivatable());
  },
  setActive: function (b, a) {
    if (this.active != b) {
      this.active = b;
      if (a !== true) {
        this.fireEvent(b ? "activate" : "deactivate", this);
      }
    }
  },
});
Ext.ux.grid.filter.BooleanFilter = Ext.extend(Ext.ux.grid.filter.Filter, {
  defaultValue: false,
  yesText: "Yes",
  noText: "No",
  init: function (a) {
    var c = Ext.id();
    this.options = [
      new Ext.menu.CheckItem({
        text: this.yesText,
        group: c,
        checked: this.defaultValue === true,
      }),
      new Ext.menu.CheckItem({
        text: this.noText,
        group: c,
        checked: this.defaultValue === false,
      }),
    ];
    this.menu.add(this.options[0], this.options[1]);
    for (var b = 0; b < this.options.length; b++) {
      this.options[b].on("click", this.fireUpdate, this);
      this.options[b].on("checkchange", this.fireUpdate, this);
    }
  },
  getValue: function () {
    return this.options[0].checked;
  },
  setValue: function (a) {
    this.options[a ? 0 : 1].setChecked(true);
  },
  getSerialArgs: function () {
    var a = { type: "boolean", value: this.getValue() };
    return a;
  },
  validateRecord: function (a) {
    return a.get(this.dataIndex) == this.getValue();
  },
});
Ext.ux.grid.filter.DateFilter = Ext.extend(Ext.ux.grid.filter.Filter, {
  afterText: "After",
  beforeText: "Before",
  compareMap: { before: "lt", after: "gt", on: "eq" },
  dateFormat: "m/d/Y",
  menuItems: ["before", "after", "-", "on"],
  menuItemCfgs: { selectOnFocus: true, width: 125 },
  onText: "On",
  pickerOpts: {},
  init: function (c) {
    var g, d, a, e, b, f;
    g = Ext.apply(this.pickerOpts, {
      minDate: this.minDate,
      maxDate: this.maxDate,
      format: this.dateFormat,
      listeners: { scope: this, select: this.onMenuSelect },
    });
    this.fields = {};
    for (d = 0, a = this.menuItems.length; d < a; d++) {
      e = this.menuItems[d];
      if (e !== "-") {
        b = {
          itemId: "range-" + e,
          text: this[e + "Text"],
          menu: new Ext.menu.DateMenu(Ext.apply(g, { itemId: e })),
          listeners: { scope: this, checkchange: this.onCheckChange },
        };
        f = Ext.menu.CheckItem;
        e = this.fields[e] = new f(b);
      }
      this.menu.add(e);
    }
  },
  onCheckChange: function () {
    this.setActive(this.isActivatable());
    this.fireEvent("update", this);
  },
  onInputKeyUp: function (c, b) {
    var a = b.getKey();
    if (a == b.RETURN && c.isValid()) {
      b.stopEvent();
      this.menu.hide(true);
      return;
    }
  },
  onMenuSelect: function (c, d, b) {
    var a = this.fields,
      e = this.fields[c.itemId];
    e.setChecked(true);
    if (e == a.on) {
      a.before.setChecked(false, true);
      a.after.setChecked(false, true);
    } else {
      a.on.setChecked(false, true);
      if (e == a.after && a.before.menu.picker.value < d) {
        a.before.setChecked(false, true);
      } else {
        if (e == a.before && a.after.menu.picker.value > d) {
          a.after.setChecked(false, true);
        }
      }
    }
    this.fireEvent("update", this);
  },
  getValue: function () {
    var b,
      a = {};
    for (b in this.fields) {
      if (this.fields[b].checked) {
        a[b] = this.fields[b].menu.picker.getValue();
      }
    }
    return a;
  },
  setValue: function (c, b) {
    var a;
    for (a in this.fields) {
      if (c[a]) {
        this.fields[a].menu.picker.setValue(c[a]);
        this.fields[a].setChecked(true);
      } else {
        if (!b) {
          this.fields[a].setChecked(false);
        }
      }
    }
    this.fireEvent("update", this);
  },
  isActivatable: function () {
    var a;
    for (a in this.fields) {
      if (this.fields[a].checked) {
        return true;
      }
    }
    return false;
  },
  getSerialArgs: function () {
    var a = [];
    for (var b in this.fields) {
      if (this.fields[b].checked) {
        a.push({
          type: "date",
          comparison: this.compareMap[b],
          value: this.getFieldValue(b).format(this.dateFormat),
        });
      }
    }
    return a;
  },
  getFieldValue: function (a) {
    return this.fields[a].menu.picker.getValue();
  },
  getPicker: function (a) {
    return this.fields[a].menu.picker;
  },
  validateRecord: function (a) {
    var b,
      d,
      c = a.get(this.dataIndex);
    if (!Ext.isDate(c)) {
      return false;
    }
    c = c.clearTime(true).getTime();
    for (b in this.fields) {
      if (this.fields[b].checked) {
        d = this.getFieldValue(b).clearTime(true).getTime();
        if (b == "before" && d <= c) {
          return false;
        }
        if (b == "after" && d >= c) {
          return false;
        }
        if (b == "on" && d != c) {
          return false;
        }
      }
    }
    return true;
  },
});
Ext.ux.grid.filter.ListFilter = Ext.extend(Ext.ux.grid.filter.Filter, {
  phpMode: false,
  init: function (a) {
    this.dt = new Ext.util.DelayedTask(this.fireUpdate, this);
    if (this.menu) {
      this.menu.destroy();
    }
    this.menu = new Ext.ux.menu.ListMenu(a);
    this.menu.on("checkchange", this.onCheckChange, this);
  },
  getValue: function () {
    return this.menu.getSelected();
  },
  setValue: function (a) {
    this.menu.setSelected(a);
    this.fireEvent("update", this);
  },
  isActivatable: function () {
    return this.getValue().length > 0;
  },
  getSerialArgs: function () {
    var a = {
      type: "list",
      value: this.phpMode ? this.getValue().join(",") : this.getValue(),
    };
    return a;
  },
  onCheckChange: function () {
    this.dt.delay(this.updateBuffer);
  },
  validateRecord: function (a) {
    return this.getValue().indexOf(a.get(this.dataIndex)) > -1;
  },
});
Ext.ux.grid.filter.NumericFilter = Ext.extend(Ext.ux.grid.filter.Filter, {
  fieldCls: Ext.form.NumberField,
  iconCls: {
    gt: "ux-rangemenu-gt",
    lt: "ux-rangemenu-lt",
    eq: "ux-rangemenu-eq",
  },
  menuItemCfgs: {
    emptyText: "Enter Filter Text...",
    selectOnFocus: true,
    width: 125,
  },
  menuItems: ["lt", "gt", "-", "eq"],
  init: function (a) {
    if (this.menu) {
      this.menu.destroy();
    }
    this.menu = new Ext.ux.menu.RangeMenu(
      Ext.apply(a, {
        fieldCfg: this.fieldCfg || {},
        fieldCls: this.fieldCls,
        fields: this.fields || {},
        iconCls: this.iconCls,
        menuItemCfgs: this.menuItemCfgs,
        menuItems: this.menuItems,
        updateBuffer: this.updateBuffer,
      })
    );
    this.menu.on("update", this.fireUpdate, this);
  },
  getValue: function () {
    return this.menu.getValue();
  },
  setValue: function (a) {
    this.menu.setValue(a);
  },
  isActivatable: function () {
    var a = this.getValue();
    for (key in a) {
      if (a[key] !== undefined) {
        return true;
      }
    }
    return false;
  },
  getSerialArgs: function () {
    var c,
      b = [],
      a = this.menu.getValue();
    for (c in a) {
      b.push({ type: "numeric", comparison: c, value: a[c] });
    }
    return b;
  },
  validateRecord: function (a) {
    var c = a.get(this.dataIndex),
      b = this.getValue();
    if (b.eq !== undefined && c != b.eq) {
      return false;
    }
    if (b.lt !== undefined && c >= b.lt) {
      return false;
    }
    if (b.gt !== undefined && c <= b.gt) {
      return false;
    }
    return true;
  },
});
Ext.ux.grid.filter.StringFilter = Ext.extend(Ext.ux.grid.filter.Filter, {
  iconCls: "ux-gridfilter-text-icon",
  emptyText: "Enter Filter Text...",
  selectOnFocus: true,
  width: 125,
  init: function (a) {
    Ext.applyIf(a, {
      enableKeyEvents: true,
      iconCls: this.iconCls,
      listeners: { scope: this, keyup: this.onInputKeyUp },
    });
    this.inputItem = new Ext.form.TextField(a);
    this.menu.add(this.inputItem);
    this.updateTask = new Ext.util.DelayedTask(this.fireUpdate, this);
  },
  getValue: function () {
    return this.inputItem.getValue();
  },
  setValue: function (a) {
    this.inputItem.setValue(a);
    this.fireEvent("update", this);
  },
  isActivatable: function () {
    return this.inputItem.getValue().length > 0;
  },
  getSerialArgs: function () {
    return { type: "string", value: this.getValue() };
  },
  validateRecord: function (a) {
    var b = a.get(this.dataIndex);
    if (typeof b != "string") {
      return this.getValue().length === 0;
    }
    return b.toLowerCase().indexOf(this.getValue().toLowerCase()) > -1;
  },
  onInputKeyUp: function (c, b) {
    var a = b.getKey();
    if (a == b.RETURN && c.isValid()) {
      b.stopEvent();
      this.menu.hide(true);
      return;
    }
    this.updateTask.delay(this.updateBuffer);
  },
});
Ext.namespace("Ext.ux.menu");
Ext.ux.menu.ListMenu = Ext.extend(Ext.menu.Menu, {
  labelField: "text",
  loadingText: "Loading...",
  loadOnShow: true,
  single: false,
  constructor: function (b) {
    this.selected = [];
    this.addEvents("checkchange");
    Ext.ux.menu.ListMenu.superclass.constructor.call(this, (b = b || {}));
    if (!b.store && b.options) {
      var c = [];
      for (var d = 0, a = b.options.length; d < a; d++) {
        var e = b.options[d];
        switch (Ext.type(e)) {
          case "array":
            c.push(e);
            break;
          case "object":
            c.push([e.id, e[this.labelField]]);
            break;
          case "string":
            c.push([e, e]);
            break;
        }
      }
      this.store = new Ext.data.Store({
        reader: new Ext.data.ArrayReader({ id: 0 }, ["id", this.labelField]),
        data: c,
        listeners: { load: this.onLoad, scope: this },
      });
      this.loaded = true;
    } else {
      this.add({ text: this.loadingText, iconCls: "loading-indicator" });
      this.store.on("load", this.onLoad, this);
    }
  },
  destroy: function () {
    if (this.store) {
      this.store.destroy();
    }
    Ext.ux.menu.ListMenu.superclass.destroy.call(this);
  },
  show: (function () {
    var a = null;
    return function () {
      if (arguments.length === 0) {
        Ext.ux.menu.ListMenu.superclass.show.apply(this, a);
      } else {
        a = arguments;
        if (this.loadOnShow && !this.loaded) {
          this.store.load();
        }
        Ext.ux.menu.ListMenu.superclass.show.apply(this, arguments);
      }
    };
  })(),
  onLoad: function (c, b) {
    var g = this.isVisible();
    this.hide(false);
    this.removeAll(true);
    var e = this.single ? Ext.id() : null;
    for (var d = 0, a = b.length; d < a; d++) {
      var f = new Ext.menu.CheckItem({
        text: b[d].get(this.labelField),
        group: e,
        checked: this.selected.indexOf(b[d].id) > -1,
        hideOnClick: false,
      });
      f.itemId = b[d].id;
      f.on("checkchange", this.checkChange, this);
      this.add(f);
    }
    this.loaded = true;
    if (g) {
      this.show();
    }
    this.fireEvent("load", this, b);
  },
  getSelected: function () {
    return this.selected;
  },
  setSelected: function (a) {
    a = this.selected = [].concat(a);
    if (this.loaded) {
      this.items.each(function (d) {
        d.setChecked(false, true);
        for (var c = 0, b = a.length; c < b; c++) {
          if (d.itemId == a[c]) {
            d.setChecked(true, true);
          }
        }
      }, this);
    }
  },
  checkChange: function (b, a) {
    var c = [];
    this.items.each(function (d) {
      if (d.checked) {
        c.push(d.itemId);
      }
    }, this);
    this.selected = c;
    this.fireEvent("checkchange", b, a);
  },
});
Ext.ns("Ext.ux.menu");
Ext.ux.menu.RangeMenu = Ext.extend(Ext.menu.Menu, {
  constructor: function (c) {
    Ext.ux.menu.RangeMenu.superclass.constructor.call(this, c);
    this.addEvents("update");
    this.updateTask = new Ext.util.DelayedTask(this.fireUpdate, this);
    var d, a, e, b, f;
    for (d = 0, a = this.menuItems.length; d < a; d++) {
      e = this.menuItems[d];
      if (e !== "-") {
        b = {
          itemId: "range-" + e,
          enableKeyEvents: true,
          iconCls: this.iconCls[e] || "no-icon",
          listeners: { scope: this, keyup: this.onInputKeyUp },
        };
        Ext.apply(
          b,
          Ext.applyIf(this.fields[e] || {}, this.fieldCfg[e]),
          this.menuItemCfgs
        );
        f = b.fieldCls || this.fieldCls;
        e = this.fields[e] = new f(b);
      }
      this.add(e);
    }
  },
  fireUpdate: function () {
    this.fireEvent("update", this);
  },
  getValue: function () {
    var a = {},
      b,
      c;
    for (b in this.fields) {
      c = this.fields[b];
      if (c.isValid() && String(c.getValue()).length > 0) {
        a[b] = c.getValue();
      }
    }
    return a;
  },
  setValue: function (b) {
    var a;
    for (a in this.fields) {
      this.fields[a].setValue(b[a] !== undefined ? b[a] : "");
    }
    this.fireEvent("update", this);
  },
  onInputKeyUp: function (c, b) {
    var a = b.getKey();
    if (a == b.RETURN && c.isValid()) {
      b.stopEvent();
      this.hide(true);
      return;
    }
    if (c == this.fields.eq) {
      if (this.fields.gt) {
        this.fields.gt.setValue(null);
      }
      if (this.fields.lt) {
        this.fields.lt.setValue(null);
      }
    } else {
      this.fields.eq.setValue(null);
    }
    this.updateTask.delay(this.updateBuffer);
  },
});
Ext.ns("Ext.ux.grid");
Ext.ux.grid.GroupSummary = Ext.extend(Ext.util.Observable, {
  constructor: function (a) {
    Ext.apply(this, a);
    Ext.ux.grid.GroupSummary.superclass.constructor.call(this);
  },
  init: function (b) {
    this.grid = b;
    var a = (this.view = b.getView());
    a.doGroupEnd = this.doGroupEnd.createDelegate(this);
    a.afterMethod("onColumnWidthUpdated", this.doWidth, this);
    a.afterMethod("onAllColumnWidthsUpdated", this.doAllWidths, this);
    a.afterMethod("onColumnHiddenUpdated", this.doHidden, this);
    a.afterMethod("onUpdate", this.doUpdate, this);
    a.afterMethod("onRemove", this.doRemove, this);
    if (!this.rowTpl) {
      this.rowTpl = new Ext.Template(
        '<div class="x-grid3-summary-row" style="{tstyle}">',
        '<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',
        "<tbody><tr>{cells}</tr></tbody>",
        "</table></div>"
      );
      this.rowTpl.disableFormats = true;
    }
    this.rowTpl.compile();
    if (!this.cellTpl) {
      this.cellTpl = new Ext.Template(
        '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">',
        '<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',
        "</td>"
      );
      this.cellTpl.disableFormats = true;
    }
    this.cellTpl.compile();
  },
  toggleSummaries: function (b) {
    var a = this.grid.getGridEl();
    if (a) {
      if (b === undefined) {
        b = a.hasClass("x-grid-hide-summary");
      }
      a[b ? "removeClass" : "addClass"]("x-grid-hide-summary");
    }
  },
  renderSummary: function (d, h) {
    h = h || this.view.getColumnData();
    var j = this.grid.getColumnModel().config,
      e = [],
      k,
      a = {},
      b,
      l = h.length - 1;
    for (var f = 0, g = h.length; f < g; f++) {
      k = h[f];
      b = j[f];
      a.id = k.id;
      a.style = k.style;
      a.css =
        f == 0 ? "x-grid3-cell-first " : f == l ? "x-grid3-cell-last " : "";
      if (b.summaryType || b.summaryRenderer) {
        a.value = (b.summaryRenderer || k.renderer)(d.data[k.name], a, d);
      } else {
        a.value = "";
      }
      if (a.value == undefined || a.value === "") {
        a.value = "&#160;";
      }
      e[e.length] = this.cellTpl.apply(a);
    }
    return this.rowTpl.apply({
      tstyle: "width:" + this.view.getTotalWidth() + ";",
      cells: e.join(""),
    });
  },
  calculate: function (d, k) {
    var g = {},
      a,
      m,
      l = this.grid.getColumnModel().config,
      b;
    for (var e = 0, n = d.length; e < n; e++) {
      a = d[e];
      for (var f = 0, h = k.length; f < h; f++) {
        m = k[f];
        b = l[f];
        if (b.summaryType) {
          g[m.name] = Ext.ux.grid.GroupSummary.Calculations[b.summaryType](
            g[m.name] || 0,
            a,
            m.name,
            g
          );
        }
      }
    }
    return g;
  },
  doGroupEnd: function (a, d, b, f, c) {
    var e = this.calculate(d.rs, b);
    a.push("</div>", this.renderSummary({ data: e }, b), "</div>");
  },
  doWidth: function (e, b, d) {
    if (!this.isGrouped()) {
      return;
    }
    var c = this.view.getGroups(),
      a = c.length,
      f = 0,
      g;
    for (; f < a; ++f) {
      g = c[f].childNodes[2];
      g.style.width = d;
      g.firstChild.style.width = d;
      g.firstChild.rows[0].childNodes[e].style.width = b;
    }
  },
  doAllWidths: function (g, d) {
    if (!this.isGrouped()) {
      return;
    }
    var a = this.view.getGroups(),
      f = a.length,
      c = 0,
      b,
      k,
      h,
      e = g.length;
    for (; c < f; c++) {
      k = a[c].childNodes[2];
      k.style.width = d;
      k.firstChild.style.width = d;
      h = k.firstChild.rows[0].childNodes;
      for (b = 0; b < e; b++) {
        h[b].style.width = g[b];
      }
    }
  },
  doHidden: function (d, g, c) {
    if (!this.isGrouped()) {
      return;
    }
    var b = this.view.getGroups(),
      a = b.length,
      e = 0,
      f,
      h = g ? "none" : "";
    for (; e < a; e++) {
      f = b[e].childNodes[2];
      f.style.width = c;
      f.firstChild.style.width = c;
      f.firstChild.rows[0].childNodes[d].style.display = h;
    }
  },
  isGrouped: function () {
    return !Ext.isEmpty(this.grid.getStore().groupField);
  },
  refreshSummary: function (a) {
    return this.refreshSummaryById(this.view.getGroupId(a));
  },
  getSummaryNode: function (a) {
    var b = Ext.fly(a, "_gsummary");
    if (b) {
      return b.down(".x-grid3-summary-row", true);
    }
    return null;
  },
  refreshSummaryById: function (d) {
    var f = Ext.getDom(d);
    if (!f) {
      return false;
    }
    var b = [];
    this.grid.getStore().each(function (g) {
      if (g._groupId == d) {
        b[b.length] = g;
      }
    });
    var c = this.view.getColumnData(),
      h = this.calculate(b, c),
      a = this.renderSummary({ data: h }, c),
      e = this.getSummaryNode(d);
    if (e) {
      f.removeChild(e);
    }
    Ext.DomHelper.append(f, a);
    return true;
  },
  doUpdate: function (b, a) {
    this.refreshSummaryById(a._groupId);
  },
  doRemove: function (d, a, b, c) {
    if (!c) {
      this.refreshSummaryById(a._groupId);
    }
  },
  showSummaryMsg: function (a, d) {
    var b = this.view.getGroupId(a),
      c = this.getSummaryNode(b);
    if (c) {
      c.innerHTML = '<div class="x-grid3-summary-msg">' + d + "</div>";
    }
  },
});
Ext.grid.GroupSummary = Ext.ux.grid.GroupSummary;
Ext.ux.grid.GroupSummary.Calculations = {
  sum: function (b, a, c) {
    return b + (a.data[c] || 0);
  },
  count: function (b, a, d, c) {
    return c[d + "count"] ? ++c[d + "count"] : (c[d + "count"] = 1);
  },
  max: function (c, b, e, d) {
    var c = b.data[e];
    var a = d[e + "max"] === undefined ? (d[e + "max"] = c) : d[e + "max"];
    return c > a ? (d[e + "max"] = c) : a;
  },
  min: function (b, a, e, d) {
    var b = a.data[e];
    var c = d[e + "min"] === undefined ? (d[e + "min"] = b) : d[e + "min"];
    return b < c ? (d[e + "min"] = b) : c;
  },
  average: function (b, a, f, e) {
    var g = e[f + "count"] ? ++e[f + "count"] : (e[f + "count"] = 1);
    var d = (e[f + "total"] = (e[f + "total"] || 0) + (a.data[f] || 0));
    return d === 0 ? 0 : d / g;
  },
};
Ext.grid.GroupSummary.Calculations = Ext.ux.grid.GroupSummary.Calculations;
Ext.ux.grid.HybridSummary = Ext.extend(Ext.ux.grid.GroupSummary, {
  calculate: function (b, d) {
    var a = this.view.getGroupField(),
      c = b[0].data[a],
      e = this.getSummaryData(c);
    return e || Ext.ux.grid.HybridSummary.superclass.calculate.call(this, b, d);
  },
  updateSummaryData: function (a, d, c) {
    var b = this.grid.getStore().reader.jsonData;
    if (!b.summaryData) {
      b.summaryData = {};
    }
    b.summaryData[a] = d;
    if (!c) {
      this.refreshSummary(a);
    }
  },
  getSummaryData: function (c) {
    var b = this.grid.getStore().reader,
      e = b.jsonData,
      a = b.recordType.prototype.fields,
      d;
    if (e && e.summaryData) {
      d = e.summaryData[c];
      if (d) {
        return b.extractValues(d, a.items, a.length);
      }
    }
    return null;
  },
});
Ext.grid.HybridSummary = Ext.ux.grid.HybridSummary;
Ext.ux.GroupTab = Ext.extend(Ext.Container, {
  mainItem: 0,
  expanded: true,
  deferredRender: true,
  activeTab: null,
  idDelimiter: "__",
  headerAsText: false,
  frame: false,
  hideBorders: true,
  initComponent: function (a) {
    Ext.apply(this, a);
    this.frame = false;
    Ext.ux.GroupTab.superclass.initComponent.call(this);
    this.addEvents(
      "activate",
      "deactivate",
      "changemainitem",
      "beforetabchange",
      "tabchange"
    );
    this.setLayout(
      new Ext.layout.CardLayout({ deferredRender: this.deferredRender })
    );
    if (!this.stack) {
      this.stack = Ext.TabPanel.AccessStack();
    }
    this.initItems();
    this.on(
      "beforerender",
      function () {
        this.groupEl = this.ownerCt.getGroupEl(this);
      },
      this
    );
    this.on("add", this.onAdd, this, { target: this });
    this.on("remove", this.onRemove, this, { target: this });
    if (this.mainItem !== undefined) {
      var b =
        typeof this.mainItem == "object"
          ? this.mainItem
          : this.items.get(this.mainItem);
      delete this.mainItem;
      this.setMainItem(b);
    }
  },
  setActiveTab: function (c) {
    c = this.getComponent(c);
    if (!c) {
      return false;
    }
    if (!this.rendered) {
      this.activeTab = c;
      return true;
    }
    if (
      this.activeTab != c &&
      this.fireEvent("beforetabchange", this, c, this.activeTab) !== false
    ) {
      if (this.activeTab && this.activeTab != this.mainItem) {
        var a = this.getTabEl(this.activeTab);
        if (a) {
          Ext.fly(a).removeClass("x-grouptabs-strip-active");
        }
      }
      var b = this.getTabEl(c);
      Ext.fly(b).addClass("x-grouptabs-strip-active");
      this.activeTab = c;
      this.stack.add(c);
      this.layout.setActiveItem(c);
      if (this.layoutOnTabChange && c.doLayout) {
        c.doLayout();
      }
      if (this.scrolling) {
        this.scrollToTab(c, this.animScroll);
      }
      this.fireEvent("tabchange", this, c);
      return true;
    }
    return false;
  },
  getTabEl: function (a) {
    if (a == this.mainItem) {
      return this.groupEl;
    }
    return Ext.TabPanel.prototype.getTabEl.call(this, a);
  },
  onRender: function (b, a) {
    Ext.ux.GroupTab.superclass.onRender.call(this, b, a);
    this.strip = Ext.fly(this.groupEl).createChild({
      tag: "ul",
      cls: "x-grouptabs-sub",
    });
    this.tooltip = new Ext.ToolTip({
      target: this.groupEl,
      delegate: "a.x-grouptabs-text",
      trackMouse: true,
      renderTo: document.body,
      listeners: {
        beforeshow: function (e) {
          var d =
            e.triggerElement.parentNode === this.mainItem.tabEl
              ? this.mainItem
              : this.findById(
                  e.triggerElement.parentNode.id.split(this.idDelimiter)[1]
                );
          if (!d.tabTip) {
            return false;
          }
          e.body.dom.innerHTML = d.tabTip;
        },
        scope: this,
      },
    });
    if (!this.itemTpl) {
      var c = new Ext.Template(
        '<li class="{cls}" id="{id}">',
        '<a onclick="return false;" class="x-grouptabs-text {iconCls}">{text}</a>',
        "</li>"
      );
      c.disableFormats = true;
      c.compile();
      Ext.ux.GroupTab.prototype.itemTpl = c;
    }
    this.items.each(this.initTab, this);
  },
  afterRender: function () {
    Ext.ux.GroupTab.superclass.afterRender.call(this);
    if (this.activeTab !== undefined) {
      var a =
        typeof this.activeTab == "object"
          ? this.activeTab
          : this.items.get(this.activeTab);
      delete this.activeTab;
      this.setActiveTab(a);
    }
  },
  initTab: function (c, a) {
    var d = this.strip.dom.childNodes[a];
    var e = Ext.TabPanel.prototype.getTemplateArgs.call(this, c);
    if (c === this.mainItem) {
      c.tabEl = this.groupEl;
      e.cls += " x-grouptabs-main-item";
    }
    var b = d
      ? this.itemTpl.insertBefore(d, e)
      : this.itemTpl.append(this.strip, e);
    c.tabEl = c.tabEl || b;
    c.on("disable", this.onItemDisabled, this);
    c.on("enable", this.onItemEnabled, this);
    c.on("titlechange", this.onItemTitleChanged, this);
    c.on("iconchange", this.onItemIconChanged, this);
    c.on("beforeshow", this.onBeforeShowItem, this);
  },
  setMainItem: function (a) {
    a = this.getComponent(a);
    if (
      !a ||
      this.fireEvent("changemainitem", this, a, this.mainItem) === false
    ) {
      return;
    }
    this.mainItem = a;
  },
  getMainItem: function () {
    return this.mainItem || null;
  },
  onBeforeShowItem: function (a) {
    if (a != this.activeTab) {
      this.setActiveTab(a);
      return false;
    }
  },
  onAdd: function (a, c, b) {
    if (this.rendered) {
      this.initTab.call(this, c, b);
    }
  },
  onRemove: function (c, b) {
    Ext.destroy(Ext.get(this.getTabEl(b)));
    this.stack.remove(b);
    b.un("disable", this.onItemDisabled, this);
    b.un("enable", this.onItemEnabled, this);
    b.un("titlechange", this.onItemTitleChanged, this);
    b.un("iconchange", this.onItemIconChanged, this);
    b.un("beforeshow", this.onBeforeShowItem, this);
    if (b == this.activeTab) {
      var a = this.stack.next();
      if (a) {
        this.setActiveTab(a);
      } else {
        if (this.items.getCount() > 0) {
          this.setActiveTab(0);
        } else {
          this.activeTab = null;
        }
      }
    }
  },
  onBeforeAdd: function (b) {
    var a = b.events
      ? this.items.containsKey(b.getItemId())
        ? b
        : null
      : this.items.get(b);
    if (a) {
      this.setActiveTab(b);
      return false;
    }
    Ext.TabPanel.superclass.onBeforeAdd.apply(this, arguments);
    var c = b.elements;
    b.elements = c ? c.replace(",header", "") : c;
    b.border = b.border === true;
  },
  onItemDisabled: Ext.TabPanel.prototype.onItemDisabled,
  onItemEnabled: Ext.TabPanel.prototype.onItemEnabled,
  onItemTitleChanged: function (b) {
    var a = this.getTabEl(b);
    if (a) {
      Ext.fly(a).child("a.x-grouptabs-text", true).innerHTML = b.title;
    }
  },
  onItemIconChanged: function (d, a, c) {
    var b = this.getTabEl(d);
    if (b) {
      Ext.fly(b).child("a.x-grouptabs-text").replaceClass(c, a);
    }
  },
  beforeDestroy: function () {
    Ext.TabPanel.prototype.beforeDestroy.call(this);
    this.tooltip.destroy();
  },
});
Ext.reg("grouptab", Ext.ux.GroupTab);
Ext.ns("Ext.ux");
Ext.ux.GroupTabPanel = Ext.extend(Ext.TabPanel, {
  tabPosition: "left",
  alternateColor: false,
  alternateCls: "x-grouptabs-panel-alt",
  defaultType: "grouptab",
  deferredRender: false,
  activeGroup: null,
  initComponent: function () {
    Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
    this.addEvents("beforegroupchange", "groupchange");
    this.elements = "body,header";
    this.stripTarget = "header";
    this.tabPosition = this.tabPosition == "right" ? "right" : "left";
    this.addClass("x-grouptabs-panel");
    if (this.tabStyle && this.tabStyle != "") {
      this.addClass("x-grouptabs-panel-" + this.tabStyle);
    }
    if (this.alternateColor) {
      this.addClass(this.alternateCls);
    }
    this.on("beforeadd", function (b, c, a) {
      this.initGroup(c, a);
    });
    this.items.each(function (a) {
      a.on(
        "tabchange",
        function (b) {
          this.fireEvent("tabchange", this, b.activeTab);
        },
        this
      );
    }, this);
  },
  initEvents: function () {
    this.mon(this.strip, "mousedown", this.onStripMouseDown, this);
  },
  onRender: function (c, a) {
    Ext.TabPanel.superclass.onRender.call(this, c, a);
    if (this.plain) {
      var f = this.tabPosition == "top" ? "header" : "footer";
      this[f].addClass("x-tab-panel-" + f + "-plain");
    }
    var b = this[this.stripTarget];
    this.stripWrap = b.createChild({
      cls: "x-tab-strip-wrap ",
      cn: {
        tag: "ul",
        cls: "x-grouptabs-strip x-grouptabs-tab-strip-" + this.tabPosition,
      },
    });
    var e = this.tabPosition == "bottom" ? this.stripWrap : null;
    this.strip = new Ext.Element(this.stripWrap.dom.firstChild);
    this.header.addClass("x-grouptabs-panel-header");
    this.bwrap.addClass("x-grouptabs-bwrap");
    this.body.addClass(
      "x-tab-panel-body-" + this.tabPosition + " x-grouptabs-panel-body"
    );
    if (!this.groupTpl) {
      var d = new Ext.Template(
        '<li class="{cls}" id="{id}">',
        '<a class="x-grouptabs-expand" onclick="return false;"></a>',
        '<a class="x-grouptabs-text {iconCls}" href="#" onclick="return false;">',
        "<span>{text}</span></a>",
        "</li>"
      );
      d.disableFormats = true;
      d.compile();
      Ext.ux.GroupTabPanel.prototype.groupTpl = d;
    }
    this.items.each(this.initGroup, this);
  },
  afterRender: function () {
    Ext.ux.GroupTabPanel.superclass.afterRender.call(this);
    this.tabJoint = Ext.fly(this.body.dom.parentNode).createChild({
      cls: "x-tab-joint",
    });
    this.addClass("x-tab-panel-" + this.tabPosition);
    this.header.setWidth(this.tabWidth);
    if (this.activeGroup !== undefined) {
      var a =
        typeof this.activeGroup == "object"
          ? this.activeGroup
          : this.items.get(this.activeGroup);
      delete this.activeGroup;
      this.setActiveGroup(a);
      a.setActiveTab(a.getMainItem());
    }
  },
  getGroupEl: Ext.TabPanel.prototype.getTabEl,
  findTargets: function (c) {
    var b = null,
      a = c.getTarget("li", this.strip);
    if (a) {
      b = this.findById(a.id.split(this.idDelimiter)[1]);
      if (b.disabled) {
        return { expand: null, item: null, el: null };
      }
    }
    return {
      expand: c.getTarget(".x-grouptabs-expand", this.strip),
      isGroup: !c.getTarget("ul.x-grouptabs-sub", this.strip),
      item: b,
      el: a,
    };
  },
  onStripMouseDown: function (b) {
    if (b.button != 0) {
      return;
    }
    b.preventDefault();
    var a = this.findTargets(b);
    if (a.expand) {
      this.toggleGroup(a.el);
    } else {
      if (a.item) {
        if (a.isGroup) {
          a.item.setActiveTab(a.item.getMainItem());
        } else {
          a.item.ownerCt.setActiveTab(a.item);
        }
      }
    }
  },
  expandGroup: function (a) {
    if (a.isXType) {
      a = this.getGroupEl(a);
    }
    Ext.fly(a).addClass("x-grouptabs-expanded");
    this.syncTabJoint();
  },
  toggleGroup: function (a) {
    if (a.isXType) {
      a = this.getGroupEl(a);
    }
    Ext.fly(a).toggleClass("x-grouptabs-expanded");
    this.syncTabJoint();
  },
  collapseGroup: function (a) {
    if (a.isXType) {
      a = this.getGroupEl(a);
    }
    Ext.fly(a).removeClass("x-grouptabs-expanded");
    this.syncTabJoint();
  },
  syncTabJoint: function (b) {
    if (!this.tabJoint) {
      return;
    }
    b = b || this.getGroupEl(this.activeGroup);
    if (b) {
      this.tabJoint.setHeight(Ext.fly(b).getHeight() - 2);
      var a = Ext.isGecko2 ? 0 : 1;
      if (this.tabPosition == "left") {
        this.tabJoint.alignTo(b, "tl-tr", [-2, a]);
      } else {
        this.tabJoint.alignTo(b, "tr-tl", [1, a]);
      }
    } else {
      this.tabJoint.hide();
    }
  },
  getActiveTab: function () {
    if (!this.activeGroup) {
      return null;
    }
    return this.activeGroup.getTabEl(this.activeGroup.activeTab) || null;
  },
  onResize: function () {
    Ext.ux.GroupTabPanel.superclass.onResize.apply(this, arguments);
    this.syncTabJoint();
  },
  createCorner: function (a, b) {
    return Ext.fly(a).createChild({
      cls: "x-grouptabs-corner x-grouptabs-corner-" + b,
    });
  },
  initGroup: function (f, b) {
    var d = this.strip.dom.childNodes[b],
      e = this.getTemplateArgs(f);
    if (b === 0) {
      e.cls += " x-tab-first";
    }
    e.cls += " x-grouptabs-main";
    e.text = f.getMainItem().title;
    var c = d
        ? this.groupTpl.insertBefore(d, e)
        : this.groupTpl.append(this.strip, e),
      a = this.createCorner(c, "top-" + this.tabPosition),
      g = this.createCorner(c, "bottom-" + this.tabPosition);
    f.tabEl = c;
    if (f.expanded) {
      this.expandGroup(c);
    }
    if (Ext.isIE6 || (Ext.isIE && !Ext.isStrict)) {
      g.setLeft("-10px");
      g.setBottom("-5px");
      a.setLeft("-10px");
      a.setTop("-5px");
    }
    this.mon(f, {
      scope: this,
      changemainitem: this.onGroupChangeMainItem,
      beforetabchange: this.onGroupBeforeTabChange,
    });
  },
  setActiveGroup: function (b) {
    b = this.getComponent(b);
    if (!b) {
      return false;
    }
    if (!this.rendered) {
      this.activeGroup = b;
      return true;
    }
    if (
      this.activeGroup != b &&
      this.fireEvent("beforegroupchange", this, b, this.activeGroup) !== false
    ) {
      if (this.activeGroup) {
        this.activeGroup.activeTab = null;
        var a = this.getGroupEl(this.activeGroup);
        if (a) {
          Ext.fly(a).removeClass("x-grouptabs-strip-active");
        }
      }
      var c = this.getGroupEl(b);
      Ext.fly(c).addClass("x-grouptabs-strip-active");
      this.activeGroup = b;
      this.stack.add(b);
      this.layout.setActiveItem(b);
      this.syncTabJoint(c);
      this.fireEvent("groupchange", this, b);
      return true;
    }
    return false;
  },
  onGroupBeforeTabChange: function (a, c, b) {
    if (a !== this.activeGroup || c !== b) {
      this.strip
        .select(".x-grouptabs-sub > li.x-grouptabs-strip-active", true)
        .removeClass("x-grouptabs-strip-active");
    }
    this.expandGroup(this.getGroupEl(a));
    if (a !== this.activeGroup) {
      return this.setActiveGroup(a);
    }
  },
  getFrameHeight: function () {
    var a = this.el.getFrameWidth("tb");
    a +=
      (this.tbar ? this.tbar.getHeight() : 0) +
      (this.bbar ? this.bbar.getHeight() : 0);
    return a;
  },
  adjustBodyWidth: function (a) {
    return a - this.tabWidth;
  },
});
Ext.reg("grouptabpanel", Ext.ux.GroupTabPanel);
Ext.ux.form.ItemSelector = Ext.extend(Ext.form.Field, {
  hideNavIcons: false,
  imagePath: "",
  iconUp: "up2.gif",
  iconDown: "down2.gif",
  iconLeft: "left2.gif",
  iconRight: "right2.gif",
  iconTop: "top2.gif",
  iconBottom: "bottom2.gif",
  drawUpIcon: true,
  drawDownIcon: true,
  drawLeftIcon: true,
  drawRightIcon: true,
  drawTopIcon: true,
  drawBotIcon: true,
  delimiter: ",",
  bodyStyle: null,
  border: false,
  defaultAutoCreate: { tag: "div" },
  multiselects: null,
  initComponent: function () {
    Ext.ux.form.ItemSelector.superclass.initComponent.call(this);
    this.addEvents({ rowdblclick: true, change: true });
  },
  onRender: function (d, a) {
    Ext.ux.form.ItemSelector.superclass.onRender.call(this, d, a);
    var h = [
      {
        legend: "Available",
        draggable: true,
        droppable: true,
        width: 100,
        height: 100,
      },
      {
        legend: "Selected",
        droppable: true,
        draggable: true,
        width: 100,
        height: 100,
      },
    ];
    this.fromMultiselect = new Ext.ux.form.MultiSelect(
      Ext.applyIf(this.multiselects[0], h[0])
    );
    this.fromMultiselect.on("dblclick", this.onRowDblClick, this);
    this.toMultiselect = new Ext.ux.form.MultiSelect(
      Ext.applyIf(this.multiselects[1], h[1])
    );
    this.toMultiselect.on("dblclick", this.onRowDblClick, this);
    var g = new Ext.Panel({
      bodyStyle: this.bodyStyle,
      border: this.border,
      layout: "table",
      layoutConfig: { columns: 3 },
    });
    g.add(this.fromMultiselect);
    var c = new Ext.Panel({ header: false });
    g.add(c);
    g.add(this.toMultiselect);
    g.render(this.el);
    c.el.down("." + c.bwrapCls).remove();
    if (
      this.imagePath != "" &&
      this.imagePath.charAt(this.imagePath.length - 1) != "/"
    ) {
      this.imagePath += "/";
    }
    this.iconUp = this.imagePath + (this.iconUp || "up2.gif");
    this.iconDown = this.imagePath + (this.iconDown || "down2.gif");
    this.iconLeft = this.imagePath + (this.iconLeft || "left2.gif");
    this.iconRight = this.imagePath + (this.iconRight || "right2.gif");
    this.iconTop = this.imagePath + (this.iconTop || "top2.gif");
    this.iconBottom = this.imagePath + (this.iconBottom || "bottom2.gif");
    var f = c.getEl();
    this.toTopIcon = f.createChild({
      tag: "img",
      src: this.iconTop,
      style: { cursor: "pointer", margin: "2px" },
    });
    f.createChild({ tag: "br" });
    this.upIcon = f.createChild({
      tag: "img",
      src: this.iconUp,
      style: { cursor: "pointer", margin: "2px" },
    });
    f.createChild({ tag: "br" });
    this.addIcon = f.createChild({
      tag: "img",
      src: this.iconRight,
      style: { cursor: "pointer", margin: "2px" },
    });
    f.createChild({ tag: "br" });
    this.removeIcon = f.createChild({
      tag: "img",
      src: this.iconLeft,
      style: { cursor: "pointer", margin: "2px" },
    });
    f.createChild({ tag: "br" });
    this.downIcon = f.createChild({
      tag: "img",
      src: this.iconDown,
      style: { cursor: "pointer", margin: "2px" },
    });
    f.createChild({ tag: "br" });
    this.toBottomIcon = f.createChild({
      tag: "img",
      src: this.iconBottom,
      style: { cursor: "pointer", margin: "2px" },
    });
    this.toTopIcon.on("click", this.toTop, this);
    this.upIcon.on("click", this.up, this);
    this.downIcon.on("click", this.down, this);
    this.toBottomIcon.on("click", this.toBottom, this);
    this.addIcon.on("click", this.fromTo, this);
    this.removeIcon.on("click", this.toFrom, this);
    if (!this.drawUpIcon || this.hideNavIcons) {
      this.upIcon.dom.style.display = "none";
    }
    if (!this.drawDownIcon || this.hideNavIcons) {
      this.downIcon.dom.style.display = "none";
    }
    if (!this.drawLeftIcon || this.hideNavIcons) {
      this.addIcon.dom.style.display = "none";
    }
    if (!this.drawRightIcon || this.hideNavIcons) {
      this.removeIcon.dom.style.display = "none";
    }
    if (!this.drawTopIcon || this.hideNavIcons) {
      this.toTopIcon.dom.style.display = "none";
    }
    if (!this.drawBotIcon || this.hideNavIcons) {
      this.toBottomIcon.dom.style.display = "none";
    }
    var b = g.body.first();
    this.el.setWidth(g.body.first().getWidth());
    g.body.removeClass();
    this.hiddenName = this.name;
    var e = { tag: "input", type: "hidden", value: "", name: this.name };
    this.hiddenField = this.el.createChild(e);
  },
  doLayout: function () {
    if (this.rendered) {
      this.fromMultiselect.fs.doLayout();
      this.toMultiselect.fs.doLayout();
    }
  },
  afterRender: function () {
    Ext.ux.form.ItemSelector.superclass.afterRender.call(this);
    this.toStore = this.toMultiselect.store;
    this.toStore.on("add", this.valueChanged, this);
    this.toStore.on("remove", this.valueChanged, this);
    this.toStore.on("load", this.valueChanged, this);
    this.valueChanged(this.toStore);
  },
  toTop: function () {
    var c = this.toMultiselect.view.getSelectedIndexes();
    var a = [];
    if (c.length > 0) {
      c.sort();
      for (var b = 0; b < c.length; b++) {
        record = this.toMultiselect.view.store.getAt(c[b]);
        a.push(record);
      }
      c = [];
      for (var b = a.length - 1; b > -1; b--) {
        record = a[b];
        this.toMultiselect.view.store.remove(record);
        this.toMultiselect.view.store.insert(0, record);
        c.push(a.length - 1 - b);
      }
    }
    this.toMultiselect.view.refresh();
    this.toMultiselect.view.select(c);
  },
  toBottom: function () {
    var c = this.toMultiselect.view.getSelectedIndexes();
    var a = [];
    if (c.length > 0) {
      c.sort();
      for (var b = 0; b < c.length; b++) {
        record = this.toMultiselect.view.store.getAt(c[b]);
        a.push(record);
      }
      c = [];
      for (var b = 0; b < a.length; b++) {
        record = a[b];
        this.toMultiselect.view.store.remove(record);
        this.toMultiselect.view.store.add(record);
        c.push(this.toMultiselect.view.store.getCount() - (a.length - b));
      }
    }
    this.toMultiselect.view.refresh();
    this.toMultiselect.view.select(c);
  },
  up: function () {
    var a = null;
    var c = this.toMultiselect.view.getSelectedIndexes();
    c.sort();
    var d = [];
    if (c.length > 0) {
      for (var b = 0; b < c.length; b++) {
        a = this.toMultiselect.view.store.getAt(c[b]);
        if (c[b] - 1 >= 0) {
          this.toMultiselect.view.store.remove(a);
          this.toMultiselect.view.store.insert(c[b] - 1, a);
          d.push(c[b] - 1);
        }
      }
      this.toMultiselect.view.refresh();
      this.toMultiselect.view.select(d);
    }
  },
  down: function () {
    var a = null;
    var c = this.toMultiselect.view.getSelectedIndexes();
    c.sort();
    c.reverse();
    var d = [];
    if (c.length > 0) {
      for (var b = 0; b < c.length; b++) {
        a = this.toMultiselect.view.store.getAt(c[b]);
        if (c[b] + 1 < this.toMultiselect.view.store.getCount()) {
          this.toMultiselect.view.store.remove(a);
          this.toMultiselect.view.store.insert(c[b] + 1, a);
          d.push(c[b] + 1);
        }
      }
      this.toMultiselect.view.refresh();
      this.toMultiselect.view.select(d);
    }
  },
  fromTo: function () {
    var e = this.fromMultiselect.view.getSelectedIndexes();
    var b = [];
    if (e.length > 0) {
      for (var d = 0; d < e.length; d++) {
        record = this.fromMultiselect.view.store.getAt(e[d]);
        b.push(record);
      }
      if (!this.allowDup) {
        e = [];
      }
      for (var d = 0; d < b.length; d++) {
        record = b[d];
        if (this.allowDup) {
          var a = new Ext.data.Record();
          record.id = a.id;
          delete a;
          this.toMultiselect.view.store.add(record);
        } else {
          this.fromMultiselect.view.store.remove(record);
          this.toMultiselect.view.store.add(record);
          e.push(this.toMultiselect.view.store.getCount() - 1);
        }
      }
    }
    this.toMultiselect.view.refresh();
    this.fromMultiselect.view.refresh();
    var c = this.toMultiselect.store.sortInfo;
    if (c) {
      this.toMultiselect.store.sort(c.field, c.direction);
    }
    this.toMultiselect.view.select(e);
  },
  toFrom: function () {
    var d = this.toMultiselect.view.getSelectedIndexes();
    var a = [];
    if (d.length > 0) {
      for (var c = 0; c < d.length; c++) {
        record = this.toMultiselect.view.store.getAt(d[c]);
        a.push(record);
      }
      d = [];
      for (var c = 0; c < a.length; c++) {
        record = a[c];
        this.toMultiselect.view.store.remove(record);
        if (!this.allowDup) {
          this.fromMultiselect.view.store.add(record);
          d.push(this.fromMultiselect.view.store.getCount() - 1);
        }
      }
    }
    this.fromMultiselect.view.refresh();
    this.toMultiselect.view.refresh();
    var b = this.fromMultiselect.store.sortInfo;
    if (b) {
      this.fromMultiselect.store.sort(b.field, b.direction);
    }
    this.fromMultiselect.view.select(d);
  },
  valueChanged: function (c) {
    var a = null;
    var b = [];
    for (var d = 0; d < c.getCount(); d++) {
      a = c.getAt(d);
      b.push(a.get(this.toMultiselect.valueField));
    }
    this.hiddenField.dom.value = b.join(this.delimiter);
    this.fireEvent("change", this, this.getValue(), this.hiddenField.dom.value);
  },
  getValue: function () {
    return this.hiddenField.dom.value;
  },
  onRowDblClick: function (c, a, b, d) {
    if (c == this.toMultiselect.view) {
      this.toFrom();
    } else {
      if (c == this.fromMultiselect.view) {
        this.fromTo();
      }
    }
    return this.fireEvent("rowdblclick", c, a, b, d);
  },
  reset: function () {
    range = this.toMultiselect.store.getRange();
    this.toMultiselect.store.removeAll();
    this.fromMultiselect.store.add(range);
    var a = this.fromMultiselect.store.sortInfo;
    if (a) {
      this.fromMultiselect.store.sort(a.field, a.direction);
    }
    this.valueChanged(this.toMultiselect.store);
  },
});
Ext.reg("itemselector", Ext.ux.form.ItemSelector);
Ext.ux.ItemSelector = Ext.ux.form.ItemSelector;
Ext.ns("Ext.ux.grid");
Ext.ux.grid.LockingGridView = Ext.extend(Ext.grid.GridView, {
  lockText: "Lock",
  unlockText: "Unlock",
  rowBorderWidth: 1,
  lockedBorderWidth: 1,
  syncHeights: false,
  initTemplates: function () {
    var a = this.templates || {};
    if (!a.masterTpl) {
      a.masterTpl = new Ext.Template(
        '<div class="x-grid3" hidefocus="true">',
        '<div class="x-grid3-locked">',
        '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{lstyle}">{lockedHeader}</div></div><div class="x-clear"></div></div>',
        '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{lstyle}">{lockedBody}</div><div class="x-grid3-scroll-spacer"></div></div>',
        "</div>",
        '<div class="x-grid3-viewport x-grid3-unlocked">',
        '<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>',
        '<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',
        "</div>",
        '<div class="x-grid3-resize-marker">&#160;</div>',
        '<div class="x-grid3-resize-proxy">&#160;</div>',
        "</div>"
      );
    }
    this.templates = a;
    Ext.ux.grid.LockingGridView.superclass.initTemplates.call(this);
  },
  getEditorParent: function (a) {
    return this.el.dom;
  },
  initElements: function () {
    var e = Ext.get(this.grid.getGridEl().dom.firstChild),
      g = e.child("div.x-grid3-locked"),
      c = g.child("div.x-grid3-header"),
      b = g.child("div.x-grid3-scroller"),
      f = e.child("div.x-grid3-viewport"),
      d = f.child("div.x-grid3-header"),
      a = f.child("div.x-grid3-scroller");
    if (this.grid.hideHeaders) {
      c.setDisplayed(false);
      d.setDisplayed(false);
    }
    if (this.forceFit) {
      a.setStyle("overflow-x", "hidden");
    }
    Ext.apply(this, {
      el: e,
      mainWrap: f,
      mainHd: d,
      innerHd: d.dom.firstChild,
      scroller: a,
      mainBody: a.child("div.x-grid3-body"),
      focusEl: a.child("a"),
      resizeMarker: e.child("div.x-grid3-resize-marker"),
      resizeProxy: e.child("div.x-grid3-resize-proxy"),
      lockedWrap: g,
      lockedHd: c,
      lockedScroller: b,
      lockedBody: b.child("div.x-grid3-body"),
      lockedInnerHd: c.child("div.x-grid3-header-inner", true),
    });
    this.focusEl.swallowEvent("click", true);
  },
  getLockedRows: function () {
    return this.hasRows() ? this.lockedBody.dom.childNodes : [];
  },
  getLockedRow: function (a) {
    return this.getLockedRows()[a];
  },
  getCell: function (c, a) {
    var b = this.cm.getLockedCount();
    if (a < b) {
      return this.getLockedRow(c).getElementsByTagName("td")[a];
    }
    return Ext.ux.grid.LockingGridView.superclass.getCell.call(this, c, a - b);
  },
  getHeaderCell: function (a) {
    var b = this.cm.getLockedCount();
    if (a < b) {
      return this.lockedHd.dom.getElementsByTagName("td")[a];
    }
    return Ext.ux.grid.LockingGridView.superclass.getHeaderCell.call(
      this,
      a - b
    );
  },
  addRowClass: function (c, a) {
    var b = this.getLockedRow(c);
    if (b) {
      this.fly(b).addClass(a);
    }
    Ext.ux.grid.LockingGridView.superclass.addRowClass.call(this, c, a);
  },
  removeRowClass: function (c, a) {
    var b = this.getLockedRow(c);
    if (b) {
      this.fly(b).removeClass(a);
    }
    Ext.ux.grid.LockingGridView.superclass.removeRowClass.call(this, c, a);
  },
  removeRow: function (a) {
    Ext.removeNode(this.getLockedRow(a));
    Ext.ux.grid.LockingGridView.superclass.removeRow.call(this, a);
  },
  removeRows: function (c, b) {
    var a = this.lockedBody.dom,
      d = c;
    for (; d <= b; d++) {
      Ext.removeNode(a.childNodes[c]);
    }
    Ext.ux.grid.LockingGridView.superclass.removeRows.call(this, c, b);
  },
  syncScroll: function (a) {
    this.lockedScroller.dom.scrollTop = this.scroller.dom.scrollTop;
    Ext.ux.grid.LockingGridView.superclass.syncScroll.call(this, a);
  },
  updateSortIcon: function (d, c) {
    var a = this.sortClasses,
      e = this.lockedHd.select("td").removeClass(a),
      g = this.mainHd.select("td").removeClass(a),
      f = this.cm.getLockedCount(),
      b = a[c == "DESC" ? 1 : 0];
    if (d < f) {
      e.item(d).addClass(b);
    } else {
      g.item(d - f).addClass(b);
    }
  },
  updateAllColumnWidths: function () {
    var g = this.getTotalWidth(),
      n = this.cm.getColumnCount(),
      b = this.getLockedWidth(),
      d = this.cm.getLockedCount(),
      k = [],
      h,
      e;
    this.updateLockedWidth();
    for (e = 0; e < n; e++) {
      k[e] = this.getColumnWidth(e);
      var f = this.getHeaderCell(e);
      f.style.width = k[e];
    }
    var a = this.getLockedRows(),
      m = this.getRows(),
      o,
      l,
      c;
    for (e = 0, h = m.length; e < h; e++) {
      o = a[e];
      o.style.width = b;
      if (o.firstChild) {
        o.firstChild.style.width = b;
        l = o.firstChild.rows[0];
        for (c = 0; c < d; c++) {
          l.childNodes[c].style.width = k[c];
        }
      }
      o = m[e];
      o.style.width = g;
      if (o.firstChild) {
        o.firstChild.style.width = g;
        l = o.firstChild.rows[0];
        for (c = d; c < n; c++) {
          l.childNodes[c - d].style.width = k[c];
        }
      }
    }
    this.onAllColumnWidthsUpdated(k, g);
    this.syncHeaderHeight();
  },
  updateColumnWidth: function (d, a) {
    var l = this.getColumnWidth(d),
      e = this.cm.getLockedCount(),
      k,
      b,
      j,
      m;
    this.updateLockedWidth();
    if (d < e) {
      k = this.getLockedRows();
      b = this.getLockedWidth();
      j = d;
    } else {
      k = this.getRows();
      b = this.getTotalWidth();
      j = d - e;
    }
    var g = this.getHeaderCell(d);
    g.style.width = l;
    for (var f = 0, h = k.length; f < h; f++) {
      m = k[f];
      m.style.width = b;
      if (m.firstChild) {
        m.firstChild.style.width = b;
        m.firstChild.rows[0].childNodes[j].style.width = l;
      }
    }
    this.onColumnWidthUpdated(d, l, this.getTotalWidth());
    this.syncHeaderHeight();
  },
  updateColumnHidden: function (b, g) {
    var d = this.cm.getLockedCount(),
      l,
      a,
      k,
      m,
      j = g ? "none" : "";
    this.updateLockedWidth();
    if (b < d) {
      l = this.getLockedRows();
      a = this.getLockedWidth();
      k = b;
    } else {
      l = this.getRows();
      a = this.getTotalWidth();
      k = b - d;
    }
    var f = this.getHeaderCell(b);
    f.style.display = j;
    for (var e = 0, h = l.length; e < h; e++) {
      m = l[e];
      m.style.width = a;
      if (m.firstChild) {
        m.firstChild.style.width = a;
        m.firstChild.rows[0].childNodes[k].style.display = j;
      }
    }
    this.onColumnHiddenUpdated(b, g, this.getTotalWidth());
    delete this.lastViewWidth;
    this.layout();
  },
  doRender: function (g, l, t, a, s, x) {
    var d = this.templates,
      f = d.cell,
      h = d.row,
      n = s - 1,
      e = "width:" + this.getTotalWidth() + ";",
      b = "width:" + this.getLockedWidth() + ";",
      A = [],
      D = [],
      v,
      k,
      B,
      u = {},
      m = {},
      q;
    for (var w = 0, z = l.length; w < z; w++) {
      q = l[w];
      v = [];
      k = [];
      var o = w + a;
      for (var y = 0; y < s; y++) {
        B = g[y];
        u.id = B.id;
        u.css =
          (y === 0
            ? "x-grid3-cell-first "
            : y == n
            ? "x-grid3-cell-last "
            : "") +
          (this.cm.config[y].cellCls ? " " + this.cm.config[y].cellCls : "");
        u.attr = u.cellAttr = "";
        u.value = B.renderer(q.data[B.name], u, q, o, y, t);
        u.style = B.style;
        if (Ext.isEmpty(u.value)) {
          u.value = "&#160;";
        }
        if (this.markDirty && q.dirty && Ext.isDefined(q.modified[B.name])) {
          u.css += " x-grid3-dirty-cell";
        }
        if (B.locked) {
          k[k.length] = f.apply(u);
        } else {
          v[v.length] = f.apply(u);
        }
      }
      var C = [];
      if (x && (o + 1) % 2 === 0) {
        C[0] = "x-grid3-row-alt";
      }
      if (q.dirty) {
        C[1] = " x-grid3-dirty-row";
      }
      m.cols = s;
      if (this.getRowClass) {
        C[2] = this.getRowClass(q, o, m, t);
      }
      m.alt = C.join(" ");
      m.cells = v.join("");
      m.tstyle = e;
      A[A.length] = h.apply(m);
      m.cells = k.join("");
      m.tstyle = b;
      D[D.length] = h.apply(m);
    }
    return [A.join(""), D.join("")];
  },
  processRows: function (b, h) {
    if (!this.ds || this.ds.getCount() < 1) {
      return;
    }
    var f = this.getRows(),
      e = this.getLockedRows(),
      g,
      d;
    h = h || !this.grid.stripeRows;
    b = b || 0;
    for (var c = 0, a = f.length; c < a; ++c) {
      g = f[c];
      d = e[c];
      g.rowIndex = c;
      d.rowIndex = c;
      if (!h) {
        g.className = g.className.replace(this.rowClsRe, " ");
        d.className = d.className.replace(this.rowClsRe, " ");
        if ((c + 1) % 2 === 0) {
          g.className += " x-grid3-row-alt";
          d.className += " x-grid3-row-alt";
        }
      }
      this.syncRowHeights(g, d);
    }
    if (b === 0) {
      Ext.fly(f[0]).addClass(this.firstRowCls);
      Ext.fly(e[0]).addClass(this.firstRowCls);
    }
    Ext.fly(f[f.length - 1]).addClass(this.lastRowCls);
    Ext.fly(e[e.length - 1]).addClass(this.lastRowCls);
  },
  syncRowHeights: function (f, e) {
    if (this.syncHeights) {
      var d = Ext.get(f),
        b = Ext.get(e),
        c = d.getHeight(),
        a = b.getHeight();
      if (c > a) {
        b.setHeight(c);
      } else {
        if (a > c) {
          d.setHeight(a);
        }
      }
    }
  },
  afterRender: function () {
    if (!this.ds || !this.cm) {
      return;
    }
    var a = this.renderRows() || ["&#160;", "&#160;"];
    this.mainBody.dom.innerHTML = a[0];
    this.lockedBody.dom.innerHTML = a[1];
    this.processRows(0, true);
    if (this.deferEmptyText !== true) {
      this.applyEmptyText();
    }
    this.grid.fireEvent("viewready", this.grid);
  },
  renderUI: function () {
    var b = this.templates,
      c = this.renderHeaders(),
      a = b.body.apply({ rows: "&#160;" });
    return b.masterTpl.apply({
      body: a,
      header: c[0],
      ostyle: "width:" + this.getOffsetWidth() + ";",
      bstyle: "width:" + this.getTotalWidth() + ";",
      lockedBody: a,
      lockedHeader: c[1],
      lstyle: "width:" + this.getLockedWidth() + ";",
    });
  },
  afterRenderUI: function () {
    var a = this.grid;
    this.initElements();
    Ext.fly(this.innerHd).on("click", this.handleHdDown, this);
    Ext.fly(this.lockedInnerHd).on("click", this.handleHdDown, this);
    this.mainHd.on({
      scope: this,
      mouseover: this.handleHdOver,
      mouseout: this.handleHdOut,
      mousemove: this.handleHdMove,
    });
    this.lockedHd.on({
      scope: this,
      mouseover: this.handleHdOver,
      mouseout: this.handleHdOut,
      mousemove: this.handleHdMove,
    });
    this.scroller.on("scroll", this.syncScroll, this);
    if (a.enableColumnResize !== false) {
      this.splitZone = new Ext.grid.GridView.SplitDragZone(a, this.mainHd.dom);
      this.splitZone.setOuterHandleElId(Ext.id(this.lockedHd.dom));
      this.splitZone.setOuterHandleElId(Ext.id(this.mainHd.dom));
    }
    if (a.enableColumnMove) {
      this.columnDrag = new Ext.grid.GridView.ColumnDragZone(a, this.innerHd);
      this.columnDrag.setOuterHandleElId(Ext.id(this.lockedInnerHd));
      this.columnDrag.setOuterHandleElId(Ext.id(this.innerHd));
      this.columnDrop = new Ext.grid.HeaderDropZone(a, this.mainHd.dom);
    }
    if (a.enableHdMenu !== false) {
      this.hmenu = new Ext.menu.Menu({ id: a.id + "-hctx" });
      this.hmenu.add(
        { itemId: "asc", text: this.sortAscText, cls: "xg-hmenu-sort-asc" },
        { itemId: "desc", text: this.sortDescText, cls: "xg-hmenu-sort-desc" }
      );
      if (this.grid.enableColLock !== false) {
        this.hmenu.add(
          { itemId: "sortSep", xtype: "menuseparator" },
          { itemId: "lock", text: this.lockText, cls: "xg-hmenu-lock" },
          { itemId: "unlock", text: this.unlockText, cls: "xg-hmenu-unlock" }
        );
      }
      if (a.enableColumnHide !== false) {
        this.colMenu = new Ext.menu.Menu({ id: a.id + "-hcols-menu" });
        this.colMenu.on({
          scope: this,
          beforeshow: this.beforeColMenuShow,
          itemclick: this.handleHdMenuClick,
        });
        this.hmenu.add("-", {
          itemId: "columns",
          hideOnClick: false,
          text: this.columnsText,
          menu: this.colMenu,
          iconCls: "x-cols-icon",
        });
      }
      this.hmenu.on("itemclick", this.handleHdMenuClick, this);
    }
    if (a.trackMouseOver) {
      this.mainBody.on({
        scope: this,
        mouseover: this.onRowOver,
        mouseout: this.onRowOut,
      });
      this.lockedBody.on({
        scope: this,
        mouseover: this.onRowOver,
        mouseout: this.onRowOut,
      });
    }
    if (a.enableDragDrop || a.enableDrag) {
      this.dragZone = new Ext.grid.GridDragZone(a, {
        ddGroup: a.ddGroup || "GridDD",
      });
    }
    this.updateHeaderSortState();
  },
  layout: function () {
    if (!this.mainBody) {
      return;
    }
    var d = this.grid;
    var h = d.getGridEl();
    var a = h.getSize(true);
    var b = a.width;
    if (!d.hideHeaders && (b < 20 || a.height < 20)) {
      return;
    }
    this.syncHeaderHeight();
    if (d.autoHeight) {
      this.scroller.dom.style.overflow = "visible";
      this.lockedScroller.dom.style.overflow = "visible";
      if (Ext.isWebKit) {
        this.scroller.dom.style.position = "static";
        this.lockedScroller.dom.style.position = "static";
      }
    } else {
      this.el.setSize(a.width, a.height);
      var f = this.mainHd.getHeight();
      var e = a.height - f;
    }
    this.updateLockedWidth();
    if (this.forceFit) {
      if (this.lastViewWidth != b) {
        this.fitColumns(false, false);
        this.lastViewWidth = b;
      }
    } else {
      this.autoExpand();
      this.syncHeaderScroll();
    }
    this.onLayout(b, e);
  },
  getOffsetWidth: function () {
    return (
      this.cm.getTotalWidth() -
      this.cm.getTotalLockedWidth() +
      this.getScrollOffset() +
      "px"
    );
  },
  renderHeaders: function () {
    var h = this.cm,
      f = this.templates,
      d = f.hcell,
      b = [],
      g = [],
      a = {},
      e = h.getColumnCount(),
      j = e - 1;
    for (var c = 0; c < e; c++) {
      a.id = h.getColumnId(c);
      a.value = h.getColumnHeader(c) || "";
      a.style = this.getColumnStyle(c, true);
      a.tooltip = this.getColumnTooltip(c);
      a.css =
        (c === 0 ? "x-grid3-cell-first " : c == j ? "x-grid3-cell-last " : "") +
        (h.config[c].headerCls ? " " + h.config[c].headerCls : "");
      if (h.config[c].align == "right") {
        a.istyle = "padding-right:16px";
      } else {
        delete a.istyle;
      }
      if (h.isLocked(c)) {
        g[g.length] = d.apply(a);
      } else {
        b[b.length] = d.apply(a);
      }
    }
    return [
      f.header.apply({
        cells: b.join(""),
        tstyle: "width:" + this.getTotalWidth() + ";",
      }),
      f.header.apply({
        cells: g.join(""),
        tstyle: "width:" + this.getLockedWidth() + ";",
      }),
    ];
  },
  updateHeaders: function () {
    var b = this.renderHeaders();
    this.innerHd.firstChild.innerHTML = b[0];
    this.innerHd.firstChild.style.width = this.getOffsetWidth();
    this.innerHd.firstChild.firstChild.style.width = this.getTotalWidth();
    this.lockedInnerHd.firstChild.innerHTML = b[1];
    var a = this.getLockedWidth();
    this.lockedInnerHd.firstChild.style.width = a;
    this.lockedInnerHd.firstChild.firstChild.style.width = a;
  },
  getResolvedXY: function (a) {
    if (!a) {
      return null;
    }
    var d = a.cell,
      b = a.row;
    return d ? Ext.fly(d).getXY() : [this.scroller.getX(), Ext.fly(b).getY()];
  },
  syncFocusEl: function (c, a, b) {
    Ext.ux.grid.LockingGridView.superclass.syncFocusEl.call(
      this,
      c,
      a,
      a < this.cm.getLockedCount() ? false : b
    );
  },
  ensureVisible: function (c, a, b) {
    return Ext.ux.grid.LockingGridView.superclass.ensureVisible.call(
      this,
      c,
      a,
      a < this.cm.getLockedCount() ? false : b
    );
  },
  insertRows: function (a, g, d, f) {
    var c = a.getCount() - 1;
    if (!f && g === 0 && d >= c) {
      this.refresh();
    } else {
      if (!f) {
        this.fireEvent("beforerowsinserted", this, g, d);
      }
      var b = this.renderRows(g, d),
        e = this.getRow(g);
      if (e) {
        if (g === 0) {
          this.removeRowClass(0, this.firstRowCls);
        }
        Ext.DomHelper.insertHtml("beforeBegin", e, b[0]);
        e = this.getLockedRow(g);
        Ext.DomHelper.insertHtml("beforeBegin", e, b[1]);
      } else {
        this.removeRowClass(c - 1, this.lastRowCls);
        Ext.DomHelper.insertHtml("beforeEnd", this.mainBody.dom, b[0]);
        Ext.DomHelper.insertHtml("beforeEnd", this.lockedBody.dom, b[1]);
      }
      if (!f) {
        this.fireEvent("rowsinserted", this, g, d);
        this.processRows(g);
      } else {
        if (g === 0 || g >= c) {
          this.addRowClass(g, g === 0 ? this.firstRowCls : this.lastRowCls);
        }
      }
    }
    this.syncFocusEl(g);
  },
  getColumnStyle: function (a, c) {
    var b = !c
      ? this.cm.config[a].cellStyle || this.cm.config[a].css || ""
      : this.cm.config[a].headerStyle || "";
    b += "width:" + this.getColumnWidth(a) + ";";
    if (this.cm.isHidden(a)) {
      b += "display:none;";
    }
    var d = this.cm.config[a].align;
    if (d) {
      b += "text-align:" + d + ";";
    }
    return b;
  },
  getLockedWidth: function () {
    return this.cm.getTotalLockedWidth() + "px";
  },
  getTotalWidth: function () {
    return this.cm.getTotalWidth() - this.cm.getTotalLockedWidth() + "px";
  },
  getColumnData: function () {
    var d = [],
      a = this.cm,
      e = a.getColumnCount();
    for (var c = 0; c < e; c++) {
      var b = a.getDataIndex(c);
      d[c] = {
        name: !Ext.isDefined(b) ? this.ds.fields.get(c).name : b,
        renderer: a.getRenderer(c),
        scope: a.getRendererScope(c),
        id: a.getColumnId(c),
        style: this.getColumnStyle(c),
        locked: a.isLocked(c),
      };
    }
    return d;
  },
  renderBody: function () {
    var a = this.renderRows() || ["&#160;", "&#160;"];
    return [
      this.templates.body.apply({ rows: a[0] }),
      this.templates.body.apply({ rows: a[1] }),
    ];
  },
  refreshRow: function (c) {
    var g = this.ds,
      r = this.cm.getColumnCount(),
      b = this.getColumnData(),
      l = r - 1,
      a = ["x-grid3-row"],
      k = { tstyle: String.format("width: {0};", this.getTotalWidth()) },
      j = { tstyle: String.format("width: {0};", this.getLockedWidth()) },
      f = [],
      e = [],
      o = this.templates.cell,
      n,
      h,
      m,
      d,
      q,
      p,
      s;
    if (Ext.isNumber(c)) {
      n = c;
      c = g.getAt(n);
    } else {
      n = g.indexOf(c);
    }
    if (!c || n < 0) {
      return;
    }
    for (s = 0; s < r; s++) {
      d = b[s];
      if (s == 0) {
        p = "x-grid3-cell-first";
      } else {
        p = s == l ? "x-grid3-cell-last " : "";
      }
      q = { id: d.id, style: d.style, css: p, attr: "", cellAttr: "" };
      q.value = d.renderer.call(d.scope, c.data[d.name], q, c, n, s, g);
      if (Ext.isEmpty(q.value)) {
        q.value = " ";
      }
      if (
        this.markDirty &&
        c.dirty &&
        typeof c.modified[d.name] != "undefined"
      ) {
        q.css += " x-grid3-dirty-cell";
      }
      if (d.locked) {
        e[s] = o.apply(q);
      } else {
        f[s] = o.apply(q);
      }
    }
    h = this.getRow(n);
    h.className = "";
    m = this.getLockedRow(n);
    m.className = "";
    if (this.grid.stripeRows && (n + 1) % 2 === 0) {
      a.push("x-grid3-row-alt");
    }
    if (this.getRowClass) {
      k.cols = r;
      a.push(this.getRowClass(c, n, k, g));
    }
    this.fly(h).addClass(a).setStyle(k.tstyle);
    k.cells = f.join("");
    h.innerHTML = this.templates.rowInner.apply(k);
    this.fly(m).addClass(a).setStyle(j.tstyle);
    j.cells = e.join("");
    m.innerHTML = this.templates.rowInner.apply(j);
    m.rowIndex = n;
    this.syncRowHeights(h, m);
    this.fireEvent("rowupdated", this, n, c);
  },
  refresh: function (b) {
    this.fireEvent("beforerefresh", this);
    this.grid.stopEditing(true);
    var a = this.renderBody();
    this.mainBody.update(a[0]).setWidth(this.getTotalWidth());
    this.lockedBody.update(a[1]).setWidth(this.getLockedWidth());
    if (b === true) {
      this.updateHeaders();
      this.updateHeaderSortState();
    }
    this.processRows(0, true);
    this.layout();
    this.applyEmptyText();
    this.fireEvent("refresh", this);
  },
  onDenyColumnLock: function () {},
  initData: function (b, a) {
    if (this.cm) {
      this.cm.un("columnlockchange", this.onColumnLock, this);
    }
    Ext.ux.grid.LockingGridView.superclass.initData.call(this, b, a);
    if (this.cm) {
      this.cm.on("columnlockchange", this.onColumnLock, this);
    }
  },
  onColumnLock: function () {
    this.refresh(true);
  },
  handleHdMenuClick: function (d) {
    var b = this.hdCtxIndex,
      a = this.cm,
      e = d.getItemId(),
      c = a.getLockedCount();
    switch (e) {
      case "lock":
        if (a.getColumnCount(true) <= c + 1) {
          this.onDenyColumnLock();
          return undefined;
        }
        a.setLocked(b, true, c != b);
        if (c != b) {
          a.moveColumn(b, c);
          this.grid.fireEvent("columnmove", b, c);
        }
        break;
      case "unlock":
        if (c - 1 != b) {
          a.setLocked(b, false, true);
          a.moveColumn(b, c - 1);
          this.grid.fireEvent("columnmove", b, c - 1);
        } else {
          a.setLocked(b, false);
        }
        break;
      default:
        return Ext.ux.grid.LockingGridView.superclass.handleHdMenuClick.call(
          this,
          d
        );
    }
    return true;
  },
  handleHdDown: function (g, d) {
    Ext.ux.grid.LockingGridView.superclass.handleHdDown.call(this, g, d);
    if (this.grid.enableColLock !== false) {
      if (Ext.fly(d).hasClass("x-grid3-hd-btn")) {
        var f = this.findHeaderCell(d),
          c = this.getCellIndex(f),
          b = this.hmenu.items,
          a = this.cm;
        b.get("lock").setDisabled(a.isLocked(c));
        b.get("unlock").setDisabled(!a.isLocked(c));
      }
    }
  },
  syncHeaderHeight: function () {
    var d = Ext.fly(this.innerHd).child("tr", true),
      b = Ext.fly(this.lockedInnerHd).child("tr", true);
    d.style.height = "auto";
    b.style.height = "auto";
    var e = d.offsetHeight,
      c = b.offsetHeight,
      a = Math.max(c, e) + "px";
    d.style.height = a;
    b.style.height = a;
  },
  updateLockedWidth: function () {
    var g = this.cm.getTotalLockedWidth(),
      a = this.cm.getTotalWidth() - g,
      c = this.grid.getGridEl().getSize(true),
      b = Ext.isBorderBox ? 0 : this.lockedBorderWidth,
      d = Ext.isBorderBox ? 0 : this.rowBorderWidth,
      e = Math.max(c.width - g - b - d, 0) + "px",
      f = this.getScrollOffset();
    if (!this.grid.autoHeight) {
      var h = Math.max(c.height - this.mainHd.getHeight(), 0) + "px";
      this.lockedScroller.dom.style.height = h;
      this.scroller.dom.style.height = h;
    }
    this.lockedWrap.dom.style.width = g + d + "px";
    this.scroller.dom.style.width = e;
    this.mainWrap.dom.style.left = g + b + d + "px";
    if (this.innerHd) {
      this.lockedInnerHd.firstChild.style.width = g + "px";
      this.lockedInnerHd.firstChild.firstChild.style.width = g + "px";
      this.innerHd.style.width = e;
      this.innerHd.firstChild.style.width = a + d + f + "px";
      this.innerHd.firstChild.firstChild.style.width = a + "px";
    }
    if (this.mainBody) {
      this.lockedBody.dom.style.width = g + d + "px";
      this.mainBody.dom.style.width = a + d + "px";
    }
  },
});
Ext.ux.grid.LockingColumnModel = Ext.extend(Ext.grid.ColumnModel, {
  isLocked: function (a) {
    return this.config[a].locked === true;
  },
  setLocked: function (b, c, a) {
    if (this.isLocked(b) == c) {
      return;
    }
    this.config[b].locked = c;
    if (!a) {
      this.fireEvent("columnlockchange", this, b, c);
    }
  },
  getTotalLockedWidth: function () {
    var b = 0;
    for (var c = 0, a = this.config.length; c < a; c++) {
      if (this.isLocked(c) && !this.isHidden(c)) {
        b += this.getColumnWidth(c);
      }
    }
    return b;
  },
  getLockedCount: function () {
    var a = this.config.length;
    for (var b = 0; b < a; b++) {
      if (!this.isLocked(b)) {
        return b;
      }
    }
    return a;
  },
  moveColumn: function (d, c) {
    var a = this.isLocked(d),
      b = this.isLocked(c);
    if (d < c && a && !b) {
      this.setLocked(d, false, true);
    } else {
      if (d > c && !a && b) {
        this.setLocked(d, true, true);
      }
    }
    Ext.ux.grid.LockingColumnModel.superclass.moveColumn.apply(this, arguments);
  },
});
Ext.ns("Ext.ux.form");
Ext.ux.form.MultiSelect = Ext.extend(Ext.form.Field, {
  ddReorder: false,
  appendOnly: false,
  width: 100,
  height: 100,
  displayField: 0,
  valueField: 1,
  allowBlank: true,
  minSelections: 0,
  maxSelections: Number.MAX_VALUE,
  blankText: Ext.form.TextField.prototype.blankText,
  minSelectionsText: "Minimum {0} item(s) required",
  maxSelectionsText: "Maximum {0} item(s) allowed",
  delimiter: ",",
  cls: "ux-form-multiselect",
  defaultAutoCreate: { tag: "div" },
  initComponent: function () {
    Ext.ux.form.MultiSelect.superclass.initComponent.call(this);
    if (Ext.isArray(this.store)) {
      if (Ext.isArray(this.store[0])) {
        this.store = new Ext.data.ArrayStore({
          fields: ["value", "text"],
          data: this.store,
        });
        this.valueField = "value";
      } else {
        this.store = new Ext.data.ArrayStore({
          fields: ["text"],
          data: this.store,
          expandData: true,
        });
        this.valueField = "text";
      }
      this.displayField = "text";
    } else {
      this.store = Ext.StoreMgr.lookup(this.store);
    }
    this.addEvents({ dblclick: true, click: true, change: true, drop: true });
  },
  onRender: function (c, b) {
    Ext.ux.form.MultiSelect.superclass.onRender.call(this, c, b);
    var a = (this.fs = new Ext.form.FieldSet({
      renderTo: this.el,
      title: this.legend,
      height: this.height,
      width: this.width,
      style: "padding:0;",
      tbar: this.tbar,
    }));
    a.body.addClass("ux-mselect");
    this.view = new Ext.ListView({
      selectedClass: "ux-mselect-selected",
      multiSelect: true,
      store: this.store,
      columns: [{ header: "Value", width: 1, dataIndex: this.displayField }],
      hideHeaders: true,
    });
    a.add(this.view);
    this.view.on("click", this.onViewClick, this);
    this.view.on("beforeclick", this.onViewBeforeClick, this);
    this.view.on("dblclick", this.onViewDblClick, this);
    this.hiddenName = this.name || Ext.id();
    var d = { tag: "input", type: "hidden", value: "", name: this.hiddenName };
    this.hiddenField = this.el.createChild(d);
    this.hiddenField.dom.disabled = this.hiddenName != this.name;
    a.doLayout();
  },
  afterRender: function () {
    Ext.ux.form.MultiSelect.superclass.afterRender.call(this);
    if (this.ddReorder && !this.dragGroup && !this.dropGroup) {
      this.dragGroup = this.dropGroup = "MultiselectDD-" + Ext.id();
    }
    if (this.draggable || this.dragGroup) {
      this.dragZone = new Ext.ux.form.MultiSelect.DragZone(this, {
        ddGroup: this.dragGroup,
      });
    }
    if (this.droppable || this.dropGroup) {
      this.dropZone = new Ext.ux.form.MultiSelect.DropZone(this, {
        ddGroup: this.dropGroup,
      });
    }
  },
  onViewClick: function (c, a, b, d) {
    this.fireEvent("change", this, this.getValue(), this.hiddenField.dom.value);
    this.hiddenField.dom.value = this.getValue();
    this.fireEvent("click", this, d);
    this.validate();
  },
  onViewBeforeClick: function (c, a, b, d) {
    if (this.disabled || this.readOnly) {
      return false;
    }
  },
  onViewDblClick: function (c, a, b, d) {
    return this.fireEvent("dblclick", c, a, b, d);
  },
  getValue: function (a) {
    var d = [];
    var c = this.view.getSelectedIndexes();
    if (c.length == 0) {
      return "";
    }
    for (var b = 0; b < c.length; b++) {
      d.push(this.store.getAt(c[b]).get(a != null ? a : this.valueField));
    }
    return d.join(this.delimiter);
  },
  setValue: function (a) {
    var b;
    var d = [];
    this.view.clearSelections();
    this.hiddenField.dom.value = "";
    if (!a || a == "") {
      return;
    }
    if (!Ext.isArray(a)) {
      a = a.split(this.delimiter);
    }
    for (var c = 0; c < a.length; c++) {
      b = this.view.store.indexOf(
        this.view.store
          .query(this.valueField, new RegExp("^" + a[c] + "$", "i"))
          .itemAt(0)
      );
      d.push(b);
    }
    this.view.select(d);
    this.hiddenField.dom.value = this.getValue();
    this.validate();
  },
  reset: function () {
    this.setValue("");
  },
  getRawValue: function (a) {
    var b = this.getValue(a);
    if (b.length) {
      b = b.split(this.delimiter);
    } else {
      b = [];
    }
    return b;
  },
  setRawValue: function (a) {
    setValue(a);
  },
  validateValue: function (a) {
    if (a.length < 1) {
      if (this.allowBlank) {
        this.clearInvalid();
        return true;
      } else {
        this.markInvalid(this.blankText);
        return false;
      }
    }
    if (a.length < this.minSelections) {
      this.markInvalid(
        String.format(this.minSelectionsText, this.minSelections)
      );
      return false;
    }
    if (a.length > this.maxSelections) {
      this.markInvalid(
        String.format(this.maxSelectionsText, this.maxSelections)
      );
      return false;
    }
    return true;
  },
  disable: function () {
    this.disabled = true;
    this.hiddenField.dom.disabled = true;
    this.fs.disable();
  },
  enable: function () {
    this.disabled = false;
    this.hiddenField.dom.disabled = false;
    this.fs.enable();
  },
  destroy: function () {
    Ext.destroy(this.fs, this.dragZone, this.dropZone);
    Ext.ux.form.MultiSelect.superclass.destroy.call(this);
  },
});
Ext.reg("multiselect", Ext.ux.form.MultiSelect);
Ext.ux.Multiselect = Ext.ux.form.MultiSelect;
Ext.ux.form.MultiSelect.DragZone = function (d, c) {
  this.ms = d;
  this.view = d.view;
  var b = c.ddGroup || "MultiselectDD";
  var a;
  if (Ext.isArray(b)) {
    a = b.shift();
  } else {
    a = b;
    b = null;
  }
  Ext.ux.form.MultiSelect.DragZone.superclass.constructor.call(
    this,
    this.ms.fs.body,
    { containerScroll: true, ddGroup: a }
  );
  this.setDraggable(b);
};
Ext.extend(Ext.ux.form.MultiSelect.DragZone, Ext.dd.DragZone, {
  onInitDrag: function (a, c) {
    var b = Ext.get(this.dragData.ddel.cloneNode(true));
    this.proxy.update(b.dom);
    b.setWidth(b.child("em").getWidth());
    this.onStartDrag(a, c);
    return true;
  },
  collectSelection: function (b) {
    b.repairXY = Ext.fly(this.view.getSelectedNodes()[0]).getXY();
    var a = 0;
    this.view.store.each(function (d) {
      if (this.view.isSelected(a)) {
        var e = this.view.getNode(a);
        var c = e.cloneNode(true);
        c.id = Ext.id();
        b.ddel.appendChild(c);
        b.records.push(this.view.store.getAt(a));
        b.viewNodes.push(e);
      }
      a++;
    }, this);
  },
  onEndDrag: function (a, b) {
    var c = Ext.get(this.dragData.ddel);
    if (c && c.hasClass("multi-proxy")) {
      c.remove();
    }
  },
  getDragData: function (d) {
    var c = this.view.findItemFromChild(d.getTarget());
    if (c) {
      if (!this.view.isSelected(c) && !d.ctrlKey && !d.shiftKey) {
        this.view.select(c);
        this.ms.setValue(this.ms.getValue());
      }
      if (this.view.getSelectionCount() == 0 || d.ctrlKey || d.shiftKey) {
        return false;
      }
      var b = { sourceView: this.view, viewNodes: [], records: [] };
      if (this.view.getSelectionCount() == 1) {
        var a = this.view.getSelectedIndexes()[0];
        var f = this.view.getNode(a);
        b.viewNodes.push((b.ddel = f));
        b.records.push(this.view.store.getAt(a));
        b.repairXY = Ext.fly(f).getXY();
      } else {
        b.ddel = document.createElement("div");
        b.ddel.className = "multi-proxy";
        this.collectSelection(b);
      }
      return b;
    }
    return false;
  },
  getRepairXY: function (a) {
    return this.dragData.repairXY;
  },
  setDraggable: function (a) {
    if (!a) {
      return;
    }
    if (Ext.isArray(a)) {
      Ext.each(a, this.setDraggable, this);
      return;
    }
    this.addToGroup(a);
  },
});
Ext.ux.form.MultiSelect.DropZone = function (d, c) {
  this.ms = d;
  this.view = d.view;
  var b = c.ddGroup || "MultiselectDD";
  var a;
  if (Ext.isArray(b)) {
    a = b.shift();
  } else {
    a = b;
    b = null;
  }
  Ext.ux.form.MultiSelect.DropZone.superclass.constructor.call(
    this,
    this.ms.fs.body,
    { containerScroll: true, ddGroup: a }
  );
  this.setDroppable(b);
};
Ext.extend(Ext.ux.form.MultiSelect.DropZone, Ext.dd.DropZone, {
  getTargetFromEvent: function (b) {
    var a = b.getTarget();
    return a;
  },
  getDropPoint: function (g, k, d) {
    if (k == this.ms.fs.body.dom) {
      return "below";
    }
    var f = Ext.lib.Dom.getY(k),
      a = f + k.offsetHeight;
    var j = f + (a - f) / 2;
    var h = Ext.lib.Event.getPageY(g);
    if (h <= j) {
      return "above";
    } else {
      return "below";
    }
  },
  isValidDropPoint: function (b, e, a) {
    if (!a.viewNodes || a.viewNodes.length != 1) {
      return true;
    }
    var c = a.viewNodes[0];
    if (c == e) {
      return false;
    }
    if (b == "below" && e.nextSibling == c) {
      return false;
    }
    if (b == "above" && e.previousSibling == c) {
      return false;
    }
    return true;
  },
  onNodeEnter: function (d, a, c, b) {
    return false;
  },
  onNodeOver: function (h, a, g, d) {
    var b = this.dropNotAllowed;
    var f = this.getDropPoint(g, h, a);
    if (this.isValidDropPoint(f, h, d)) {
      if (this.ms.appendOnly) {
        return "x-tree-drop-ok-below";
      }
      if (f) {
        var c;
        if (f == "above") {
          b = h.previousSibling
            ? "x-tree-drop-ok-between"
            : "x-tree-drop-ok-above";
          c = "x-view-drag-insert-above";
        } else {
          b = h.nextSibling ? "x-tree-drop-ok-between" : "x-tree-drop-ok-below";
          c = "x-view-drag-insert-below";
        }
        if (this.lastInsertClass != c) {
          Ext.fly(h).replaceClass(this.lastInsertClass, c);
          this.lastInsertClass = c;
        }
      }
    }
    return b;
  },
  onNodeOut: function (d, a, c, b) {
    this.removeDropIndicators(d);
  },
  onNodeDrop: function (b, j, h, f) {
    if (this.ms.fireEvent("drop", this, b, j, h, f) === false) {
      return false;
    }
    var k = this.getDropPoint(h, b, j);
    if (b != this.ms.fs.body.dom) {
      b = this.view.findItemFromChild(b);
    }
    if (this.ms.appendOnly) {
      insertAt = this.view.store.getCount();
    } else {
      insertAt =
        b == this.ms.fs.body.dom
          ? this.view.store.getCount() - 1
          : this.view.indexOf(b);
      if (k == "below") {
        insertAt++;
      }
    }
    var c = false;
    if (f.sourceView == this.view) {
      if (k == "below") {
        if (f.viewNodes[0] == b) {
          f.viewNodes.shift();
        }
      } else {
        if (f.viewNodes[f.viewNodes.length - 1] == b) {
          f.viewNodes.pop();
        }
      }
      if (!f.viewNodes.length) {
        return false;
      }
      if (insertAt > this.view.store.indexOf(f.records[0])) {
        c = "down";
        insertAt--;
      }
    }
    for (var g = 0; g < f.records.length; g++) {
      var a = f.records[g];
      if (f.sourceView) {
        f.sourceView.store.remove(a);
      }
      this.view.store.insert(c == "down" ? insertAt : insertAt++, a);
      var d = this.view.store.sortInfo;
      if (d) {
        this.view.store.sort(d.field, d.direction);
      }
    }
    return true;
  },
  removeDropIndicators: function (a) {
    if (a) {
      Ext.fly(a).removeClass([
        "x-view-drag-insert-above",
        "x-view-drag-insert-left",
        "x-view-drag-insert-right",
        "x-view-drag-insert-below",
      ]);
      this.lastInsertClass = "_noclass";
    }
  },
  setDroppable: function (a) {
    if (!a) {
      return;
    }
    if (Ext.isArray(a)) {
      Ext.each(a, this.setDroppable, this);
      return;
    }
    this.addToGroup(a);
  },
});
if (!Array.prototype.map) {
  Array.prototype.map = function (b) {
    var a = this.length;
    if (typeof b != "function") {
      throw new TypeError();
    }
    var e = new Array(a);
    var d = arguments[1];
    for (var c = 0; c < a; c++) {
      if (c in this) {
        e[c] = b.call(d, this[c], c, this);
      }
    }
    return e;
  };
}
Ext.ns("Ext.ux.data");
Ext.ux.data.PagingMemoryProxy = Ext.extend(Ext.data.MemoryProxy, {
  constructor: function (a) {
    Ext.ux.data.PagingMemoryProxy.superclass.constructor.call(this);
    this.data = a;
  },
  doRequest: function (c, d, b, f, j, k, l) {
    b = b || {};
    var m;
    try {
      m = f.readRecords(this.data);
    } catch (g) {
      this.fireEvent("loadexception", this, l, null, g);
      j.call(k, null, l, false);
      return;
    }
    if (b.filter !== undefined) {
      m.records = m.records.filter(function (n) {
        if (typeof n == "object") {
          var e = b.filterCol || 0;
          return String(n.data[e]).match(b.filter) ? true : false;
        } else {
          return String(n).match(b.filter) ? true : false;
        }
      });
      m.totalRecords = m.records.length;
    }
    if (b.sort !== undefined) {
      var a = String(b.dir).toUpperCase() == "DESC" ? -1 : 1;
      var h = function (n, e) {
        return n > e ? 1 : n < e ? -1 : 0;
      };
      m.records.sort(function (n, e) {
        var o = 0;
        if (typeof n == "object") {
          o = h(n.data[b.sort], e.data[b.sort]) * a;
        } else {
          o = h(n, e) * a;
        }
        if (o == 0) {
          o = n.index < e.index ? -1 : 1;
        }
        return o;
      });
    }
    if (b.start !== undefined && b.limit !== undefined) {
      m.records = m.records.slice(b.start, b.start + b.limit);
    }
    j.call(k, m, l, true);
  },
});
Ext.data.PagingMemoryProxy = Ext.ux.data.PagingMemoryProxy;
Ext.ux.PanelResizer = Ext.extend(Ext.util.Observable, {
  minHeight: 0,
  maxHeight: 10000000,
  constructor: function (a) {
    Ext.apply(this, a);
    this.events = {};
    Ext.ux.PanelResizer.superclass.constructor.call(this, a);
  },
  init: function (a) {
    this.panel = a;
    if (this.panel.elements.indexOf("footer") == -1) {
      a.elements += ",footer";
    }
    a.on("render", this.onRender, this);
  },
  onRender: function (a) {
    this.handle = a.footer.createChild({ cls: "x-panel-resize" });
    this.tracker = new Ext.dd.DragTracker({
      onStart: this.onDragStart.createDelegate(this),
      onDrag: this.onDrag.createDelegate(this),
      onEnd: this.onDragEnd.createDelegate(this),
      tolerance: 3,
      autoStart: 300,
    });
    this.tracker.initEl(this.handle);
    a.on("beforedestroy", this.tracker.destroy, this.tracker);
  },
  onDragStart: function (a) {
    this.dragging = true;
    this.startHeight = this.panel.el.getHeight();
    this.fireEvent("dragstart", this, a);
  },
  onDrag: function (a) {
    this.panel.setHeight(
      (this.startHeight - this.tracker.getOffset()[1]).constrain(
        this.minHeight,
        this.maxHeight
      )
    );
    this.fireEvent("drag", this, a);
  },
  onDragEnd: function (a) {
    this.dragging = false;
    this.fireEvent("dragend", this, a);
  },
});
Ext.preg("panelresizer", Ext.ux.PanelResizer);
Ext.ux.Portal = Ext.extend(Ext.Panel, {
  layout: "column",
  autoScroll: true,
  cls: "x-portal",
  defaultType: "portalcolumn",
  initComponent: function () {
    Ext.ux.Portal.superclass.initComponent.call(this);
    this.addEvents({
      validatedrop: true,
      beforedragover: true,
      dragover: true,
      beforedrop: true,
      drop: true,
    });
  },
  initEvents: function () {
    Ext.ux.Portal.superclass.initEvents.call(this);
    this.dd = new Ext.ux.Portal.DropZone(this, this.dropConfig);
  },
  beforeDestroy: function () {
    if (this.dd) {
      this.dd.unreg();
    }
    Ext.ux.Portal.superclass.beforeDestroy.call(this);
  },
});
Ext.reg("portal", Ext.ux.Portal);
Ext.ux.Portal.DropZone = Ext.extend(Ext.dd.DropTarget, {
  constructor: function (a, b) {
    this.portal = a;
    Ext.dd.ScrollManager.register(a.body);
    Ext.ux.Portal.DropZone.superclass.constructor.call(this, a.bwrap.dom, b);
    a.body.ddScrollConfig = this.ddScrollConfig;
  },
  ddScrollConfig: { vthresh: 50, hthresh: -1, animate: true, increment: 200 },
  createEvent: function (a, f, d, b, h, g) {
    return {
      portal: this.portal,
      panel: d.panel,
      columnIndex: b,
      column: h,
      position: g,
      data: d,
      source: a,
      rawEvent: f,
      status: this.dropAllowed,
    };
  },
  notifyOver: function (w, u, x) {
    var f = u.getXY(),
      a = this.portal,
      o = w.proxy;
    if (!this.grid) {
      this.grid = this.getGrid();
    }
    var b = a.body.dom.clientWidth;
    if (!this.lastCW) {
      this.lastCW = b;
    } else {
      if (this.lastCW != b) {
        this.lastCW = b;
        a.doLayout();
        this.grid = this.getGrid();
      }
    }
    var d = 0,
      m = this.grid.columnX,
      n = false;
    for (var t = m.length; d < t; d++) {
      if (f[0] < m[d].x + m[d].w) {
        n = true;
        break;
      }
    }
    if (!n) {
      d--;
    }
    var r,
      l = false,
      j = 0,
      v = a.items.itemAt(d),
      q = v.items.items,
      k = false;
    for (var t = q.length; j < t; j++) {
      r = q[j];
      var s = r.el.getHeight();
      if (s === 0) {
        k = true;
      } else {
        if (r.el.getY() + s / 2 > f[1]) {
          l = true;
          break;
        }
      }
    }
    j = (l && r ? j : v.items.getCount()) + (k ? -1 : 0);
    var g = this.createEvent(w, u, x, d, v, j);
    if (
      a.fireEvent("validatedrop", g) !== false &&
      a.fireEvent("beforedragover", g) !== false
    ) {
      o.getProxy().setWidth("auto");
      if (r) {
        o.moveProxy(r.el.dom.parentNode, l ? r.el.dom : null);
      } else {
        o.moveProxy(v.el.dom, null);
      }
      this.lastPos = { c: v, col: d, p: k || (l && r) ? j : false };
      this.scrollPos = a.body.getScroll();
      a.fireEvent("dragover", g);
      return g.status;
    } else {
      return g.status;
    }
  },
  notifyOut: function () {
    delete this.grid;
  },
  notifyDrop: function (m, h, g) {
    delete this.grid;
    if (!this.lastPos) {
      return;
    }
    var k = this.lastPos.c,
      f = this.lastPos.col,
      l = this.lastPos.p,
      a = m.panel,
      b = this.createEvent(m, h, g, f, k, l !== false ? l : k.items.getCount());
    if (
      this.portal.fireEvent("validatedrop", b) !== false &&
      this.portal.fireEvent("beforedrop", b) !== false
    ) {
      m.proxy.getProxy().remove();
      a.el.dom.parentNode.removeChild(m.panel.el.dom);
      if (l !== false) {
        k.insert(l, a);
      } else {
        k.add(a);
      }
      k.doLayout();
      this.portal.fireEvent("drop", b);
      var n = this.scrollPos.top;
      if (n) {
        var j = this.portal.body.dom;
        setTimeout(function () {
          j.scrollTop = n;
        }, 10);
      }
    }
    delete this.lastPos;
  },
  getGrid: function () {
    var a = this.portal.bwrap.getBox();
    a.columnX = [];
    this.portal.items.each(function (b) {
      a.columnX.push({ x: b.el.getX(), w: b.el.getWidth() });
    });
    return a;
  },
  unreg: function () {
    Ext.dd.ScrollManager.unregister(this.portal.body);
    Ext.ux.Portal.DropZone.superclass.unreg.call(this);
  },
});
Ext.ux.PortalColumn = Ext.extend(Ext.Container, {
  layout: "anchor",
  defaultType: "portlet",
  cls: "x-portal-column",
});
Ext.reg("portalcolumn", Ext.ux.PortalColumn);
Ext.ux.Portlet = Ext.extend(Ext.Panel, {
  anchor: "100%",
  frame: true,
  collapsible: true,
  draggable: true,
  cls: "x-portlet",
});
Ext.reg("portlet", Ext.ux.Portlet);
Ext.ux.ProgressBarPager = Ext.extend(Object, {
  progBarWidth: 225,
  defaultText: "Loading...",
  defaultAnimCfg: { duration: 1, easing: "bounceOut" },
  constructor: function (a) {
    if (a) {
      Ext.apply(this, a);
    }
  },
  init: function (a) {
    if (a.displayInfo) {
      this.parent = a;
      var b = a.items.indexOf(a.displayItem);
      a.remove(a.displayItem, true);
      this.progressBar = new Ext.ProgressBar({
        text: this.defaultText,
        width: this.progBarWidth,
        animate: this.defaultAnimCfg,
      });
      a.displayItem = this.progressBar;
      a.add(a.displayItem);
      a.doLayout();
      Ext.apply(a, this.parentOverrides);
      this.progressBar.on(
        "render",
        function (c) {
          c.mon(
            c.getEl().applyStyles("cursor:pointer"),
            "click",
            this.handleProgressBarClick,
            this
          );
        },
        this,
        { single: true }
      );
    }
  },
  handleProgressBarClick: function (j) {
    var d = this.parent,
      c = d.displayItem,
      f = this.progressBar.getBox(),
      h = j.getXY(),
      b = h[0] - f.x,
      a = Math.ceil(d.store.getTotalCount() / d.pageSize),
      g = Math.ceil(b / (c.width / a));
    d.changePage(g);
  },
  parentOverrides: {
    updateInfo: function () {
      if (this.displayItem) {
        var b = this.store.getCount(),
          a = this.getPageData(),
          d = this.readPage(a),
          e =
            b == 0
              ? this.emptyMsg
              : String.format(
                  this.displayMsg,
                  this.cursor + 1,
                  this.cursor + b,
                  this.store.getTotalCount()
                );
        d = a.activePage;
        var c = d / a.pages;
        this.displayItem.updateProgress(
          c,
          e,
          this.animate || this.defaultAnimConfig
        );
      }
    },
  },
});
Ext.preg("progressbarpager", Ext.ux.ProgressBarPager);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.RowEditor = Ext.extend(Ext.Panel, {
  floating: true,
  shadow: false,
  layout: "hbox",
  cls: "x-small-editor",
  buttonAlign: "center",
  baseCls: "x-row-editor",
  elements: "header,footer,body",
  frameWidth: 5,
  buttonPad: 3,
  clicksToEdit: "auto",
  monitorValid: true,
  focusDelay: 250,
  errorSummary: true,
  saveText: "Save",
  cancelText: "Cancel",
  commitChangesText: "You need to commit or cancel your changes",
  errorText: "Errors",
  defaults: { normalWidth: true },
  initComponent: function () {
    Ext.ux.grid.RowEditor.superclass.initComponent.call(this);
    this.addEvents("beforeedit", "canceledit", "validateedit", "afteredit");
  },
  init: function (a) {
    this.grid = a;
    this.ownerCt = a;
    if (this.clicksToEdit === 2) {
      a.on("rowdblclick", this.onRowDblClick, this);
    } else {
      a.on("rowclick", this.onRowClick, this);
      if (Ext.isIE) {
        a.on("rowdblclick", this.onRowDblClick, this);
      }
    }
    a.getStore().on(
      "remove",
      function () {
        this.stopEditing(false);
      },
      this
    );
    a.on({
      scope: this,
      keydown: this.onGridKey,
      columnresize: this.verifyLayout,
      columnmove: this.refreshFields,
      reconfigure: this.refreshFields,
      beforedestroy: this.beforedestroy,
      destroy: this.destroy,
      bodyscroll: { buffer: 250, fn: this.positionButtons },
    });
    a.getColumnModel().on("hiddenchange", this.verifyLayout, this, {
      delay: 1,
    });
    a.getView().on("refresh", this.stopEditing.createDelegate(this, []));
  },
  beforedestroy: function () {
    this.stopMonitoring();
    this.grid.getStore().un("remove", this.onStoreRemove, this);
    this.stopEditing(false);
    Ext.destroy(this.btns, this.tooltip);
  },
  refreshFields: function () {
    this.initFields();
    this.verifyLayout();
  },
  isDirty: function () {
    var a;
    this.items.each(function (b) {
      if (String(this.values[b.id]) !== String(b.getValue())) {
        a = true;
        return false;
      }
    }, this);
    return a;
  },
  startEditing: function (k, p) {
    if (this.editing && this.isDirty()) {
      this.showTooltip(this.commitChangesText);
      return;
    }
    if (Ext.isObject(k)) {
      k = this.grid.getStore().indexOf(k);
    }
    if (this.fireEvent("beforeedit", this, k) !== false) {
      this.editing = true;
      var e = this.grid,
        l = e.getView(),
        o = l.getRow(k),
        c = e.store.getAt(k);
      this.record = c;
      this.rowIndex = k;
      this.values = {};
      if (!this.rendered) {
        this.render(l.getEditorParent());
      }
      var m = Ext.fly(o).getWidth();
      this.setSize(m);
      if (!this.initialized) {
        this.initFields();
      }
      var n = e.getColumnModel(),
        d = this.items.items,
        j,
        a;
      for (var b = 0, h = n.getColumnCount(); b < h; b++) {
        a = this.preEditValue(c, n.getDataIndex(b));
        j = d[b];
        j.setValue(a);
        this.values[j.id] = Ext.isEmpty(a) ? "" : a;
      }
      this.verifyLayout(true);
      if (!this.isVisible()) {
        this.setPagePosition(Ext.fly(o).getXY());
      } else {
        this.el.setXY(Ext.fly(o).getXY(), { duration: 0.15 });
      }
      if (!this.isVisible()) {
        this.show().doLayout();
      }
      if (p !== false) {
        this.doFocus.defer(this.focusDelay, this);
      }
    }
  },
  stopEditing: function (l) {
    this.editing = false;
    if (!this.isVisible()) {
      return;
    }
    if (l === false || !this.isValid()) {
      this.hide();
      this.fireEvent("canceledit", this, l === false);
      return;
    }
    var g = {},
      b = this.record,
      h = false,
      k = this.grid.colModel,
      e = this.items.items;
    for (var d = 0, f = k.getColumnCount(); d < f; d++) {
      if (!k.isHidden(d)) {
        var c = k.getDataIndex(d);
        if (!Ext.isEmpty(c)) {
          var a = b.data[c],
            j = this.postEditValue(e[d].getValue(), a, b, c);
          if (String(a) !== String(j)) {
            g[c] = j;
            h = true;
          }
        }
      }
    }
    if (
      h &&
      this.fireEvent("validateedit", this, g, b, this.rowIndex) !== false
    ) {
      b.beginEdit();
      Ext.iterate(g, function (m, n) {
        b.set(m, n);
      });
      b.endEdit();
      this.fireEvent("afteredit", this, g, b, this.rowIndex);
    } else {
      this.fireEvent("canceledit", this, false);
    }
    this.hide();
  },
  verifyLayout: function (e) {
    if (this.el && (this.isVisible() || e === true)) {
      var g = this.grid.getView().getRow(this.rowIndex);
      this.setSize(
        Ext.fly(g).getWidth(),
        Ext.isIE ? Ext.fly(g).getHeight() + 9 : undefined
      );
      var c = this.grid.colModel,
        b = this.items.items;
      for (var d = 0, a = c.getColumnCount(); d < a; d++) {
        if (!c.isHidden(d)) {
          var f = 0;
          if (d === a - 1) {
            f += 3;
          } else {
            f += 1;
          }
          b[d].show();
          b[d].setWidth(c.getColumnWidth(d) - f);
        } else {
          b[d].hide();
        }
      }
      this.doLayout();
      this.positionButtons();
    }
  },
  slideHide: function () {
    this.hide();
  },
  initFields: function () {
    var b = this.grid.getColumnModel(),
      f = Ext.layout.ContainerLayout.prototype.parseMargins;
    this.removeAll(false);
    for (var e = 0, a = b.getColumnCount(); e < a; e++) {
      var g = b.getColumnAt(e),
        d = g.getEditor();
      if (!d) {
        d = g.displayEditor || new Ext.form.DisplayField();
      }
      if (e == 0) {
        d.margins = f("0 1 2 1");
      } else {
        if (e == a - 1) {
          d.margins = f("0 0 2 1");
        } else {
          if (Ext.isIE) {
            d.margins = f("0 0 2 0");
          } else {
            d.margins = f("0 1 2 0");
          }
        }
      }
      d.setWidth(b.getColumnWidth(e));
      d.column = g;
      if (d.ownerCt !== this) {
        d.on("focus", this.ensureVisible, this);
        d.on("specialkey", this.onKey, this);
      }
      this.insert(e, d);
    }
    this.initialized = true;
  },
  onKey: function (a, b) {
    if (b.getKey() === b.ENTER) {
      this.stopEditing(true);
      b.stopPropagation();
    }
  },
  onGridKey: function (c) {
    if (c.getKey() === c.ENTER && !this.isVisible()) {
      var b = this.grid.getSelectionModel().getSelected();
      if (b) {
        var a = this.grid.store.indexOf(b);
        this.startEditing(a);
        c.stopPropagation();
      }
    }
  },
  ensureVisible: function (a) {
    if (this.isVisible()) {
      this.grid
        .getView()
        .ensureVisible(
          this.rowIndex,
          this.grid.colModel.getIndexById(a.column.id),
          true
        );
    }
  },
  onRowClick: function (b, d, c) {
    if (this.clicksToEdit == "auto") {
      var a = this.lastClickIndex;
      this.lastClickIndex = d;
      if (a != d && !this.isVisible()) {
        return;
      }
    }
    this.startEditing(d, false);
    this.doFocus.defer(this.focusDelay, this, [c.getPoint()]);
  },
  onRowDblClick: function (a, c, b) {
    this.startEditing(c, false);
    this.doFocus.defer(this.focusDelay, this, [b.getPoint()]);
  },
  onRender: function () {
    Ext.ux.grid.RowEditor.superclass.onRender.apply(this, arguments);
    this.el.swallowEvent(["keydown", "keyup", "keypress"]);
    this.btns = new Ext.Panel({
      baseCls: "x-plain",
      cls: "x-btns",
      elements: "body",
      layout: "table",
      width: this.minButtonWidth * 2 + this.frameWidth * 2 + this.buttonPad * 4,
      items: [
        {
          ref: "saveBtn",
          itemId: "saveBtn",
          xtype: "button",
          text: this.saveText,
          width: this.minButtonWidth,
          handler: this.stopEditing.createDelegate(this, [true]),
        },
        {
          xtype: "button",
          text: this.cancelText,
          width: this.minButtonWidth,
          handler: this.stopEditing.createDelegate(this, [false]),
        },
      ],
    });
    this.btns.render(this.bwrap);
  },
  afterRender: function () {
    Ext.ux.grid.RowEditor.superclass.afterRender.apply(this, arguments);
    this.positionButtons();
    if (this.monitorValid) {
      this.startMonitoring();
    }
  },
  onShow: function () {
    if (this.monitorValid) {
      this.startMonitoring();
    }
    Ext.ux.grid.RowEditor.superclass.onShow.apply(this, arguments);
  },
  onHide: function () {
    Ext.ux.grid.RowEditor.superclass.onHide.apply(this, arguments);
    this.stopMonitoring();
    this.grid.getView().focusRow(this.rowIndex);
  },
  positionButtons: function () {
    if (this.btns) {
      var e = this.grid,
        d = this.el.dom.clientHeight,
        b = e.getView(),
        a = b.scroller.dom.scrollLeft,
        f = this.btns.getWidth(),
        c = Math.min(e.getWidth(), e.getColumnModel().getTotalWidth());
      this.btns.el.shift({
        left: c / 2 - f / 2 + a,
        top: d - 2,
        stopFx: true,
        duration: 0.2,
      });
    }
  },
  preEditValue: function (a, c) {
    var b = a.data[c];
    return this.autoEncode && typeof b === "string"
      ? Ext.util.Format.htmlDecode(b)
      : b;
  },
  postEditValue: function (c, a, b, d) {
    return this.autoEncode && typeof c == "string"
      ? Ext.util.Format.htmlEncode(c)
      : c;
  },
  doFocus: function (f) {
    if (this.isVisible()) {
      var d = 0,
        b = this.grid.getColumnModel(),
        g;
      if (f) {
        d = this.getTargetColumnIndex(f);
      }
      for (var e = d || 0, a = b.getColumnCount(); e < a; e++) {
        g = b.getColumnAt(e);
        if (!g.hidden && g.getEditor()) {
          g.getEditor().focus();
          break;
        }
      }
    }
  },
  getTargetColumnIndex: function (k) {
    var a = this.grid,
      j = a.view,
      h = k.left,
      f = a.colModel.config,
      b = 0,
      d = false;
    for (var e = f.length, g; (g = f[b]); b++) {
      if (!g.hidden) {
        if (Ext.fly(j.getHeaderCell(b)).getRegion().right >= h) {
          d = b;
          break;
        }
      }
    }
    return d;
  },
  startMonitoring: function () {
    if (!this.bound && this.monitorValid) {
      this.bound = true;
      Ext.TaskMgr.start({
        run: this.bindHandler,
        interval: this.monitorPoll || 200,
        scope: this,
      });
    }
  },
  stopMonitoring: function () {
    this.bound = false;
    if (this.tooltip) {
      this.tooltip.hide();
    }
  },
  isValid: function () {
    var a = true;
    this.items.each(function (b) {
      if (!b.isValid(true)) {
        a = false;
        return false;
      }
    });
    return a;
  },
  bindHandler: function () {
    if (!this.bound) {
      return false;
    }
    var a = this.isValid();
    if (!a && this.errorSummary) {
      this.showTooltip(this.getErrorText().join(""));
    }
    this.btns.saveBtn.setDisabled(!a);
    this.fireEvent("validation", this, a);
  },
  lastVisibleColumn: function () {
    var a = this.items.getCount() - 1,
      b;
    for (; a >= 0; a--) {
      b = this.items.items[a];
      if (!b.hidden) {
        return b;
      }
    }
  },
  showTooltip: function (f) {
    var c = this.tooltip;
    if (!c) {
      c = this.tooltip = new Ext.ToolTip({
        maxWidth: 600,
        cls: "errorTip",
        width: 300,
        title: this.errorText,
        autoHide: false,
        anchor: "left",
        anchorToTarget: true,
        mouseOffset: [40, 0],
      });
    }
    var b = this.grid.getView(),
      e = parseInt(this.el.dom.style.top, 10),
      a = b.scroller.dom.scrollTop,
      d = this.el.getHeight();
    if (e + d >= a) {
      c.initTarget(this.lastVisibleColumn().getEl());
      if (!c.rendered) {
        c.show();
        c.hide();
      }
      c.body.update(f);
      c.doAutoWidth(20);
      c.show();
    } else {
      if (c.rendered) {
        c.hide();
      }
    }
  },
  getErrorText: function () {
    var a = ["<ul>"];
    this.items.each(function (b) {
      if (!b.isValid(true)) {
        a.push("<li>", b.getActiveError(), "</li>");
      }
    });
    a.push("</ul>");
    return a;
  },
});
Ext.preg("roweditor", Ext.ux.grid.RowEditor);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.RowExpander = Ext.extend(Ext.util.Observable, {
  expandOnEnter: true,
  expandOnDblClick: true,
  header: "",
  width: 20,
  sortable: false,
  fixed: true,
  hideable: false,
  menuDisabled: true,
  dataIndex: "",
  id: "expander",
  lazyRender: true,
  enableCaching: true,
  constructor: function (a) {
    Ext.apply(this, a);
    this.addEvents({
      beforeexpand: true,
      expand: true,
      beforecollapse: true,
      collapse: true,
    });
    Ext.ux.grid.RowExpander.superclass.constructor.call(this);
    if (this.tpl) {
      if (typeof this.tpl == "string") {
        this.tpl = new Ext.Template(this.tpl);
      }
      this.tpl.compile();
    }
    this.state = {};
    this.bodyContent = {};
  },
  getRowClass: function (a, e, d, c) {
    d.cols = d.cols - 1;
    var b = this.bodyContent[a.id];
    if (!b && !this.lazyRender) {
      b = this.getBodyContent(a, e);
    }
    if (b) {
      d.body = b;
    }
    return this.state[a.id] ? "x-grid3-row-expanded" : "x-grid3-row-collapsed";
  },
  init: function (b) {
    this.grid = b;
    var a = b.getView();
    a.getRowClass = this.getRowClass.createDelegate(this);
    a.enableRowBody = true;
    b.on("render", this.onRender, this);
    b.on("destroy", this.onDestroy, this);
  },
  onRender: function () {
    var a = this.grid;
    var b = a.getView().mainBody;
    b.on("mousedown", this.onMouseDown, this, {
      delegate: ".x-grid3-row-expander",
    });
    if (this.expandOnEnter) {
      this.keyNav = new Ext.KeyNav(this.grid.getGridEl(), {
        enter: this.onEnter,
        scope: this,
      });
    }
    if (this.expandOnDblClick) {
      a.on("rowdblclick", this.onRowDblClick, this);
    }
  },
  onDestroy: function () {
    if (this.keyNav) {
      this.keyNav.disable();
      delete this.keyNav;
    }
    var a = this.grid.getView().mainBody;
    if (a) {
      a.un("mousedown", this.onMouseDown, this);
    }
  },
  onRowDblClick: function (a, b, c) {
    this.toggleRow(b);
  },
  onEnter: function (h) {
    var f = this.grid;
    var j = f.getSelectionModel();
    var b = j.getSelections();
    for (var c = 0, a = b.length; c < a; c++) {
      var d = f.getStore().indexOf(b[c]);
      this.toggleRow(d);
    }
  },
  getBodyContent: function (a, b) {
    if (!this.enableCaching) {
      return this.tpl.apply(a.data);
    }
    var c = this.bodyContent[a.id];
    if (!c) {
      c = this.tpl.apply(a.data);
      this.bodyContent[a.id] = c;
    }
    return c;
  },
  onMouseDown: function (b, a) {
    b.stopEvent();
    var c = b.getTarget(".x-grid3-row");
    this.toggleRow(c);
  },
  renderer: function (b, c, a) {
    c.cellAttr = 'rowspan="2"';
    return '<div class="x-grid3-row-expander">&#160;</div>';
  },
  beforeExpand: function (b, a, c) {
    if (this.fireEvent("beforeexpand", this, b, a, c) !== false) {
      if (this.tpl && this.lazyRender) {
        a.innerHTML = this.getBodyContent(b, c);
      }
      return true;
    } else {
      return false;
    }
  },
  toggleRow: function (a) {
    if (typeof a == "number") {
      a = this.grid.view.getRow(a);
    }
    this[
      Ext.fly(a).hasClass("x-grid3-row-collapsed") ? "expandRow" : "collapseRow"
    ](a);
  },
  expandRow: function (c) {
    if (typeof c == "number") {
      c = this.grid.view.getRow(c);
    }
    var b = this.grid.store.getAt(c.rowIndex);
    var a = Ext.DomQuery.selectNode("tr:nth(2) div.x-grid3-row-body", c);
    if (this.beforeExpand(b, a, c.rowIndex)) {
      this.state[b.id] = true;
      Ext.fly(c).replaceClass("x-grid3-row-collapsed", "x-grid3-row-expanded");
      this.fireEvent("expand", this, b, a, c.rowIndex);
    }
  },
  collapseRow: function (c) {
    if (typeof c == "number") {
      c = this.grid.view.getRow(c);
    }
    var b = this.grid.store.getAt(c.rowIndex);
    var a = Ext.fly(c).child("tr:nth(1) div.x-grid3-row-body", true);
    if (this.fireEvent("beforecollapse", this, b, a, c.rowIndex) !== false) {
      this.state[b.id] = false;
      Ext.fly(c).replaceClass("x-grid3-row-expanded", "x-grid3-row-collapsed");
      this.fireEvent("collapse", this, b, a, c.rowIndex);
    }
  },
});
Ext.preg("rowexpander", Ext.ux.grid.RowExpander);
Ext.grid.RowExpander = Ext.ux.grid.RowExpander;
Ext.ns("Ext.ux.layout");
Ext.ux.layout.RowLayout = Ext.extend(Ext.layout.ContainerLayout, {
  monitorResize: true,
  type: "row",
  allowContainerRemove: false,
  isValidParent: function (b, a) {
    return this.innerCt && b.getPositionEl().dom.parentNode == this.innerCt.dom;
  },
  getLayoutTargetSize: function () {
    var b = this.container.getLayoutTarget(),
      a;
    if (b) {
      a = b.getViewSize();
      if (Ext.isIE && Ext.isStrict && a.height == 0) {
        a = b.getStyleSize();
      }
      a.width -= b.getPadding("lr");
      a.height -= b.getPadding("tb");
    }
    return a;
  },
  renderAll: function (a, b) {
    if (!this.innerCt) {
      this.innerCt = b.createChild({ cls: "x-column-inner" });
      this.innerCt.createChild({ cls: "x-clear" });
    }
    Ext.layout.ColumnLayout.superclass.renderAll.call(this, a, this.innerCt);
  },
  onLayout: function (g, k) {
    var c = g.items.items,
      j = c.length,
      a,
      b,
      d,
      n = [];
    this.renderAll(g, k);
    var o = this.getLayoutTargetSize();
    if (o.width < 1 && o.height < 1) {
      return;
    }
    var e = o.height,
      f = e;
    this.innerCt.setSize({ height: e });
    for (d = 0; d < j; d++) {
      a = c[d];
      b = a.getPositionEl().getMargins("tb");
      n[d] = b;
      if (!a.rowHeight) {
        f -= a.getHeight() + b;
      }
    }
    f = f < 0 ? 0 : f;
    for (d = 0; d < j; d++) {
      a = c[d];
      b = n[d];
      if (a.rowHeight) {
        a.setSize({ height: Math.floor(a.rowHeight * f) - b });
      }
    }
    if (Ext.isIE) {
      if (
        (d = k.getStyle("overflow") && d != "hidden" && !this.adjustmentPass)
      ) {
        var l = this.getLayoutTargetSize();
        if (l.width != o.width) {
          this.adjustmentPass = true;
          this.onLayout(g, k);
        }
      }
    }
    delete this.adjustmentPass;
  },
});
Ext.Container.LAYOUTS["ux.row"] = Ext.ux.layout.RowLayout;
Ext.ns("Ext.ux.form");
Ext.ux.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
  initComponent: function () {
    Ext.ux.form.SearchField.superclass.initComponent.call(this);
    this.on(
      "specialkey",
      function (a, b) {
        if (b.getKey() == b.ENTER) {
          this.onTrigger2Click();
        }
      },
      this
    );
  },
  validationEvent: false,
  validateOnBlur: false,
  trigger1Class: "x-form-clear-trigger",
  trigger2Class: "x-form-search-trigger",
  hideTrigger1: true,
  width: 180,
  hasSearch: false,
  paramName: "query",
  onTrigger1Click: function () {
    if (this.hasSearch) {
      this.el.dom.value = "";
      var a = { start: 0 };
      this.store.baseParams = this.store.baseParams || {};
      this.store.baseParams[this.paramName] = "";
      this.store.reload({ params: a });
      this.triggers[0].hide();
      this.hasSearch = false;
    }
  },
  onTrigger2Click: function () {
    var a = this.getRawValue();
    if (a.length < 1) {
      this.onTrigger1Click();
      return;
    }
    var b = { start: 0 };
    this.store.baseParams = this.store.baseParams || {};
    this.store.baseParams[this.paramName] = a;
    this.store.reload({ params: b });
    this.hasSearch = true;
    this.triggers[0].show();
  },
});
Ext.ns("Ext.ux.form");
Ext.ux.form.SelectBox = Ext.extend(Ext.form.ComboBox, {
  constructor: function (a) {
    this.searchResetDelay = 1000;
    a = a || {};
    a = Ext.apply(a || {}, {
      editable: false,
      forceSelection: true,
      rowHeight: false,
      lastSearchTerm: false,
      triggerAction: "all",
      mode: "local",
    });
    Ext.ux.form.SelectBox.superclass.constructor.apply(this, arguments);
    this.lastSelectedIndex = this.selectedIndex || 0;
  },
  initEvents: function () {
    Ext.ux.form.SelectBox.superclass.initEvents.apply(this, arguments);
    this.el.on("keydown", this.keySearch, this, true);
    this.cshTask = new Ext.util.DelayedTask(this.clearSearchHistory, this);
  },
  keySearch: function (f, d, b) {
    var a = f.getKey();
    var c = String.fromCharCode(a);
    var g = 0;
    if (!this.store.getCount()) {
      return;
    }
    switch (a) {
      case Ext.EventObject.HOME:
        f.stopEvent();
        this.selectFirst();
        return;
      case Ext.EventObject.END:
        f.stopEvent();
        this.selectLast();
        return;
      case Ext.EventObject.PAGEDOWN:
        this.selectNextPage();
        f.stopEvent();
        return;
      case Ext.EventObject.PAGEUP:
        this.selectPrevPage();
        f.stopEvent();
        return;
    }
    if (
      (f.hasModifier() && !f.shiftKey) ||
      f.isNavKeyPress() ||
      f.isSpecialKey()
    ) {
      return;
    }
    if (this.lastSearchTerm == c) {
      g = this.lastSelectedIndex;
    }
    this.search(this.displayField, c, g);
    this.cshTask.delay(this.searchResetDelay);
  },
  onRender: function (b, a) {
    this.store.on("load", this.calcRowsPerPage, this);
    Ext.ux.form.SelectBox.superclass.onRender.apply(this, arguments);
    if (this.mode == "local") {
      this.initList();
      this.calcRowsPerPage();
    }
  },
  onSelect: function (a, c, b) {
    if (this.fireEvent("beforeselect", this, a, c) !== false) {
      this.setValue(a.data[this.valueField || this.displayField]);
      if (!b) {
        this.collapse();
      }
      this.lastSelectedIndex = c + 1;
      this.fireEvent("select", this, a, c);
    }
  },
  afterRender: function () {
    Ext.ux.form.SelectBox.superclass.afterRender.apply(this, arguments);
    if (Ext.isWebKit) {
      this.el.swallowEvent("mousedown", true);
    }
    this.el.unselectable();
    this.innerList.unselectable();
    this.trigger.unselectable();
    this.innerList.on(
      "mouseup",
      function (c, b, a) {
        if (b.id && b.id == this.innerList.id) {
          return;
        }
        this.onViewClick();
      },
      this
    );
    this.mun(this.view, "containerclick", this.onViewClick, this);
    this.mun(this.view, "click", this.onViewClick, this);
    this.innerList.on(
      "mouseover",
      function (c, b, a) {
        if (b.id && b.id == this.innerList.id) {
          return;
        }
        this.lastSelectedIndex = this.view.getSelectedIndexes()[0] + 1;
        this.cshTask.delay(this.searchResetDelay);
      },
      this
    );
    this.trigger.un("click", this.onTriggerClick, this);
    this.trigger.on(
      "mousedown",
      function (c, b, a) {
        c.preventDefault();
        this.onTriggerClick();
      },
      this
    );
    this.on(
      "collapse",
      function (c, b, a) {
        Ext.getDoc().un("mouseup", this.collapseIf, this);
      },
      this,
      true
    );
    this.on(
      "expand",
      function (c, b, a) {
        Ext.getDoc().on("mouseup", this.collapseIf, this);
      },
      this,
      true
    );
  },
  clearSearchHistory: function () {
    this.lastSelectedIndex = 0;
    this.lastSearchTerm = false;
  },
  selectFirst: function () {
    this.focusAndSelect(this.store.data.first());
  },
  selectLast: function () {
    this.focusAndSelect(this.store.data.last());
  },
  selectPrevPage: function () {
    if (!this.rowHeight) {
      return;
    }
    var a = Math.max(this.selectedIndex - this.rowsPerPage, 0);
    this.focusAndSelect(this.store.getAt(a));
  },
  selectNextPage: function () {
    if (!this.rowHeight) {
      return;
    }
    var a = Math.min(
      this.selectedIndex + this.rowsPerPage,
      this.store.getCount() - 1
    );
    this.focusAndSelect(this.store.getAt(a));
  },
  search: function (c, b, d) {
    c = c || this.displayField;
    this.lastSearchTerm = b;
    var a = this.store.find.apply(this.store, arguments);
    if (a !== -1) {
      this.focusAndSelect(a);
    }
  },
  focusAndSelect: function (a) {
    var b = Ext.isNumber(a) ? a : this.store.indexOf(a);
    this.select(b, this.isExpanded());
    this.onSelect(this.store.getAt(b), b, this.isExpanded());
  },
  calcRowsPerPage: function () {
    if (this.store.getCount()) {
      this.rowHeight = Ext.fly(this.view.getNode(0)).getHeight();
      this.rowsPerPage = this.maxHeight / this.rowHeight;
    } else {
      this.rowHeight = false;
    }
  },
});
Ext.reg("selectbox", Ext.ux.form.SelectBox);
Ext.ux.SelectBox = Ext.ux.form.SelectBox;
Ext.ux.SlidingPager = Ext.extend(Object, {
  init: function (b) {
    var a = b.items.indexOf(b.inputItem);
    Ext.each(b.items.getRange(a - 2, a + 2), function (d) {
      d.hide();
    });
    var c = new Ext.Slider({
      width: 114,
      minValue: 1,
      maxValue: 1,
      plugins: new Ext.slider.Tip({
        getText: function (d) {
          return String.format(
            "Page <b>{0}</b> of <b>{1}</b>",
            d.value,
            d.slider.maxValue
          );
        },
      }),
      listeners: {
        changecomplete: function (e, d) {
          b.changePage(d);
        },
      },
    });
    b.insert(a + 1, c);
    b.on({
      change: function (d, e) {
        c.setMaxValue(e.pages);
        c.setValue(e.activePage);
      },
    });
  },
});
Ext.ns("Ext.ux.form");
Ext.ux.form.SpinnerField = Ext.extend(Ext.form.NumberField, {
  actionMode: "wrap",
  deferHeight: true,
  autoSize: Ext.emptyFn,
  onBlur: Ext.emptyFn,
  adjustSize: Ext.BoxComponent.prototype.adjustSize,
  constructor: function (c) {
    var b = Ext.copyTo(
      {},
      c,
      "incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass"
    );
    var d = (this.spinner = new Ext.ux.Spinner(b));
    var a = c.plugins
      ? Ext.isArray(c.plugins)
        ? c.plugins.push(d)
        : [c.plugins, d]
      : d;
    Ext.ux.form.SpinnerField.superclass.constructor.call(
      this,
      Ext.apply(c, { plugins: a })
    );
  },
  getResizeEl: function () {
    return this.wrap;
  },
  getPositionEl: function () {
    return this.wrap;
  },
  alignErrorIcon: function () {
    if (this.wrap) {
      this.errorIcon.alignTo(this.wrap, "tl-tr", [2, 0]);
    }
  },
  validateBlur: function () {
    return true;
  },
});
Ext.reg("spinnerfield", Ext.ux.form.SpinnerField);
Ext.form.SpinnerField = Ext.ux.form.SpinnerField;
Ext.ux.Spinner = Ext.extend(Ext.util.Observable, {
  incrementValue: 1,
  alternateIncrementValue: 5,
  triggerClass: "x-form-spinner-trigger",
  splitterClass: "x-form-spinner-splitter",
  alternateKey: Ext.EventObject.shiftKey,
  defaultValue: 0,
  accelerate: false,
  constructor: function (a) {
    Ext.ux.Spinner.superclass.constructor.call(this, a);
    Ext.apply(this, a);
    this.mimicing = false;
  },
  init: function (a) {
    this.field = a;
    a.afterMethod("onRender", this.doRender, this);
    a.afterMethod("onEnable", this.doEnable, this);
    a.afterMethod("onDisable", this.doDisable, this);
    a.afterMethod("afterRender", this.doAfterRender, this);
    a.afterMethod("onResize", this.doResize, this);
    a.afterMethod("onFocus", this.doFocus, this);
    a.beforeMethod("onDestroy", this.doDestroy, this);
  },
  doRender: function (b, a) {
    var c = (this.el = this.field.getEl());
    var d = this.field;
    if (!d.wrap) {
      d.wrap = this.wrap = c.wrap({ cls: "x-form-field-wrap" });
    } else {
      this.wrap = d.wrap.addClass("x-form-field-wrap");
    }
    this.trigger = this.wrap.createChild({
      tag: "img",
      src: Ext.BLANK_IMAGE_URL,
      cls: "x-form-trigger " + this.triggerClass,
    });
    if (!d.width) {
      this.wrap.setWidth(c.getWidth() + this.trigger.getWidth());
    }
    this.splitter = this.wrap.createChild({
      tag: "div",
      cls: this.splitterClass,
      style: "width:13px; height:2px;",
    });
    this.splitter
      .setRight(Ext.isIE ? 1 : 2)
      .setTop(10)
      .show();
    this.proxy = this.trigger.createProxy("", this.splitter, true);
    this.proxy.addClass("x-form-spinner-proxy");
    this.proxy.setStyle("left", "0px");
    this.proxy.setSize(14, 1);
    this.proxy.hide();
    this.dd = new Ext.dd.DDProxy(this.splitter.dom.id, "SpinnerDrag", {
      dragElId: this.proxy.id,
    });
    this.initTrigger();
    this.initSpinner();
  },
  doAfterRender: function () {
    var a;
    if (Ext.isIE && this.el.getY() != (a = this.trigger.getY())) {
      this.el.position();
      this.el.setY(a);
    }
  },
  doEnable: function () {
    if (this.wrap) {
      this.disabled = false;
      this.wrap.removeClass(this.field.disabledClass);
    }
  },
  doDisable: function () {
    if (this.wrap) {
      this.disabled = true;
      this.wrap.addClass(this.field.disabledClass);
      this.el.removeClass(this.field.disabledClass);
    }
  },
  doResize: function (a, b) {
    if (typeof a == "number") {
      this.el.setWidth(a - this.trigger.getWidth());
    }
    this.wrap.setWidth(this.el.getWidth() + this.trigger.getWidth());
  },
  doFocus: function () {
    if (!this.mimicing) {
      this.wrap.addClass("x-trigger-wrap-focus");
      this.mimicing = true;
      Ext.get(Ext.isIE ? document.body : document).on(
        "mousedown",
        this.mimicBlur,
        this,
        { delay: 10 }
      );
      this.el.on("keydown", this.checkTab, this);
    }
  },
  checkTab: function (a) {
    if (a.getKey() == a.TAB) {
      this.triggerBlur();
    }
  },
  mimicBlur: function (a) {
    if (!this.wrap.contains(a.target) && this.field.validateBlur(a)) {
      this.triggerBlur();
    }
  },
  triggerBlur: function () {
    this.mimicing = false;
    Ext.get(Ext.isIE ? document.body : document).un(
      "mousedown",
      this.mimicBlur,
      this
    );
    this.el.un("keydown", this.checkTab, this);
    this.field.beforeBlur();
    this.wrap.removeClass("x-trigger-wrap-focus");
    this.field.onBlur.call(this.field);
  },
  initTrigger: function () {
    this.trigger.addClassOnOver("x-form-trigger-over");
    this.trigger.addClassOnClick("x-form-trigger-click");
  },
  initSpinner: function () {
    this.field.addEvents({ spin: true, spinup: true, spindown: true });
    this.keyNav = new Ext.KeyNav(this.el, {
      up: function (a) {
        a.preventDefault();
        this.onSpinUp();
      },
      down: function (a) {
        a.preventDefault();
        this.onSpinDown();
      },
      pageUp: function (a) {
        a.preventDefault();
        this.onSpinUpAlternate();
      },
      pageDown: function (a) {
        a.preventDefault();
        this.onSpinDownAlternate();
      },
      scope: this,
    });
    this.repeater = new Ext.util.ClickRepeater(this.trigger, {
      accelerate: this.accelerate,
    });
    this.field.mon(this.repeater, "click", this.onTriggerClick, this, {
      preventDefault: true,
    });
    this.field.mon(this.trigger, {
      mouseover: this.onMouseOver,
      mouseout: this.onMouseOut,
      mousemove: this.onMouseMove,
      mousedown: this.onMouseDown,
      mouseup: this.onMouseUp,
      scope: this,
      preventDefault: true,
    });
    this.field.mon(this.wrap, "mousewheel", this.handleMouseWheel, this);
    this.dd.setXConstraint(0, 0, 10);
    this.dd.setYConstraint(1500, 1500, 10);
    this.dd.endDrag = this.endDrag.createDelegate(this);
    this.dd.startDrag = this.startDrag.createDelegate(this);
    this.dd.onDrag = this.onDrag.createDelegate(this);
  },
  onMouseOver: function () {
    if (this.disabled) {
      return;
    }
    var a = this.getMiddle();
    this.tmpHoverClass =
      Ext.EventObject.getPageY() < a
        ? "x-form-spinner-overup"
        : "x-form-spinner-overdown";
    this.trigger.addClass(this.tmpHoverClass);
  },
  onMouseOut: function () {
    this.trigger.removeClass(this.tmpHoverClass);
  },
  onMouseMove: function () {
    if (this.disabled) {
      return;
    }
    var a = this.getMiddle();
    if (
      (Ext.EventObject.getPageY() > a &&
        this.tmpHoverClass == "x-form-spinner-overup") ||
      (Ext.EventObject.getPageY() < a &&
        this.tmpHoverClass == "x-form-spinner-overdown")
    ) {
    }
  },
  onMouseDown: function () {
    if (this.disabled) {
      return;
    }
    var a = this.getMiddle();
    this.tmpClickClass =
      Ext.EventObject.getPageY() < a
        ? "x-form-spinner-clickup"
        : "x-form-spinner-clickdown";
    this.trigger.addClass(this.tmpClickClass);
  },
  onMouseUp: function () {
    this.trigger.removeClass(this.tmpClickClass);
  },
  onTriggerClick: function () {
    if (this.disabled || this.el.dom.readOnly) {
      return;
    }
    var b = this.getMiddle();
    var a = Ext.EventObject.getPageY() < b ? "Up" : "Down";
    this["onSpin" + a]();
  },
  getMiddle: function () {
    var b = this.trigger.getTop();
    var c = this.trigger.getHeight();
    var a = b + c / 2;
    return a;
  },
  isSpinnable: function () {
    if (this.disabled || this.el.dom.readOnly) {
      Ext.EventObject.preventDefault();
      return false;
    }
    return true;
  },
  handleMouseWheel: function (a) {
    if (this.wrap.hasClass("x-trigger-wrap-focus") == false) {
      return;
    }
    var b = a.getWheelDelta();
    if (b > 0) {
      this.onSpinUp();
      a.stopEvent();
    } else {
      if (b < 0) {
        this.onSpinDown();
        a.stopEvent();
      }
    }
  },
  startDrag: function () {
    this.proxy.show();
    this._previousY = Ext.fly(this.dd.getDragEl()).getTop();
  },
  endDrag: function () {
    this.proxy.hide();
  },
  onDrag: function () {
    if (this.disabled) {
      return;
    }
    var b = Ext.fly(this.dd.getDragEl()).getTop();
    var a = "";
    if (this._previousY > b) {
      a = "Up";
    }
    if (this._previousY < b) {
      a = "Down";
    }
    if (a != "") {
      this["onSpin" + a]();
    }
    this._previousY = b;
  },
  onSpinUp: function () {
    if (this.isSpinnable() == false) {
      return;
    }
    if (Ext.EventObject.shiftKey == true) {
      this.onSpinUpAlternate();
      return;
    } else {
      this.spin(false, false);
    }
    this.field.fireEvent("spin", this);
    this.field.fireEvent("spinup", this);
  },
  onSpinDown: function () {
    if (this.isSpinnable() == false) {
      return;
    }
    if (Ext.EventObject.shiftKey == true) {
      this.onSpinDownAlternate();
      return;
    } else {
      this.spin(true, false);
    }
    this.field.fireEvent("spin", this);
    this.field.fireEvent("spindown", this);
  },
  onSpinUpAlternate: function () {
    if (this.isSpinnable() == false) {
      return;
    }
    this.spin(false, true);
    this.field.fireEvent("spin", this);
    this.field.fireEvent("spinup", this);
  },
  onSpinDownAlternate: function () {
    if (this.isSpinnable() == false) {
      return;
    }
    this.spin(true, true);
    this.field.fireEvent("spin", this);
    this.field.fireEvent("spindown", this);
  },
  spin: function (d, b) {
    var a = parseFloat(this.field.getValue());
    var c = b == true ? this.alternateIncrementValue : this.incrementValue;
    d == true ? (a -= c) : (a += c);
    a = isNaN(a) ? this.defaultValue : a;
    a = this.fixBoundries(a);
    this.field.setRawValue(a);
  },
  fixBoundries: function (b) {
    var a = b;
    if (this.field.minValue != undefined && a < this.field.minValue) {
      a = this.field.minValue;
    }
    if (this.field.maxValue != undefined && a > this.field.maxValue) {
      a = this.field.maxValue;
    }
    return this.fixPrecision(a);
  },
  fixPrecision: function (b) {
    var a = isNaN(b);
    if (
      !this.field.allowDecimals ||
      this.field.decimalPrecision == -1 ||
      a ||
      !b
    ) {
      return a ? "" : b;
    }
    return parseFloat(parseFloat(b).toFixed(this.field.decimalPrecision));
  },
  doDestroy: function () {
    if (this.trigger) {
      this.trigger.remove();
    }
    if (this.wrap) {
      this.wrap.remove();
      delete this.field.wrap;
    }
    if (this.splitter) {
      this.splitter.remove();
    }
    if (this.dd) {
      this.dd.unreg();
      this.dd = null;
    }
    if (this.proxy) {
      this.proxy.remove();
    }
    if (this.repeater) {
      this.repeater.purgeListeners();
    }
    if (this.mimicing) {
      Ext.get(Ext.isIE ? document.body : document).un(
        "mousedown",
        this.mimicBlur,
        this
      );
    }
  },
});
Ext.form.Spinner = Ext.ux.Spinner;
Ext.ux.Spotlight = function (a) {
  Ext.apply(this, a);
};
Ext.ux.Spotlight.prototype = {
  active: false,
  animate: true,
  duration: 0.25,
  easing: "easeNone",
  animated: false,
  createElements: function () {
    var a = Ext.getBody();
    this.right = a.createChild({ cls: "x-spotlight" });
    this.left = a.createChild({ cls: "x-spotlight" });
    this.top = a.createChild({ cls: "x-spotlight" });
    this.bottom = a.createChild({ cls: "x-spotlight" });
    this.all = new Ext.CompositeElement([
      this.right,
      this.left,
      this.top,
      this.bottom,
    ]);
  },
  show: function (b, c, a) {
    if (this.animated) {
      this.show.defer(50, this, [b, c, a]);
      return;
    }
    this.el = Ext.get(b);
    if (!this.right) {
      this.createElements();
    }
    if (!this.active) {
      this.all.setDisplayed("");
      this.applyBounds(true, false);
      this.active = true;
      Ext.EventManager.onWindowResize(this.syncSize, this);
      this.applyBounds(false, this.animate, false, c, a);
    } else {
      this.applyBounds(false, false, false, c, a);
    }
  },
  hide: function (b, a) {
    if (this.animated) {
      this.hide.defer(50, this, [b, a]);
      return;
    }
    Ext.EventManager.removeResizeListener(this.syncSize, this);
    this.applyBounds(true, this.animate, true, b, a);
  },
  doHide: function () {
    this.active = false;
    this.all.setDisplayed(false);
  },
  syncSize: function () {
    this.applyBounds(false, false);
  },
  applyBounds: function (e, d, k, j, l) {
    var h = this.el.getRegion();
    var a = Ext.lib.Dom.getViewWidth(true);
    var g = Ext.lib.Dom.getViewHeight(true);
    var f = 0,
      b = false;
    if (d) {
      b = {
        callback: function () {
          f++;
          if (f == 4) {
            this.animated = false;
            if (k) {
              this.doHide();
            }
            Ext.callback(j, l, [this]);
          }
        },
        scope: this,
        duration: this.duration,
        easing: this.easing,
      };
      this.animated = true;
    }
    this.right.setBounds(
      h.right,
      e ? g : h.top,
      a - h.right,
      e ? 0 : g - h.top,
      b
    );
    this.left.setBounds(0, 0, h.left, e ? 0 : h.bottom, b);
    this.top.setBounds(e ? a : h.left, 0, e ? 0 : a - h.left, h.top, b);
    this.bottom.setBounds(0, h.bottom, e ? 0 : h.right, g - h.bottom, b);
    if (!d) {
      if (k) {
        this.doHide();
      }
      if (j) {
        Ext.callback(j, l, [this]);
      }
    }
  },
  destroy: function () {
    this.doHide();
    Ext.destroy(this.right, this.left, this.top, this.bottom);
    delete this.el;
    delete this.all;
  },
};
Ext.Spotlight = Ext.ux.Spotlight;
Ext.ux.StatusBar = Ext.extend(Ext.Toolbar, {
  cls: "x-statusbar",
  busyIconCls: "x-status-busy",
  busyText: "Loading...",
  autoClear: 5000,
  emptyText: "&nbsp;",
  activeThreadId: 0,
  initComponent: function () {
    if (this.statusAlign == "right") {
      this.cls += " x-status-right";
    }
    Ext.ux.StatusBar.superclass.initComponent.call(this);
  },
  afterRender: function () {
    Ext.ux.StatusBar.superclass.afterRender.call(this);
    var a = this.statusAlign == "right";
    this.currIconCls = this.iconCls || this.defaultIconCls;
    this.statusEl = new Ext.Toolbar.TextItem({
      cls: "x-status-text " + (this.currIconCls || ""),
      text: this.text || this.defaultText || "",
    });
    if (a) {
      this.add("->");
      this.add(this.statusEl);
    } else {
      this.insert(0, this.statusEl);
      this.insert(1, "->");
    }
    this.doLayout();
  },
  setStatus: function (d) {
    d = d || {};
    if (typeof d == "string") {
      d = { text: d };
    }
    if (d.text !== undefined) {
      this.setText(d.text);
    }
    if (d.iconCls !== undefined) {
      this.setIcon(d.iconCls);
    }
    if (d.clear) {
      var e = d.clear,
        b = this.autoClear,
        a = { useDefaults: true, anim: true };
      if (typeof e == "object") {
        e = Ext.applyIf(e, a);
        if (e.wait) {
          b = e.wait;
        }
      } else {
        if (typeof e == "number") {
          b = e;
          e = a;
        } else {
          if (typeof e == "boolean") {
            e = a;
          }
        }
      }
      e.threadId = this.activeThreadId;
      this.clearStatus.defer(b, this, [e]);
    }
    return this;
  },
  clearStatus: function (c) {
    c = c || {};
    if (c.threadId && c.threadId !== this.activeThreadId) {
      return this;
    }
    var b = c.useDefaults ? this.defaultText : this.emptyText,
      a = c.useDefaults ? (this.defaultIconCls ? this.defaultIconCls : "") : "";
    if (c.anim) {
      this.statusEl.el.fadeOut({
        remove: false,
        useDisplay: true,
        scope: this,
        callback: function () {
          this.setStatus({ text: b, iconCls: a });
          this.statusEl.el.show();
        },
      });
    } else {
      this.statusEl.hide();
      this.setStatus({ text: b, iconCls: a });
      this.statusEl.show();
    }
    return this;
  },
  setText: function (a) {
    this.activeThreadId++;
    this.text = a || "";
    if (this.rendered) {
      this.statusEl.setText(this.text);
    }
    return this;
  },
  getText: function () {
    return this.text;
  },
  setIcon: function (a) {
    this.activeThreadId++;
    a = a || "";
    if (this.rendered) {
      if (this.currIconCls) {
        this.statusEl.removeClass(this.currIconCls);
        this.currIconCls = null;
      }
      if (a.length > 0) {
        this.statusEl.addClass(a);
        this.currIconCls = a;
      }
    } else {
      this.currIconCls = a;
    }
    return this;
  },
  showBusy: function (a) {
    if (typeof a == "string") {
      a = { text: a };
    }
    a = Ext.applyIf(a || {}, {
      text: this.busyText,
      iconCls: this.busyIconCls,
    });
    return this.setStatus(a);
  },
});
Ext.reg("statusbar", Ext.ux.StatusBar);
Ext.ux.TabCloseMenu = Ext.extend(Object, {
  closeTabText: "Close Tab",
  closeOtherTabsText: "Close Other Tabs",
  showCloseAll: true,
  closeAllTabsText: "Close All Tabs",
  constructor: function (a) {
    Ext.apply(this, a || {});
  },
  init: function (a) {
    this.tabs = a;
    a.on({
      scope: this,
      contextmenu: this.onContextMenu,
      destroy: this.destroy,
    });
  },
  destroy: function () {
    Ext.destroy(this.menu);
    delete this.menu;
    delete this.tabs;
    delete this.active;
  },
  onContextMenu: function (b, c, g) {
    this.active = c;
    var a = this.createMenu(),
      d = true,
      h = true,
      f = a.getComponent("closeall");
    a.getComponent("close").setDisabled(!c.closable);
    b.items.each(function () {
      if (this.closable) {
        d = false;
        if (this != c) {
          h = false;
          return false;
        }
      }
    });
    a.getComponent("closeothers").setDisabled(h);
    if (f) {
      f.setDisabled(d);
    }
    g.stopEvent();
    a.showAt(g.getPoint());
  },
  createMenu: function () {
    if (!this.menu) {
      var a = [
        {
          itemId: "close",
          text: this.closeTabText,
          scope: this,
          handler: this.onClose,
        },
      ];
      if (this.showCloseAll) {
        a.push("-");
      }
      a.push({
        itemId: "closeothers",
        text: this.closeOtherTabsText,
        scope: this,
        handler: this.onCloseOthers,
      });
      if (this.showCloseAll) {
        a.push({
          itemId: "closeall",
          text: this.closeAllTabsText,
          scope: this,
          handler: this.onCloseAll,
        });
      }
      this.menu = new Ext.menu.Menu({ items: a });
    }
    return this.menu;
  },
  onClose: function () {
    this.tabs.remove(this.active);
  },
  onCloseOthers: function () {
    this.doClose(true);
  },
  onCloseAll: function () {
    this.doClose(false);
  },
  doClose: function (b) {
    var a = [];
    this.tabs.items.each(function (c) {
      if (c.closable) {
        if (!b || c != this.active) {
          a.push(c);
        }
      }
    }, this);
    Ext.each(
      a,
      function (c) {
        this.tabs.remove(c);
      },
      this
    );
  },
});
Ext.preg("tabclosemenu", Ext.ux.TabCloseMenu);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.TableGrid = function (p, f) {
  f = f || {};
  Ext.apply(this, f);
  var c = f.fields || [],
    a = f.columns || [];
  p = Ext.get(p);
  var k = p.insertSibling();
  var l = [],
    m = [];
  var e = p.query("thead th");
  for (var g = 0, j; (j = e[g]); g++) {
    var o = j.innerHTML;
    var b = "tcol-" + g;
    l.push(
      Ext.applyIf(c[g] || {}, {
        name: b,
        mapping: "td:nth(" + (g + 1) + ")/@innerHTML",
      })
    );
    m.push(
      Ext.applyIf(a[g] || {}, {
        header: o,
        dataIndex: b,
        width: j.offsetWidth,
        tooltip: j.title,
        sortable: true,
      })
    );
  }
  var d = new Ext.data.Store({
    reader: new Ext.data.XmlReader({ record: "tbody tr" }, l),
  });
  d.loadData(p.dom);
  var n = new Ext.grid.ColumnModel(m);
  if (f.width || f.height) {
    k.setSize(f.width || "auto", f.height || "auto");
  } else {
    k.setWidth(p.getWidth());
  }
  if (f.remove !== false) {
    p.remove();
  }
  Ext.applyIf(this, {
    ds: d,
    cm: n,
    sm: new Ext.grid.RowSelectionModel(),
    autoHeight: true,
    autoWidth: false,
  });
  Ext.ux.grid.TableGrid.superclass.constructor.call(this, k, {});
};
Ext.extend(Ext.ux.grid.TableGrid, Ext.grid.GridPanel);
Ext.grid.TableGrid = Ext.ux.grid.TableGrid;
Ext.ns("Ext.ux");
Ext.ux.TabScrollerMenu = Ext.extend(Object, {
  pageSize: 10,
  maxText: 15,
  menuPrefixText: "Items",
  constructor: function (a) {
    a = a || {};
    Ext.apply(this, a);
  },
  init: function (b) {
    Ext.apply(b, this.parentOverrides);
    b.tabScrollerMenu = this;
    var a = this;
    b.on({
      render: {
        scope: b,
        single: true,
        fn: function () {
          var c = b.createScrollers.createSequence(a.createPanelsMenu, this);
          b.createScrollers = c;
        },
      },
    });
  },
  createPanelsMenu: function () {
    var c = this.stripWrap.dom.offsetHeight;
    var b = this.header.dom.firstChild;
    Ext.fly(b).applyStyles({ right: "18px" });
    var a = Ext.get(this.strip.dom.parentNode);
    a.applyStyles({ "margin-right": "36px" });
    var d = this.header.insertFirst({ cls: "x-tab-tabmenu-right" });
    d.setHeight(c);
    d.addClassOnOver("x-tab-tabmenu-over");
    d.on("click", this.showTabsMenu, this);
    this.scrollLeft.show = this.scrollLeft.show.createSequence(function () {
      d.show();
    });
    this.scrollLeft.hide = this.scrollLeft.hide.createSequence(function () {
      d.hide();
    });
  },
  getPageSize: function () {
    return this.pageSize;
  },
  setPageSize: function (a) {
    this.pageSize = a;
  },
  getMaxText: function () {
    return this.maxText;
  },
  setMaxText: function (a) {
    this.maxText = a;
  },
  getMenuPrefixText: function () {
    return this.menuPrefixText;
  },
  setMenuPrefixText: function (a) {
    this.menuPrefixText = a;
  },
  parentOverrides: {
    showTabsMenu: function (c) {
      if (this.tabsMenu) {
        this.tabsMenu.destroy();
        this.un("destroy", this.tabsMenu.destroy, this.tabsMenu);
        this.tabsMenu = null;
      }
      this.tabsMenu = new Ext.menu.Menu();
      this.on("destroy", this.tabsMenu.destroy, this.tabsMenu);
      this.generateTabMenuItems();
      var b = Ext.get(c.getTarget());
      var a = b.getXY();
      a[1] += 24;
      this.tabsMenu.showAt(a);
    },
    generateTabMenuItems: function () {
      var a = this.getActiveTab();
      var l = this.items.getCount();
      var g = this.tabScrollerMenu.getPageSize();
      if (l > g) {
        var d = Math.floor(l / g);
        var j = l % g;
        for (var e = 0; e < d; e++) {
          var f = (e + 1) * g;
          var b = [];
          for (var h = 0; h < g; h++) {
            index = h + f - g;
            var k = this.items.get(index);
            b.push(this.autoGenMenuItem(k));
          }
          this.tabsMenu.add({
            text:
              this.tabScrollerMenu.getMenuPrefixText() +
              " " +
              (f - g + 1) +
              " - " +
              f,
            menu: b,
          });
        }
        if (j > 0) {
          var c = d * g;
          b = [];
          for (var e = c; e < l; e++) {
            var k = this.items.get(e);
            b.push(this.autoGenMenuItem(k));
          }
          this.tabsMenu.add({
            text:
              this.tabScrollerMenu.menuPrefixText +
              " " +
              (c + 1) +
              " - " +
              (c + b.length),
            menu: b,
          });
        }
      } else {
        this.items.each(function (m) {
          if (m.id != a.id && !m.hidden) {
            this.tabsMenu.add(this.autoGenMenuItem(m));
          }
        }, this);
      }
    },
    autoGenMenuItem: function (b) {
      var a = this.tabScrollerMenu.getMaxText();
      var c = Ext.util.Format.ellipsis(b.title, a);
      return {
        text: c,
        handler: this.showTabFromMenu,
        scope: this,
        disabled: b.disabled,
        tabToShow: b,
        iconCls: b.iconCls,
      };
    },
    showTabFromMenu: function (a) {
      this.setActiveTab(a.tabToShow);
    },
  },
});
Ext.reg("tabscrollermenu", Ext.ux.TabScrollerMenu);
Ext.ns("Ext.ux.tree");
Ext.ux.tree.XmlTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
  XML_NODE_ELEMENT: 1,
  XML_NODE_TEXT: 3,
  processResponse: function (b, d, g) {
    var c = b.responseXML,
      a = c.documentElement || c;
    try {
      d.beginUpdate();
      d.appendChild(this.parseXml(a));
      d.endUpdate();
      this.runCallback(g, scope || d, [d]);
    } catch (f) {
      this.handleFailure(b);
    }
  },
  parseXml: function (b) {
    var a = [];
    Ext.each(
      b.childNodes,
      function (f) {
        if (f.nodeType == this.XML_NODE_ELEMENT) {
          var c = this.createNode(f);
          if (f.childNodes.length > 0) {
            var e = this.parseXml(f);
            if (typeof e == "string") {
              c.attributes.innerText = e;
            } else {
              c.appendChild(e);
            }
          }
          a.push(c);
        } else {
          if (f.nodeType == this.XML_NODE_TEXT) {
            var d = f.nodeValue.trim();
            if (d.length > 0) {
              return (a = d);
            }
          }
        }
      },
      this
    );
    return a;
  },
  createNode: function (b) {
    var a = { tagName: b.tagName };
    Ext.each(b.attributes, function (c) {
      a[c.nodeName] = c.nodeValue;
    });
    this.processAttributes(a);
    return Ext.ux.tree.XmlTreeLoader.superclass.createNode.call(this, a);
  },
  processAttributes: Ext.emptyFn,
});
Ext.ux.XmlTreeLoader = Ext.ux.tree.XmlTreeLoader;
Ext.ux.ValidationStatus = Ext.extend(Ext.Component, {
  errorIconCls: "x-status-error",
  errorListCls: "x-status-error-list",
  validIconCls: "x-status-valid",
  showText: "The form has errors (click for details...)",
  hideText: "Click again to hide the error list",
  submitText: "Saving...",
  init: function (a) {
    a.on(
      "render",
      function () {
        this.statusBar = a;
        this.monitor = true;
        this.errors = new Ext.util.MixedCollection();
        this.listAlign = a.statusAlign == "right" ? "br-tr?" : "bl-tl?";
        if (this.form) {
          this.form = Ext.getCmp(this.form).getForm();
          this.startMonitoring();
          this.form.on(
            "beforeaction",
            function (d, c) {
              if (c.type == "submit") {
                this.monitor = false;
              }
            },
            this
          );
          var b = function () {
            this.monitor = true;
          };
          this.form.on("actioncomplete", b, this);
          this.form.on("actionfailed", b, this);
        }
      },
      this,
      { single: true }
    );
    a.on({
      scope: this,
      afterlayout: {
        single: true,
        fn: function () {
          a.statusEl
            .getEl()
            .on("click", this.onStatusClick, this, { buffer: 200 });
        },
      },
      beforedestroy: { single: true, fn: this.onDestroy },
    });
  },
  startMonitoring: function () {
    this.form.items.each(function (a) {
      a.on("invalid", this.onFieldValidation, this);
      a.on("valid", this.onFieldValidation, this);
    }, this);
  },
  stopMonitoring: function () {
    this.form.items.each(function (a) {
      a.un("invalid", this.onFieldValidation, this);
      a.un("valid", this.onFieldValidation, this);
    }, this);
  },
  onDestroy: function () {
    this.stopMonitoring();
    this.statusBar.statusEl.un("click", this.onStatusClick, this);
    Ext.ux.ValidationStatus.superclass.onDestroy.call(this);
  },
  onFieldValidation: function (a, b) {
    if (!this.monitor) {
      return false;
    }
    if (b) {
      this.errors.add(a.id, { field: a, msg: b });
    } else {
      this.errors.removeKey(a.id);
    }
    this.updateErrorList();
    if (this.errors.getCount() > 0) {
      if (this.statusBar.getText() != this.showText) {
        this.statusBar.setStatus({
          text: this.showText,
          iconCls: this.errorIconCls,
        });
      }
    } else {
      this.statusBar.clearStatus().setIcon(this.validIconCls);
    }
  },
  updateErrorList: function () {
    if (this.errors.getCount() > 0) {
      var a = "<ul>";
      this.errors.each(function (b) {
        a +=
          '<li id="x-err-' +
          b.field.id +
          '"><a href="#">' +
          b.msg +
          "</a></li>";
      }, this);
      this.getMsgEl().update(a + "</ul>");
    } else {
      this.getMsgEl().update("");
    }
  },
  getMsgEl: function () {
    if (!this.msgEl) {
      this.msgEl = Ext.DomHelper.append(
        Ext.getBody(),
        { cls: this.errorListCls + " x-hide-offsets" },
        true
      );
      this.msgEl.on(
        "click",
        function (b) {
          var a = b.getTarget("li", 10, true);
          if (a) {
            Ext.getCmp(a.id.split("x-err-")[1]).focus();
            this.hideErrors();
          }
        },
        this,
        { stopEvent: true }
      );
    }
    return this.msgEl;
  },
  showErrors: function () {
    this.updateErrorList();
    this.getMsgEl()
      .alignTo(this.statusBar.getEl(), this.listAlign)
      .slideIn("b", { duration: 0.3, easing: "easeOut" });
    this.statusBar.setText(this.hideText);
    this.form.getEl().on("click", this.hideErrors, this, { single: true });
  },
  hideErrors: function () {
    var a = this.getMsgEl();
    if (a.isVisible()) {
      a.slideOut("b", { duration: 0.2, easing: "easeIn" });
      this.statusBar.setText(this.showText);
    }
    this.form.getEl().un("click", this.hideErrors, this);
  },
  onStatusClick: function () {
    if (this.getMsgEl().isVisible()) {
      this.hideErrors();
    } else {
      if (this.errors.getCount() > 0) {
        this.showErrors();
      }
    }
  },
});
(function () {
  Ext.override(Ext.list.Column, {
    init: function () {
      var b = Ext.data.Types,
        a = this.sortType;
      if (this.type) {
        if (Ext.isString(this.type)) {
          this.type = Ext.data.Types[this.type.toUpperCase()] || b.AUTO;
        }
      } else {
        this.type = b.AUTO;
      }
      if (Ext.isString(a)) {
        this.sortType = Ext.data.SortTypes[a];
      } else {
        if (Ext.isEmpty(a)) {
          this.sortType = this.type.sortType;
        }
      }
    },
  });
  Ext.tree.Column = Ext.extend(Ext.list.Column, {});
  Ext.tree.NumberColumn = Ext.extend(Ext.list.NumberColumn, {});
  Ext.tree.DateColumn = Ext.extend(Ext.list.DateColumn, {});
  Ext.tree.BooleanColumn = Ext.extend(Ext.list.BooleanColumn, {});
  Ext.reg("tgcolumn", Ext.tree.Column);
  Ext.reg("tgnumbercolumn", Ext.tree.NumberColumn);
  Ext.reg("tgdatecolumn", Ext.tree.DateColumn);
  Ext.reg("tgbooleancolumn", Ext.tree.BooleanColumn);
})();
Ext.ux.tree.TreeGridNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
  isTreeGridNodeUI: true,
  renderElements: function (d, l, h, m) {
    var o = d.getOwnerTree(),
      k = o.columns,
      j = k[0],
      e,
      b,
      g;
    this.indentMarkup = d.parentNode ? d.parentNode.ui.getChildIndent() : "";
    b = [
      '<tbody class="x-tree-node">',
      '<tr ext:tree-node-id="',
      d.id,
      '" class="x-tree-node-el x-tree-node-leaf ',
      l.cls,
      '">',
      '<td class="x-treegrid-col">',
      '<span class="x-tree-node-indent">',
      this.indentMarkup,
      "</span>",
      '<img src="',
      this.emptyIcon,
      '" class="x-tree-ec-icon x-tree-elbow" />',
      '<img src="',
      l.icon || this.emptyIcon,
      '" class="x-tree-node-icon',
      l.icon ? " x-tree-node-inline-icon" : "",
      l.iconCls ? " " + l.iconCls : "",
      '" unselectable="on" />',
      '<a hidefocus="on" class="x-tree-node-anchor" href="',
      l.href ? l.href : "#",
      '" tabIndex="1" ',
      l.hrefTarget ? ' target="' + l.hrefTarget + '"' : "",
      ">",
      '<span unselectable="on">',
      j.tpl ? j.tpl.apply(l) : l[j.dataIndex] || j.text,
      "</span></a>",
      "</td>",
    ];
    for (e = 1, g = k.length; e < g; e++) {
      j = k[e];
      b.push(
        '<td class="x-treegrid-col ',
        j.cls ? j.cls : "",
        '">',
        '<div unselectable="on" class="x-treegrid-text"',
        j.align ? ' style="text-align: ' + j.align + ';"' : "",
        ">",
        j.tpl ? j.tpl.apply(l) : l[j.dataIndex],
        "</div>",
        "</td>"
      );
    }
    b.push(
      '</tr><tr class="x-tree-node-ct"><td colspan="',
      k.length,
      '">',
      '<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ',
      o.innerCt.getWidth(),
      'px;"><colgroup>'
    );
    for (e = 0, g = k.length; e < g; e++) {
      b.push('<col style="width: ', k[e].hidden ? 0 : k[e].width, 'px;" />');
    }
    b.push("</colgroup></table></td></tr></tbody>");
    if (m !== true && d.nextSibling && d.nextSibling.ui.getEl()) {
      this.wrap = Ext.DomHelper.insertHtml(
        "beforeBegin",
        d.nextSibling.ui.getEl(),
        b.join("")
      );
    } else {
      this.wrap = Ext.DomHelper.insertHtml("beforeEnd", h, b.join(""));
    }
    this.elNode = this.wrap.childNodes[0];
    this.ctNode = this.wrap.childNodes[1].firstChild.firstChild;
    var f = this.elNode.firstChild.childNodes;
    this.indentNode = f[0];
    this.ecNode = f[1];
    this.iconNode = f[2];
    this.anchor = f[3];
    this.textNode = f[3].firstChild;
  },
  animExpand: function (a) {
    this.ctNode.style.display = "";
    Ext.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this, a);
  },
});
Ext.ux.tree.TreeGridRootNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
  isTreeGridNodeUI: true,
  render: function () {
    if (!this.rendered) {
      this.wrap = this.ctNode = this.node.ownerTree.innerCt.dom;
      this.node.expanded = true;
    }
    if (Ext.isWebKit) {
      var a = this.ctNode;
      a.style.tableLayout = null;
      (function () {
        a.style.tableLayout = "fixed";
      }).defer(1);
    }
  },
  destroy: function () {
    if (this.elNode) {
      Ext.dd.Registry.unregister(this.elNode.id);
    }
    delete this.node;
  },
  collapse: Ext.emptyFn,
  expand: Ext.emptyFn,
});
Ext.tree.ColumnResizer = Ext.extend(Ext.util.Observable, {
  minWidth: 14,
  constructor: function (a) {
    Ext.apply(this, a);
    Ext.tree.ColumnResizer.superclass.constructor.call(this);
  },
  init: function (a) {
    this.tree = a;
    a.on("render", this.initEvents, this);
  },
  initEvents: function (a) {
    a.mon(a.innerHd, "mousemove", this.handleHdMove, this);
    this.tracker = new Ext.dd.DragTracker({
      onBeforeStart: this.onBeforeStart.createDelegate(this),
      onStart: this.onStart.createDelegate(this),
      onDrag: this.onDrag.createDelegate(this),
      onEnd: this.onEnd.createDelegate(this),
      tolerance: 3,
      autoStart: 300,
    });
    this.tracker.initEl(a.innerHd);
    a.on("beforedestroy", this.tracker.destroy, this.tracker);
  },
  handleHdMove: function (f, k) {
    var g = 5,
      j = f.getPageX(),
      d = f.getTarget(".x-treegrid-hd", 3, true);
    if (d) {
      var b = d.getRegion(),
        l = d.dom.style,
        c = d.dom.parentNode;
      if (j - b.left <= g && d.dom !== c.firstChild) {
        var a = d.dom.previousSibling;
        while (a && Ext.fly(a).hasClass("x-treegrid-hd-hidden")) {
          a = a.previousSibling;
        }
        if (a) {
          this.activeHd = Ext.get(a);
          l.cursor = Ext.isWebKit ? "e-resize" : "col-resize";
        }
      } else {
        if (b.right - j <= g) {
          var h = d.dom;
          while (h && Ext.fly(h).hasClass("x-treegrid-hd-hidden")) {
            h = h.previousSibling;
          }
          if (h) {
            this.activeHd = Ext.get(h);
            l.cursor = Ext.isWebKit ? "w-resize" : "col-resize";
          }
        } else {
          delete this.activeHd;
          l.cursor = "";
        }
      }
    }
  },
  onBeforeStart: function (a) {
    this.dragHd = this.activeHd;
    return !!this.dragHd;
  },
  onStart: function (b) {
    this.dragHeadersDisabled = this.tree.headersDisabled;
    this.tree.headersDisabled = true;
    this.proxy = this.tree.body.createChild({ cls: "x-treegrid-resizer" });
    this.proxy.setHeight(this.tree.body.getHeight());
    var a = this.tracker.getXY()[0];
    this.hdX = this.dragHd.getX();
    this.hdIndex = this.tree.findHeaderIndex(this.dragHd);
    this.proxy.setX(this.hdX);
    this.proxy.setWidth(a - this.hdX);
    this.maxWidth =
      this.tree.outerCt.getWidth() -
      this.tree.innerBody.translatePoints(this.hdX).left;
  },
  onDrag: function (b) {
    var a = this.tracker.getXY()[0];
    this.proxy.setWidth((a - this.hdX).constrain(this.minWidth, this.maxWidth));
  },
  onEnd: function (d) {
    var b = this.proxy.getWidth(),
      a = this.tree,
      c = this.dragHeadersDisabled;
    this.proxy.remove();
    delete this.dragHd;
    a.columns[this.hdIndex].width = b;
    a.updateColumnWidths();
    setTimeout(function () {
      a.headersDisabled = c;
    }, 100);
  },
});
Ext.ns("Ext.ux.tree");
Ext.ux.tree.TreeGridSorter = Ext.extend(Ext.tree.TreeSorter, {
  sortClasses: ["sort-asc", "sort-desc"],
  sortAscText: "Sort Ascending",
  sortDescText: "Sort Descending",
  constructor: function (a, b) {
    if (!Ext.isObject(b)) {
      b = { property: a.columns[0].dataIndex || "text", folderSort: true };
    }
    Ext.ux.tree.TreeGridSorter.superclass.constructor.apply(this, arguments);
    this.tree = a;
    a.on("headerclick", this.onHeaderClick, this);
    a.ddAppendOnly = true;
    var c = this;
    this.defaultSortFn = function (l, k) {
      var j = c.dir && c.dir.toLowerCase() == "desc",
        d = c.property || "text",
        f = c.sortType,
        n = c.caseSensitive === true,
        e = c.leafAttr || "leaf",
        o = l.attributes,
        m = k.attributes;
      if (c.folderSort) {
        if (o[e] && !m[e]) {
          return 1;
        }
        if (!o[e] && m[e]) {
          return -1;
        }
      }
      var h = o[d],
        g = m[d],
        p = f ? f(h) : n ? h : h.toUpperCase();
      v2 = f ? f(g) : n ? g : g.toUpperCase();
      if (p < v2) {
        return j ? +1 : -1;
      } else {
        if (p > v2) {
          return j ? -1 : +1;
        } else {
          return 0;
        }
      }
    };
    a.on("afterrender", this.onAfterTreeRender, this, { single: true });
    a.on("headermenuclick", this.onHeaderMenuClick, this);
  },
  onAfterTreeRender: function () {
    if (this.tree.hmenu) {
      this.tree.hmenu.insert(
        0,
        { itemId: "asc", text: this.sortAscText, cls: "xg-hmenu-sort-asc" },
        { itemId: "desc", text: this.sortDescText, cls: "xg-hmenu-sort-desc" }
      );
    }
    this.updateSortIcon(0, "asc");
  },
  onHeaderMenuClick: function (d, b, a) {
    if (b === "asc" || b === "desc") {
      this.onHeaderClick(d, null, a);
      return false;
    }
  },
  onHeaderClick: function (e, b, a) {
    if (e && !this.tree.headersDisabled) {
      var d = this;
      d.property = e.dataIndex;
      d.dir = e.dir = e.dir === "desc" ? "asc" : "desc";
      d.sortType = e.sortType;
      d.caseSensitive === Ext.isBoolean(e.caseSensitive)
        ? e.caseSensitive
        : this.caseSensitive;
      d.sortFn = e.sortFn || this.defaultSortFn;
      this.tree.root.cascade(function (c) {
        if (!c.isLeaf()) {
          d.updateSort(d.tree, c);
        }
      });
      this.updateSortIcon(a, e.dir);
    }
  },
  updateSortIcon: function (b, a) {
    var d = this.sortClasses,
      c = this.tree.innerHd.select("td").removeClass(d);
    c.item(b).addClass(d[a == "desc" ? 1 : 0]);
  },
});
Ext.ux.tree.TreeGridLoader = Ext.extend(Ext.tree.TreeLoader, {
  createNode: function (a) {
    if (!a.uiProvider) {
      a.uiProvider = Ext.ux.tree.TreeGridNodeUI;
    }
    return Ext.tree.TreeLoader.prototype.createNode.call(this, a);
  },
});
Ext.ux.tree.TreeGrid = Ext.extend(Ext.tree.TreePanel, {
  rootVisible: false,
  useArrows: true,
  lines: false,
  borderWidth: Ext.isBorderBox ? 0 : 2,
  cls: "x-treegrid",
  columnResize: true,
  enableSort: true,
  reserveScrollOffset: true,
  enableHdMenu: true,
  columnsText: "Columns",
  initComponent: function () {
    if (!this.root) {
      this.root = new Ext.tree.AsyncTreeNode({ text: "Root" });
    }
    var a = this.loader;
    if (!a) {
      a = new Ext.ux.tree.TreeGridLoader({
        dataUrl: this.dataUrl,
        requestMethod: this.requestMethod,
        store: this.store,
      });
    } else {
      if (Ext.isObject(a) && !a.load) {
        a = new Ext.ux.tree.TreeGridLoader(a);
      }
    }
    this.loader = a;
    Ext.ux.tree.TreeGrid.superclass.initComponent.call(this);
    this.initColumns();
    if (this.enableSort) {
      this.treeGridSorter = new Ext.ux.tree.TreeGridSorter(
        this,
        this.enableSort
      );
    }
    if (this.columnResize) {
      this.colResizer = new Ext.tree.ColumnResizer(this.columnResize);
      this.colResizer.init(this);
    }
    var b = this.columns;
    if (!this.internalTpl) {
      this.internalTpl = new Ext.XTemplate(
        '<div class="x-grid3-header">',
        '<div class="x-treegrid-header-inner">',
        '<div class="x-grid3-header-offset">',
        '<table style="table-layout: fixed;" cellspacing="0" cellpadding="0" border="0"><colgroup><tpl for="columns"><col /></tpl></colgroup>',
        '<thead><tr class="x-grid3-hd-row">',
        '<tpl for="columns">',
        '<td class="x-grid3-hd x-grid3-cell x-treegrid-hd" style="text-align: {align};" id="',
        this.id,
        '-xlhd-{#}">',
        '<div class="x-grid3-hd-inner x-treegrid-hd-inner" unselectable="on">',
        this.enableHdMenu ? '<a class="x-grid3-hd-btn" href="#"></a>' : "",
        '{header}<img class="x-grid3-sort-icon" src="',
        Ext.BLANK_IMAGE_URL,
        '" />',
        "</div>",
        "</td></tpl>",
        "</tr></thead>",
        "</table>",
        "</div></div>",
        "</div>",
        '<div class="x-treegrid-root-node">',
        '<table class="x-treegrid-root-table" cellpadding="0" cellspacing="0" style="table-layout: fixed;"></table>',
        "</div>"
      );
    }
    if (!this.colgroupTpl) {
      this.colgroupTpl = new Ext.XTemplate(
        '<colgroup><tpl for="columns"><col style="width: {width}px"/></tpl></colgroup>'
      );
    }
  },
  initColumns: function () {
    var e = this.columns,
      a = e.length,
      d = [],
      b,
      f;
    for (b = 0; b < a; b++) {
      f = e[b];
      if (!f.isColumn) {
        f.xtype = f.xtype
          ? /^tg/.test(f.xtype)
            ? f.xtype
            : "tg" + f.xtype
          : "tgcolumn";
        f = Ext.create(f);
      }
      f.init(this);
      d.push(f);
      if (this.enableSort !== false && f.sortable !== false) {
        f.sortable = true;
        this.enableSort = true;
      }
    }
    this.columns = d;
  },
  onRender: function () {
    Ext.tree.TreePanel.superclass.onRender.apply(this, arguments);
    this.el.addClass("x-treegrid");
    this.outerCt = this.body.createChild({
      cls:
        "x-tree-root-ct x-treegrid-ct " +
        (this.useArrows
          ? "x-tree-arrows"
          : this.lines
          ? "x-tree-lines"
          : "x-tree-no-lines"),
    });
    this.internalTpl.overwrite(this.outerCt, { columns: this.columns });
    this.mainHd = Ext.get(this.outerCt.dom.firstChild);
    this.innerHd = Ext.get(this.mainHd.dom.firstChild);
    this.innerBody = Ext.get(this.outerCt.dom.lastChild);
    this.innerCt = Ext.get(this.innerBody.dom.firstChild);
    this.colgroupTpl.insertFirst(this.innerCt, { columns: this.columns });
    if (this.hideHeaders) {
      this.el.child(".x-grid3-header").setDisplayed("none");
    } else {
      if (this.enableHdMenu !== false) {
        this.hmenu = new Ext.menu.Menu({ id: this.id + "-hctx" });
        if (this.enableColumnHide !== false) {
          this.colMenu = new Ext.menu.Menu({ id: this.id + "-hcols-menu" });
          this.colMenu.on({
            scope: this,
            beforeshow: this.beforeColMenuShow,
            itemclick: this.handleHdMenuClick,
          });
          this.hmenu.add({
            itemId: "columns",
            hideOnClick: false,
            text: this.columnsText,
            menu: this.colMenu,
            iconCls: "x-cols-icon",
          });
        }
        this.hmenu.on("itemclick", this.handleHdMenuClick, this);
      }
    }
  },
  setRootNode: function (a) {
    a.attributes.uiProvider = Ext.ux.tree.TreeGridRootNodeUI;
    a = Ext.ux.tree.TreeGrid.superclass.setRootNode.call(this, a);
    if (this.innerCt) {
      this.colgroupTpl.insertFirst(this.innerCt, { columns: this.columns });
    }
    return a;
  },
  clearInnerCt: function () {
    if (Ext.isIE) {
      var a = this.innerCt.dom;
      while (a.firstChild) {
        a.removeChild(a.firstChild);
      }
    } else {
      Ext.ux.tree.TreeGrid.superclass.clearInnerCt.call(this);
    }
  },
  initEvents: function () {
    Ext.ux.tree.TreeGrid.superclass.initEvents.apply(this, arguments);
    this.mon(this.innerBody, "scroll", this.syncScroll, this);
    this.mon(this.innerHd, "click", this.handleHdDown, this);
    this.mon(this.mainHd, {
      scope: this,
      mouseover: this.handleHdOver,
      mouseout: this.handleHdOut,
    });
  },
  onResize: function (b, c) {
    Ext.ux.tree.TreeGrid.superclass.onResize.apply(this, arguments);
    var e = this.innerBody.dom;
    var f = this.innerHd.dom;
    if (!e) {
      return;
    }
    if (Ext.isNumber(c)) {
      e.style.height = this.body.getHeight(true) - f.offsetHeight + "px";
    }
    if (Ext.isNumber(b)) {
      var a = Ext.num(this.scrollOffset, Ext.getScrollBarWidth());
      if (this.reserveScrollOffset || e.offsetWidth - e.clientWidth > 10) {
        this.setScrollOffset(a);
      } else {
        var d = this;
        setTimeout(function () {
          d.setScrollOffset(e.offsetWidth - e.clientWidth > 10 ? a : 0);
        }, 10);
      }
    }
  },
  updateColumnWidths: function () {
    var k = this.columns,
      m = k.length,
      a = this.outerCt.query("colgroup"),
      l = a.length,
      h,
      e,
      d,
      b;
    for (d = 0; d < m; d++) {
      h = k[d];
      for (b = 0; b < l; b++) {
        e = a[b];
        e.childNodes[d].style.width = (h.hidden ? 0 : h.width) + "px";
      }
    }
    for (d = 0, a = this.innerHd.query("td"), len = a.length; d < len; d++) {
      h = Ext.fly(a[d]);
      if (k[d] && k[d].hidden) {
        h.addClass("x-treegrid-hd-hidden");
      } else {
        h.removeClass("x-treegrid-hd-hidden");
      }
    }
    var f = this.getTotalColumnWidth();
    Ext.fly(this.innerHd.dom.firstChild).setWidth(f + (this.scrollOffset || 0));
    this.outerCt.select("table").setWidth(f);
    this.syncHeaderScroll();
  },
  getVisibleColumns: function () {
    var c = [],
      d = this.columns,
      a = d.length,
      b;
    for (b = 0; b < a; b++) {
      if (!d[b].hidden) {
        c.push(d[b]);
      }
    }
    return c;
  },
  getTotalColumnWidth: function () {
    var d = 0;
    for (var b = 0, c = this.getVisibleColumns(), a = c.length; b < a; b++) {
      d += c[b].width;
    }
    return d;
  },
  setScrollOffset: function (a) {
    this.scrollOffset = a;
    this.updateColumnWidths();
  },
  handleHdDown: function (j, f) {
    var h = j.getTarget(".x-treegrid-hd");
    if (h && Ext.fly(f).hasClass("x-grid3-hd-btn")) {
      var b = this.hmenu.items,
        g = this.columns,
        a = this.findHeaderIndex(h),
        k = g[a],
        d = k.sortable;
      j.stopEvent();
      Ext.fly(h).addClass("x-grid3-hd-menu-open");
      this.hdCtxIndex = a;
      this.fireEvent("headerbuttonclick", b, k, h, a);
      this.hmenu.on(
        "hide",
        function () {
          Ext.fly(h).removeClass("x-grid3-hd-menu-open");
        },
        this,
        { single: true }
      );
      this.hmenu.show(f, "tl-bl?");
    } else {
      if (h) {
        var a = this.findHeaderIndex(h);
        this.fireEvent("headerclick", this.columns[a], h, a);
      }
    }
  },
  handleHdOver: function (d, a) {
    var c = d.getTarget(".x-treegrid-hd");
    if (c && !this.headersDisabled) {
      index = this.findHeaderIndex(c);
      this.activeHdRef = a;
      this.activeHdIndex = index;
      var b = Ext.get(c);
      this.activeHdRegion = b.getRegion();
      b.addClass("x-grid3-hd-over");
      this.activeHdBtn = b.child(".x-grid3-hd-btn");
      if (this.activeHdBtn) {
        this.activeHdBtn.dom.style.height =
          c.firstChild.offsetHeight - 1 + "px";
      }
    }
  },
  handleHdOut: function (c, a) {
    var b = c.getTarget(".x-treegrid-hd");
    if (b && (!Ext.isIE || !c.within(b, true))) {
      this.activeHdRef = null;
      Ext.fly(b).removeClass("x-grid3-hd-over");
      b.style.cursor = "";
    }
  },
  findHeaderIndex: function (d) {
    d = d.dom || d;
    var b = d.parentNode.childNodes;
    for (var a = 0, e; (e = b[a]); a++) {
      if (e == d) {
        return a;
      }
    }
    return -1;
  },
  beforeColMenuShow: function () {
    var d = this.columns,
      b = d.length,
      a,
      e;
    this.colMenu.removeAll();
    for (a = 1; a < b; a++) {
      e = d[a];
      if (e.hideable !== false) {
        this.colMenu.add(
          new Ext.menu.CheckItem({
            itemId: "col-" + a,
            text: e.header,
            checked: !e.hidden,
            hideOnClick: false,
            disabled: e.hideable === false,
          })
        );
      }
    }
  },
  handleHdMenuClick: function (b) {
    var a = this.hdCtxIndex,
      c = b.getItemId();
    if (this.fireEvent("headermenuclick", this.columns[a], c, a) !== false) {
      a = c.substr(4);
      if (a > 0 && this.columns[a]) {
        this.setColumnVisible(a, !b.checked);
      }
    }
    return true;
  },
  setColumnVisible: function (a, b) {
    this.columns[a].hidden = !b;
    this.updateColumnWidths();
  },
  scrollToTop: function () {
    this.innerBody.dom.scrollTop = 0;
    this.innerBody.dom.scrollLeft = 0;
  },
  syncScroll: function () {
    this.syncHeaderScroll();
    var a = this.innerBody.dom;
    this.fireEvent("bodyscroll", a.scrollLeft, a.scrollTop);
  },
  syncHeaderScroll: function () {
    var a = this.innerBody.dom;
    this.innerHd.dom.scrollLeft = a.scrollLeft;
    this.innerHd.dom.scrollLeft = a.scrollLeft;
  },
  registerNode: function (a) {
    Ext.ux.tree.TreeGrid.superclass.registerNode.call(this, a);
    if (!a.uiProvider && !a.isRoot && !a.ui.isTreeGridNodeUI) {
      a.ui = new Ext.ux.tree.TreeGridNodeUI(a);
    }
  },
});
Ext.reg("treegrid", Ext.ux.tree.TreeGrid);
