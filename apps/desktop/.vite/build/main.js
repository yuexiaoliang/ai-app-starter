'use strict';
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value);
var __publicField = (obj, key, value) =>
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError('Cannot ' + msg);
var __privateGet = (obj, member, getter) => (
  __accessCheck(obj, member, 'read from private field'),
  getter ? getter.call(obj) : member.get(obj)
);
var __privateAdd = (obj, member, value) =>
  member.has(obj)
    ? __typeError('Cannot add the same private member more than once')
    : member instanceof WeakSet
      ? member.add(obj)
      : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (
  __accessCheck(obj, member, 'write to private field'),
  setter ? setter.call(obj, value) : member.set(obj, value),
  value
);
var __privateMethod = (obj, member, method) => (
  __accessCheck(obj, member, 'access private method'),
  method
);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  },
});
var _a,
  _b,
  _c,
  _d,
  _e,
  _f,
  _g,
  _h,
  _i,
  _j,
  _k,
  _l,
  _m,
  _n,
  _o,
  _p,
  _q,
  _r,
  _s,
  _t,
  _u,
  _v,
  _w,
  _x,
  _y,
  _z,
  _A,
  _B,
  _C,
  _D,
  _E,
  _F,
  _G,
  _H,
  _I,
  _J,
  _K,
  _L,
  _M,
  _N,
  _O,
  _P,
  _Q,
  _R,
  _S,
  _T,
  _U,
  _V,
  _W,
  _X,
  _Y,
  _Z,
  __,
  _$,
  _aa,
  _ba,
  _ca,
  _da,
  _ea,
  _fa,
  _ga,
  _ha,
  _ia,
  _ja,
  _ka,
  _la,
  _ma,
  _na,
  _oa,
  _pa,
  _qa,
  _ra,
  _sa,
  _ta,
  _ua,
  _va,
  _wa,
  _xa,
  _ya,
  _za,
  _Aa,
  _Ba,
  _Ca,
  _Da,
  _Ea,
  _Fa,
  _Ga,
  _Ha,
  _Ia,
  _Ja,
  _Ka,
  _La,
  _Ma,
  _Na,
  _Oa,
  _Pa,
  _Qa,
  _Ra,
  _Sa,
  _Ta,
  _Ua,
  _Va,
  _Wa,
  _Xa,
  _Ya,
  _Za,
  __a,
  _$a,
  _ab,
  _bb,
  _cb,
  _db,
  _eb,
  _fb,
  _gb,
  _hb,
  _ib,
  _jb,
  _kb,
  _lb,
  _mb,
  _nb,
  _ob,
  _pb,
  _qb,
  _rb,
  _sb,
  _tb,
  _ub,
  _vb,
  _wb,
  _xb,
  _yb,
  _zb,
  _Ab,
  _Bb,
  _Cb,
  _Db,
  _Eb,
  _Fb,
  _Gb,
  _Hb,
  _Ib,
  _Jb,
  _Kb,
  _Lb,
  _Mb,
  _Nb,
  _Ob,
  _Pb,
  _Qb,
  _Rb,
  _Sb,
  _Tb,
  _Ub,
  _Vb,
  _Wb,
  _Xb,
  _Yb,
  _Zb,
  __b,
  _$b,
  _validatedData,
  _matchResult,
  _HonoRequest_instances,
  getDecodedParam_fn,
  getAllDecodedParams_fn,
  getParamValue_fn,
  _cachedBody,
  _ac,
  _rawRequest,
  _req,
  _var,
  _status,
  _executionCtx,
  _res,
  _layout,
  _renderer,
  _notFoundHandler,
  _preparedHeaders,
  _matchResult2,
  _path,
  _Context_instances,
  newResponse_fn,
  _bc,
  _path2,
  __Hono_instances,
  clone_fn,
  _notFoundHandler2,
  addRoute_fn,
  handleError_fn,
  dispatch_fn,
  _cc,
  _index,
  _varIndex,
  _children,
  _dc,
  _context,
  _root,
  _ec,
  _middleware,
  _routes,
  _RegExpRouter_instances,
  buildMatcher_fn,
  _fc,
  _routers,
  _routes2,
  _gc,
  _methods,
  _children2,
  _patterns,
  _order,
  _params,
  __Node_instances,
  pushHandlerSets_fn,
  _hc,
  _node,
  _ic;
const electron = require('electron');
const path = require('path');
const node_fs = require('node:fs');
const require$$2 = require('node:path');
const require$$0$1 = require('node:os');
const Client = require('better-sqlite3');
const node_crypto = require('node:crypto');
const require$$0$5 = require('node:events');
const require$$0$4 = require('node:diagnostics_channel');
const require$$0$2 = require('fs');
const require$$1 = require('events');
const require$$2$1 = require('util');
const require$$5 = require('assert');
const require$$2$2 = require('worker_threads');
const require$$0$3 = require('module');
const require$$4 = require('url');
const require$$7 = require('buffer');
const entityKind = Symbol.for('drizzle:entityKind');
function is(value, type) {
  if (!value || typeof value !== 'object') {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? '<unknown>'}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
_a = entityKind;
class ConsoleLogWriter {
  write(message) {
    console.log(message);
  }
}
__publicField(ConsoleLogWriter, _a, 'ConsoleLogWriter');
_b = entityKind;
class DefaultLogger {
  constructor(config) {
    __publicField(this, 'writer');
    this.writer = (config == null ? void 0 : config.writer) ?? new ConsoleLogWriter();
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p) => {
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    });
    const paramsStr = stringifiedParams.length
      ? ` -- params: [${stringifiedParams.join(', ')}]`
      : '';
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
}
__publicField(DefaultLogger, _b, 'DefaultLogger');
_c = entityKind;
class NoopLogger {
  logQuery() {}
}
__publicField(NoopLogger, _c, 'NoopLogger');
const TableName = Symbol.for('drizzle:Name');
const Schema = Symbol.for('drizzle:Schema');
const Columns = Symbol.for('drizzle:Columns');
const ExtraConfigColumns = Symbol.for('drizzle:ExtraConfigColumns');
const OriginalName = Symbol.for('drizzle:OriginalName');
const BaseName = Symbol.for('drizzle:BaseName');
const IsAlias = Symbol.for('drizzle:IsAlias');
const ExtraConfigBuilder = Symbol.for('drizzle:ExtraConfigBuilder');
const IsDrizzleTable = Symbol.for('drizzle:IsDrizzleTable');
((_m = entityKind),
  (_l = TableName),
  (_k = OriginalName),
  (_j = Schema),
  (_i = Columns),
  (_h = ExtraConfigColumns),
  (_g = BaseName),
  (_f = IsAlias),
  (_e = IsDrizzleTable),
  (_d = ExtraConfigBuilder));
class Table {
  constructor(name, schema, baseName) {
    /**
     * @internal
     * Can be changed if the table is aliased.
     */
    __publicField(this, _l);
    /**
     * @internal
     * Used to store the original name of the table, before any aliasing.
     */
    __publicField(this, _k);
    /** @internal */
    __publicField(this, _j);
    /** @internal */
    __publicField(this, _i);
    /** @internal */
    __publicField(this, _h);
    /**
     *  @internal
     * Used to store the table name before the transformation via the `tableCreator` functions.
     */
    __publicField(this, _g);
    /** @internal */
    __publicField(this, _f, false);
    /** @internal */
    __publicField(this, _e, true);
    /** @internal */
    __publicField(this, _d);
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
}
__publicField(Table, _m, 'Table');
/** @internal */
__publicField(Table, 'Symbol', {
  Name: TableName,
  Schema,
  OriginalName,
  Columns,
  ExtraConfigColumns,
  BaseName,
  IsAlias,
  ExtraConfigBuilder,
});
function getTableName(table) {
  return table[TableName];
}
function getTableUniqueName(table) {
  return `${table[Schema] ?? 'public'}.${table[TableName]}`;
}
_n = entityKind;
class Column {
  constructor(table, config) {
    __publicField(this, 'name');
    __publicField(this, 'keyAsName');
    __publicField(this, 'primary');
    __publicField(this, 'notNull');
    __publicField(this, 'default');
    __publicField(this, 'defaultFn');
    __publicField(this, 'onUpdateFn');
    __publicField(this, 'hasDefault');
    __publicField(this, 'isUnique');
    __publicField(this, 'uniqueName');
    __publicField(this, 'uniqueType');
    __publicField(this, 'dataType');
    __publicField(this, 'columnType');
    __publicField(this, 'enumValues');
    __publicField(this, 'generated');
    __publicField(this, 'generatedIdentity');
    __publicField(this, 'config');
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.keyAsName = config.keyAsName;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
    this.generated = config.generated;
    this.generatedIdentity = config.generatedIdentity;
  }
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  // ** @internal */
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== 'byDefault';
  }
}
__publicField(Column, _n, 'Column');
_o = entityKind;
class ColumnBuilder {
  constructor(name, dataType, columnType) {
    __publicField(this, 'config');
    /**
     * Alias for {@link $defaultFn}.
     */
    __publicField(this, '$default', this.$defaultFn);
    /**
     * Alias for {@link $onUpdateFn}.
     */
    __publicField(this, '$onUpdate', this.$onUpdateFn);
    this.config = {
      name,
      keyAsName: name === '',
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0,
    };
  }
  /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */
  $type() {
    return this;
  }
  /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name) {
    if (this.config.name !== '') return;
    this.config.name = name;
  }
}
__publicField(ColumnBuilder, _o, 'ColumnBuilder');
const isPgEnumSym = Symbol.for('drizzle:isPgEnum');
function isPgEnum(obj) {
  return !!obj && typeof obj === 'function' && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
_p = entityKind;
class Subquery {
  constructor(sql2, selection, alias, isWith = false) {
    this._ = {
      brand: 'Subquery',
      sql: sql2,
      selectedFields: selection,
      alias,
      isWith,
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
}
__publicField(Subquery, _p, 'Subquery');
class WithSubquery extends ((_r = Subquery), (_q = entityKind), _r) {}
__publicField(WithSubquery, _q, 'WithSubquery');
const tracer = {
  startActiveSpan(name, fn) {
    {
      return fn();
    }
  },
};
const ViewBaseConfig = Symbol.for('drizzle:ViewBaseConfig');
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === 'function';
}
function mergeQueries(queries) {
  var _a2;
  const result = { sql: '', params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if ((_a2 = query.typings) == null ? void 0 : _a2.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
_s = entityKind;
class StringChunk {
  constructor(value) {
    __publicField(this, 'value');
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
}
__publicField(StringChunk, _s, 'StringChunk');
_t = entityKind;
const _SQL = class _SQL {
  constructor(queryChunks) {
    /** @internal */
    __publicField(this, 'decoder', noopDecoder);
    __publicField(this, 'shouldInlineParams', false);
    this.queryChunks = queryChunks;
  }
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan('drizzle.buildSQL', (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span == null
        ? void 0
        : span.setAttributes({
            'drizzle.query.text': query.sql,
            'drizzle.query.params': JSON.stringify(query.params),
          });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 },
    });
    const { casing, escapeName, escapeParam, prepareTyping, inlineParams, paramStartIndex } =
      config;
    return mergeQueries(
      chunks.map((chunk) => {
        var _a2;
        if (is(chunk, StringChunk)) {
          return { sql: chunk.value.join(''), params: [] };
        }
        if (is(chunk, Name)) {
          return { sql: escapeName(chunk.value), params: [] };
        }
        if (chunk === void 0) {
          return { sql: '', params: [] };
        }
        if (Array.isArray(chunk)) {
          const result = [new StringChunk('(')];
          for (const [i, p] of chunk.entries()) {
            result.push(p);
            if (i < chunk.length - 1) {
              result.push(new StringChunk(', '));
            }
          }
          result.push(new StringChunk(')'));
          return this.buildQueryFromSourceParams(result, config);
        }
        if (is(chunk, _SQL)) {
          return this.buildQueryFromSourceParams(chunk.queryChunks, {
            ...config,
            inlineParams: inlineParams || chunk.shouldInlineParams,
          });
        }
        if (is(chunk, Table)) {
          const schemaName = chunk[Table.Symbol.Schema];
          const tableName = chunk[Table.Symbol.Name];
          return {
            sql:
              schemaName === void 0 || chunk[IsAlias]
                ? escapeName(tableName)
                : escapeName(schemaName) + '.' + escapeName(tableName),
            params: [],
          };
        }
        if (is(chunk, Column)) {
          const columnName = casing.getColumnCasing(chunk);
          if (_config.invokeSource === 'indexes') {
            return { sql: escapeName(columnName), params: [] };
          }
          const schemaName = chunk.table[Table.Symbol.Schema];
          return {
            sql:
              chunk.table[IsAlias] || schemaName === void 0
                ? escapeName(chunk.table[Table.Symbol.Name]) + '.' + escapeName(columnName)
                : escapeName(schemaName) +
                  '.' +
                  escapeName(chunk.table[Table.Symbol.Name]) +
                  '.' +
                  escapeName(columnName),
            params: [],
          };
        }
        if (is(chunk, View)) {
          const schemaName = chunk[ViewBaseConfig].schema;
          const viewName = chunk[ViewBaseConfig].name;
          return {
            sql:
              schemaName === void 0 || chunk[ViewBaseConfig].isAlias
                ? escapeName(viewName)
                : escapeName(schemaName) + '.' + escapeName(viewName),
            params: [],
          };
        }
        if (is(chunk, Param)) {
          if (is(chunk.value, Placeholder)) {
            return {
              sql: escapeParam(paramStartIndex.value++, chunk),
              params: [chunk],
              typings: ['none'],
            };
          }
          const mappedValue =
            chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
          if (is(mappedValue, _SQL)) {
            return this.buildQueryFromSourceParams([mappedValue], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(mappedValue, config), params: [] };
          }
          let typings = ['none'];
          if (prepareTyping) {
            typings = [prepareTyping(chunk.encoder)];
          }
          return {
            sql: escapeParam(paramStartIndex.value++, mappedValue),
            params: [mappedValue],
            typings,
          };
        }
        if (is(chunk, Placeholder)) {
          return {
            sql: escapeParam(paramStartIndex.value++, chunk),
            params: [chunk],
            typings: ['none'],
          };
        }
        if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
          return { sql: escapeName(chunk.fieldAlias), params: [] };
        }
        if (is(chunk, Subquery)) {
          if (chunk._.isWith) {
            return { sql: escapeName(chunk._.alias), params: [] };
          }
          return this.buildQueryFromSourceParams(
            [new StringChunk('('), chunk._.sql, new StringChunk(') '), new Name(chunk._.alias)],
            config
          );
        }
        if (isPgEnum(chunk)) {
          if (chunk.schema) {
            return { sql: escapeName(chunk.schema) + '.' + escapeName(chunk.enumName), params: [] };
          }
          return { sql: escapeName(chunk.enumName), params: [] };
        }
        if (isSQLWrapper(chunk)) {
          if ((_a2 = chunk.shouldOmitSQLParens) == null ? void 0 : _a2.call(chunk)) {
            return this.buildQueryFromSourceParams([chunk.getSQL()], config);
          }
          return this.buildQueryFromSourceParams(
            [new StringChunk('('), chunk.getSQL(), new StringChunk(')')],
            config
          );
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(chunk, config), params: [] };
        }
        return {
          sql: escapeParam(paramStartIndex.value++, chunk),
          params: [chunk],
          typings: ['none'],
        };
      })
    );
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return 'null';
    }
    if (typeof chunk === 'number' || typeof chunk === 'boolean') {
      return chunk.toString();
    }
    if (typeof chunk === 'string') {
      return escapeString(chunk);
    }
    if (typeof chunk === 'object') {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === '[object Object]') {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error('Unexpected param value: ' + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) {
      return this;
    }
    return new _SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === 'function' ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */
  if(condition) {
    return condition ? this : void 0;
  }
};
__publicField(_SQL, _t, 'SQL');
let SQL = _SQL;
_u = entityKind;
class Name {
  constructor(value) {
    __publicField(this, 'brand');
    this.value = value;
  }
  getSQL() {
    return new SQL([this]);
  }
}
__publicField(Name, _u, 'Name');
function isDriverValueEncoder(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    'mapToDriverValue' in value &&
    typeof value.mapToDriverValue === 'function'
  );
}
const noopDecoder = {
  mapFromDriverValue: (value) => value,
};
const noopEncoder = {
  mapToDriverValue: (value) => value,
};
({
  ...noopDecoder,
  ...noopEncoder,
});
_v = entityKind;
class Param {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(value, encoder = noopEncoder) {
    __publicField(this, 'brand');
    this.value = value;
    this.encoder = encoder;
  }
  getSQL() {
    return new SQL([this]);
  }
}
__publicField(Param, _v, 'Param');
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || (strings.length > 0 && strings[0] !== '')) {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== void 0) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join;
  function identifier(value) {
    return new Name(value);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {
  var _a2;
  _a2 = entityKind;
  const _Aliased = class _Aliased {
    constructor(sql2, fieldAlias) {
      /** @internal */
      __publicField(this, 'isSelectionField', false);
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new _Aliased(this.sql, this.fieldAlias);
    }
  };
  __publicField(_Aliased, _a2, 'SQL.Aliased');
  let Aliased = _Aliased;
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
_w = entityKind;
class Placeholder {
  constructor(name2) {
    this.name = name2;
  }
  getSQL() {
    return new SQL([this]);
  }
}
__publicField(Placeholder, _w, 'Placeholder');
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    if (is(p, Param) && is(p.value, Placeholder)) {
      if (!(p.value.name in values)) {
        throw new Error(`No value for placeholder "${p.value.name}" was provided`);
      }
      return p.encoder.mapToDriverValue(values[p.value.name]);
    }
    return p;
  });
}
const IsDrizzleView = Symbol.for('drizzle:IsDrizzleView');
((_z = entityKind), (_y = ViewBaseConfig), (_x = IsDrizzleView));
class View {
  constructor({ name: name2, schema, selectedFields, query }) {
    /** @internal */
    __publicField(this, _y);
    /** @internal */
    __publicField(this, _x, true);
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false,
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
__publicField(View, _z, 'View');
Column.prototype.getSQL = function () {
  return new SQL([this]);
};
Table.prototype.getSQL = function () {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function () {
  return new SQL([this]);
};
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path: path2, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) {
      decoder = field;
    } else if (is(field, SQL)) {
      decoder = field.decoder;
    } else {
      decoder = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path2.entries()) {
      if (pathChunkIndex < path2.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value = (node[pathChunk] =
          rawValue === null ? null : decoder.mapFromDriverValue(rawValue));
        if (joinsNotNullableMap && is(field, Column) && path2.length === 2) {
          const objectName = path2[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
          } else if (
            typeof nullifyMap[objectName] === 'string' &&
            nullifyMap[objectName] !== getTableName(field.table)
          ) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === 'string' && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== 'string') {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
}
function mapUpdateSet(table, values) {
  const entries = Object.entries(values)
    .filter(([, value]) => value !== void 0)
    .map(([key, value]) => {
      if (is(value, SQL) || is(value, Column)) {
        return [key, value];
      } else {
        return [key, new Param(value, table[Table.Symbol.Columns][key])];
      }
    });
  if (entries.length === 0) {
    throw new Error('No values to set');
  }
  return Object.fromEntries(entries);
}
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === 'constructor') continue;
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) ||
          /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
function getTableLikeName(table) {
  return is(table, Subquery)
    ? table._.alias
    : is(table, View)
      ? table[ViewBaseConfig].name
      : is(table, SQL)
        ? void 0
        : table[Table.Symbol.IsAlias]
          ? table[Table.Symbol.Name]
          : table[Table.Symbol.BaseName];
}
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === 'string' && a.length > 0 ? a : '',
    config: typeof a === 'object' ? a : b,
  };
}
function isConfig(data) {
  if (typeof data !== 'object' || data === null) return false;
  if (data.constructor.name !== 'Object') return false;
  if ('logger' in data) {
    const type = typeof data['logger'];
    if (
      type !== 'boolean' &&
      (type !== 'object' || typeof data['logger']['logQuery'] !== 'function') &&
      type !== 'undefined'
    )
      return false;
    return true;
  }
  if ('schema' in data) {
    const type = typeof data['schema'];
    if (type !== 'object' && type !== 'undefined') return false;
    return true;
  }
  if ('casing' in data) {
    const type = typeof data['casing'];
    if (type !== 'string' && type !== 'undefined') return false;
    return true;
  }
  if ('mode' in data) {
    if (data['mode'] !== 'default' || data['mode'] !== 'planetscale' || data['mode'] !== void 0)
      return false;
    return true;
  }
  if ('connection' in data) {
    const type = typeof data['connection'];
    if (type !== 'string' && type !== 'object' && type !== 'undefined') return false;
    return true;
  }
  if ('client' in data) {
    const type = typeof data['client'];
    if (type !== 'object' && type !== 'function' && type !== 'undefined') return false;
    return true;
  }
  if (Object.keys(data).length === 0) return true;
  return false;
}
const InlineForeignKeys$1 = Symbol.for('drizzle:PgInlineForeignKeys');
const EnableRLS = Symbol.for('drizzle:EnableRLS');
class PgTable extends ((_F = Table),
(_E = entityKind),
(_D = InlineForeignKeys$1),
(_C = EnableRLS),
(_B = Table.Symbol.ExtraConfigBuilder),
(_A = Table.Symbol.ExtraConfigColumns),
_F) {
  constructor() {
    super(...arguments);
    /**@internal */
    __publicField(this, _D, []);
    /** @internal */
    __publicField(this, _C, false);
    /** @internal */
    __publicField(this, _B);
    /** @internal */
    __publicField(this, _A, {});
  }
}
__publicField(PgTable, _E, 'PgTable');
/** @internal */
__publicField(
  PgTable,
  'Symbol',
  Object.assign({}, Table.Symbol, {
    InlineForeignKeys: InlineForeignKeys$1,
    EnableRLS,
  })
);
_G = entityKind;
class PrimaryKeyBuilder {
  constructor(columns, name) {
    /** @internal */
    __publicField(this, 'columns');
    /** @internal */
    __publicField(this, 'name');
    this.columns = columns;
    this.name = name;
  }
  /** @internal */
  build(table) {
    return new PrimaryKey(table, this.columns, this.name);
  }
}
__publicField(PrimaryKeyBuilder, _G, 'PgPrimaryKeyBuilder');
_H = entityKind;
class PrimaryKey {
  constructor(table, columns, name) {
    __publicField(this, 'columns');
    __publicField(this, 'name');
    this.table = table;
    this.columns = columns;
    this.name = name;
  }
  getName() {
    return (
      this.name ??
      `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join('_')}_pk`
    );
  }
}
__publicField(PrimaryKey, _H, 'PgPrimaryKey');
function bindIfParam(value, column) {
  if (
    isDriverValueEncoder(column) &&
    !isSQLWrapper(value) &&
    !is(value, Param) &&
    !is(value, Placeholder) &&
    !is(value, Column) &&
    !is(value, Table) &&
    !is(value, View)
  ) {
    return new Param(value, column);
  }
  return value;
}
const eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
const ne = (left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
};
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk('('),
    sql.join(conditions, new StringChunk(' and ')),
    new StringChunk(')'),
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== void 0);
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk('('),
    sql.join(conditions, new StringChunk(' or ')),
    new StringChunk(')'),
  ]);
}
function not(condition) {
  return sql`not ${condition}`;
}
const gt = (left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
};
const gte = (left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
};
const lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
};
const lte = (left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
};
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`true`;
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
function isNull(value) {
  return sql`${value} is null`;
}
function isNotNull(value) {
  return sql`${value} is not null`;
}
function exists(subquery) {
  return sql`exists ${subquery}`;
}
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(min, column)} and ${bindIfParam(max, column)}`;
}
function like(column, value) {
  return sql`${column} like ${value}`;
}
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}
_I = entityKind;
class Relation {
  constructor(sourceTable, referencedTable, relationName) {
    __publicField(this, 'referencedTableName');
    __publicField(this, 'fieldName');
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
}
__publicField(Relation, _I, 'Relation');
_J = entityKind;
class Relations {
  constructor(table, config) {
    this.table = table;
    this.config = config;
  }
}
__publicField(Relations, _J, 'Relations');
const _One = class _One extends ((_L = Relation), (_K = entityKind), _L) {
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config == null ? void 0 : config.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  withFieldName(fieldName) {
    const relation = new _One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
};
__publicField(_One, _K, 'One');
let One = _One;
const _Many = class _Many extends ((_N = Relation), (_M = entityKind), _N) {
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config == null ? void 0 : config.relationName);
    this.config = config;
  }
  withFieldName(fieldName) {
    const relation = new _Many(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
};
__publicField(_Many, _M, 'Many');
let Many = _Many;
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql,
  };
}
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc,
  };
}
function extractTablesRelationalConfig(schema, configHelpers) {
  var _a2;
  if (Object.keys(schema).length === 1 && 'default' in schema && !is(schema['default'], Table)) {
    schema = schema['default'];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (is(value, Table)) {
      const dbName = getTableUniqueName(value);
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: (bufferedRelations == null ? void 0 : bufferedRelations.relations) ?? {},
        primaryKey: (bufferedRelations == null ? void 0 : bufferedRelations.primaryKey) ?? [],
      };
      for (const column of Object.values(value[Table.Symbol.Columns])) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig =
        (_a2 = value[Table.Symbol.ExtraConfigBuilder]) == null
          ? void 0
          : _a2.call(value, value[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = getTableUniqueName(value.table);
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(configHelpers(value.table));
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey,
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
function createOne(sourceTable) {
  return function one(table, config) {
    return new One(
      sourceTable,
      table,
      config,
      (config == null ? void 0 : config.fields.reduce((res2, f) => res2 && f.notNull, true)) ??
        false
    );
  };
}
function createMany(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
}
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references,
    };
  }
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
    if (
      (relation.relationName &&
        relation !== referencedTableRelation &&
        referencedTableRelation.relationName === relation.relationName) ||
      (!relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable)
    ) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName
      ? new Error(
          `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
        )
      : new Error(
          `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
        );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields,
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable),
  };
}
function mapRelationalRow(
  tablesConfig,
  tableConfig,
  row,
  buildQueryResultSelection,
  mapColumnValue = (value) => value
) {
  const result = {};
  for (const [selectionItemIndex, selectionItem] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === 'string' ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One)
        ? subRows &&
          mapRelationalRow(
            tablesConfig,
            tablesConfig[selectionItem.relationTableTsKey],
            subRows,
            selectionItem.selection,
            mapColumnValue
          )
        : subRows.map((subRow) =>
            mapRelationalRow(
              tablesConfig,
              tablesConfig[selectionItem.relationTableTsKey],
              subRow,
              selectionItem.selection,
              mapColumnValue
            )
          );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
_O = entityKind;
class ColumnAliasProxyHandler {
  constructor(table) {
    this.table = table;
  }
  get(columnObj, prop) {
    if (prop === 'table') {
      return this.table;
    }
    return columnObj[prop];
  }
}
__publicField(ColumnAliasProxyHandler, _O, 'ColumnAliasProxyHandler');
_P = entityKind;
class TableAliasProxyHandler {
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return {
        ...target[ViewBaseConfig],
        name: this.alias,
        isAlias: true,
      };
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(
          columns[key],
          new ColumnAliasProxyHandler(new Proxy(target, this))
        );
      });
      return proxiedColumns;
    }
    const value = target[prop];
    if (is(value, Column)) {
      return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value;
  }
}
__publicField(TableAliasProxyHandler, _P, 'TableAliasProxyHandler');
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(
      new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false))
    )
  );
}
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(
    query.queryChunks.map((c) => {
      if (is(c, Column)) {
        return aliasedTableColumn(c, alias);
      }
      if (is(c, SQL)) {
        return mapColumnsInSQLToAlias(c, alias);
      }
      if (is(c, SQL.Aliased)) {
        return mapColumnsInAliasedSQLToAlias(c, alias);
      }
      return c;
    })
  );
}
_Q = entityKind;
const _SelectionProxyHandler = class _SelectionProxyHandler {
  constructor(config) {
    __publicField(this, 'config');
    this.config = { ...config };
  }
  get(subquery, prop) {
    if (prop === '_') {
      return {
        ...subquery['_'],
        selectedFields: new Proxy(subquery._.selectedFields, this),
      };
    }
    if (prop === ViewBaseConfig) {
      return {
        ...subquery[ViewBaseConfig],
        selectedFields: new Proxy(subquery[ViewBaseConfig].selectedFields, this),
      };
    }
    if (typeof prop === 'symbol') {
      return subquery[prop];
    }
    const columns = is(subquery, Subquery)
      ? subquery._.selectedFields
      : is(subquery, View)
        ? subquery[ViewBaseConfig].selectedFields
        : subquery;
    const value = columns[prop];
    if (is(value, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === 'sql' && !value.isSelectionField) {
        return value.sql;
      }
      const newValue = value.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (is(value, SQL)) {
      if (this.config.sqlBehavior === 'sql') {
        return value;
      }
      throw new Error(
        `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
      );
    }
    if (is(value, Column)) {
      if (this.config.alias) {
        return new Proxy(
          value,
          new ColumnAliasProxyHandler(
            new Proxy(
              value.table,
              new TableAliasProxyHandler(
                this.config.alias,
                this.config.replaceOriginalName ?? false
              )
            )
          )
        );
      }
      return value;
    }
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    return new Proxy(value, new _SelectionProxyHandler(this.config));
  }
};
__publicField(_SelectionProxyHandler, _Q, 'SelectionProxyHandler');
let SelectionProxyHandler = _SelectionProxyHandler;
((_S = entityKind), (_R = Symbol.toStringTag));
class QueryPromise {
  constructor() {
    __publicField(this, _R, 'QueryPromise');
  }
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally == null ? void 0 : onFinally();
        return value;
      },
      (reason) => {
        onFinally == null ? void 0 : onFinally();
        throw reason;
      }
    );
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}
__publicField(QueryPromise, _S, 'QueryPromise');
_T = entityKind;
class ForeignKeyBuilder {
  constructor(config, actions) {
    /** @internal */
    __publicField(this, 'reference');
    /** @internal */
    __publicField(this, '_onUpdate');
    /** @internal */
    __publicField(this, '_onDelete');
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey(table, this);
  }
}
__publicField(ForeignKeyBuilder, _T, 'SQLiteForeignKeyBuilder');
_U = entityKind;
class ForeignKey {
  constructor(table, builder) {
    __publicField(this, 'reference');
    __publicField(this, 'onUpdate');
    __publicField(this, 'onDelete');
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames,
    ];
    return name ?? `${chunks.join('_')}_fk`;
  }
}
__publicField(ForeignKey, _U, 'SQLiteForeignKey');
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join('_')}_unique`;
}
class SQLiteColumnBuilder extends ((_W = ColumnBuilder), (_V = entityKind), _W) {
  constructor() {
    super(...arguments);
    __publicField(this, 'foreignKeyConfigs', []);
  }
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  generatedAlwaysAs(as, config) {
    this.config.generated = {
      as,
      type: 'always',
      mode: (config == null ? void 0 : config.mode) ?? 'virtual',
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      })(ref, actions);
    });
  }
}
__publicField(SQLiteColumnBuilder, _V, 'SQLiteColumnBuilder');
class SQLiteColumn extends ((_Y = Column), (_X = entityKind), _Y) {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
}
__publicField(SQLiteColumn, _X, 'SQLiteColumn');
class SQLiteBigIntBuilder extends ((__ = SQLiteColumnBuilder), (_Z = entityKind), __) {
  constructor(name) {
    super(name, 'bigint', 'SQLiteBigInt');
  }
  /** @internal */
  build(table) {
    return new SQLiteBigInt(table, this.config);
  }
}
__publicField(SQLiteBigIntBuilder, _Z, 'SQLiteBigIntBuilder');
class SQLiteBigInt extends ((_aa = SQLiteColumn), (_$ = entityKind), _aa) {
  getSQLType() {
    return 'blob';
  }
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return BigInt(value.toString());
    }
    if (value instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      return BigInt(decoder.decode(value));
    }
    return BigInt(String.fromCodePoint(...value));
  }
  mapToDriverValue(value) {
    return Buffer.from(value.toString());
  }
}
__publicField(SQLiteBigInt, _$, 'SQLiteBigInt');
class SQLiteBlobJsonBuilder extends ((_ca = SQLiteColumnBuilder), (_ba = entityKind), _ca) {
  constructor(name) {
    super(name, 'json', 'SQLiteBlobJson');
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobJson(table, this.config);
  }
}
__publicField(SQLiteBlobJsonBuilder, _ba, 'SQLiteBlobJsonBuilder');
class SQLiteBlobJson extends ((_ea = SQLiteColumn), (_da = entityKind), _ea) {
  getSQLType() {
    return 'blob';
  }
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return JSON.parse(value.toString());
    }
    if (value instanceof ArrayBuffer) {
      const decoder = new TextDecoder();
      return JSON.parse(decoder.decode(value));
    }
    return JSON.parse(String.fromCodePoint(...value));
  }
  mapToDriverValue(value) {
    return Buffer.from(JSON.stringify(value));
  }
}
__publicField(SQLiteBlobJson, _da, 'SQLiteBlobJson');
class SQLiteBlobBufferBuilder extends ((_ga = SQLiteColumnBuilder), (_fa = entityKind), _ga) {
  constructor(name) {
    super(name, 'buffer', 'SQLiteBlobBuffer');
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobBuffer(table, this.config);
  }
}
__publicField(SQLiteBlobBufferBuilder, _fa, 'SQLiteBlobBufferBuilder');
class SQLiteBlobBuffer extends ((_ia = SQLiteColumn), (_ha = entityKind), _ia) {
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return value;
    }
    return Buffer.from(value);
  }
  getSQLType() {
    return 'blob';
  }
}
__publicField(SQLiteBlobBuffer, _ha, 'SQLiteBlobBuffer');
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if ((config == null ? void 0 : config.mode) === 'json') {
    return new SQLiteBlobJsonBuilder(name);
  }
  if ((config == null ? void 0 : config.mode) === 'bigint') {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}
class SQLiteCustomColumnBuilder extends ((_ka = SQLiteColumnBuilder), (_ja = entityKind), _ka) {
  constructor(name, fieldConfig, customTypeParams) {
    super(name, 'custom', 'SQLiteCustomColumn');
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table) {
    return new SQLiteCustomColumn(table, this.config);
  }
}
__publicField(SQLiteCustomColumnBuilder, _ja, 'SQLiteCustomColumnBuilder');
class SQLiteCustomColumn extends ((_ma = SQLiteColumn), (_la = entityKind), _ma) {
  constructor(table, config) {
    super(table, config);
    __publicField(this, 'sqlName');
    __publicField(this, 'mapTo');
    __publicField(this, 'mapFrom');
    this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
    this.mapTo = config.customTypeParams.toDriver;
    this.mapFrom = config.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === 'function' ? this.mapFrom(value) : value;
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === 'function' ? this.mapTo(value) : value;
  }
}
__publicField(SQLiteCustomColumn, _la, 'SQLiteCustomColumn');
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(name, config, customTypeParams);
  };
}
class SQLiteBaseIntegerBuilder extends ((_oa = SQLiteColumnBuilder), (_na = entityKind), _oa) {
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config) {
    if (config == null ? void 0 : config.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
}
__publicField(SQLiteBaseIntegerBuilder, _na, 'SQLiteBaseIntegerBuilder');
class SQLiteBaseInteger extends ((_qa = SQLiteColumn), (_pa = entityKind), _qa) {
  constructor() {
    super(...arguments);
    __publicField(this, 'autoIncrement', this.config.autoIncrement);
  }
  getSQLType() {
    return 'integer';
  }
}
__publicField(SQLiteBaseInteger, _pa, 'SQLiteBaseInteger');
class SQLiteIntegerBuilder extends ((_sa = SQLiteBaseIntegerBuilder), (_ra = entityKind), _sa) {
  constructor(name) {
    super(name, 'number', 'SQLiteInteger');
  }
  build(table) {
    return new SQLiteInteger(table, this.config);
  }
}
__publicField(SQLiteIntegerBuilder, _ra, 'SQLiteIntegerBuilder');
class SQLiteInteger extends ((_ua = SQLiteBaseInteger), (_ta = entityKind), _ua) {}
__publicField(SQLiteInteger, _ta, 'SQLiteInteger');
class SQLiteTimestampBuilder extends ((_wa = SQLiteBaseIntegerBuilder), (_va = entityKind), _wa) {
  constructor(name, mode) {
    super(name, 'date', 'SQLiteTimestamp');
    this.config.mode = mode;
  }
  /**
   * @deprecated Use `default()` with your own expression instead.
   *
   * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
   */
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table) {
    return new SQLiteTimestamp(table, this.config);
  }
}
__publicField(SQLiteTimestampBuilder, _va, 'SQLiteTimestampBuilder');
class SQLiteTimestamp extends ((_ya = SQLiteBaseInteger), (_xa = entityKind), _ya) {
  constructor() {
    super(...arguments);
    __publicField(this, 'mode', this.config.mode);
  }
  mapFromDriverValue(value) {
    if (this.config.mode === 'timestamp') {
      return new Date(value * 1e3);
    }
    return new Date(value);
  }
  mapToDriverValue(value) {
    const unix = value.getTime();
    if (this.config.mode === 'timestamp') {
      return Math.floor(unix / 1e3);
    }
    return unix;
  }
}
__publicField(SQLiteTimestamp, _xa, 'SQLiteTimestamp');
class SQLiteBooleanBuilder extends ((_Aa = SQLiteBaseIntegerBuilder), (_za = entityKind), _Aa) {
  constructor(name, mode) {
    super(name, 'boolean', 'SQLiteBoolean');
    this.config.mode = mode;
  }
  build(table) {
    return new SQLiteBoolean(table, this.config);
  }
}
__publicField(SQLiteBooleanBuilder, _za, 'SQLiteBooleanBuilder');
class SQLiteBoolean extends ((_Ca = SQLiteBaseInteger), (_Ba = entityKind), _Ca) {
  constructor() {
    super(...arguments);
    __publicField(this, 'mode', this.config.mode);
  }
  mapFromDriverValue(value) {
    return Number(value) === 1;
  }
  mapToDriverValue(value) {
    return value ? 1 : 0;
  }
}
__publicField(SQLiteBoolean, _Ba, 'SQLiteBoolean');
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (
    (config == null ? void 0 : config.mode) === 'timestamp' ||
    (config == null ? void 0 : config.mode) === 'timestamp_ms'
  ) {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if ((config == null ? void 0 : config.mode) === 'boolean') {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}
class SQLiteNumericBuilder extends ((_Ea = SQLiteColumnBuilder), (_Da = entityKind), _Ea) {
  constructor(name) {
    super(name, 'string', 'SQLiteNumeric');
  }
  /** @internal */
  build(table) {
    return new SQLiteNumeric(table, this.config);
  }
}
__publicField(SQLiteNumericBuilder, _Da, 'SQLiteNumericBuilder');
class SQLiteNumeric extends ((_Ga = SQLiteColumn), (_Fa = entityKind), _Ga) {
  mapFromDriverValue(value) {
    if (typeof value === 'string') return value;
    return String(value);
  }
  getSQLType() {
    return 'numeric';
  }
}
__publicField(SQLiteNumeric, _Fa, 'SQLiteNumeric');
class SQLiteNumericNumberBuilder extends ((_Ia = SQLiteColumnBuilder), (_Ha = entityKind), _Ia) {
  constructor(name) {
    super(name, 'number', 'SQLiteNumericNumber');
  }
  /** @internal */
  build(table) {
    return new SQLiteNumericNumber(table, this.config);
  }
}
__publicField(SQLiteNumericNumberBuilder, _Ha, 'SQLiteNumericNumberBuilder');
class SQLiteNumericNumber extends ((_Ka = SQLiteColumn), (_Ja = entityKind), _Ka) {
  constructor() {
    super(...arguments);
    __publicField(this, 'mapToDriverValue', String);
  }
  mapFromDriverValue(value) {
    if (typeof value === 'number') return value;
    return Number(value);
  }
  getSQLType() {
    return 'numeric';
  }
}
__publicField(SQLiteNumericNumber, _Ja, 'SQLiteNumericNumber');
class SQLiteNumericBigIntBuilder extends ((_Ma = SQLiteColumnBuilder), (_La = entityKind), _Ma) {
  constructor(name) {
    super(name, 'bigint', 'SQLiteNumericBigInt');
  }
  /** @internal */
  build(table) {
    return new SQLiteNumericBigInt(table, this.config);
  }
}
__publicField(SQLiteNumericBigIntBuilder, _La, 'SQLiteNumericBigIntBuilder');
class SQLiteNumericBigInt extends ((_Oa = SQLiteColumn), (_Na = entityKind), _Oa) {
  constructor() {
    super(...arguments);
    __publicField(this, 'mapFromDriverValue', BigInt);
    __publicField(this, 'mapToDriverValue', String);
  }
  getSQLType() {
    return 'numeric';
  }
}
__publicField(SQLiteNumericBigInt, _Na, 'SQLiteNumericBigInt');
function numeric(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  const mode = config == null ? void 0 : config.mode;
  return mode === 'number'
    ? new SQLiteNumericNumberBuilder(name)
    : mode === 'bigint'
      ? new SQLiteNumericBigIntBuilder(name)
      : new SQLiteNumericBuilder(name);
}
class SQLiteRealBuilder extends ((_Qa = SQLiteColumnBuilder), (_Pa = entityKind), _Qa) {
  constructor(name) {
    super(name, 'number', 'SQLiteReal');
  }
  /** @internal */
  build(table) {
    return new SQLiteReal(table, this.config);
  }
}
__publicField(SQLiteRealBuilder, _Pa, 'SQLiteRealBuilder');
class SQLiteReal extends ((_Sa = SQLiteColumn), (_Ra = entityKind), _Sa) {
  getSQLType() {
    return 'real';
  }
}
__publicField(SQLiteReal, _Ra, 'SQLiteReal');
function real(name) {
  return new SQLiteRealBuilder(name ?? '');
}
class SQLiteTextBuilder extends ((_Ua = SQLiteColumnBuilder), (_Ta = entityKind), _Ua) {
  constructor(name, config) {
    super(name, 'string', 'SQLiteText');
    this.config.enumValues = config.enum;
    this.config.length = config.length;
  }
  /** @internal */
  build(table) {
    return new SQLiteText(table, this.config);
  }
}
__publicField(SQLiteTextBuilder, _Ta, 'SQLiteTextBuilder');
class SQLiteText extends ((_Wa = SQLiteColumn), (_Va = entityKind), _Wa) {
  constructor(table, config) {
    super(table, config);
    __publicField(this, 'enumValues', this.config.enumValues);
    __publicField(this, 'length', this.config.length);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ''}`;
  }
}
__publicField(SQLiteText, _Va, 'SQLiteText');
class SQLiteTextJsonBuilder extends ((_Ya = SQLiteColumnBuilder), (_Xa = entityKind), _Ya) {
  constructor(name) {
    super(name, 'json', 'SQLiteTextJson');
  }
  /** @internal */
  build(table) {
    return new SQLiteTextJson(table, this.config);
  }
}
__publicField(SQLiteTextJsonBuilder, _Xa, 'SQLiteTextJsonBuilder');
class SQLiteTextJson extends ((__a = SQLiteColumn), (_Za = entityKind), __a) {
  getSQLType() {
    return 'text';
  }
  mapFromDriverValue(value) {
    return JSON.parse(value);
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
}
__publicField(SQLiteTextJson, _Za, 'SQLiteTextJson');
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === 'json') {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text,
  };
}
const InlineForeignKeys = Symbol.for('drizzle:SQLiteInlineForeignKeys');
class SQLiteTable extends ((_db = Table),
(_cb = entityKind),
(_bb = Table.Symbol.Columns),
(_ab = InlineForeignKeys),
(_$a = Table.Symbol.ExtraConfigBuilder),
_db) {
  constructor() {
    super(...arguments);
    /** @internal */
    __publicField(this, _bb);
    /** @internal */
    __publicField(this, _ab, []);
    /** @internal */
    __publicField(this, _$a);
  }
}
__publicField(SQLiteTable, _cb, 'SQLiteTable');
/** @internal */
__publicField(
  SQLiteTable,
  'Symbol',
  Object.assign({}, Table.Symbol, {
    InlineForeignKeys,
  })
);
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns =
    typeof columns === 'function' ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  return table;
}
const sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns);
};
class SQLiteDeleteBase extends ((_fb = QueryPromise), (_eb = entityKind), _fb) {
  constructor(table, session, dialect, withList) {
    super();
    /** @internal */
    __publicField(this, 'config');
    __publicField(this, 'run', (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    });
    __publicField(this, 'all', (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    });
    __publicField(this, 'get', (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    });
    __publicField(this, 'values', (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    });
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.config = { table, withList };
  }
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will delete only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be deleted.
   *
   * ```ts
   * // Delete all cars with green color
   * db.delete(cars).where(eq(cars.color, 'green'));
   * // or
   * db.delete(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Delete all BMW cars with a green color
   * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Delete all cars with the green or blue color
   * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    this.config.where = where;
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === 'function') {
      const orderBy = columns[0](
        new Proxy(
          this.config.table[Table.Symbol.Columns],
          new SelectionProxyHandler({ sqlAliasedBehavior: 'alias', sqlBehavior: 'sql' })
        )
      );
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      this.config.orderBy = orderByArray;
    } else {
      const orderByArray = columns;
      this.config.orderBy = orderByArray;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? 'prepareOneTimeQuery' : 'prepareQuery'](
      this.dialect.sqlToQuery(this.getSQL()),
      this.config.returning,
      this.config.returning ? 'all' : 'run',
      true
    );
  }
  prepare() {
    return this._prepare(false);
  }
  async execute(placeholderValues) {
    return this._prepare().execute(placeholderValues);
  }
  $dynamic() {
    return this;
  }
}
__publicField(SQLiteDeleteBase, _eb, 'SQLiteDelete');
function toSnakeCase(input) {
  const words =
    input.replace(/['\u2019]/g, '').match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.map((word) => word.toLowerCase()).join('_');
}
function toCamelCase(input) {
  const words =
    input.replace(/['\u2019]/g, '').match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.reduce((acc, word, i) => {
    const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
    return acc + formattedWord;
  }, '');
}
function noopCase(input) {
  return input;
}
_gb = entityKind;
class CasingCache {
  constructor(casing) {
    /** @internal */
    __publicField(this, 'cache', {});
    __publicField(this, 'cachedTables', {});
    __publicField(this, 'convert');
    this.convert =
      casing === 'snake_case' ? toSnakeCase : casing === 'camelCase' ? toCamelCase : noopCase;
  }
  getColumnCasing(column) {
    if (!column.keyAsName) return column.name;
    const schema = column.table[Table.Symbol.Schema] ?? 'public';
    const tableName = column.table[Table.Symbol.OriginalName];
    const key = `${schema}.${tableName}.${column.name}`;
    if (!this.cache[key]) {
      this.cacheTable(column.table);
    }
    return this.cache[key];
  }
  cacheTable(table) {
    const schema = table[Table.Symbol.Schema] ?? 'public';
    const tableName = table[Table.Symbol.OriginalName];
    const tableKey = `${schema}.${tableName}`;
    if (!this.cachedTables[tableKey]) {
      for (const column of Object.values(table[Table.Symbol.Columns])) {
        const columnKey = `${tableKey}.${column.name}`;
        this.cache[columnKey] = this.convert(column.name);
      }
      this.cachedTables[tableKey] = true;
    }
  }
  clearCache() {
    this.cache = {};
    this.cachedTables = {};
  }
}
__publicField(CasingCache, _gb, 'CasingCache');
class DrizzleError extends ((_ib = Error), (_hb = entityKind), _ib) {
  constructor({ message, cause }) {
    super(message);
    this.name = 'DrizzleError';
    this.cause = cause;
  }
}
__publicField(DrizzleError, _hb, 'DrizzleError');
class TransactionRollbackError extends ((_kb = DrizzleError), (_jb = entityKind), _kb) {
  constructor() {
    super({ message: 'Rollback' });
  }
}
__publicField(TransactionRollbackError, _jb, 'TransactionRollbackError');
class SQLiteViewBase extends ((_mb = View), (_lb = entityKind), _mb) {}
__publicField(SQLiteViewBase, _lb, 'SQLiteViewBase');
_nb = entityKind;
class SQLiteDialect {
  constructor(config) {
    /** @internal */
    __publicField(this, 'casing');
    this.casing = new CasingCache(config == null ? void 0 : config.casing);
  }
  escapeName(name) {
    return `"${name}"`;
  }
  escapeParam(_num) {
    return '?';
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildWithCTE(queries) {
    if (!(queries == null ? void 0 : queries.length)) return void 0;
    const withSqlChunks = [sql`with `];
    for (const [i, w] of queries.entries()) {
      withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
      if (i < queries.length - 1) {
        withSqlChunks.push(sql`, `);
      }
    }
    withSqlChunks.push(sql` `);
    return sql.join(withSqlChunks);
  }
  buildDeleteQuery({ table, where, returning, withList, limit, orderBy }) {
    const withSql = this.buildWithCTE(withList);
    const returningSql = returning
      ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}`
      : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    const orderBySql = this.buildOrderBy(orderBy);
    const limitSql = this.buildLimit(limit);
    return sql`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
  }
  buildUpdateSet(table, set) {
    const tableColumns = table[Table.Symbol.Columns];
    const columnNames = Object.keys(tableColumns).filter((colName) => {
      var _a2;
      return (
        set[colName] !== void 0 ||
        ((_a2 = tableColumns[colName]) == null ? void 0 : _a2.onUpdateFn) !== void 0
      );
    });
    const setSize = columnNames.length;
    return sql.join(
      columnNames.flatMap((colName, i) => {
        const col = tableColumns[colName];
        const value = set[colName] ?? sql.param(col.onUpdateFn(), col);
        const res2 = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
        if (i < setSize - 1) {
          return [res2, sql.raw(', ')];
        }
        return [res2];
      })
    );
  }
  buildUpdateQuery({ table, set, where, returning, withList, joins, from, limit, orderBy }) {
    const withSql = this.buildWithCTE(withList);
    const setSql = this.buildUpdateSet(table, set);
    const fromSql = from && sql.join([sql.raw(' from '), this.buildFromTable(from)]);
    const joinsSql = this.buildJoins(joins);
    const returningSql = returning
      ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}`
      : void 0;
    const whereSql = where ? sql` where ${where}` : void 0;
    const orderBySql = this.buildOrderBy(orderBy);
    const limitSql = this.buildLimit(limit);
    return sql`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
  }
  /**
   * Builds selection SQL with provided fields/expressions
   *
   * Examples:
   *
   * `select <selection> from`
   *
   * `insert ... returning <selection>`
   *
   * If `isSingleTable` is true, then columns won't be prefixed with table name
   */
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        chunk.push(sql.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          chunk.push(
            new SQL(
              query.queryChunks.map((c) => {
                if (is(c, Column)) {
                  return sql.identifier(this.casing.getColumnCasing(c));
                }
                return c;
              })
            )
          );
        } else {
          chunk.push(query);
        }
        if (is(field, SQL.Aliased)) {
          chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
        }
      } else if (is(field, Column)) {
        const tableName = field.table[Table.Symbol.Name];
        if (field.columnType === 'SQLiteNumericBigInt') {
          if (isSingleTable) {
            chunk.push(sql`cast(${sql.identifier(this.casing.getColumnCasing(field))} as text)`);
          } else {
            chunk.push(
              sql`cast(${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))} as text)`
            );
          }
        } else {
          if (isSingleTable) {
            chunk.push(sql.identifier(this.casing.getColumnCasing(field)));
          } else {
            chunk.push(
              sql`${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))}`
            );
          }
        }
      }
      if (i < columnsLen - 1) {
        chunk.push(sql`, `);
      }
      return chunk;
    });
    return sql.join(chunks);
  }
  buildJoins(joins) {
    if (!joins || joins.length === 0) {
      return void 0;
    }
    const joinsArray = [];
    if (joins) {
      for (const [index, joinMeta] of joins.entries()) {
        if (index === 0) {
          joinsArray.push(sql` `);
        }
        const table = joinMeta.table;
        const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
        if (is(table, SQLiteTable)) {
          const tableName = table[SQLiteTable.Symbol.Name];
          const tableSchema = table[SQLiteTable.Symbol.Schema];
          const origTableName = table[SQLiteTable.Symbol.OriginalName];
          const alias = tableName === origTableName ? void 0 : joinMeta.alias;
          joinsArray.push(
            sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
          );
        } else {
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${table}${onSql}`);
        }
        if (index < joins.length - 1) {
          joinsArray.push(sql` `);
        }
      }
    }
    return sql.join(joinsArray);
  }
  buildLimit(limit) {
    return typeof limit === 'object' || (typeof limit === 'number' && limit >= 0)
      ? sql` limit ${limit}`
      : void 0;
  }
  buildOrderBy(orderBy) {
    const orderByList = [];
    if (orderBy) {
      for (const [index, orderByValue] of orderBy.entries()) {
        orderByList.push(orderByValue);
        if (index < orderBy.length - 1) {
          orderByList.push(sql`, `);
        }
      }
    }
    return orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : void 0;
  }
  buildFromTable(table) {
    if (is(table, Table) && table[Table.Symbol.IsAlias]) {
      return sql`${sql`${sql.identifier(table[Table.Symbol.Schema] ?? '')}.`.if(table[Table.Symbol.Schema])}${sql.identifier(table[Table.Symbol.OriginalName])} ${sql.identifier(table[Table.Symbol.Name])}`;
    }
    return table;
  }
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    distinct,
    setOperators,
  }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f of fieldsList) {
      if (
        is(f.field, Column) &&
        getTableName(f.field.table) !==
          (is(table, Subquery)
            ? table._.alias
            : is(table, SQLiteViewBase)
              ? table[ViewBaseConfig].name
              : is(table, SQL)
                ? void 0
                : getTableName(table)) &&
        !((table2) =>
          joins == null
            ? void 0
            : joins.some(
                ({ alias }) =>
                  alias ===
                  (table2[Table.Symbol.IsAlias]
                    ? getTableName(table2)
                    : table2[Table.Symbol.BaseName])
              ))(f.field.table)
      ) {
        const tableName = getTableName(f.field.table);
        throw new Error(
          `Your "${f.path.join('->')}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
        );
      }
    }
    const isSingleTable = !joins || joins.length === 0;
    const withSql = this.buildWithCTE(withList);
    const distinctSql = distinct ? sql` distinct` : void 0;
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = this.buildFromTable(table);
    const joinsSql = this.buildJoins(joins);
    const whereSql = where ? sql` where ${where}` : void 0;
    const havingSql = having ? sql` having ${having}` : void 0;
    const groupByList = [];
    if (groupBy) {
      for (const [index, groupByValue] of groupBy.entries()) {
        groupByList.push(groupByValue);
        if (index < groupBy.length - 1) {
          groupByList.push(sql`, `);
        }
      }
    }
    const groupBySql = groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : void 0;
    const orderBySql = this.buildOrderBy(orderBy);
    const limitSql = this.buildLimit(limit);
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
    if (setOperators.length > 0) {
      return this.buildSetOperations(finalQuery, setOperators);
    }
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest] = setOperators;
    if (!setOperator) {
      throw new Error('Cannot pass undefined values to any set operator');
    }
    if (rest.length === 0) {
      return this.buildSetOperationQuery({ leftSelect, setOperator });
    }
    return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect, setOperator }), rest);
  }
  buildSetOperationQuery({
    leftSelect,
    setOperator: { type, isAll, rightSelect, limit, orderBy, offset },
  }) {
    const leftChunk = sql`${leftSelect.getSQL()} `;
    const rightChunk = sql`${rightSelect.getSQL()}`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) {
        if (is(singleOrderBy, SQLiteColumn)) {
          orderByValues.push(sql.identifier(singleOrderBy.name));
        } else if (is(singleOrderBy, SQL)) {
          for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
            const chunk = singleOrderBy.queryChunks[i];
            if (is(chunk, SQLiteColumn)) {
              singleOrderBy.queryChunks[i] = sql.identifier(this.casing.getColumnCasing(chunk));
            }
          }
          orderByValues.push(sql`${singleOrderBy}`);
        } else {
          orderByValues.push(sql`${singleOrderBy}`);
        }
      }
      orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
    }
    const limitSql =
      typeof limit === 'object' || (typeof limit === 'number' && limit >= 0)
        ? sql` limit ${limit}`
        : void 0;
    const operatorChunk = sql.raw(`${type} ${isAll ? 'all ' : ''}`);
    const offsetSql = offset ? sql` offset ${offset}` : void 0;
    return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select }) {
    const valuesSqlList = [];
    const columns = table[Table.Symbol.Columns];
    const colEntries = Object.entries(columns).filter(([_, col]) => !col.shouldDisableInsert());
    const insertOrder = colEntries.map(([, column]) =>
      sql.identifier(this.casing.getColumnCasing(column))
    );
    if (select) {
      const select2 = valuesOrSelect;
      if (is(select2, SQL)) {
        valuesSqlList.push(select2);
      } else {
        valuesSqlList.push(select2.getSQL());
      }
    } else {
      const values = valuesOrSelect;
      valuesSqlList.push(sql.raw('values '));
      for (const [valueIndex, value] of values.entries()) {
        const valueList = [];
        for (const [fieldName, col] of colEntries) {
          const colValue = value[fieldName];
          if (colValue === void 0 || (is(colValue, Param) && colValue.value === void 0)) {
            let defaultValue;
            if (col.default !== null && col.default !== void 0) {
              defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
            } else if (col.defaultFn !== void 0) {
              const defaultFnResult = col.defaultFn();
              defaultValue = is(defaultFnResult, SQL)
                ? defaultFnResult
                : sql.param(defaultFnResult, col);
            } else if (!col.default && col.onUpdateFn !== void 0) {
              const onUpdateFnResult = col.onUpdateFn();
              defaultValue = is(onUpdateFnResult, SQL)
                ? onUpdateFnResult
                : sql.param(onUpdateFnResult, col);
            } else {
              defaultValue = sql`null`;
            }
            valueList.push(defaultValue);
          } else {
            valueList.push(colValue);
          }
        }
        valuesSqlList.push(valueList);
        if (valueIndex < values.length - 1) {
          valuesSqlList.push(sql`, `);
        }
      }
    }
    const withSql = this.buildWithCTE(withList);
    const valuesSql = sql.join(valuesSqlList);
    const returningSql = returning
      ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}`
      : void 0;
    const onConflictSql = (onConflict == null ? void 0 : onConflict.length)
      ? sql.join(onConflict)
      : void 0;
    return sql`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
  }
  sqlToQuery(sql2, invokeSource) {
    return sql2.toQuery({
      casing: this.casing,
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      invokeSource,
    });
  }
  buildRelationalQuery({
    fullSchema,
    schema,
    tableNamesMap,
    table,
    tableConfig,
    queryConfig: config,
    tableAlias,
    nestedQueryRelation,
    joinOn,
  }) {
    let selection = [];
    let limit,
      offset,
      orderBy = [],
      where;
    const joins = [];
    if (config === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      selection = selectionEntries.map(([key, value]) => ({
        dbKey: value.name,
        tsKey: key,
        field: aliasedTableColumn(value, tableAlias),
        relationTableTsKey: void 0,
        isJson: false,
        selection: [],
      }));
    } else {
      const aliasedColumns = Object.fromEntries(
        Object.entries(tableConfig.columns).map(([key, value]) => [
          key,
          aliasedTableColumn(value, tableAlias),
        ])
      );
      if (config.where) {
        const whereSql =
          typeof config.where === 'function'
            ? config.where(aliasedColumns, getOperators())
            : config.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config.columns) {
        let isIncludeMode = false;
        for (const [field, value] of Object.entries(config.columns)) {
          if (value === void 0) {
            continue;
          }
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value === true) {
              isIncludeMode = true;
            }
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) {
          selectedColumns = isIncludeMode
            ? selectedColumns.filter((c) => {
                var _a2;
                return ((_a2 = config.columns) == null ? void 0 : _a2[c]) === true;
              })
            : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
        }
      } else {
        selectedColumns = Object.keys(tableConfig.columns);
      }
      for (const field of selectedColumns) {
        const column = tableConfig.columns[field];
        fieldsSelection.push({ tsKey: field, value: column });
      }
      let selectedRelations = [];
      if (config.with) {
        selectedRelations = Object.entries(config.with)
          .filter((entry) => !!entry[1])
          .map(([tsKey, queryConfig]) => ({
            tsKey,
            queryConfig,
            relation: tableConfig.relations[tsKey],
          }));
      }
      let extras;
      if (config.extras) {
        extras =
          typeof config.extras === 'function'
            ? config.extras(aliasedColumns, { sql })
            : config.extras;
        for (const [tsKey, value] of Object.entries(extras)) {
          fieldsSelection.push({
            tsKey,
            value: mapColumnsInAliasedSQLToAlias(value, tableAlias),
          });
        }
      }
      for (const { tsKey, value } of fieldsSelection) {
        selection.push({
          dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
          tsKey,
          field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
          relationTableTsKey: void 0,
          isJson: false,
          selection: [],
        });
      }
      let orderByOrig =
        typeof config.orderBy === 'function'
          ? config.orderBy(aliasedColumns, getOrderByOperators())
          : (config.orderBy ?? []);
      if (!Array.isArray(orderByOrig)) {
        orderByOrig = [orderByOrig];
      }
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) {
          return aliasedTableColumn(orderByValue, tableAlias);
        }
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config.limit;
      offset = config.offset;
      for (const {
        tsKey: selectedRelationTsKey,
        queryConfig: selectedRelationConfigValue,
        relation,
      } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
        const relationTableName = getTableUniqueName(relation.referencedTable);
        const relationTableTsName = tableNamesMap[relationTableName];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(
          ...normalizedRelation.fields.map((field2, i) =>
            eq(
              aliasedTableColumn(normalizedRelation.references[i], relationTableAlias),
              aliasedTableColumn(field2, tableAlias)
            )
          )
        );
        const builtRelation = this.buildRelationalQuery({
          fullSchema,
          schema,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema[relationTableTsName],
          queryConfig: is(relation, One)
            ? selectedRelationConfigValue === true
              ? { limit: 1 }
              : { ...selectedRelationConfigValue, limit: 1 }
            : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation,
        });
        const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection,
        });
      }
    }
    if (selection.length === 0) {
      throw new DrizzleError({
        message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`,
      });
    }
    let result;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql`json_array(${sql.join(
        selection.map(({ field: field2 }) =>
          is(field2, SQLiteColumn)
            ? sql.identifier(this.casing.getColumnCasing(field2))
            : is(field2, SQL.Aliased)
              ? field2.sql
              : field2
        ),
        sql`, `
      )})`;
      if (is(nestedQueryRelation, Many)) {
        field = sql`coalesce(json_group_array(${field}), json_array())`;
      }
      const nestedSelection = [
        {
          dbKey: 'data',
          tsKey: 'data',
          field: field.as('data'),
          isJson: true,
          relationTableTsKey: tableConfig.tsName,
          selection,
        },
      ];
      const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
      if (needsSubquery) {
        result = this.buildSelectQuery({
          table: aliasedTable(table, tableAlias),
          fields: {},
          fieldsFlat: [
            {
              path: [],
              field: sql.raw('*'),
            },
          ],
          where,
          limit,
          offset,
          orderBy,
          setOperators: [],
        });
        where = void 0;
        limit = void 0;
        offset = void 0;
        orderBy = void 0;
      } else {
        result = aliasedTable(table, tableAlias);
      }
      result = this.buildSelectQuery({
        table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2,
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: [],
      });
    } else {
      result = this.buildSelectQuery({
        table: aliasedTable(table, tableAlias),
        fields: {},
        fieldsFlat: selection.map(({ field }) => ({
          path: [],
          field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field,
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: [],
      });
    }
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection,
    };
  }
}
__publicField(SQLiteDialect, _nb, 'SQLiteDialect');
class SQLiteSyncDialect extends ((_pb = SQLiteDialect), (_ob = entityKind), _pb) {
  migrate(migrations, session, config) {
    const migrationsTable =
      config === void 0
        ? '__drizzle_migrations'
        : typeof config === 'string'
          ? '__drizzle_migrations'
          : (config.migrationsTable ?? '__drizzle_migrations');
    const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    session.run(migrationTableCreate);
    const dbMigrations = session.values(
      sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
    );
    const lastDbMigration = dbMigrations[0] ?? void 0;
    session.run(sql`BEGIN`);
    try {
      for (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
          for (const stmt of migration.sql) {
            session.run(sql.raw(stmt));
          }
          session.run(
            sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
          );
        }
      }
      session.run(sql`COMMIT`);
    } catch (e) {
      session.run(sql`ROLLBACK`);
      throw e;
    }
  }
}
__publicField(SQLiteSyncDialect, _ob, 'SQLiteSyncDialect');
_qb = entityKind;
class TypedQueryBuilder {
  /** @internal */
  getSelectedFields() {
    return this._.selectedFields;
  }
}
__publicField(TypedQueryBuilder, _qb, 'TypedQueryBuilder');
_rb = entityKind;
class SQLiteSelectBuilder {
  constructor(config) {
    __publicField(this, 'fields');
    __publicField(this, 'session');
    __publicField(this, 'dialect');
    __publicField(this, 'withList');
    __publicField(this, 'distinct');
    this.fields = config.fields;
    this.session = config.session;
    this.dialect = config.dialect;
    this.withList = config.withList;
    this.distinct = config.distinct;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (is(source, Subquery)) {
      fields = Object.fromEntries(
        Object.keys(source._.selectedFields).map((key) => [key, source[key]])
      );
    } else if (is(source, SQLiteViewBase)) {
      fields = source[ViewBaseConfig].selectedFields;
    } else if (is(source, SQL)) {
      fields = {};
    } else {
      fields = getTableColumns(source);
    }
    return new SQLiteSelectBase({
      table: source,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct,
    });
  }
}
__publicField(SQLiteSelectBuilder, _rb, 'SQLiteSelectBuilder');
class SQLiteSelectQueryBuilderBase extends ((_tb = TypedQueryBuilder), (_sb = entityKind), _tb) {
  constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    __publicField(this, '_');
    /** @internal */
    __publicField(this, 'config');
    __publicField(this, 'joinsNotNullableMap');
    __publicField(this, 'tableName');
    __publicField(this, 'isPartialSelect');
    __publicField(this, 'session');
    __publicField(this, 'dialect');
    /**
     * Executes a `left join` operation by adding another table to the current query.
     *
     * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
     *
     * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
     *
     * @param table the table to join.
     * @param on the `on` clause.
     *
     * @example
     *
     * ```ts
     * // Select all users and their pets
     * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
     *   .from(users)
     *   .leftJoin(pets, eq(users.id, pets.ownerId))
     *
     * // Select userId and petId
     * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
     *   userId: users.id,
     *   petId: pets.id,
     * })
     *   .from(users)
     *   .leftJoin(pets, eq(users.id, pets.ownerId))
     * ```
     */
    __publicField(this, 'leftJoin', this.createJoin('left'));
    /**
     * Executes a `right join` operation by adding another table to the current query.
     *
     * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
     *
     * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
     *
     * @param table the table to join.
     * @param on the `on` clause.
     *
     * @example
     *
     * ```ts
     * // Select all users and their pets
     * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
     *   .from(users)
     *   .rightJoin(pets, eq(users.id, pets.ownerId))
     *
     * // Select userId and petId
     * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
     *   userId: users.id,
     *   petId: pets.id,
     * })
     *   .from(users)
     *   .rightJoin(pets, eq(users.id, pets.ownerId))
     * ```
     */
    __publicField(this, 'rightJoin', this.createJoin('right'));
    /**
     * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
     *
     * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
     *
     * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
     *
     * @param table the table to join.
     * @param on the `on` clause.
     *
     * @example
     *
     * ```ts
     * // Select all users and their pets
     * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
     *   .from(users)
     *   .innerJoin(pets, eq(users.id, pets.ownerId))
     *
     * // Select userId and petId
     * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
     *   userId: users.id,
     *   petId: pets.id,
     * })
     *   .from(users)
     *   .innerJoin(pets, eq(users.id, pets.ownerId))
     * ```
     */
    __publicField(this, 'innerJoin', this.createJoin('inner'));
    /**
     * Executes a `full join` operation by combining rows from two tables into a new table.
     *
     * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
     *
     * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
     *
     * @param table the table to join.
     * @param on the `on` clause.
     *
     * @example
     *
     * ```ts
     * // Select all users and their pets
     * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
     *   .from(users)
     *   .fullJoin(pets, eq(users.id, pets.ownerId))
     *
     * // Select userId and petId
     * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
     *   userId: users.id,
     *   petId: pets.id,
     * })
     *   .from(users)
     *   .fullJoin(pets, eq(users.id, pets.ownerId))
     * ```
     */
    __publicField(this, 'fullJoin', this.createJoin('full'));
    /**
     * Executes a `cross join` operation by combining rows from two tables into a new table.
     *
     * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
     *
     * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
     *
     * @param table the table to join.
     *
     * @example
     *
     * ```ts
     * // Select all users, each user with every pet
     * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
     *   .from(users)
     *   .crossJoin(pets)
     *
     * // Select userId and petId
     * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
     *   userId: users.id,
     *   petId: pets.id,
     * })
     *   .from(users)
     *   .crossJoin(pets)
     * ```
     */
    __publicField(this, 'crossJoin', this.createJoin('cross'));
    /**
     * Adds `union` set operator to the query.
     *
     * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
     *
     * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
     *
     * @example
     *
     * ```ts
     * // Select all unique names from customers and users tables
     * await db.select({ name: users.name })
     *   .from(users)
     *   .union(
     *     db.select({ name: customers.name }).from(customers)
     *   );
     * // or
     * import { union } from 'drizzle-orm/sqlite-core'
     *
     * await union(
     *   db.select({ name: users.name }).from(users),
     *   db.select({ name: customers.name }).from(customers)
     * );
     * ```
     */
    __publicField(this, 'union', this.createSetOperator('union', false));
    /**
     * Adds `union all` set operator to the query.
     *
     * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
     *
     * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
     *
     * @example
     *
     * ```ts
     * // Select all transaction ids from both online and in-store sales
     * await db.select({ transaction: onlineSales.transactionId })
     *   .from(onlineSales)
     *   .unionAll(
     *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
     *   );
     * // or
     * import { unionAll } from 'drizzle-orm/sqlite-core'
     *
     * await unionAll(
     *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
     *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
     * );
     * ```
     */
    __publicField(this, 'unionAll', this.createSetOperator('union', true));
    /**
     * Adds `intersect` set operator to the query.
     *
     * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
     *
     * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
     *
     * @example
     *
     * ```ts
     * // Select course names that are offered in both departments A and B
     * await db.select({ courseName: depA.courseName })
     *   .from(depA)
     *   .intersect(
     *     db.select({ courseName: depB.courseName }).from(depB)
     *   );
     * // or
     * import { intersect } from 'drizzle-orm/sqlite-core'
     *
     * await intersect(
     *   db.select({ courseName: depA.courseName }).from(depA),
     *   db.select({ courseName: depB.courseName }).from(depB)
     * );
     * ```
     */
    __publicField(this, 'intersect', this.createSetOperator('intersect', false));
    /**
     * Adds `except` set operator to the query.
     *
     * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
     *
     * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
     *
     * @example
     *
     * ```ts
     * // Select all courses offered in department A but not in department B
     * await db.select({ courseName: depA.courseName })
     *   .from(depA)
     *   .except(
     *     db.select({ courseName: depB.courseName }).from(depB)
     *   );
     * // or
     * import { except } from 'drizzle-orm/sqlite-core'
     *
     * await except(
     *   db.select({ courseName: depA.courseName }).from(depA),
     *   db.select({ courseName: depB.courseName }).from(depB)
     * );
     * ```
     */
    __publicField(this, 'except', this.createSetOperator('except', false));
    this.config = {
      withList,
      table,
      fields: { ...fields },
      distinct,
      setOperators: [],
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields,
    };
    this.tableName = getTableLikeName(table);
    this.joinsNotNullableMap = typeof this.tableName === 'string' ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table, on) => {
      var _a2;
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table);
      if (
        typeof tableName === 'string' &&
        ((_a2 = this.config.joins) == null ? void 0 : _a2.some((join) => join.alias === tableName))
      ) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (
          Object.keys(this.joinsNotNullableMap).length === 1 &&
          typeof baseTableName === 'string'
        ) {
          this.config.fields = {
            [baseTableName]: this.config.fields,
          };
        }
        if (typeof tableName === 'string' && !is(table, SQL)) {
          const selection = is(table, Subquery)
            ? table._.selectedFields
            : is(table, View)
              ? table[ViewBaseConfig].selectedFields
              : table[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === 'function') {
        on = on(
          new Proxy(
            this.config.fields,
            new SelectionProxyHandler({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
          )
        );
      }
      if (!this.config.joins) {
        this.config.joins = [];
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      if (typeof tableName === 'string') {
        switch (joinType) {
          case 'left': {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case 'right': {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case 'cross':
          case 'inner': {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case 'full': {
            this.joinsNotNullableMap = Object.fromEntries(
              Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
            );
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  createSetOperator(type, isAll) {
    return (rightSelection) => {
      const rightSelect =
        typeof rightSelection === 'function'
          ? rightSelection(getSQLiteSetOperators())
          : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
        throw new Error(
          'Set operator error (union / intersect / except): selected fields are not the same or are in a different order'
        );
      }
      this.config.setOperators.push({ type, isAll, rightSelect });
      return this;
    };
  }
  /** @internal */
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  /**
   * Adds a `where` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
   *
   * @param where the `where` clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be selected.
   *
   * ```ts
   * // Select all cars with green color
   * await db.select().from(cars).where(eq(cars.color, 'green'));
   * // or
   * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Select all BMW cars with a green color
   * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Select all cars with the green or blue color
   * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    if (typeof where === 'function') {
      where = where(
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
        )
      );
    }
    this.config.where = where;
    return this;
  }
  /**
   * Adds a `having` clause to the query.
   *
   * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
   *
   * @param having the `having` clause.
   *
   * @example
   *
   * ```ts
   * // Select all brands with more than one car
   * await db.select({
   * 	brand: cars.brand,
   * 	count: sql<number>`cast(count(${cars.id}) as int)`,
   * })
   *   .from(cars)
   *   .groupBy(cars.brand)
   *   .having(({ count }) => gt(count, 1));
   * ```
   */
  having(having) {
    if (typeof having === 'function') {
      having = having(
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
        )
      );
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns) {
    if (typeof columns[0] === 'function') {
      const groupBy = columns[0](
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: 'alias', sqlBehavior: 'sql' })
        )
      );
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns;
    }
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === 'function') {
      const orderBy = columns[0](
        new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ sqlAliasedBehavior: 'alias', sqlBehavior: 'sql' })
        )
      );
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    } else {
      const orderByArray = columns;
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    }
    return this;
  }
  /**
   * Adds a `limit` clause to the query.
   *
   * Calling this method will set the maximum number of rows that will be returned by this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param limit the `limit` clause.
   *
   * @example
   *
   * ```ts
   * // Get the first 10 people from this query.
   * await db.select().from(people).limit(10);
   * ```
   */
  limit(limit) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).limit = limit;
    } else {
      this.config.limit = limit;
    }
    return this;
  }
  /**
   * Adds an `offset` clause to the query.
   *
   * Calling this method will skip a number of rows when returning results from this query.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
   *
   * @param offset the `offset` clause.
   *
   * @example
   *
   * ```ts
   * // Get the 10th-20th people from this query.
   * await db.select().from(people).offset(10).limit(10);
   * ```
   */
  offset(offset) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).offset = offset;
    } else {
      this.config.offset = offset;
    }
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  as(alias) {
    return new Proxy(
      new Subquery(this.getSQL(), this.config.fields, alias),
      new SelectionProxyHandler({ alias, sqlAliasedBehavior: 'alias', sqlBehavior: 'error' })
    );
  }
  /** @internal */
  getSelectedFields() {
    return new Proxy(
      this.config.fields,
      new SelectionProxyHandler({
        alias: this.tableName,
        sqlAliasedBehavior: 'alias',
        sqlBehavior: 'error',
      })
    );
  }
  $dynamic() {
    return this;
  }
}
__publicField(SQLiteSelectQueryBuilderBase, _sb, 'SQLiteSelectQueryBuilder');
class SQLiteSelectBase extends ((_vb = SQLiteSelectQueryBuilderBase), (_ub = entityKind), _vb) {
  constructor() {
    super(...arguments);
    __publicField(this, 'run', (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    });
    __publicField(this, 'all', (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    });
    __publicField(this, 'get', (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    });
    __publicField(this, 'values', (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    });
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    if (!this.session) {
      throw new Error(
        'Cannot execute a query on a query builder. Please use a database instance instead.'
      );
    }
    const fieldsList = orderSelectedFields(this.config.fields);
    const query = this.session[isOneTimeQuery ? 'prepareOneTimeQuery' : 'prepareQuery'](
      this.dialect.sqlToQuery(this.getSQL()),
      fieldsList,
      'all',
      true
    );
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  prepare() {
    return this._prepare(false);
  }
  async execute() {
    return this.all();
  }
}
__publicField(SQLiteSelectBase, _ub, 'SQLiteSelect');
applyMixins(SQLiteSelectBase, [QueryPromise]);
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select,
    }));
    for (const setOperator of setOperators) {
      if (
        !haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())
      ) {
        throw new Error(
          'Set operator error (union / intersect / except): selected fields are not the same or are in a different order'
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
const getSQLiteSetOperators = () => ({
  union,
  unionAll,
  intersect,
  except,
});
const union = createSetOperator('union', false);
const unionAll = createSetOperator('union', true);
const intersect = createSetOperator('intersect', false);
const except = createSetOperator('except', false);
_wb = entityKind;
class QueryBuilder {
  constructor(dialect) {
    __publicField(this, 'dialect');
    __publicField(this, 'dialectConfig');
    __publicField(this, '$with', (alias, selection) => {
      const queryBuilder = this;
      const as = (qb) => {
        if (typeof qb === 'function') {
          qb = qb(queryBuilder);
        }
        return new Proxy(
          new WithSubquery(
            qb.getSQL(),
            selection ?? ('getSelectedFields' in qb ? (qb.getSelectedFields() ?? {}) : {}),
            alias,
            true
          ),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: 'alias', sqlBehavior: 'error' })
        );
      };
      return { as };
    });
    this.dialect = is(dialect, SQLiteDialect) ? dialect : void 0;
    this.dialectConfig = is(dialect, SQLiteDialect) ? void 0 : dialect;
  }
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        withList: queries,
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: void 0,
        dialect: self2.getDialect(),
        withList: queries,
        distinct: true,
      });
    }
    return { select, selectDistinct };
  }
  select(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
    });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: void 0,
      dialect: this.getDialect(),
      distinct: true,
    });
  }
  // Lazy load dialect to avoid circular dependency
  getDialect() {
    if (!this.dialect) {
      this.dialect = new SQLiteSyncDialect(this.dialectConfig);
    }
    return this.dialect;
  }
}
__publicField(QueryBuilder, _wb, 'SQLiteQueryBuilder');
_xb = entityKind;
class SQLiteInsertBuilder {
  constructor(table, session, dialect, withList) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error('values() must be called with at least one value');
    }
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new SQLiteInsertBase(
      this.table,
      mappedValues,
      this.session,
      this.dialect,
      this.withList
    );
  }
  select(selectQuery) {
    const select =
      typeof selectQuery === 'function' ? selectQuery(new QueryBuilder()) : selectQuery;
    if (!is(select, SQL) && !haveSameKeys(this.table[Columns], select._.selectedFields)) {
      throw new Error(
        'Insert select error: selected fields are not the same or are in a different order compared to the table definition'
      );
    }
    return new SQLiteInsertBase(
      this.table,
      select,
      this.session,
      this.dialect,
      this.withList,
      true
    );
  }
}
__publicField(SQLiteInsertBuilder, _xb, 'SQLiteInsertBuilder');
class SQLiteInsertBase extends ((_zb = QueryPromise), (_yb = entityKind), _zb) {
  constructor(table, values, session, dialect, withList, select) {
    super();
    /** @internal */
    __publicField(this, 'config');
    __publicField(this, 'run', (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    });
    __publicField(this, 'all', (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    });
    __publicField(this, 'get', (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    });
    __publicField(this, 'values', (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    });
    this.session = session;
    this.dialect = dialect;
    this.config = { table, values, withList, select };
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /**
   * Adds an `on conflict do nothing` clause to the query.
   *
   * Calling this method simply avoids inserting a row as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
   *
   * @param config The `target` and `where` clauses.
   *
   * @example
   * ```ts
   * // Insert one row and cancel the insert if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing();
   *
   * // Explicitly specify conflict target
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoNothing({ target: cars.id });
   * ```
   */
  onConflictDoNothing(config = {}) {
    if (!this.config.onConflict) this.config.onConflict = [];
    if (config.target === void 0) {
      this.config.onConflict.push(sql` on conflict do nothing`);
    } else {
      const targetSql = Array.isArray(config.target)
        ? sql`${config.target}`
        : sql`${[config.target]}`;
      const whereSql = config.where ? sql` where ${config.where}` : sql``;
      this.config.onConflict.push(sql` on conflict ${targetSql} do nothing${whereSql}`);
    }
    return this;
  }
  /**
   * Adds an `on conflict do update` clause to the query.
   *
   * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
   *
   * @param config The `target`, `set` and `where` clauses.
   *
   * @example
   * ```ts
   * // Update the row if there's a conflict
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'Porsche' }
   *   });
   *
   * // Upsert with 'where' clause
   * await db.insert(cars)
   *   .values({ id: 1, brand: 'BMW' })
   *   .onConflictDoUpdate({
   *     target: cars.id,
   *     set: { brand: 'newBMW' },
   *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
   *   });
   * ```
   */
  onConflictDoUpdate(config) {
    if (config.where && (config.targetWhere || config.setWhere)) {
      throw new Error(
        'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
      );
    }
    if (!this.config.onConflict) this.config.onConflict = [];
    const whereSql = config.where ? sql` where ${config.where}` : void 0;
    const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : void 0;
    const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : void 0;
    const targetSql = Array.isArray(config.target)
      ? sql`${config.target}`
      : sql`${[config.target]}`;
    const setSql = this.dialect.buildUpdateSet(
      this.config.table,
      mapUpdateSet(this.config.table, config.set)
    );
    this.config.onConflict.push(
      sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`
    );
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? 'prepareOneTimeQuery' : 'prepareQuery'](
      this.dialect.sqlToQuery(this.getSQL()),
      this.config.returning,
      this.config.returning ? 'all' : 'run',
      true
    );
  }
  prepare() {
    return this._prepare(false);
  }
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}
__publicField(SQLiteInsertBase, _yb, 'SQLiteInsert');
_Ab = entityKind;
class SQLiteUpdateBuilder {
  constructor(table, session, dialect, withList) {
    this.table = table;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  set(values) {
    return new SQLiteUpdateBase(
      this.table,
      mapUpdateSet(this.table, values),
      this.session,
      this.dialect,
      this.withList
    );
  }
}
__publicField(SQLiteUpdateBuilder, _Ab, 'SQLiteUpdateBuilder');
class SQLiteUpdateBase extends ((_Cb = QueryPromise), (_Bb = entityKind), _Cb) {
  constructor(table, set, session, dialect, withList) {
    super();
    /** @internal */
    __publicField(this, 'config');
    __publicField(this, 'leftJoin', this.createJoin('left'));
    __publicField(this, 'rightJoin', this.createJoin('right'));
    __publicField(this, 'innerJoin', this.createJoin('inner'));
    __publicField(this, 'fullJoin', this.createJoin('full'));
    __publicField(this, 'run', (placeholderValues) => {
      return this._prepare().run(placeholderValues);
    });
    __publicField(this, 'all', (placeholderValues) => {
      return this._prepare().all(placeholderValues);
    });
    __publicField(this, 'get', (placeholderValues) => {
      return this._prepare().get(placeholderValues);
    });
    __publicField(this, 'values', (placeholderValues) => {
      return this._prepare().values(placeholderValues);
    });
    this.session = session;
    this.dialect = dialect;
    this.config = { set, table, withList, joins: [] };
  }
  from(source) {
    this.config.from = source;
    return this;
  }
  createJoin(joinType) {
    return (table, on) => {
      const tableName = getTableLikeName(table);
      if (
        typeof tableName === 'string' &&
        this.config.joins.some((join) => join.alias === tableName)
      ) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (typeof on === 'function') {
        const from = this.config.from
          ? is(table, SQLiteTable)
            ? table[Table.Symbol.Columns]
            : is(table, Subquery)
              ? table._.selectedFields
              : is(table, SQLiteViewBase)
                ? table[ViewBaseConfig].selectedFields
                : void 0
          : void 0;
        on = on(
          new Proxy(
            this.config.table[Table.Symbol.Columns],
            new SelectionProxyHandler({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
          ),
          from &&
            new Proxy(
              from,
              new SelectionProxyHandler({ sqlAliasedBehavior: 'sql', sqlBehavior: 'sql' })
            )
        );
      }
      this.config.joins.push({ on, table, joinType, alias: tableName });
      return this;
    };
  }
  /**
   * Adds a 'where' clause to the query.
   *
   * Calling this method will update only those rows that fulfill a specified condition.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param where the 'where' clause.
   *
   * @example
   * You can use conditional operators and `sql function` to filter the rows to be updated.
   *
   * ```ts
   * // Update all cars with green color
   * db.update(cars).set({ color: 'red' })
   *   .where(eq(cars.color, 'green'));
   * // or
   * db.update(cars).set({ color: 'red' })
   *   .where(sql`${cars.color} = 'green'`)
   * ```
   *
   * You can logically combine conditional operators with `and()` and `or()` operators:
   *
   * ```ts
   * // Update all BMW cars with a green color
   * db.update(cars).set({ color: 'red' })
   *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
   *
   * // Update all cars with the green or blue color
   * db.update(cars).set({ color: 'red' })
   *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
   * ```
   */
  where(where) {
    this.config.where = where;
    return this;
  }
  orderBy(...columns) {
    if (typeof columns[0] === 'function') {
      const orderBy = columns[0](
        new Proxy(
          this.config.table[Table.Symbol.Columns],
          new SelectionProxyHandler({ sqlAliasedBehavior: 'alias', sqlBehavior: 'sql' })
        )
      );
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      this.config.orderBy = orderByArray;
    } else {
      const orderByArray = columns;
      this.config.orderBy = orderByArray;
    }
    return this;
  }
  limit(limit) {
    this.config.limit = limit;
    return this;
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
    return rest;
  }
  /** @internal */
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? 'prepareOneTimeQuery' : 'prepareQuery'](
      this.dialect.sqlToQuery(this.getSQL()),
      this.config.returning,
      this.config.returning ? 'all' : 'run',
      true
    );
  }
  prepare() {
    return this._prepare(false);
  }
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}
__publicField(SQLiteUpdateBase, _Bb, 'SQLiteUpdate');
const _SQLiteCountBuilder = class _SQLiteCountBuilder extends ((_Fb = SQL),
(_Eb = entityKind),
(_Db = Symbol.toStringTag),
_Fb) {
  constructor(params) {
    super(_SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
    __publicField(this, 'sql');
    __publicField(this, _Db, 'SQLiteCountBuilderAsync');
    __publicField(this, 'session');
    this.params = params;
    this.session = params.session;
    this.sql = _SQLiteCountBuilder.buildCount(params.source, params.filters);
  }
  static buildEmbeddedCount(source, filters) {
    return sql`(select count(*) from ${source}${sql.raw(' where ').if(filters)}${filters})`;
  }
  static buildCount(source, filters) {
    return sql`select count(*) from ${source}${sql.raw(' where ').if(filters)}${filters}`;
  }
  then(onfulfilled, onrejected) {
    return Promise.resolve(this.session.count(this.sql)).then(onfulfilled, onrejected);
  }
  catch(onRejected) {
    return this.then(void 0, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        onFinally == null ? void 0 : onFinally();
        return value;
      },
      (reason) => {
        onFinally == null ? void 0 : onFinally();
        throw reason;
      }
    );
  }
};
__publicField(_SQLiteCountBuilder, _Eb, 'SQLiteCountBuilderAsync');
let SQLiteCountBuilder = _SQLiteCountBuilder;
_Gb = entityKind;
class RelationalQueryBuilder {
  constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
    this.mode = mode;
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
  }
  findMany(config) {
    return this.mode === 'sync'
      ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          'many'
        )
      : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          'many'
        );
  }
  findFirst(config) {
    return this.mode === 'sync'
      ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          'first'
        )
      : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          'first'
        );
  }
}
__publicField(RelationalQueryBuilder, _Gb, 'SQLiteAsyncRelationalQueryBuilder');
class SQLiteRelationalQuery extends ((_Ib = QueryPromise), (_Hb = entityKind), _Ib) {
  constructor(
    fullSchema,
    schema,
    tableNamesMap,
    table,
    tableConfig,
    dialect,
    session,
    config,
    mode
  ) {
    super();
    /** @internal */
    __publicField(this, 'mode');
    this.fullSchema = fullSchema;
    this.schema = schema;
    this.tableNamesMap = tableNamesMap;
    this.table = table;
    this.tableConfig = tableConfig;
    this.dialect = dialect;
    this.session = session;
    this.config = config;
    this.mode = mode;
  }
  /** @internal */
  getSQL() {
    return this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName,
    }).sql;
  }
  /** @internal */
  _prepare(isOneTimeQuery = false) {
    const { query, builtQuery } = this._toSQL();
    return this.session[isOneTimeQuery ? 'prepareOneTimeQuery' : 'prepareQuery'](
      builtQuery,
      void 0,
      this.mode === 'first' ? 'get' : 'all',
      true,
      (rawRows, mapColumnValue) => {
        const rows = rawRows.map((row) =>
          mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
        );
        if (this.mode === 'first') {
          return rows[0];
        }
        return rows;
      }
    );
  }
  prepare() {
    return this._prepare(false);
  }
  _toSQL() {
    const query = this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName,
    });
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return { query, builtQuery };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  /** @internal */
  executeRaw() {
    if (this.mode === 'first') {
      return this._prepare(false).get();
    }
    return this._prepare(false).all();
  }
  async execute() {
    return this.executeRaw();
  }
}
__publicField(SQLiteRelationalQuery, _Hb, 'SQLiteAsyncRelationalQuery');
class SQLiteSyncRelationalQuery extends ((_Kb = SQLiteRelationalQuery), (_Jb = entityKind), _Kb) {
  sync() {
    return this.executeRaw();
  }
}
__publicField(SQLiteSyncRelationalQuery, _Jb, 'SQLiteSyncRelationalQuery');
class SQLiteRaw extends ((_Mb = QueryPromise), (_Lb = entityKind), _Mb) {
  constructor(execute, getSQL, action, dialect, mapBatchResult) {
    super();
    /** @internal */
    __publicField(this, 'config');
    this.execute = execute;
    this.getSQL = getSQL;
    this.dialect = dialect;
    this.mapBatchResult = mapBatchResult;
    this.config = { action };
  }
  getQuery() {
    return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
  }
  mapResult(result, isFromBatch) {
    return isFromBatch ? this.mapBatchResult(result) : result;
  }
  _prepare() {
    return this;
  }
  /** @internal */
  isResponseInArrayMode() {
    return false;
  }
}
__publicField(SQLiteRaw, _Lb, 'SQLiteRaw');
_Nb = entityKind;
class BaseSQLiteDatabase {
  constructor(resultKind, dialect, session, schema) {
    __publicField(this, 'query');
    /**
     * Creates a subquery that defines a temporary named result set as a CTE.
     *
     * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
     *
     * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
     *
     * @param alias The alias for the subquery.
     *
     * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
     *
     * @example
     *
     * ```ts
     * // Create a subquery with alias 'sq' and use it in the select query
     * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
     *
     * const result = await db.with(sq).select().from(sq);
     * ```
     *
     * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
     *
     * ```ts
     * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
     * const sq = db.$with('sq').as(db.select({
     *   name: sql<string>`upper(${users.name})`.as('name'),
     * })
     * .from(users));
     *
     * const result = await db.with(sq).select({ name: sq.name }).from(sq);
     * ```
     */
    __publicField(this, '$with', (alias, selection) => {
      const self2 = this;
      const as = (qb) => {
        if (typeof qb === 'function') {
          qb = qb(new QueryBuilder(self2.dialect));
        }
        return new Proxy(
          new WithSubquery(
            qb.getSQL(),
            selection ?? ('getSelectedFields' in qb ? (qb.getSelectedFields() ?? {}) : {}),
            alias,
            true
          ),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: 'alias', sqlBehavior: 'error' })
        );
      };
      return { as };
    });
    this.resultKind = resultKind;
    this.dialect = dialect;
    this.session = session;
    this._ = schema
      ? {
          schema: schema.schema,
          fullSchema: schema.fullSchema,
          tableNamesMap: schema.tableNamesMap,
        }
      : {
          schema: void 0,
          fullSchema: {},
          tableNamesMap: {},
        };
    this.query = {};
    const query = this.query;
    if (this._.schema) {
      for (const [tableName, columns] of Object.entries(this._.schema)) {
        query[tableName] = new RelationalQueryBuilder(
          resultKind,
          schema.fullSchema,
          this._.schema,
          this._.tableNamesMap,
          schema.fullSchema[tableName],
          columns,
          dialect,
          session
        );
      }
    }
  }
  $count(source, filters) {
    return new SQLiteCountBuilder({ source, filters, session: this.session });
  }
  /**
   * Incorporates a previously defined CTE (using `$with`) into the main query.
   *
   * This method allows the main query to reference a temporary named result set.
   *
   * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
   *
   * @param queries The CTEs to incorporate into the main query.
   *
   * @example
   *
   * ```ts
   * // Define a subquery 'sq' as a CTE using $with
   * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
   *
   * // Incorporate the CTE 'sq' into the main query and select from it
   * const result = await db.with(sq).select().from(sq);
   * ```
   */
  with(...queries) {
    const self2 = this;
    function select(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? void 0,
        session: self2.session,
        dialect: self2.dialect,
        withList: queries,
        distinct: true,
      });
    }
    function update(table) {
      return new SQLiteUpdateBuilder(table, self2.session, self2.dialect, queries);
    }
    function insert(into) {
      return new SQLiteInsertBuilder(into, self2.session, self2.dialect, queries);
    }
    function delete_(from) {
      return new SQLiteDeleteBase(from, self2.session, self2.dialect, queries);
    }
    return { select, selectDistinct, update, insert, delete: delete_ };
  }
  select(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect,
    });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? void 0,
      session: this.session,
      dialect: this.dialect,
      distinct: true,
    });
  }
  /**
   * Creates an update query.
   *
   * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
   *
   * Use `.set()` method to specify which values to update.
   *
   * See docs: {@link https://orm.drizzle.team/docs/update}
   *
   * @param table The table to update.
   *
   * @example
   *
   * ```ts
   * // Update all rows in the 'cars' table
   * await db.update(cars).set({ color: 'red' });
   *
   * // Update rows with filters and conditions
   * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
   *
   * // Update with returning clause
   * const updatedCar: Car[] = await db.update(cars)
   *   .set({ color: 'red' })
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  update(table) {
    return new SQLiteUpdateBuilder(table, this.session, this.dialect);
  }
  /**
   * Creates an insert query.
   *
   * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
   *
   * See docs: {@link https://orm.drizzle.team/docs/insert}
   *
   * @param table The table to insert into.
   *
   * @example
   *
   * ```ts
   * // Insert one row
   * await db.insert(cars).values({ brand: 'BMW' });
   *
   * // Insert multiple rows
   * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
   *
   * // Insert with returning clause
   * const insertedCar: Car[] = await db.insert(cars)
   *   .values({ brand: 'BMW' })
   *   .returning();
   * ```
   */
  insert(into) {
    return new SQLiteInsertBuilder(into, this.session, this.dialect);
  }
  /**
   * Creates a delete query.
   *
   * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
   *
   * See docs: {@link https://orm.drizzle.team/docs/delete}
   *
   * @param table The table to delete from.
   *
   * @example
   *
   * ```ts
   * // Delete all rows in the 'cars' table
   * await db.delete(cars);
   *
   * // Delete rows with filters and conditions
   * await db.delete(cars).where(eq(cars.color, 'green'));
   *
   * // Delete with returning clause
   * const deletedCar: Car[] = await db.delete(cars)
   *   .where(eq(cars.id, 1))
   *   .returning();
   * ```
   */
  delete(from) {
    return new SQLiteDeleteBase(from, this.session, this.dialect);
  }
  run(query) {
    const sequel = typeof query === 'string' ? sql.raw(query) : query.getSQL();
    if (this.resultKind === 'async') {
      return new SQLiteRaw(
        async () => this.session.run(sequel),
        () => sequel,
        'run',
        this.dialect,
        this.session.extractRawRunValueFromBatchResult.bind(this.session)
      );
    }
    return this.session.run(sequel);
  }
  all(query) {
    const sequel = typeof query === 'string' ? sql.raw(query) : query.getSQL();
    if (this.resultKind === 'async') {
      return new SQLiteRaw(
        async () => this.session.all(sequel),
        () => sequel,
        'all',
        this.dialect,
        this.session.extractRawAllValueFromBatchResult.bind(this.session)
      );
    }
    return this.session.all(sequel);
  }
  get(query) {
    const sequel = typeof query === 'string' ? sql.raw(query) : query.getSQL();
    if (this.resultKind === 'async') {
      return new SQLiteRaw(
        async () => this.session.get(sequel),
        () => sequel,
        'get',
        this.dialect,
        this.session.extractRawGetValueFromBatchResult.bind(this.session)
      );
    }
    return this.session.get(sequel);
  }
  values(query) {
    const sequel = typeof query === 'string' ? sql.raw(query) : query.getSQL();
    if (this.resultKind === 'async') {
      return new SQLiteRaw(
        async () => this.session.values(sequel),
        () => sequel,
        'values',
        this.dialect,
        this.session.extractRawValuesValueFromBatchResult.bind(this.session)
      );
    }
    return this.session.values(sequel);
  }
  transaction(transaction, config) {
    return this.session.transaction(transaction, config);
  }
}
__publicField(BaseSQLiteDatabase, _Nb, 'BaseSQLiteDatabase');
class ExecuteResultSync extends ((_Pb = QueryPromise), (_Ob = entityKind), _Pb) {
  constructor(resultCb) {
    super();
    this.resultCb = resultCb;
  }
  async execute() {
    return this.resultCb();
  }
  sync() {
    return this.resultCb();
  }
}
__publicField(ExecuteResultSync, _Ob, 'ExecuteResultSync');
_Qb = entityKind;
class SQLitePreparedQuery {
  constructor(mode, executeMethod, query) {
    /** @internal */
    __publicField(this, 'joinsNotNullableMap');
    this.mode = mode;
    this.executeMethod = executeMethod;
    this.query = query;
  }
  getQuery() {
    return this.query;
  }
  mapRunResult(result, _isFromBatch) {
    return result;
  }
  mapAllResult(_result, _isFromBatch) {
    throw new Error('Not implemented');
  }
  mapGetResult(_result, _isFromBatch) {
    throw new Error('Not implemented');
  }
  execute(placeholderValues) {
    if (this.mode === 'async') {
      return this[this.executeMethod](placeholderValues);
    }
    return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
  }
  mapResult(response, isFromBatch) {
    switch (this.executeMethod) {
      case 'run': {
        return this.mapRunResult(response, isFromBatch);
      }
      case 'all': {
        return this.mapAllResult(response, isFromBatch);
      }
      case 'get': {
        return this.mapGetResult(response, isFromBatch);
      }
    }
  }
}
__publicField(SQLitePreparedQuery, _Qb, 'PreparedQuery');
_Rb = entityKind;
class SQLiteSession {
  constructor(dialect) {
    this.dialect = dialect;
  }
  prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode) {
    return this.prepareQuery(query, fields, executeMethod, isResponseInArrayMode);
  }
  run(query) {
    const staticQuery = this.dialect.sqlToQuery(query);
    try {
      return this.prepareOneTimeQuery(staticQuery, void 0, 'run', false).run();
    } catch (err2) {
      throw new DrizzleError({
        cause: err2,
        message: `Failed to run the query '${staticQuery.sql}'`,
      });
    }
  }
  /** @internal */
  extractRawRunValueFromBatchResult(result) {
    return result;
  }
  all(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, 'run', false).all();
  }
  /** @internal */
  extractRawAllValueFromBatchResult(_result) {
    throw new Error('Not implemented');
  }
  get(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, 'run', false).get();
  }
  /** @internal */
  extractRawGetValueFromBatchResult(_result) {
    throw new Error('Not implemented');
  }
  values(query) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, 'run', false).values();
  }
  async count(sql2) {
    const result = await this.values(sql2);
    return result[0][0];
  }
  /** @internal */
  extractRawValuesValueFromBatchResult(_result) {
    throw new Error('Not implemented');
  }
}
__publicField(SQLiteSession, _Rb, 'SQLiteSession');
class SQLiteTransaction extends ((_Tb = BaseSQLiteDatabase), (_Sb = entityKind), _Tb) {
  constructor(resultType, dialect, session, schema, nestedIndex = 0) {
    super(resultType, dialect, session, schema);
    this.schema = schema;
    this.nestedIndex = nestedIndex;
  }
  rollback() {
    throw new TransactionRollbackError();
  }
}
__publicField(SQLiteTransaction, _Sb, 'SQLiteTransaction');
class BetterSQLiteSession extends ((_Vb = SQLiteSession), (_Ub = entityKind), _Vb) {
  constructor(client, dialect, schema, options = {}) {
    super(dialect);
    __publicField(this, 'logger');
    this.client = client;
    this.schema = schema;
    this.logger = options.logger ?? new NoopLogger();
  }
  prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper) {
    const stmt = this.client.prepare(query.sql);
    return new PreparedQuery(
      stmt,
      query,
      this.logger,
      fields,
      executeMethod,
      isResponseInArrayMode,
      customResultMapper
    );
  }
  transaction(transaction, config = {}) {
    const tx = new BetterSQLiteTransaction('sync', this.dialect, this, this.schema);
    const nativeTx = this.client.transaction(transaction);
    return nativeTx[config.behavior ?? 'deferred'](tx);
  }
}
__publicField(BetterSQLiteSession, _Ub, 'BetterSQLiteSession');
const _BetterSQLiteTransaction = class _BetterSQLiteTransaction extends ((_Xb = SQLiteTransaction),
(_Wb = entityKind),
_Xb) {
  transaction(transaction) {
    const savepointName = `sp${this.nestedIndex}`;
    const tx = new _BetterSQLiteTransaction(
      'sync',
      this.dialect,
      this.session,
      this.schema,
      this.nestedIndex + 1
    );
    this.session.run(sql.raw(`savepoint ${savepointName}`));
    try {
      const result = transaction(tx);
      this.session.run(sql.raw(`release savepoint ${savepointName}`));
      return result;
    } catch (err2) {
      this.session.run(sql.raw(`rollback to savepoint ${savepointName}`));
      throw err2;
    }
  }
};
__publicField(_BetterSQLiteTransaction, _Wb, 'BetterSQLiteTransaction');
let BetterSQLiteTransaction = _BetterSQLiteTransaction;
class PreparedQuery extends ((_Zb = SQLitePreparedQuery), (_Yb = entityKind), _Zb) {
  constructor(
    stmt,
    query,
    logger2,
    fields,
    executeMethod,
    _isResponseInArrayMode,
    customResultMapper
  ) {
    super('sync', executeMethod, query);
    this.stmt = stmt;
    this.logger = logger2;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
  }
  run(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return this.stmt.run(...params);
  }
  all(placeholderValues) {
    const { fields, joinsNotNullableMap, query, logger: logger2, stmt, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query.params, placeholderValues ?? {});
      logger2.logQuery(query.sql, params);
      return stmt.all(...params);
    }
    const rows = this.values(placeholderValues);
    if (customResultMapper) {
      return customResultMapper(rows);
    }
    return rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
  }
  get(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    const { fields, stmt, joinsNotNullableMap, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      return stmt.get(...params);
    }
    const row = stmt.raw().get(...params);
    if (!row) {
      return void 0;
    }
    if (customResultMapper) {
      return customResultMapper([row]);
    }
    return mapResultRow(fields, row, joinsNotNullableMap);
  }
  values(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return this.stmt.raw().all(...params);
  }
  /** @internal */
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}
__publicField(PreparedQuery, _Yb, 'BetterSQLitePreparedQuery');
class BetterSQLite3Database extends ((_$b = BaseSQLiteDatabase), (__b = entityKind), _$b) {}
__publicField(BetterSQLite3Database, __b, 'BetterSQLite3Database');
function construct(client, config = {}) {
  const dialect = new SQLiteSyncDialect({ casing: config.casing });
  let logger2;
  if (config.logger === true) {
    logger2 = new DefaultLogger();
  } else if (config.logger !== false) {
    logger2 = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap,
    };
  }
  const session = new BetterSQLiteSession(client, dialect, schema, { logger: logger2 });
  const db2 = new BetterSQLite3Database('sync', dialect, session, schema);
  db2.$client = client;
  return db2;
}
function drizzle(...params) {
  if (params[0] === void 0 || typeof params[0] === 'string') {
    const instance = params[0] === void 0 ? new Client() : new Client(params[0]);
    return construct(instance, params[1]);
  }
  if (isConfig(params[0])) {
    const { connection, client, ...drizzleConfig } = params[0];
    if (client) return construct(client, drizzleConfig);
    if (typeof connection === 'object') {
      const { source, ...options } = connection;
      const instance2 = new Client(source, options);
      return construct(instance2, drizzleConfig);
    }
    const instance = new Client(connection);
    return construct(instance, drizzleConfig);
  }
  return construct(params[0], params[1]);
}
((drizzle2) => {
  function mock(config) {
    return construct({}, config);
  }
  drizzle2.mock = mock;
})(drizzle || (drizzle = {}));
const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: text('status', { enum: ['todo', 'in_progress', 'done'] })
    .notNull()
    .default('todo'),
  priority: text('priority', { enum: ['low', 'medium', 'high'] })
    .notNull()
    .default('medium'),
  tags: text('tags', { mode: 'json' }).$type(),
  dueDate: integer('due_date', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
const providers = sqliteTable('providers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  npm: text('npm'),
  api: text('api'),
  doc: text('doc'),
  env: text('env', { mode: 'json' }).$type(),
  modelCount: integer('model_count').notNull().default(0),
  syncedAt: integer('synced_at', { mode: 'timestamp' }).notNull(),
});
const models = sqliteTable('models', {
  id: text('id').primaryKey(),
  providerId: text('provider_id').notNull(),
  modelId: text('model_id').notNull(),
  name: text('name').notNull(),
  family: text('family'),
  toolCall: integer('tool_call', { mode: 'boolean' }).notNull().default(false),
  attachment: integer('attachment', { mode: 'boolean' }).notNull().default(false),
  reasoning: integer('reasoning', { mode: 'boolean' }).notNull().default(false),
  temperature: integer('temperature', { mode: 'boolean' }).notNull().default(true),
  structuredOutput: integer('structured_output', { mode: 'boolean' }).notNull().default(false),
  knowledge: text('knowledge'),
  releaseDate: text('release_date'),
  lastUpdated: text('last_updated'),
  modalities: text('modalities', { mode: 'json' }),
  openWeights: integer('open_weights', { mode: 'boolean' }).notNull().default(false),
  costInput: real('cost_input'),
  costOutput: real('cost_output'),
  costCacheRead: real('cost_cache_read'),
  costCacheWrite: real('cost_cache_write'),
  contextLimit: integer('context_limit'),
  outputLimit: integer('output_limit'),
  inputLimit: integer('input_limit'),
});
const schemaModule = /* @__PURE__ */ Object.freeze(
  /* @__PURE__ */ Object.defineProperty(
    {
      __proto__: null,
      models,
      providers,
      tasks,
    },
    Symbol.toStringTag,
    { value: 'Module' }
  )
);
function ok(data) {
  return { ok: true, data };
}
function fail(code, message, details) {
  return { ok: false, error: { code, message, details } };
}
const ErrorCode = {
  VALIDATION_FAILED: 'VALIDATION_FAILED',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};
var util$1;
(function (util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x2) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== 'number');
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function (e) {
      return obj[e];
    });
  };
  util2.objectKeys =
    typeof Object.keys === 'function'
      ? (obj) => Object.keys(obj)
      : (object) => {
          const keys = [];
          for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              keys.push(key);
            }
          }
          return keys;
        };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item)) return item;
    }
    return void 0;
  };
  util2.isInteger =
    typeof Number.isInteger === 'function'
      ? (val) => Number.isInteger(val)
      : (val) => typeof val === 'number' && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = ' | ') {
    return array.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };
})(util$1 || (util$1 = {}));
var objectUtil$1;
(function (objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second,
      // second overwrites first
    };
  };
})(objectUtil$1 || (objectUtil$1 = {}));
const ZodParsedType$1 = util$1.arrayToEnum([
  'string',
  'nan',
  'number',
  'integer',
  'float',
  'boolean',
  'date',
  'bigint',
  'symbol',
  'function',
  'undefined',
  'null',
  'array',
  'object',
  'unknown',
  'promise',
  'void',
  'never',
  'map',
  'set',
]);
const getParsedType$1 = (data) => {
  const t = typeof data;
  switch (t) {
    case 'undefined':
      return ZodParsedType$1.undefined;
    case 'string':
      return ZodParsedType$1.string;
    case 'number':
      return Number.isNaN(data) ? ZodParsedType$1.nan : ZodParsedType$1.number;
    case 'boolean':
      return ZodParsedType$1.boolean;
    case 'function':
      return ZodParsedType$1.function;
    case 'bigint':
      return ZodParsedType$1.bigint;
    case 'symbol':
      return ZodParsedType$1.symbol;
    case 'object':
      if (Array.isArray(data)) {
        return ZodParsedType$1.array;
      }
      if (data === null) {
        return ZodParsedType$1.null;
      }
      if (
        data.then &&
        typeof data.then === 'function' &&
        data.catch &&
        typeof data.catch === 'function'
      ) {
        return ZodParsedType$1.promise;
      }
      if (typeof Map !== 'undefined' && data instanceof Map) {
        return ZodParsedType$1.map;
      }
      if (typeof Set !== 'undefined' && data instanceof Set) {
        return ZodParsedType$1.set;
      }
      if (typeof Date !== 'undefined' && data instanceof Date) {
        return ZodParsedType$1.date;
      }
      return ZodParsedType$1.object;
    default:
      return ZodParsedType$1.unknown;
  }
};
const ZodIssueCode$1 = util$1.arrayToEnum([
  'invalid_type',
  'invalid_literal',
  'custom',
  'invalid_union',
  'invalid_union_discriminator',
  'invalid_enum_value',
  'unrecognized_keys',
  'invalid_arguments',
  'invalid_return_type',
  'invalid_date',
  'invalid_string',
  'too_small',
  'too_big',
  'invalid_intersection_types',
  'not_multiple_of',
  'not_finite',
]);
let ZodError$1 = class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = 'ZodError';
    this.issues = issues;
  }
  format(_mapper) {
    const mapper =
      _mapper ||
      function (issue) {
        return issue.message;
      };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === 'invalid_union') {
          issue.unionErrors.map(processError);
        } else if (issue.code === 'invalid_return_type') {
          processError(issue.returnTypeError);
        } else if (issue.code === 'invalid_arguments') {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util$1.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError$1.create = (issues) => {
  const error = new ZodError$1(issues);
  return error;
};
const errorMap$1 = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode$1.invalid_type:
      if (issue.received === ZodParsedType$1.undefined) {
        message = 'Required';
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode$1.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util$1.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode$1.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util$1.joinValues(issue.keys, ', ')}`;
      break;
    case ZodIssueCode$1.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode$1.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util$1.joinValues(issue.options)}`;
      break;
    case ZodIssueCode$1.invalid_enum_value:
      message = `Invalid enum value. Expected ${util$1.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode$1.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode$1.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode$1.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode$1.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === 'number') {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ('startsWith' in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ('endsWith' in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util$1.assertNever(issue.validation);
        }
      } else if (issue.validation !== 'regex') {
        message = `Invalid ${issue.validation}`;
      } else {
        message = 'Invalid';
      }
      break;
    case ZodIssueCode$1.too_small:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === 'bigint')
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode$1.too_big:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'bigint')
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode$1.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode$1.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode$1.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode$1.not_finite:
      message = 'Number must be finite';
      break;
    default:
      message = _ctx.defaultError;
      util$1.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap$1 = errorMap$1;
function getErrorMap$1() {
  return overrideErrorMap$1;
}
const makeIssue$1 = (params) => {
  const { data, path: path2, errorMaps, issueData } = params;
  const fullPath = [...path2, ...(issueData.path || [])];
  const fullIssue = {
    ...issueData,
    path: fullPath,
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message,
    };
  }
  let errorMessage = '';
  const maps = errorMaps
    .filter((m) => !!m)
    .slice()
    .reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage,
  };
};
function addIssueToContext$1(ctx, issueData) {
  const overrideMap = getErrorMap$1();
  const issue = makeIssue$1({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap$1 ? void 0 : errorMap$1,
      // then global default map
    ].filter((x) => !!x),
  });
  ctx.common.issues.push(issue);
}
let ParseStatus$1 = class ParseStatus {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    if (this.value === 'valid') this.value = 'dirty';
  }
  abort() {
    if (this.value !== 'aborted') this.value = 'aborted';
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === 'aborted') return INVALID$1;
      if (s.status === 'dirty') status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value,
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === 'aborted') return INVALID$1;
      if (value.status === 'aborted') return INVALID$1;
      if (key.status === 'dirty') status.dirty();
      if (value.status === 'dirty') status.dirty();
      if (key.value !== '__proto__' && (typeof value.value !== 'undefined' || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
const INVALID$1 = Object.freeze({
  status: 'aborted',
});
const DIRTY$1 = (value) => ({ status: 'dirty', value });
const OK$1 = (value) => ({ status: 'valid', value });
const isAborted$1 = (x) => x.status === 'aborted';
const isDirty$1 = (x) => x.status === 'dirty';
const isValid$1 = (x) => x.status === 'valid';
const isAsync$1 = (x) => typeof Promise !== 'undefined' && x instanceof Promise;
var errorUtil$1;
(function (errorUtil2) {
  errorUtil2.errToObj = (message) => (typeof message === 'string' ? { message } : message || {});
  errorUtil2.toString = (message) =>
    typeof message === 'string' ? message : message == null ? void 0 : message.message;
})(errorUtil$1 || (errorUtil$1 = {}));
let ParseInputLazyPath$1 = class ParseInputLazyPath {
  constructor(parent, value, path2, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path2;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
const handleResult$1 = (ctx, result) => {
  if (isValid$1(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error('Validation failed but no issues detected.');
    }
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        const error = new ZodError$1(ctx.common.issues);
        this._error = error;
        return this._error;
      },
    };
  }
};
function processCreateParams$1(params) {
  if (!params) return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  }
  if (errorMap2) return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === 'invalid_enum_value') {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === 'undefined') {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== 'invalid_type') return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
let ZodType$1 = class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType$1(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return (
      ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType$1(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      }
    );
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus$1(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType$1(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      },
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync$1(result)) {
      throw new Error('Synchronous parse encountered promise.');
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: (params == null ? void 0 : params.async) ?? false,
        contextualErrorMap: params == null ? void 0 : params.errorMap,
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType$1(data),
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult$1(ctx, result);
  }
  '~validate'(data) {
    var _a2, _b2;
    const ctx = {
      common: {
        issues: [],
        async: !!this['~standard'].async,
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType$1(data),
    };
    if (!this['~standard'].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid$1(result)
          ? {
              value: result.value,
            }
          : {
              issues: ctx.common.issues,
            };
      } catch (err2) {
        if (
          (_b2 =
            (_a2 = err2 == null ? void 0 : err2.message) == null ? void 0 : _a2.toLowerCase()) ==
          null
            ? void 0
            : _b2.includes('encountered')
        ) {
          this['~standard'].async = true;
        }
        ctx.common = {
          issues: [],
          async: true,
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) =>
      isValid$1(result)
        ? {
            value: result.value,
          }
        : {
            issues: ctx.common.issues,
          }
    );
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params == null ? void 0 : params.errorMap,
        async: true,
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType$1(data),
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync$1(maybeAsyncResult)
      ? maybeAsyncResult
      : Promise.resolve(maybeAsyncResult));
    return handleResult$1(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === 'string' || typeof message === 'undefined') {
        return { message };
      } else if (typeof message === 'function') {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () =>
        ctx.addIssue({
          code: ZodIssueCode$1.custom,
          ...getIssueProperties(val),
        });
      if (typeof Promise !== 'undefined' && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(
          typeof refinementData === 'function' ? refinementData(val, ctx) : refinementData
        );
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects$1({
      schema: this,
      typeName: ZodFirstPartyTypeKind$1.ZodEffects,
      effect: { type: 'refinement', refinement },
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this['~standard'] = {
      version: 1,
      vendor: 'zod',
      validate: (data) => this['~validate'](data),
    };
  }
  optional() {
    return ZodOptional$1.create(this, this._def);
  }
  nullable() {
    return ZodNullable$1.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray$1.create(this);
  }
  promise() {
    return ZodPromise$1.create(this, this._def);
  }
  or(option) {
    return ZodUnion$1.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection$1.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects$1({
      ...processCreateParams$1(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind$1.ZodEffects,
      effect: { type: 'transform', transform },
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === 'function' ? def : () => def;
    return new ZodDefault$1({
      ...processCreateParams$1(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind$1.ZodDefault,
    });
  }
  brand() {
    return new ZodBranded$1({
      typeName: ZodFirstPartyTypeKind$1.ZodBranded,
      type: this,
      ...processCreateParams$1(this._def),
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === 'function' ? def : () => def;
    return new ZodCatch$1({
      ...processCreateParams$1(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind$1.ZodCatch,
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description,
    });
  }
  pipe(target) {
    return ZodPipeline$1.create(this, target);
  }
  readonly() {
    return ZodReadonly$1.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
const cuidRegex$1 = /^c[^\s-]{8,}$/i;
const cuid2Regex$1 = /^[0-9a-z]+$/;
const ulidRegex$1 = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex$1 =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex$1 = /^[a-z0-9_-]{21}$/i;
const jwtRegex$1 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex$1 =
  /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex$1 =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex$1 = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex$1;
const ipv4Regex$1 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex$1 =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex$1 =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex$1 =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex$1 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex$1 = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource$1 = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex$1 = new RegExp(`^${dateRegexSource$1}$`);
function timeRegexSource$1(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex$1(args) {
  return new RegExp(`^${timeRegexSource$1(args)}$`);
}
function datetimeRegex$1(args) {
  let regex = `${dateRegexSource$1}T${timeRegexSource$1(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join('|')})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP$1(ip, version2) {
  if ((version2 === 'v4' || !version2) && ipv4Regex$1.test(ip)) {
    return true;
  }
  if ((version2 === 'v6' || !version2) && ipv6Regex$1.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT$1(jwt, alg) {
  if (!jwtRegex$1.test(jwt)) return false;
  try {
    const [header] = jwt.split('.');
    if (!header) return false;
    const base64 = header
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(header.length + ((4 - (header.length % 4)) % 4), '=');
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== 'object' || decoded === null) return false;
    if ('typ' in decoded && (decoded == null ? void 0 : decoded.typ) !== 'JWT') return false;
    if (!decoded.alg) return false;
    if (alg && decoded.alg !== alg) return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr$1(ip, version2) {
  if ((version2 === 'v4' || !version2) && ipv4CidrRegex$1.test(ip)) {
    return true;
  }
  if ((version2 === 'v6' || !version2) && ipv6CidrRegex$1.test(ip)) {
    return true;
  }
  return false;
}
let ZodString$1 = class ZodString extends ZodType$1 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx2, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.string,
        received: ctx2.parsedType,
      });
      return INVALID$1;
    }
    const status = new ParseStatus$1();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_small,
            minimum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_big,
            maximum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'length') {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext$1(ctx, {
              code: ZodIssueCode$1.too_big,
              maximum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          } else if (tooSmall) {
            addIssueToContext$1(ctx, {
              code: ZodIssueCode$1.too_small,
              minimum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          }
          status.dirty();
        }
      } else if (check.kind === 'email') {
        if (!emailRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'email',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'emoji') {
        if (!emojiRegex$1) {
          emojiRegex$1 = new RegExp(_emojiRegex$1, 'u');
        }
        if (!emojiRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'emoji',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'uuid') {
        if (!uuidRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'uuid',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'nanoid') {
        if (!nanoidRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'nanoid',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid') {
        if (!cuidRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'cuid',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid2') {
        if (!cuid2Regex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'cuid2',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ulid') {
        if (!ulidRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'ulid',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'url') {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'url',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'regex') {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'regex',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'trim') {
        input.data = input.data.trim();
      } else if (check.kind === 'includes') {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'toLowerCase') {
        input.data = input.data.toLowerCase();
      } else if (check.kind === 'toUpperCase') {
        input.data = input.data.toUpperCase();
      } else if (check.kind === 'startsWith') {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: { startsWith: check.value },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'endsWith') {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: { endsWith: check.value },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'datetime') {
        const regex = datetimeRegex$1(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: 'datetime',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'date') {
        const regex = dateRegex$1;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: 'date',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'time') {
        const regex = timeRegex$1(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_string,
            validation: 'time',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'duration') {
        if (!durationRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'duration',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ip') {
        if (!isValidIP$1(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'ip',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'jwt') {
        if (!isValidJWT$1(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'jwt',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cidr') {
        if (!isValidCidr$1(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'cidr',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'base64') {
        if (!base64Regex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'base64',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'base64url') {
        if (!base64urlRegex$1.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            validation: 'base64url',
            code: ZodIssueCode$1.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode$1.invalid_string,
      ...errorUtil$1.errToObj(message),
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  email(message) {
    return this._addCheck({ kind: 'email', ...errorUtil$1.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: 'url', ...errorUtil$1.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: 'emoji', ...errorUtil$1.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: 'uuid', ...errorUtil$1.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: 'nanoid', ...errorUtil$1.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: 'cuid', ...errorUtil$1.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: 'cuid2', ...errorUtil$1.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: 'ulid', ...errorUtil$1.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: 'base64', ...errorUtil$1.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: 'base64url',
      ...errorUtil$1.errToObj(message),
    });
  }
  jwt(options) {
    return this._addCheck({ kind: 'jwt', ...errorUtil$1.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: 'ip', ...errorUtil$1.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: 'cidr', ...errorUtil$1.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === 'string') {
      return this._addCheck({
        kind: 'datetime',
        precision: null,
        offset: false,
        local: false,
        message: options,
      });
    }
    return this._addCheck({
      kind: 'datetime',
      precision:
        typeof (options == null ? void 0 : options.precision) === 'undefined'
          ? null
          : options == null
            ? void 0
            : options.precision,
      offset: (options == null ? void 0 : options.offset) ?? false,
      local: (options == null ? void 0 : options.local) ?? false,
      ...errorUtil$1.errToObj(options == null ? void 0 : options.message),
    });
  }
  date(message) {
    return this._addCheck({ kind: 'date', message });
  }
  time(options) {
    if (typeof options === 'string') {
      return this._addCheck({
        kind: 'time',
        precision: null,
        message: options,
      });
    }
    return this._addCheck({
      kind: 'time',
      precision:
        typeof (options == null ? void 0 : options.precision) === 'undefined'
          ? null
          : options == null
            ? void 0
            : options.precision,
      ...errorUtil$1.errToObj(options == null ? void 0 : options.message),
    });
  }
  duration(message) {
    return this._addCheck({ kind: 'duration', ...errorUtil$1.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: 'regex',
      regex,
      ...errorUtil$1.errToObj(message),
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: 'includes',
      value,
      position: options == null ? void 0 : options.position,
      ...errorUtil$1.errToObj(options == null ? void 0 : options.message),
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: 'startsWith',
      value,
      ...errorUtil$1.errToObj(message),
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: 'endsWith',
      value,
      ...errorUtil$1.errToObj(message),
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: 'min',
      value: minLength,
      ...errorUtil$1.errToObj(message),
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: 'max',
      value: maxLength,
      ...errorUtil$1.errToObj(message),
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: 'length',
      value: len,
      ...errorUtil$1.errToObj(message),
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil$1.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === 'base64url');
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
};
ZodString$1.create = (params) => {
  return new ZodString$1({
    checks: [],
    typeName: ZodFirstPartyTypeKind$1.ZodString,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams$1(params),
  });
};
function floatSafeRemainder$1(val, step) {
  const valDecCount = (val.toString().split('.')[1] || '').length;
  const stepDecCount = (step.toString().split('.')[1] || '').length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace('.', ''));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace('.', ''));
  return (valInt % stepInt) / 10 ** decCount;
}
let ZodNumber$1 = class ZodNumber extends ZodType$1 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx2, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.number,
        received: ctx2.parsedType,
      });
      return INVALID$1;
    }
    let ctx = void 0;
    const status = new ParseStatus$1();
    for (const check of this._def.checks) {
      if (check.kind === 'int') {
        if (!util$1.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.invalid_type,
            expected: 'integer',
            received: 'float',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_small,
            minimum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_big,
            maximum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if (floatSafeRemainder$1(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'finite') {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.not_finite,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit('min', value, true, errorUtil$1.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, errorUtil$1.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, errorUtil$1.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, errorUtil$1.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil$1.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  int(message) {
    return this._addCheck({
      kind: 'int',
      message: errorUtil$1.toString(message),
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: false,
      message: errorUtil$1.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: false,
      message: errorUtil$1.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: true,
      message: errorUtil$1.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: true,
      message: errorUtil$1.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value,
      message: errorUtil$1.toString(message),
    });
  }
  finite(message) {
    return this._addCheck({
      kind: 'finite',
      message: errorUtil$1.toString(message),
    });
  }
  safe(message) {
    return this._addCheck({
      kind: 'min',
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil$1.toString(message),
    })._addCheck({
      kind: 'max',
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil$1.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find(
      (ch) => ch.kind === 'int' || (ch.kind === 'multipleOf' && util$1.isInteger(ch.value))
    );
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'finite' || ch.kind === 'int' || ch.kind === 'multipleOf') {
        return true;
      } else if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      } else if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber$1.create = (params) => {
  return new ZodNumber$1({
    checks: [],
    typeName: ZodFirstPartyTypeKind$1.ZodNumber,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams$1(params),
  });
};
let ZodBigInt$1 = class ZodBigInt extends ZodType$1 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus$1();
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_small,
            type: 'bigint',
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_big,
            type: 'bigint',
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext$1(ctx, {
      code: ZodIssueCode$1.invalid_type,
      expected: ZodParsedType$1.bigint,
      received: ctx.parsedType,
    });
    return INVALID$1;
  }
  gte(value, message) {
    return this.setLimit('min', value, true, errorUtil$1.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, errorUtil$1.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, errorUtil$1.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, errorUtil$1.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil$1.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: false,
      message: errorUtil$1.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: false,
      message: errorUtil$1.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: true,
      message: errorUtil$1.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: true,
      message: errorUtil$1.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value,
      message: errorUtil$1.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt$1.create = (params) => {
  return new ZodBigInt$1({
    checks: [],
    typeName: ZodFirstPartyTypeKind$1.ZodBigInt,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams$1(params),
  });
};
let ZodBoolean$1 = class ZodBoolean extends ZodType$1 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.boolean,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
};
ZodBoolean$1.create = (params) => {
  return new ZodBoolean$1({
    typeName: ZodFirstPartyTypeKind$1.ZodBoolean,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams$1(params),
  });
};
let ZodDate$1 = class ZodDate extends ZodType$1 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx2, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.date,
        received: ctx2.parsedType,
      });
      return INVALID$1;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx2, {
        code: ZodIssueCode$1.invalid_date,
      });
      return INVALID$1;
    }
    const status = new ParseStatus$1();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else {
        util$1.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime()),
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: 'min',
      value: minDate.getTime(),
      message: errorUtil$1.toString(message),
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: 'max',
      value: maxDate.getTime(),
      message: errorUtil$1.toString(message),
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate$1.create = (params) => {
  return new ZodDate$1({
    checks: [],
    coerce: (params == null ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind$1.ZodDate,
    ...processCreateParams$1(params),
  });
};
let ZodSymbol$1 = class ZodSymbol extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.symbol,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
};
ZodSymbol$1.create = (params) => {
  return new ZodSymbol$1({
    typeName: ZodFirstPartyTypeKind$1.ZodSymbol,
    ...processCreateParams$1(params),
  });
};
let ZodUndefined$1 = class ZodUndefined extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.undefined,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
};
ZodUndefined$1.create = (params) => {
  return new ZodUndefined$1({
    typeName: ZodFirstPartyTypeKind$1.ZodUndefined,
    ...processCreateParams$1(params),
  });
};
let ZodNull$1 = class ZodNull extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.null,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
};
ZodNull$1.create = (params) => {
  return new ZodNull$1({
    typeName: ZodFirstPartyTypeKind$1.ZodNull,
    ...processCreateParams$1(params),
  });
};
let ZodAny$1 = class ZodAny extends ZodType$1 {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK$1(input.data);
  }
};
ZodAny$1.create = (params) => {
  return new ZodAny$1({
    typeName: ZodFirstPartyTypeKind$1.ZodAny,
    ...processCreateParams$1(params),
  });
};
let ZodUnknown$1 = class ZodUnknown extends ZodType$1 {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK$1(input.data);
  }
};
ZodUnknown$1.create = (params) => {
  return new ZodUnknown$1({
    typeName: ZodFirstPartyTypeKind$1.ZodUnknown,
    ...processCreateParams$1(params),
  });
};
let ZodNever$1 = class ZodNever extends ZodType$1 {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext$1(ctx, {
      code: ZodIssueCode$1.invalid_type,
      expected: ZodParsedType$1.never,
      received: ctx.parsedType,
    });
    return INVALID$1;
  }
};
ZodNever$1.create = (params) => {
  return new ZodNever$1({
    typeName: ZodFirstPartyTypeKind$1.ZodNever,
    ...processCreateParams$1(params),
  });
};
let ZodVoid$1 = class ZodVoid extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.void,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
};
ZodVoid$1.create = (params) => {
  return new ZodVoid$1({
    typeName: ZodFirstPartyTypeKind$1.ZodVoid,
    ...processCreateParams$1(params),
  });
};
let ZodArray$1 = class ZodArray extends ZodType$1 {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType$1.array) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.array,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext$1(ctx, {
          code: tooBig ? ZodIssueCode$1.too_big : ZodIssueCode$1.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: 'array',
          inclusive: true,
          exact: true,
          message: def.exactLength.message,
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext$1(ctx, {
          code: ZodIssueCode$1.too_small,
          minimum: def.minLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.minLength.message,
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext$1(ctx, {
          code: ZodIssueCode$1.too_big,
          maximum: def.maxLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.maxLength.message,
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all(
        [...ctx.data].map((item, i) => {
          return def.type._parseAsync(new ParseInputLazyPath$1(ctx, item, ctx.path, i));
        })
      ).then((result2) => {
        return ParseStatus$1.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath$1(ctx, item, ctx.path, i));
    });
    return ParseStatus$1.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil$1.toString(message) },
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil$1.toString(message) },
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil$1.toString(message) },
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray$1.create = (schema, params) => {
  return new ZodArray$1({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind$1.ZodArray,
    ...processCreateParams$1(params),
  });
};
function deepPartialify$1(schema) {
  if (schema instanceof ZodObject$1) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional$1.create(deepPartialify$1(fieldSchema));
    }
    return new ZodObject$1({
      ...schema._def,
      shape: () => newShape,
    });
  } else if (schema instanceof ZodArray$1) {
    return new ZodArray$1({
      ...schema._def,
      type: deepPartialify$1(schema.element),
    });
  } else if (schema instanceof ZodOptional$1) {
    return ZodOptional$1.create(deepPartialify$1(schema.unwrap()));
  } else if (schema instanceof ZodNullable$1) {
    return ZodNullable$1.create(deepPartialify$1(schema.unwrap()));
  } else if (schema instanceof ZodTuple$1) {
    return ZodTuple$1.create(schema.items.map((item) => deepPartialify$1(item)));
  } else {
    return schema;
  }
}
let ZodObject$1 = class ZodObject extends ZodType$1 {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const shape = this._def.shape();
    const keys = util$1.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx2, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.object,
        received: ctx2.parsedType,
      });
      return INVALID$1;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever$1 && this._def.unknownKeys === 'strip')) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: 'valid', value: key },
        value: keyValidator._parse(new ParseInputLazyPath$1(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data,
      });
    }
    if (this._def.catchall instanceof ZodNever$1) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === 'passthrough') {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: 'valid', value: key },
            value: { status: 'valid', value: ctx.data[key] },
          });
        }
      } else if (unknownKeys === 'strict') {
        if (extraKeys.length > 0) {
          addIssueToContext$1(ctx, {
            code: ZodIssueCode$1.unrecognized_keys,
            keys: extraKeys,
          });
          status.dirty();
        }
      } else if (unknownKeys === 'strip');
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: 'valid', value: key },
          value: catchall._parse(
            new ParseInputLazyPath$1(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data,
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve()
        .then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet,
            });
          }
          return syncPairs;
        })
        .then((syncPairs) => {
          return ParseStatus$1.mergeObjectSync(status, syncPairs);
        });
    } else {
      return ParseStatus$1.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil$1.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: 'strict',
      ...(message !== void 0
        ? {
            errorMap: (issue, ctx) => {
              var _a2, _b2;
              const defaultError =
                ((_b2 = (_a2 = this._def).errorMap) == null
                  ? void 0
                  : _b2.call(_a2, issue, ctx).message) ?? ctx.defaultError;
              if (issue.code === 'unrecognized_keys')
                return {
                  message: errorUtil$1.errToObj(message).message ?? defaultError,
                };
              return {
                message: defaultError,
              };
            },
          }
        : {}),
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: 'strip',
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: 'passthrough',
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation,
      }),
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape(),
      }),
      typeName: ZodFirstPartyTypeKind$1.ZodObject,
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index,
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util$1.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape,
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape,
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify$1(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape,
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util$1.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional$1) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape,
    });
  }
  keyof() {
    return createZodEnum$1(util$1.objectKeys(this.shape));
  }
};
ZodObject$1.create = (shape, params) => {
  return new ZodObject$1({
    shape: () => shape,
    unknownKeys: 'strip',
    catchall: ZodNever$1.create(),
    typeName: ZodFirstPartyTypeKind$1.ZodObject,
    ...processCreateParams$1(params),
  });
};
ZodObject$1.strictCreate = (shape, params) => {
  return new ZodObject$1({
    shape: () => shape,
    unknownKeys: 'strict',
    catchall: ZodNever$1.create(),
    typeName: ZodFirstPartyTypeKind$1.ZodObject,
    ...processCreateParams$1(params),
  });
};
ZodObject$1.lazycreate = (shape, params) => {
  return new ZodObject$1({
    shape,
    unknownKeys: 'strip',
    catchall: ZodNever$1.create(),
    typeName: ZodFirstPartyTypeKind$1.ZodObject,
    ...processCreateParams$1(params),
  });
};
let ZodUnion$1 = class ZodUnion extends ZodType$1 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === 'valid') {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === 'dirty') {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError$1(result.ctx.common.issues));
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_union,
        unionErrors,
      });
      return INVALID$1;
    }
    if (ctx.common.async) {
      return Promise.all(
        options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: [],
            },
            parent: null,
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx,
            }),
            ctx: childCtx,
          };
        })
      ).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: [],
          },
          parent: null,
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx,
        });
        if (result.status === 'valid') {
          return result;
        } else if (result.status === 'dirty' && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError$1(issues2));
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_union,
        unionErrors,
      });
      return INVALID$1;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion$1.create = (types, params) => {
  return new ZodUnion$1({
    options: types,
    typeName: ZodFirstPartyTypeKind$1.ZodUnion,
    ...processCreateParams$1(params),
  });
};
function mergeValues$1(a, b) {
  const aType = getParsedType$1(a);
  const bType = getParsedType$1(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType$1.object && bType === ZodParsedType$1.object) {
    const bKeys = util$1.objectKeys(b);
    const sharedKeys = util$1.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues$1(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType$1.array && bType === ZodParsedType$1.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues$1(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType$1.date && bType === ZodParsedType$1.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
let ZodIntersection$1 = class ZodIntersection extends ZodType$1 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted$1(parsedLeft) || isAborted$1(parsedRight)) {
        return INVALID$1;
      }
      const merged = mergeValues$1(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext$1(ctx, {
          code: ZodIssueCode$1.invalid_intersection_types,
        });
        return INVALID$1;
      }
      if (isDirty$1(parsedLeft) || isDirty$1(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(
        this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        })
      );
    }
  }
};
ZodIntersection$1.create = (left, right, params) => {
  return new ZodIntersection$1({
    left,
    right,
    typeName: ZodFirstPartyTypeKind$1.ZodIntersection,
    ...processCreateParams$1(params),
  });
};
let ZodTuple$1 = class ZodTuple extends ZodType$1 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType$1.array) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.array,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      return INVALID$1;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      status.dirty();
    }
    const items = [...ctx.data]
      .map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema) return null;
        return schema._parse(new ParseInputLazyPath$1(ctx, item, ctx.path, itemIndex));
      })
      .filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus$1.mergeArray(status, results);
      });
    } else {
      return ParseStatus$1.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest,
    });
  }
};
ZodTuple$1.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  }
  return new ZodTuple$1({
    items: schemas,
    typeName: ZodFirstPartyTypeKind$1.ZodTuple,
    rest: null,
    ...processCreateParams$1(params),
  });
};
let ZodMap$1 = class ZodMap extends ZodType$1 {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType$1.map) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.map,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath$1(ctx, key, ctx.path, [index, 'key'])),
        value: valueType._parse(new ParseInputLazyPath$1(ctx, value, ctx.path, [index, 'value'])),
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === 'aborted' || value.status === 'aborted') {
            return INVALID$1;
          }
          if (key.status === 'dirty' || value.status === 'dirty') {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === 'aborted' || value.status === 'aborted') {
          return INVALID$1;
        }
        if (key.status === 'dirty' || value.status === 'dirty') {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap$1.create = (keyType, valueType, params) => {
  return new ZodMap$1({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind$1.ZodMap,
    ...processCreateParams$1(params),
  });
};
let ZodSet$1 = class ZodSet extends ZodType$1 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType$1.set) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.set,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext$1(ctx, {
          code: ZodIssueCode$1.too_small,
          minimum: def.minSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.minSize.message,
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext$1(ctx, {
          code: ZodIssueCode$1.too_big,
          maximum: def.maxSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.maxSize.message,
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === 'aborted') return INVALID$1;
        if (element.status === 'dirty') status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) =>
      valueType._parse(new ParseInputLazyPath$1(ctx, item, ctx.path, i))
    );
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil$1.toString(message) },
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil$1.toString(message) },
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet$1.create = (valueType, params) => {
  return new ZodSet$1({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind$1.ZodSet,
    ...processCreateParams$1(params),
  });
};
let ZodLazy$1 = class ZodLazy extends ZodType$1 {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy$1.create = (getter, params) => {
  return new ZodLazy$1({
    getter,
    typeName: ZodFirstPartyTypeKind$1.ZodLazy,
    ...processCreateParams$1(params),
  });
};
let ZodLiteral$1 = class ZodLiteral extends ZodType$1 {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        received: ctx.data,
        code: ZodIssueCode$1.invalid_literal,
        expected: this._def.value,
      });
      return INVALID$1;
    }
    return { status: 'valid', value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral$1.create = (value, params) => {
  return new ZodLiteral$1({
    value,
    typeName: ZodFirstPartyTypeKind$1.ZodLiteral,
    ...processCreateParams$1(params),
  });
};
function createZodEnum$1(values, params) {
  return new ZodEnum$1({
    values,
    typeName: ZodFirstPartyTypeKind$1.ZodEnum,
    ...processCreateParams$1(params),
  });
}
let ZodEnum$1 = class ZodEnum extends ZodType$1 {
  _parse(input) {
    if (typeof input.data !== 'string') {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext$1(ctx, {
        expected: util$1.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode$1.invalid_type,
      });
      return INVALID$1;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext$1(ctx, {
        received: ctx.data,
        code: ZodIssueCode$1.invalid_enum_value,
        options: expectedValues,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef,
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(
      this.options.filter((opt) => !values.includes(opt)),
      {
        ...this._def,
        ...newDef,
      }
    );
  }
};
ZodEnum$1.create = createZodEnum$1;
let ZodNativeEnum$1 = class ZodNativeEnum extends ZodType$1 {
  _parse(input) {
    const nativeEnumValues = util$1.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType$1.string && ctx.parsedType !== ZodParsedType$1.number) {
      const expectedValues = util$1.objectValues(nativeEnumValues);
      addIssueToContext$1(ctx, {
        expected: util$1.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode$1.invalid_type,
      });
      return INVALID$1;
    }
    if (!this._cache) {
      this._cache = new Set(util$1.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util$1.objectValues(nativeEnumValues);
      addIssueToContext$1(ctx, {
        received: ctx.data,
        code: ZodIssueCode$1.invalid_enum_value,
        options: expectedValues,
      });
      return INVALID$1;
    }
    return OK$1(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum$1.create = (values, params) => {
  return new ZodNativeEnum$1({
    values,
    typeName: ZodFirstPartyTypeKind$1.ZodNativeEnum,
    ...processCreateParams$1(params),
  });
};
let ZodPromise$1 = class ZodPromise extends ZodType$1 {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType$1.promise && ctx.common.async === false) {
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.promise,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    const promisified =
      ctx.parsedType === ZodParsedType$1.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK$1(
      promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap,
        });
      })
    );
  }
};
ZodPromise$1.create = (schema, params) => {
  return new ZodPromise$1({
    type: schema,
    typeName: ZodFirstPartyTypeKind$1.ZodPromise,
    ...processCreateParams$1(params),
  });
};
let ZodEffects$1 = class ZodEffects extends ZodType$1 {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind$1.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext$1(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      },
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === 'preprocess') {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === 'aborted') return INVALID$1;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx,
          });
          if (result.status === 'aborted') return INVALID$1;
          if (result.status === 'dirty') return DIRTY$1(result.value);
          if (status.value === 'dirty') return DIRTY$1(result.value);
          return result;
        });
      } else {
        if (status.value === 'aborted') return INVALID$1;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx,
        });
        if (result.status === 'aborted') return INVALID$1;
        if (result.status === 'dirty') return DIRTY$1(result.value);
        if (status.value === 'dirty') return DIRTY$1(result.value);
        return result;
      }
    }
    if (effect.type === 'refinement') {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inner.status === 'aborted') return INVALID$1;
        if (inner.status === 'dirty') status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema
          ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
          .then((inner) => {
            if (inner.status === 'aborted') return INVALID$1;
            if (inner.status === 'dirty') status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
      }
    }
    if (effect.type === 'transform') {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (!isValid$1(base)) return INVALID$1;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(
            `Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`
          );
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema
          ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
          .then((base) => {
            if (!isValid$1(base)) return INVALID$1;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
              status: status.value,
              value: result,
            }));
          });
      }
    }
    util$1.assertNever(effect);
  }
};
ZodEffects$1.create = (schema, effect, params) => {
  return new ZodEffects$1({
    schema,
    typeName: ZodFirstPartyTypeKind$1.ZodEffects,
    effect,
    ...processCreateParams$1(params),
  });
};
ZodEffects$1.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects$1({
    schema,
    effect: { type: 'preprocess', transform: preprocess },
    typeName: ZodFirstPartyTypeKind$1.ZodEffects,
    ...processCreateParams$1(params),
  });
};
let ZodOptional$1 = class ZodOptional extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType$1.undefined) {
      return OK$1(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional$1.create = (type, params) => {
  return new ZodOptional$1({
    innerType: type,
    typeName: ZodFirstPartyTypeKind$1.ZodOptional,
    ...processCreateParams$1(params),
  });
};
let ZodNullable$1 = class ZodNullable extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType$1.null) {
      return OK$1(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable$1.create = (type, params) => {
  return new ZodNullable$1({
    innerType: type,
    typeName: ZodFirstPartyTypeKind$1.ZodNullable,
    ...processCreateParams$1(params),
  });
};
let ZodDefault$1 = class ZodDefault extends ZodType$1 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType$1.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx,
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault$1.create = (type, params) => {
  return new ZodDefault$1({
    innerType: type,
    typeName: ZodFirstPartyTypeKind$1.ZodDefault,
    defaultValue: typeof params.default === 'function' ? params.default : () => params.default,
    ...processCreateParams$1(params),
  });
};
let ZodCatch$1 = class ZodCatch extends ZodType$1 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: [],
      },
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx,
      },
    });
    if (isAsync$1(result)) {
      return result.then((result2) => {
        return {
          status: 'valid',
          value:
            result2.status === 'valid'
              ? result2.value
              : this._def.catchValue({
                  get error() {
                    return new ZodError$1(newCtx.common.issues);
                  },
                  input: newCtx.data,
                }),
        };
      });
    } else {
      return {
        status: 'valid',
        value:
          result.status === 'valid'
            ? result.value
            : this._def.catchValue({
                get error() {
                  return new ZodError$1(newCtx.common.issues);
                },
                input: newCtx.data,
              }),
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch$1.create = (type, params) => {
  return new ZodCatch$1({
    innerType: type,
    typeName: ZodFirstPartyTypeKind$1.ZodCatch,
    catchValue: typeof params.catch === 'function' ? params.catch : () => params.catch,
    ...processCreateParams$1(params),
  });
};
let ZodNaN$1 = class ZodNaN extends ZodType$1 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType$1.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext$1(ctx, {
        code: ZodIssueCode$1.invalid_type,
        expected: ZodParsedType$1.nan,
        received: ctx.parsedType,
      });
      return INVALID$1;
    }
    return { status: 'valid', value: input.data };
  }
};
ZodNaN$1.create = (params) => {
  return new ZodNaN$1({
    typeName: ZodFirstPartyTypeKind$1.ZodNaN,
    ...processCreateParams$1(params),
  });
};
let ZodBranded$1 = class ZodBranded extends ZodType$1 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx,
    });
  }
  unwrap() {
    return this._def.type;
  }
};
let ZodPipeline$1 = class ZodPipeline extends ZodType$1 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inResult.status === 'aborted') return INVALID$1;
        if (inResult.status === 'dirty') {
          status.dirty();
          return DIRTY$1(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx,
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx,
      });
      if (inResult.status === 'aborted') return INVALID$1;
      if (inResult.status === 'dirty') {
        status.dirty();
        return {
          status: 'dirty',
          value: inResult.value,
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx,
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind$1.ZodPipeline,
    });
  }
};
let ZodReadonly$1 = class ZodReadonly extends ZodType$1 {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid$1(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync$1(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly$1.create = (type, params) => {
  return new ZodReadonly$1({
    innerType: type,
    typeName: ZodFirstPartyTypeKind$1.ZodReadonly,
    ...processCreateParams$1(params),
  });
};
var ZodFirstPartyTypeKind$1;
(function (ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2['ZodString'] = 'ZodString';
  ZodFirstPartyTypeKind2['ZodNumber'] = 'ZodNumber';
  ZodFirstPartyTypeKind2['ZodNaN'] = 'ZodNaN';
  ZodFirstPartyTypeKind2['ZodBigInt'] = 'ZodBigInt';
  ZodFirstPartyTypeKind2['ZodBoolean'] = 'ZodBoolean';
  ZodFirstPartyTypeKind2['ZodDate'] = 'ZodDate';
  ZodFirstPartyTypeKind2['ZodSymbol'] = 'ZodSymbol';
  ZodFirstPartyTypeKind2['ZodUndefined'] = 'ZodUndefined';
  ZodFirstPartyTypeKind2['ZodNull'] = 'ZodNull';
  ZodFirstPartyTypeKind2['ZodAny'] = 'ZodAny';
  ZodFirstPartyTypeKind2['ZodUnknown'] = 'ZodUnknown';
  ZodFirstPartyTypeKind2['ZodNever'] = 'ZodNever';
  ZodFirstPartyTypeKind2['ZodVoid'] = 'ZodVoid';
  ZodFirstPartyTypeKind2['ZodArray'] = 'ZodArray';
  ZodFirstPartyTypeKind2['ZodObject'] = 'ZodObject';
  ZodFirstPartyTypeKind2['ZodUnion'] = 'ZodUnion';
  ZodFirstPartyTypeKind2['ZodDiscriminatedUnion'] = 'ZodDiscriminatedUnion';
  ZodFirstPartyTypeKind2['ZodIntersection'] = 'ZodIntersection';
  ZodFirstPartyTypeKind2['ZodTuple'] = 'ZodTuple';
  ZodFirstPartyTypeKind2['ZodRecord'] = 'ZodRecord';
  ZodFirstPartyTypeKind2['ZodMap'] = 'ZodMap';
  ZodFirstPartyTypeKind2['ZodSet'] = 'ZodSet';
  ZodFirstPartyTypeKind2['ZodFunction'] = 'ZodFunction';
  ZodFirstPartyTypeKind2['ZodLazy'] = 'ZodLazy';
  ZodFirstPartyTypeKind2['ZodLiteral'] = 'ZodLiteral';
  ZodFirstPartyTypeKind2['ZodEnum'] = 'ZodEnum';
  ZodFirstPartyTypeKind2['ZodEffects'] = 'ZodEffects';
  ZodFirstPartyTypeKind2['ZodNativeEnum'] = 'ZodNativeEnum';
  ZodFirstPartyTypeKind2['ZodOptional'] = 'ZodOptional';
  ZodFirstPartyTypeKind2['ZodNullable'] = 'ZodNullable';
  ZodFirstPartyTypeKind2['ZodDefault'] = 'ZodDefault';
  ZodFirstPartyTypeKind2['ZodCatch'] = 'ZodCatch';
  ZodFirstPartyTypeKind2['ZodPromise'] = 'ZodPromise';
  ZodFirstPartyTypeKind2['ZodBranded'] = 'ZodBranded';
  ZodFirstPartyTypeKind2['ZodPipeline'] = 'ZodPipeline';
  ZodFirstPartyTypeKind2['ZodReadonly'] = 'ZodReadonly';
})(ZodFirstPartyTypeKind$1 || (ZodFirstPartyTypeKind$1 = {}));
const stringType$1 = ZodString$1.create;
ZodNumber$1.create;
ZodBigInt$1.create;
ZodBoolean$1.create;
const dateType = ZodDate$1.create;
ZodNever$1.create;
const arrayType = ZodArray$1.create;
const objectType$1 = ZodObject$1.create;
const unionType = ZodUnion$1.create;
ZodIntersection$1.create;
ZodTuple$1.create;
const literalType = ZodLiteral$1.create;
const enumType$1 = ZodEnum$1.create;
ZodPromise$1.create;
ZodOptional$1.create;
ZodNullable$1.create;
const preprocessType = ZodEffects$1.createWithPreprocess;
const coerce$1 = {
  string: (arg) => ZodString$1.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber$1.create({ ...arg, coerce: true }),
  boolean: (arg) =>
    ZodBoolean$1.create({
      ...arg,
      coerce: true,
    }),
  bigint: (arg) => ZodBigInt$1.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate$1.create({ ...arg, coerce: true }),
};
const TaskStatus = enumType$1(['todo', 'in_progress', 'done']);
const TaskPriority = enumType$1(['low', 'medium', 'high']);
objectType$1({
  id: stringType$1(),
  title: stringType$1().min(1),
  description: stringType$1().nullable(),
  status: TaskStatus.default('todo'),
  priority: TaskPriority.default('medium'),
  tags: arrayType(stringType$1()).nullable(),
  dueDate: dateType().nullable(),
  createdAt: dateType(),
  updatedAt: dateType(),
});
const DateInput = preprocessType(
  (val) => {
    if (val === void 0 || val === null) return null;
    return val;
  },
  unionType([coerce$1.date(), literalType(null)])
);
const CreateTaskInput = objectType$1({
  title: stringType$1().min(1),
  description: stringType$1().nullable().optional(),
  status: TaskStatus.default('todo').optional(),
  priority: TaskPriority.default('medium').optional(),
  tags: arrayType(stringType$1()).nullable().optional(),
  dueDate: DateInput.optional(),
});
const UpdateTaskInput = objectType$1({
  title: stringType$1().min(1).optional(),
  description: stringType$1().nullable().optional(),
  status: TaskStatus.optional(),
  priority: TaskPriority.optional(),
  tags: arrayType(stringType$1()).nullable().optional(),
  dueDate: DateInput.optional(),
});
const TaskListQuery = objectType$1({
  status: TaskStatus.optional(),
});
const DEFAULT_SERVER_PORT = 13001;
const APP_NAME = 'ai-app-starter';
const APP_VERSION = '1.0.0';
stringType$1().url();
function resolveDbPath(url) {
  if (url === ':memory:') {
    return ':memory:';
  }
  let path2 = url;
  if (path2.startsWith('file:')) {
    path2 = path2.slice(5);
  }
  if (path2.startsWith('~/')) {
    path2 = path2.replace('~', require$$0$1.homedir());
  }
  return path2;
}
function createDb(url) {
  const path2 = resolveDbPath(url);
  if (path2 !== ':memory:') {
    node_fs.mkdirSync(require$$2.dirname(path2), { recursive: true });
  }
  const sqlite2 = new Client(path2);
  const db2 = drizzle(sqlite2, { schema: schemaModule });
  return { db: db2, sqlite: sqlite2 };
}
`file:${require$$0$1.homedir()}/.${APP_NAME}/data/app.db`;
var compose = (middleware, onError, onNotFound) => {
  return (context, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;
      let res2;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = (i === middleware.length && next) || void 0;
      }
      if (handler) {
        try {
          res2 = await handler(context, () => dispatch(i + 1));
        } catch (err2) {
          if (err2 instanceof Error && onError) {
            context.error = err2;
            res2 = await onError(err2, context);
            isError = true;
          } else {
            throw err2;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res2 = await onNotFound(context);
        }
      }
      if (res2 && (context.finalized === false || isError)) {
        context.res = res2;
      }
      return context;
    }
  };
};
var HTTPException = class extends Error {
  /**
   * Creates an instance of `HTTPException`.
   * @param status - HTTP status code for the exception. Defaults to 500.
   * @param options - Additional options for the exception.
   */
  constructor(status = 500, options) {
    super(options == null ? void 0 : options.message, {
      cause: options == null ? void 0 : options.cause,
    });
    __publicField(this, 'res');
    __publicField(this, 'status');
    this.res = options == null ? void 0 : options.res;
    this.status = status;
  }
  /**
   * Returns the response object associated with the exception.
   * If a response object is not provided, a new response is created with the error message and status code.
   * @returns The response object.
   */
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers,
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status,
    });
  }
};
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get('Content-Type');
  if (
    (contentType == null ? void 0 : contentType.startsWith('multipart/form-data')) ||
    (contentType == null ? void 0 : contentType.startsWith('application/x-www-form-urlencoded'))
  ) {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith('[]');
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes('.');
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith('[]')) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split('.');
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (
        !nestedForm[key2] ||
        typeof nestedForm[key2] !== 'object' ||
        Array.isArray(nestedForm[key2]) ||
        nestedForm[key2] instanceof File
      ) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};
var splitPath = (path2) => {
  const paths = path2.split('/');
  if (paths[0] === '') {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path: path2 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path2);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path2) => {
  const groups = [];
  path2 = path2.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path2 };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next) => {
  if (label === '*') {
    return '*';
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] =
          next && next[0] !== ':' && next[0] !== '*'
            ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next})`)]
            : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf('/', url.indexOf(':') + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf('?', i);
      const hashIndex = url.indexOf('#', i);
      const end =
        queryIndex === -1
          ? hashIndex === -1
            ? void 0
            : hashIndex
          : hashIndex === -1
            ? queryIndex
            : Math.min(queryIndex, hashIndex);
      const path2 = url.slice(start, end);
      return tryDecodeURI(path2.includes('%25') ? path2.replace(/%25/g, '%2525') : path2);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === '/' ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${(base == null ? void 0 : base[0]) === '/' ? '' : '/'}${base}${sub === '/' ? '' : `${(base == null ? void 0 : base.at(-1)) === '/' ? '' : '/'}${(sub == null ? void 0 : sub[0]) === '/' ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path2) => {
  if (path2.charCodeAt(path2.length - 1) !== 63 || !path2.includes(':')) {
    return null;
  }
  const segments = path2.split('/');
  const results = [];
  let basePath = '';
  segments.forEach((segment) => {
    if (segment !== '' && !/\:/.test(segment)) {
      basePath += '/' + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === '') {
          results.push('/');
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace('?', '');
        basePath += '/' + optionalSegment;
        results.push(basePath);
      } else {
        basePath += '/' + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var _decodeURI = (value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf('+') !== -1) {
    value = value.replace(/\+/g, ' ');
  }
  return value.indexOf('%') !== -1 ? tryDecode(value, decodeURIComponent_) : value;
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf('?', 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf('&', valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return '';
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ?? (encoded = /[%+]/.test(url));
  let keyIndex = url.indexOf('?', 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf('&', keyIndex + 1);
    let valueIndex = url.indexOf('=', keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? (nextKeyIndex === -1 ? void 0 : nextKeyIndex) : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === '') {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = '';
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      results[name].push(value);
    } else {
      results[name] ?? (results[name] = value);
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;
var tryDecodeURIComponent = (str) => tryDecode(str, decodeURIComponent_);
var HonoRequest =
  ((_ac = class {
    constructor(request, path2 = '/', matchResult = [[]]) {
      __privateAdd(this, _HonoRequest_instances);
      /**
       * `.raw` can get the raw Request object.
       *
       * @see {@link https://hono.dev/docs/api/request#raw}
       *
       * @example
       * ```ts
       * // For Cloudflare Workers
       * app.post('/', async (c) => {
       *   const metadata = c.req.raw.cf?.hostMetadata?
       *   ...
       * })
       * ```
       */
      __publicField(this, 'raw');
      __privateAdd(this, _validatedData);
      // Short name of validatedData
      __privateAdd(this, _matchResult);
      __publicField(this, 'routeIndex', 0);
      /**
       * `.path` can get the pathname of the request.
       *
       * @see {@link https://hono.dev/docs/api/request#path}
       *
       * @example
       * ```ts
       * app.get('/about/me', (c) => {
       *   const pathname = c.req.path // `/about/me`
       * })
       * ```
       */
      __publicField(this, 'path');
      __publicField(this, 'bodyCache', {});
      __privateAdd(this, _cachedBody, (key) => {
        const { bodyCache, raw } = this;
        const cachedBody = bodyCache[key];
        if (cachedBody) {
          return cachedBody;
        }
        const anyCachedKey = Object.keys(bodyCache)[0];
        if (anyCachedKey) {
          return bodyCache[anyCachedKey].then((body) => {
            if (anyCachedKey === 'json') {
              body = JSON.stringify(body);
            }
            return new Response(body)[key]();
          });
        }
        return (bodyCache[key] = raw[key]());
      });
      this.raw = request;
      this.path = path2;
      __privateSet(this, _matchResult, matchResult);
      __privateSet(this, _validatedData, {});
    }
    param(key) {
      return key
        ? __privateMethod(this, _HonoRequest_instances, getDecodedParam_fn).call(this, key)
        : __privateMethod(this, _HonoRequest_instances, getAllDecodedParams_fn).call(this);
    }
    query(key) {
      return getQueryParam(this.url, key);
    }
    queries(key) {
      return getQueryParams(this.url, key);
    }
    header(name) {
      if (name) {
        return this.raw.headers.get(name) ?? void 0;
      }
      const headerData = {};
      this.raw.headers.forEach((value, key) => {
        headerData[key] = value;
      });
      return headerData;
    }
    async parseBody(options) {
      return parseBody(this, options);
    }
    /**
     * `.json()` can parse Request body of type `application/json`
     *
     * @see {@link https://hono.dev/docs/api/request#json}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.json()
     * })
     * ```
     */
    json() {
      return __privateGet(this, _cachedBody)
        .call(this, 'text')
        .then((text2) => JSON.parse(text2));
    }
    /**
     * `.text()` can parse Request body of type `text/plain`
     *
     * @see {@link https://hono.dev/docs/api/request#text}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.text()
     * })
     * ```
     */
    text() {
      return __privateGet(this, _cachedBody).call(this, 'text');
    }
    /**
     * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
     *
     * @see {@link https://hono.dev/docs/api/request#arraybuffer}
     *
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.arrayBuffer()
     * })
     * ```
     */
    arrayBuffer() {
      return __privateGet(this, _cachedBody).call(this, 'arrayBuffer');
    }
    /**
     * Parses the request body as a `Blob`.
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.blob();
     * });
     * ```
     * @see https://hono.dev/docs/api/request#blob
     */
    blob() {
      return __privateGet(this, _cachedBody).call(this, 'blob');
    }
    /**
     * Parses the request body as `FormData`.
     * @example
     * ```ts
     * app.post('/entry', async (c) => {
     *   const body = await c.req.formData();
     * });
     * ```
     * @see https://hono.dev/docs/api/request#formdata
     */
    formData() {
      return __privateGet(this, _cachedBody).call(this, 'formData');
    }
    /**
     * Adds validated data to the request.
     *
     * @param target - The target of the validation.
     * @param data - The validated data to add.
     */
    addValidatedData(target, data) {
      __privateGet(this, _validatedData)[target] = data;
    }
    valid(target) {
      return __privateGet(this, _validatedData)[target];
    }
    /**
     * `.url()` can get the request url strings.
     *
     * @see {@link https://hono.dev/docs/api/request#url}
     *
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const url = c.req.url // `http://localhost:8787/about/me`
     *   ...
     * })
     * ```
     */
    get url() {
      return this.raw.url;
    }
    /**
     * `.method()` can get the method name of the request.
     *
     * @see {@link https://hono.dev/docs/api/request#method}
     *
     * @example
     * ```ts
     * app.get('/about/me', (c) => {
     *   const method = c.req.method // `GET`
     * })
     * ```
     */
    get method() {
      return this.raw.method;
    }
    get [GET_MATCH_RESULT]() {
      return __privateGet(this, _matchResult);
    }
    /**
     * `.matchedRoutes()` can return a matched route in the handler
     *
     * @deprecated
     *
     * Use matchedRoutes helper defined in "hono/route" instead.
     *
     * @see {@link https://hono.dev/docs/api/request#matchedroutes}
     *
     * @example
     * ```ts
     * app.use('*', async function logger(c, next) {
     *   await next()
     *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
     *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
     *     console.log(
     *       method,
     *       ' ',
     *       path,
     *       ' '.repeat(Math.max(10 - path.length, 0)),
     *       name,
     *       i === c.req.routeIndex ? '<- respond from here' : ''
     *     )
     *   })
     * })
     * ```
     */
    get matchedRoutes() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route);
    }
    /**
     * `routePath()` can retrieve the path registered within the handler
     *
     * @deprecated
     *
     * Use routePath helper defined in "hono/route" instead.
     *
     * @see {@link https://hono.dev/docs/api/request#routepath}
     *
     * @example
     * ```ts
     * app.get('/posts/:id', (c) => {
     *   return c.json({ path: c.req.routePath })
     * })
     * ```
     */
    get routePath() {
      return __privateGet(this, _matchResult)[0].map(([[, route]]) => route)[this.routeIndex].path;
    }
  }),
  (_validatedData = new WeakMap()),
  (_matchResult = new WeakMap()),
  (_HonoRequest_instances = new WeakSet()),
  (getDecodedParam_fn = function (key) {
    const paramKey = __privateGet(this, _matchResult)[0][this.routeIndex][1][key];
    const param = __privateMethod(this, _HonoRequest_instances, getParamValue_fn).call(
      this,
      paramKey
    );
    return param && /\%/.test(param) ? tryDecodeURIComponent(param) : param;
  }),
  (getAllDecodedParams_fn = function () {
    const decoded = {};
    const keys = Object.keys(__privateGet(this, _matchResult)[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = __privateMethod(this, _HonoRequest_instances, getParamValue_fn).call(
        this,
        __privateGet(this, _matchResult)[0][this.routeIndex][1][key]
      );
      if (value !== void 0) {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }),
  (getParamValue_fn = function (paramKey) {
    return __privateGet(this, _matchResult)[1]
      ? __privateGet(this, _matchResult)[1][paramKey]
      : paramKey;
  }),
  (_cachedBody = new WeakMap()),
  _ac);
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === 'object' && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!(callbacks == null ? void 0 : callbacks.length)) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then((res2) =>
    Promise.all(
      res2.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  {
    return resStr;
  }
};
var TEXT_PLAIN = 'text/plain; charset=UTF-8';
var setDefaultContentType = (contentType, headers) => {
  return {
    'Content-Type': contentType,
    ...headers,
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context =
  ((_bc = class {
    /**
     * Creates an instance of the Context class.
     *
     * @param req - The Request object.
     * @param options - Optional configuration options for the context.
     */
    constructor(req2, options) {
      __privateAdd(this, _Context_instances);
      __privateAdd(this, _rawRequest);
      __privateAdd(this, _req);
      /**
       * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
       *
       * @see {@link https://hono.dev/docs/api/context#env}
       *
       * @example
       * ```ts
       * // Environment object for Cloudflare Workers
       * app.get('*', async c => {
       *   const counter = c.env.COUNTER
       * })
       * ```
       */
      __publicField(this, 'env', {});
      __privateAdd(this, _var);
      __publicField(this, 'finalized', false);
      /**
       * `.error` can get the error object from the middleware if the Handler throws an error.
       *
       * @see {@link https://hono.dev/docs/api/context#error}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   await next()
       *   if (c.error) {
       *     // do something...
       *   }
       * })
       * ```
       */
      __publicField(this, 'error');
      __privateAdd(this, _status);
      __privateAdd(this, _executionCtx);
      __privateAdd(this, _res);
      __privateAdd(this, _layout);
      __privateAdd(this, _renderer);
      __privateAdd(this, _notFoundHandler);
      __privateAdd(this, _preparedHeaders);
      __privateAdd(this, _matchResult2);
      __privateAdd(this, _path);
      /**
       * `.render()` can create a response within a layout.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   return c.render('Hello!')
       * })
       * ```
       */
      __publicField(this, 'render', (...args) => {
        __privateGet(this, _renderer) ??
          __privateSet(this, _renderer, (content) => this.html(content));
        return __privateGet(this, _renderer).call(this, ...args);
      });
      /**
       * Sets the layout for the response.
       *
       * @param layout - The layout to set.
       * @returns The layout function.
       */
      __publicField(this, 'setLayout', (layout) => __privateSet(this, _layout, layout));
      /**
       * Gets the current layout for the response.
       *
       * @returns The current layout function.
       */
      __publicField(this, 'getLayout', () => __privateGet(this, _layout));
      /**
       * `.setRenderer()` can set the layout in the custom middleware.
       *
       * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
       *
       * @example
       * ```tsx
       * app.use('*', async (c, next) => {
       *   c.setRenderer((content) => {
       *     return c.html(
       *       <html>
       *         <body>
       *           <p>{content}</p>
       *         </body>
       *       </html>
       *     )
       *   })
       *   await next()
       * })
       * ```
       */
      __publicField(this, 'setRenderer', (renderer) => {
        __privateSet(this, _renderer, renderer);
      });
      /**
       * `.header()` can set headers.
       *
       * @see {@link https://hono.dev/docs/api/context#header}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      __publicField(this, 'header', (name, value, options) => {
        if (this.finalized) {
          __privateSet(
            this,
            _res,
            createResponseInstance(__privateGet(this, _res).body, __privateGet(this, _res))
          );
        }
        const headers = __privateGet(this, _res)
          ? __privateGet(this, _res).headers
          : (__privateGet(this, _preparedHeaders) ??
            __privateSet(this, _preparedHeaders, new Headers()));
        if (value === void 0) {
          headers.delete(name);
        } else if (options == null ? void 0 : options.append) {
          headers.append(name, value);
        } else {
          headers.set(name, value);
        }
      });
      __publicField(this, 'status', (status) => {
        __privateSet(this, _status, status);
      });
      /**
       * `.set()` can set the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.use('*', async (c, next) => {
       *   c.set('message', 'Hono is hot!!')
       *   await next()
       * })
       * ```
       */
      __publicField(this, 'set', (key, value) => {
        __privateGet(this, _var) ?? __privateSet(this, _var, /* @__PURE__ */ new Map());
        __privateGet(this, _var).set(key, value);
      });
      /**
       * `.get()` can use the value specified by the key.
       *
       * @see {@link https://hono.dev/docs/api/context#set-get}
       *
       * @example
       * ```ts
       * app.get('/', (c) => {
       *   const message = c.get('message')
       *   return c.text(`The message is "${message}"`)
       * })
       * ```
       */
      __publicField(this, 'get', (key) => {
        return __privateGet(this, _var) ? __privateGet(this, _var).get(key) : void 0;
      });
      __publicField(this, 'newResponse', (...args) =>
        __privateMethod(this, _Context_instances, newResponse_fn).call(this, ...args)
      );
      /**
       * `.body()` can return the HTTP response.
       * You can set headers with `.header()` and set HTTP status code with `.status`.
       * This can also be set in `.text()`, `.json()` and so on.
       *
       * @see {@link https://hono.dev/docs/api/context#body}
       *
       * @example
       * ```ts
       * app.get('/welcome', (c) => {
       *   // Set headers
       *   c.header('X-Message', 'Hello!')
       *   c.header('Content-Type', 'text/plain')
       *   // Set HTTP status code
       *   c.status(201)
       *
       *   // Return the response body
       *   return c.body('Thank you for coming')
       * })
       * ```
       */
      __publicField(this, 'body', (data, arg, headers) =>
        __privateMethod(this, _Context_instances, newResponse_fn).call(this, data, arg, headers)
      );
      /**
       * `.text()` can render text as `Content-Type:text/plain`.
       *
       * @see {@link https://hono.dev/docs/api/context#text}
       *
       * @example
       * ```ts
       * app.get('/say', (c) => {
       *   return c.text('Hello!')
       * })
       * ```
       */
      __publicField(this, 'text', (text2, arg, headers) => {
        return !__privateGet(this, _preparedHeaders) &&
          !__privateGet(this, _status) &&
          !arg &&
          !headers &&
          !this.finalized
          ? new Response(text2)
          : __privateMethod(this, _Context_instances, newResponse_fn).call(
              this,
              text2,
              arg,
              setDefaultContentType(TEXT_PLAIN, headers)
            );
      });
      /**
       * `.json()` can render JSON as `Content-Type:application/json`.
       *
       * @see {@link https://hono.dev/docs/api/context#json}
       *
       * @example
       * ```ts
       * app.get('/api', (c) => {
       *   return c.json({ message: 'Hello!' })
       * })
       * ```
       */
      __publicField(this, 'json', (object, arg, headers) => {
        return __privateMethod(this, _Context_instances, newResponse_fn).call(
          this,
          JSON.stringify(object),
          arg,
          setDefaultContentType('application/json', headers)
        );
      });
      __publicField(this, 'html', (html, arg, headers) => {
        const res2 = (html2) =>
          __privateMethod(this, _Context_instances, newResponse_fn).call(
            this,
            html2,
            arg,
            setDefaultContentType('text/html; charset=UTF-8', headers)
          );
        return typeof html === 'object'
          ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res2)
          : res2(html);
      });
      /**
       * `.redirect()` can Redirect, default status code is 302.
       *
       * @see {@link https://hono.dev/docs/api/context#redirect}
       *
       * @example
       * ```ts
       * app.get('/redirect', (c) => {
       *   return c.redirect('/')
       * })
       * app.get('/redirect-permanently', (c) => {
       *   return c.redirect('/', 301)
       * })
       * ```
       */
      __publicField(this, 'redirect', (location, status) => {
        const locationString = String(location);
        this.header(
          'Location',
          // Multibyes should be encoded
          // eslint-disable-next-line no-control-regex
          !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
        );
        return this.newResponse(null, status ?? 302);
      });
      /**
       * `.notFound()` can return the Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/context#notfound}
       *
       * @example
       * ```ts
       * app.get('/notfound', (c) => {
       *   return c.notFound()
       * })
       * ```
       */
      __publicField(this, 'notFound', () => {
        __privateGet(this, _notFoundHandler) ??
          __privateSet(this, _notFoundHandler, () => createResponseInstance());
        return __privateGet(this, _notFoundHandler).call(this, this);
      });
      __privateSet(this, _rawRequest, req2);
      if (options) {
        __privateSet(this, _executionCtx, options.executionCtx);
        this.env = options.env;
        __privateSet(this, _notFoundHandler, options.notFoundHandler);
        __privateSet(this, _path, options.path);
        __privateSet(this, _matchResult2, options.matchResult);
      }
    }
    /**
     * `.req` is the instance of {@link HonoRequest}.
     */
    get req() {
      __privateGet(this, _req) ??
        __privateSet(
          this,
          _req,
          new HonoRequest(
            __privateGet(this, _rawRequest),
            __privateGet(this, _path),
            __privateGet(this, _matchResult2)
          )
        );
      return __privateGet(this, _req);
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#event}
     * The FetchEvent associated with the current request.
     *
     * @throws Will throw an error if the context does not have a FetchEvent.
     */
    get event() {
      if (__privateGet(this, _executionCtx) && 'respondWith' in __privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error('This context has no FetchEvent');
      }
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#executionctx}
     * The ExecutionContext associated with the current request.
     *
     * @throws Will throw an error if the context does not have an ExecutionContext.
     */
    get executionCtx() {
      if (__privateGet(this, _executionCtx)) {
        return __privateGet(this, _executionCtx);
      } else {
        throw Error('This context has no ExecutionContext');
      }
    }
    /**
     * @see {@link https://hono.dev/docs/api/context#res}
     * The Response object for the current request.
     */
    get res() {
      return (
        __privateGet(this, _res) ||
        __privateSet(
          this,
          _res,
          createResponseInstance(null, {
            headers:
              __privateGet(this, _preparedHeaders) ??
              __privateSet(this, _preparedHeaders, new Headers()),
          })
        )
      );
    }
    /**
     * Sets the Response object for the current request.
     *
     * @param _res - The Response object to set.
     */
    set res(_res2) {
      if (__privateGet(this, _res) && _res2) {
        _res2 = createResponseInstance(_res2.body, _res2);
        for (const [k, v] of __privateGet(this, _res).headers.entries()) {
          if (k === 'content-type') {
            continue;
          }
          if (k === 'set-cookie') {
            const cookies = __privateGet(this, _res).headers.getSetCookie();
            _res2.headers.delete('set-cookie');
            for (const cookie of cookies) {
              _res2.headers.append('set-cookie', cookie);
            }
          } else {
            _res2.headers.set(k, v);
          }
        }
      }
      __privateSet(this, _res, _res2);
      this.finalized = true;
    }
    /**
     * `.var` can access the value of a variable.
     *
     * @see {@link https://hono.dev/docs/api/context#var}
     *
     * @example
     * ```ts
     * const result = c.var.client.oneMethod()
     * ```
     */
    // c.var.propName is a read-only
    get var() {
      if (!__privateGet(this, _var)) {
        return {};
      }
      return Object.fromEntries(__privateGet(this, _var));
    }
  }),
  (_rawRequest = new WeakMap()),
  (_req = new WeakMap()),
  (_var = new WeakMap()),
  (_status = new WeakMap()),
  (_executionCtx = new WeakMap()),
  (_res = new WeakMap()),
  (_layout = new WeakMap()),
  (_renderer = new WeakMap()),
  (_notFoundHandler = new WeakMap()),
  (_preparedHeaders = new WeakMap()),
  (_matchResult2 = new WeakMap()),
  (_path = new WeakMap()),
  (_Context_instances = new WeakSet()),
  (newResponse_fn = function (data, arg, headers) {
    const responseHeaders = __privateGet(this, _res)
      ? new Headers(__privateGet(this, _res).headers)
      : (__privateGet(this, _preparedHeaders) ?? new Headers());
    if (typeof arg === 'object' && 'headers' in arg) {
      const argHeaders = arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);
      for (const [key, value] of argHeaders) {
        if (key.toLowerCase() === 'set-cookie') {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === 'string') {
          responseHeaders.set(k, v);
        } else {
          responseHeaders.delete(k);
          for (const v2 of v) {
            responseHeaders.append(k, v2);
          }
        }
      }
    }
    const status =
      typeof arg === 'number'
        ? arg
        : ((arg == null ? void 0 : arg.status) ?? __privateGet(this, _status));
    return createResponseInstance(data, { status, headers: responseHeaders });
  }),
  _bc);
var METHOD_NAME_ALL = 'ALL';
var METHOD_NAME_ALL_LOWERCASE = 'all';
var METHODS = ['get', 'post', 'put', 'delete', 'options', 'patch'];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = 'Can not add a route since the matcher is already built.';
var UnsupportedPathError = class extends Error {};
var COMPOSED_HANDLER = '__COMPOSED_HANDLER';
var notFoundHandler = (c) => {
  return c.text('404 Not Found', 404);
};
var errorHandler$1 = (err2, c) => {
  if ('getResponse' in err2) {
    const res2 = err2.getResponse();
    return c.newResponse(res2.body, res2);
  }
  console.error(err2);
  return c.text('Internal Server Error', 500);
};
var Hono$1 =
  ((_cc = class {
    constructor(options = {}) {
      __privateAdd(this, __Hono_instances);
      __publicField(this, 'get');
      __publicField(this, 'post');
      __publicField(this, 'put');
      __publicField(this, 'delete');
      __publicField(this, 'options');
      __publicField(this, 'patch');
      __publicField(this, 'all');
      __publicField(this, 'on');
      __publicField(this, 'use');
      /*
      This class is like an abstract class and does not have a router.
      To use it, inherit the class and implement router in the constructor.
    */
      __publicField(this, 'router');
      __publicField(this, 'getPath');
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      __publicField(this, '_basePath', '/');
      __privateAdd(this, _path2, '/');
      __publicField(this, 'routes', []);
      __privateAdd(this, _notFoundHandler2, notFoundHandler);
      // Cannot use `#` because it requires visibility at JavaScript runtime.
      __publicField(this, 'errorHandler', errorHandler$1);
      /**
       * `.onError()` handles an error and returns a customized Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#error-handling}
       *
       * @param {ErrorHandler} handler - request Handler for error
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.onError((err, c) => {
       *   console.error(`${err}`)
       *   return c.text('Custom Error Message', 500)
       * })
       * ```
       */
      __publicField(this, 'onError', (handler) => {
        this.errorHandler = handler;
        return this;
      });
      /**
       * `.notFound()` allows you to customize a Not Found Response.
       *
       * @see {@link https://hono.dev/docs/api/hono#not-found}
       *
       * @param {NotFoundHandler} handler - request handler for not-found
       * @returns {Hono} changed Hono instance
       *
       * @example
       * ```ts
       * app.notFound((c) => {
       *   return c.text('Custom 404 Message', 404)
       * })
       * ```
       */
      __publicField(this, 'notFound', (handler) => {
        __privateSet(this, _notFoundHandler2, handler);
        return this;
      });
      /**
       * `.fetch()` will be entry point of your app.
       *
       * @see {@link https://hono.dev/docs/api/hono#fetch}
       *
       * @param {Request} request - request Object of request
       * @param {Env} Env - env Object
       * @param {ExecutionContext} - context of execution
       * @returns {Response | Promise<Response>} response of request
       *
       */
      __publicField(this, 'fetch', (request, ...rest) => {
        return __privateMethod(this, __Hono_instances, dispatch_fn).call(
          this,
          request,
          rest[1],
          rest[0],
          request.method
        );
      });
      /**
       * `.request()` is a useful method for testing.
       * You can pass a URL or pathname to send a GET request.
       * app will return a Response object.
       * ```ts
       * test('GET /hello is ok', async () => {
       *   const res = await app.request('/hello')
       *   expect(res.status).toBe(200)
       * })
       * ```
       * @see https://hono.dev/docs/api/hono#request
       */
      __publicField(this, 'request', (input, requestInit, Env, executionCtx) => {
        if (input instanceof Request) {
          return this.fetch(
            requestInit ? new Request(input, requestInit) : input,
            Env,
            executionCtx
          );
        }
        input = input.toString();
        return this.fetch(
          new Request(
            /^https?:\/\//.test(input) ? input : `http://localhost${mergePath('/', input)}`,
            requestInit
          ),
          Env,
          executionCtx
        );
      });
      /**
       * `.fire()` automatically adds a global fetch event listener.
       * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
       * @deprecated
       * Use `fire` from `hono/service-worker` instead.
       * ```ts
       * import { Hono } from 'hono'
       * import { fire } from 'hono/service-worker'
       *
       * const app = new Hono()
       * // ...
       * fire(app)
       * ```
       * @see https://hono.dev/docs/api/hono#fire
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
       * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
       */
      __publicField(this, 'fire', () => {
        addEventListener('fetch', (event) => {
          event.respondWith(
            __privateMethod(this, __Hono_instances, dispatch_fn).call(
              this,
              event.request,
              event,
              void 0,
              event.request.method
            )
          );
        });
      });
      const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
      allMethods.forEach((method) => {
        this[method] = (args1, ...args) => {
          if (typeof args1 === 'string') {
            __privateSet(this, _path2, args1);
          } else {
            __privateMethod(this, __Hono_instances, addRoute_fn).call(
              this,
              method,
              __privateGet(this, _path2),
              args1
            );
          }
          args.forEach((handler) => {
            __privateMethod(this, __Hono_instances, addRoute_fn).call(
              this,
              method,
              __privateGet(this, _path2),
              handler
            );
          });
          return this;
        };
      });
      this.on = (method, path2, ...handlers) => {
        for (const p of [path2].flat()) {
          __privateSet(this, _path2, p);
          for (const m of [method].flat()) {
            handlers.map((handler) => {
              __privateMethod(this, __Hono_instances, addRoute_fn).call(
                this,
                m.toUpperCase(),
                __privateGet(this, _path2),
                handler
              );
            });
          }
        }
        return this;
      };
      this.use = (arg1, ...handlers) => {
        if (typeof arg1 === 'string') {
          __privateSet(this, _path2, arg1);
        } else {
          __privateSet(this, _path2, '*');
          handlers.unshift(arg1);
        }
        handlers.forEach((handler) => {
          __privateMethod(this, __Hono_instances, addRoute_fn).call(
            this,
            METHOD_NAME_ALL,
            __privateGet(this, _path2),
            handler
          );
        });
        return this;
      };
      const { strict, ...optionsWithoutStrict } = options;
      Object.assign(this, optionsWithoutStrict);
      this.getPath = (strict ?? true) ? (options.getPath ?? getPath) : getPathNoStrict;
    }
    /**
     * `.route()` allows grouping other Hono instance in routes.
     *
     * @see {@link https://hono.dev/docs/api/routing#grouping}
     *
     * @param {string} path - base Path
     * @param {Hono} app - other Hono instance
     * @returns {Hono} routed Hono instance
     *
     * @example
     * ```ts
     * const app = new Hono()
     * const app2 = new Hono()
     *
     * app2.get("/user", (c) => c.text("user"))
     * app.route("/api", app2) // GET /api/user
     * ```
     */
    route(path2, app) {
      const subApp = this.basePath(path2);
      app.routes.map((r) => {
        var _a2;
        let handler;
        if (app.errorHandler === errorHandler$1) {
          handler = r.handler;
        } else {
          handler = async (c, next) =>
            (await compose([], app.errorHandler)(c, () => r.handler(c, next))).res;
          handler[COMPOSED_HANDLER] = r.handler;
        }
        __privateMethod((_a2 = subApp), __Hono_instances, addRoute_fn).call(
          _a2,
          r.method,
          r.path,
          handler
        );
      });
      return this;
    }
    /**
     * `.basePath()` allows base paths to be specified.
     *
     * @see {@link https://hono.dev/docs/api/routing#base-path}
     *
     * @param {string} path - base Path
     * @returns {Hono} changed Hono instance
     *
     * @example
     * ```ts
     * const api = new Hono().basePath('/api')
     * ```
     */
    basePath(path2) {
      const subApp = __privateMethod(this, __Hono_instances, clone_fn).call(this);
      subApp._basePath = mergePath(this._basePath, path2);
      return subApp;
    }
    /**
     * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
     *
     * @see {@link https://hono.dev/docs/api/hono#mount}
     *
     * @param {string} path - base Path
     * @param {Function} applicationHandler - other Request Handler
     * @param {MountOptions} [options] - options of `.mount()`
     * @returns {Hono} mounted Hono instance
     *
     * @example
     * ```ts
     * import { Router as IttyRouter } from 'itty-router'
     * import { Hono } from 'hono'
     * // Create itty-router application
     * const ittyRouter = IttyRouter()
     * // GET /itty-router/hello
     * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
     *
     * const app = new Hono()
     * app.mount('/itty-router', ittyRouter.handle)
     * ```
     *
     * @example
     * ```ts
     * const app = new Hono()
     * // Send the request to another application without modification.
     * app.mount('/app', anotherApp, {
     *   replaceRequest: (req) => req,
     * })
     * ```
     */
    mount(path2, applicationHandler, options) {
      let replaceRequest;
      let optionHandler;
      if (options) {
        if (typeof options === 'function') {
          optionHandler = options;
        } else {
          optionHandler = options.optionHandler;
          if (options.replaceRequest === false) {
            replaceRequest = (request) => request;
          } else {
            replaceRequest = options.replaceRequest;
          }
        }
      }
      const getOptions = optionHandler
        ? (c) => {
            const options2 = optionHandler(c);
            return Array.isArray(options2) ? options2 : [options2];
          }
        : (c) => {
            let executionContext = void 0;
            try {
              executionContext = c.executionCtx;
            } catch {}
            return [c.env, executionContext];
          };
      replaceRequest ||
        (replaceRequest = (() => {
          const mergedPath = mergePath(this._basePath, path2);
          const pathPrefixLength = mergedPath === '/' ? 0 : mergedPath.length;
          return (request) => {
            const url = new URL(request.url);
            url.pathname = url.pathname.slice(pathPrefixLength) || '/';
            return new Request(url, request);
          };
        })());
      const handler = async (c, next) => {
        const res2 = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
        if (res2) {
          return res2;
        }
        await next();
      };
      __privateMethod(this, __Hono_instances, addRoute_fn).call(
        this,
        METHOD_NAME_ALL,
        mergePath(path2, '*'),
        handler
      );
      return this;
    }
  }),
  (_path2 = new WeakMap()),
  (__Hono_instances = new WeakSet()),
  (clone_fn = function () {
    const clone = new _cc({
      router: this.router,
      getPath: this.getPath,
    });
    clone.errorHandler = this.errorHandler;
    __privateSet(clone, _notFoundHandler2, __privateGet(this, _notFoundHandler2));
    clone.routes = this.routes;
    return clone;
  }),
  (_notFoundHandler2 = new WeakMap()),
  (addRoute_fn = function (method, path2, handler) {
    method = method.toUpperCase();
    path2 = mergePath(this._basePath, path2);
    const r = { basePath: this._basePath, path: path2, method, handler };
    this.router.add(method, path2, [handler, r]);
    this.routes.push(r);
  }),
  (handleError_fn = function (err2, c) {
    if (err2 instanceof Error) {
      return this.errorHandler(err2, c);
    }
    throw err2;
  }),
  (dispatch_fn = function (request, executionCtx, env2, method) {
    if (method === 'HEAD') {
      return (async () =>
        new Response(
          null,
          await __privateMethod(this, __Hono_instances, dispatch_fn).call(
            this,
            request,
            executionCtx,
            env2,
            'GET'
          )
        ))();
    }
    const path2 = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path2);
    const c = new Context(request, {
      path: path2,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: __privateGet(this, _notFoundHandler2),
    });
    if (matchResult[0].length === 1) {
      let res2;
      try {
        res2 = matchResult[0][0][0][0](c, async () => {
          c.res = await __privateGet(this, _notFoundHandler2).call(this, c);
        });
      } catch (err2) {
        return __privateMethod(this, __Hono_instances, handleError_fn).call(this, err2, c);
      }
      return res2 instanceof Promise
        ? res2
            .then(
              (resolved) =>
                resolved ||
                (c.finalized ? c.res : __privateGet(this, _notFoundHandler2).call(this, c))
            )
            .catch((err2) =>
              __privateMethod(this, __Hono_instances, handleError_fn).call(this, err2, c)
            )
        : (res2 ?? __privateGet(this, _notFoundHandler2).call(this, c));
    }
    const composed = compose(
      matchResult[0],
      this.errorHandler,
      __privateGet(this, _notFoundHandler2)
    );
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            'Context is not finalized. Did you forget to return a Response object or `await next()`?'
          );
        }
        return context.res;
      } catch (err2) {
        return __privateMethod(this, __Hono_instances, handleError_fn).call(this, err2, c);
      }
    })();
  }),
  _cc);
var emptyParam = [];
function match(method, path2) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf('', 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path2);
}
var LABEL_REG_EXP_STR = '[^/]+';
var ONLY_WILDCARD_REG_EXP_STR = '.*';
var TAIL_WILDCARD_REG_EXP_STR = '(?:|/.*)';
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set('.\\+*[^]$()');
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? (a < b ? -1 : 1) : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? (a < b ? -1 : 1) : b.length - a.length;
}
var Node$1 =
  ((_dc = class {
    constructor() {
      __privateAdd(this, _index);
      __privateAdd(this, _varIndex);
      __privateAdd(this, _children, /* @__PURE__ */ Object.create(null));
    }
    insert(tokens, index, paramMap, context, pathErrorCheckOnly) {
      if (tokens.length === 0) {
        if (__privateGet(this, _index) !== void 0) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        __privateSet(this, _index, index);
        return;
      }
      const [token, ...restTokens] = tokens;
      const pattern =
        token === '*'
          ? restTokens.length === 0
            ? ['', '', ONLY_WILDCARD_REG_EXP_STR]
            : ['', '', LABEL_REG_EXP_STR]
          : token === '/*'
            ? ['', '', TAIL_WILDCARD_REG_EXP_STR]
            : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let node;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === '.*') {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, '(?:');
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        node = __privateGet(this, _children)[regexpStr];
        if (!node) {
          if (
            Object.keys(__privateGet(this, _children)).some(
              (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )
          ) {
            throw PATH_ERROR;
          }
          if (pathErrorCheckOnly) {
            return;
          }
          node = __privateGet(this, _children)[regexpStr] = new _dc();
          if (name !== '') {
            __privateSet(node, _varIndex, context.varIndex++);
          }
        }
        if (!pathErrorCheckOnly && name !== '') {
          paramMap.push([name, __privateGet(node, _varIndex)]);
        }
      } else {
        node = __privateGet(this, _children)[token];
        if (!node) {
          if (
            Object.keys(__privateGet(this, _children)).some(
              (k) =>
                k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
            )
          ) {
            throw PATH_ERROR;
          }
          if (pathErrorCheckOnly) {
            return;
          }
          node = __privateGet(this, _children)[token] = new _dc();
        }
      }
      node.insert(restTokens, index, paramMap, context, pathErrorCheckOnly);
    }
    buildRegExpStr() {
      const childKeys = Object.keys(__privateGet(this, _children)).sort(compareKey);
      const strList = childKeys.map((k) => {
        const c = __privateGet(this, _children)[k];
        return (
          (typeof __privateGet(c, _varIndex) === 'number'
            ? `(${k})@${__privateGet(c, _varIndex)}`
            : regExpMetaChars.has(k)
              ? `\\${k}`
              : k) + c.buildRegExpStr()
        );
      });
      if (typeof __privateGet(this, _index) === 'number') {
        strList.unshift(`#${__privateGet(this, _index)}`);
      }
      if (strList.length === 0) {
        return '';
      }
      if (strList.length === 1) {
        return strList[0];
      }
      return '(?:' + strList.join('|') + ')';
    }
  }),
  (_index = new WeakMap()),
  (_varIndex = new WeakMap()),
  (_children = new WeakMap()),
  _dc);
var Trie =
  ((_ec = class {
    constructor() {
      __privateAdd(this, _context, { varIndex: 0 });
      __privateAdd(this, _root, new Node$1());
    }
    insert(path2, index, pathErrorCheckOnly) {
      const paramAssoc = [];
      const groups = [];
      for (let i = 0; ; ) {
        let replaced = false;
        path2 = path2.replace(/\{[^}]+\}/g, (m) => {
          const mark = `@\\${i}`;
          groups[i] = [mark, m];
          i++;
          replaced = true;
          return mark;
        });
        if (!replaced) {
          break;
        }
      }
      const tokens = path2.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
      for (let i = groups.length - 1; i >= 0; i--) {
        const [mark] = groups[i];
        for (let j = tokens.length - 1; j >= 0; j--) {
          if (tokens[j].indexOf(mark) !== -1) {
            tokens[j] = tokens[j].replace(mark, groups[i][1]);
            break;
          }
        }
      }
      __privateGet(this, _root).insert(
        tokens,
        index,
        paramAssoc,
        __privateGet(this, _context),
        pathErrorCheckOnly
      );
      return paramAssoc;
    }
    buildRegExp() {
      let regexp = __privateGet(this, _root).buildRegExpStr();
      if (regexp === '') {
        return [/^$/, [], []];
      }
      let captureIndex = 0;
      const indexReplacementMap = [];
      const paramReplacementMap = [];
      regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
        if (handlerIndex !== void 0) {
          indexReplacementMap[++captureIndex] = Number(handlerIndex);
          return '$()';
        }
        if (paramIndex !== void 0) {
          paramReplacementMap[Number(paramIndex)] = ++captureIndex;
          return '';
        }
        return '';
      });
      return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
    }
  }),
  (_context = new WeakMap()),
  (_root = new WeakMap()),
  _ec);
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path2) {
  return (
    wildcardRegExpCache[path2] ??
    (wildcardRegExpCache[path2] = new RegExp(
      path2 === '*'
        ? ''
        : `^${path2.replace(/\/\*$|([.\\+*[^\]$()])/g, (_, metaChar) =>
            metaChar ? `\\${metaChar}` : '(?:|/.*)'
          )}$`
    ))
  );
}
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
function buildMatcherFromPreprocessedRoutes(routes) {
  var _a2;
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes
    .map((route) => [!/\*|\/:/.test(route[0]), ...route])
    .sort(([isStaticA, pathA], [isStaticB, pathB]) =>
      isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
    );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path2, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path2] = [
        handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]),
        emptyParam,
      ];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path2, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path2) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = (_a2 = handlerData[i][j]) == null ? void 0 : _a2[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
function findMiddleware(middleware, path2) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path2)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter =
  ((_fc = class {
    constructor() {
      __privateAdd(this, _RegExpRouter_instances);
      __publicField(this, 'name', 'RegExpRouter');
      __privateAdd(this, _middleware);
      __privateAdd(this, _routes);
      __publicField(this, 'match', match);
      __privateSet(this, _middleware, { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) });
      __privateSet(this, _routes, { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) });
    }
    add(method, path2, handler) {
      var _a2;
      const middleware = __privateGet(this, _middleware);
      const routes = __privateGet(this, _routes);
      if (!middleware || !routes) {
        throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
      }
      if (!middleware[method]) {
        [middleware, routes].forEach((handlerMap) => {
          handlerMap[method] = /* @__PURE__ */ Object.create(null);
          Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
            handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          });
        });
      }
      if (path2 === '/*') {
        path2 = '*';
      }
      const paramCount = (path2.match(/\/:/g) || []).length;
      if (/\*$/.test(path2)) {
        const re = buildWildcardRegExp(path2);
        if (method === METHOD_NAME_ALL) {
          Object.keys(middleware).forEach((m) => {
            var _a3;
            (_a3 = middleware[m])[path2] ||
              (_a3[path2] =
                findMiddleware(middleware[m], path2) ||
                findMiddleware(middleware[METHOD_NAME_ALL], path2) ||
                []);
          });
        } else {
          (_a2 = middleware[method])[path2] ||
            (_a2[path2] =
              findMiddleware(middleware[method], path2) ||
              findMiddleware(middleware[METHOD_NAME_ALL], path2) ||
              []);
        }
        Object.keys(middleware).forEach((m) => {
          if (method === METHOD_NAME_ALL || method === m) {
            Object.keys(middleware[m]).forEach((p) => {
              re.test(p) && middleware[m][p].push([handler, paramCount]);
            });
          }
        });
        Object.keys(routes).forEach((m) => {
          if (method === METHOD_NAME_ALL || method === m) {
            Object.keys(routes[m]).forEach(
              (p) => re.test(p) && routes[m][p].push([handler, paramCount])
            );
          }
        });
        return;
      }
      const paths = checkOptionalParameter(path2) || [path2];
      for (let i = 0, len = paths.length; i < len; i++) {
        const path22 = paths[i];
        Object.keys(routes).forEach((m) => {
          var _a3;
          if (method === METHOD_NAME_ALL || method === m) {
            (_a3 = routes[m])[path22] ||
              (_a3[path22] = [
                ...(findMiddleware(middleware[m], path22) ||
                  findMiddleware(middleware[METHOD_NAME_ALL], path22) ||
                  []),
              ]);
            routes[m][path22].push([handler, paramCount - len + i + 1]);
          }
        });
      }
    }
    buildAllMatchers() {
      const matchers = /* @__PURE__ */ Object.create(null);
      Object.keys(__privateGet(this, _routes))
        .concat(Object.keys(__privateGet(this, _middleware)))
        .forEach((method) => {
          matchers[method] ||
            (matchers[method] = __privateMethod(
              this,
              _RegExpRouter_instances,
              buildMatcher_fn
            ).call(this, method));
        });
      __privateSet(this, _middleware, __privateSet(this, _routes, void 0));
      clearWildcardRegExpCache();
      return matchers;
    }
  }),
  (_middleware = new WeakMap()),
  (_routes = new WeakMap()),
  (_RegExpRouter_instances = new WeakSet()),
  (buildMatcher_fn = function (method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [__privateGet(this, _middleware), __privateGet(this, _routes)].forEach((r) => {
      const ownRoute = r[method]
        ? Object.keys(r[method]).map((path2) => [path2, r[method][path2]])
        : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute || (hasOwnRoute = true);
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path2) => [path2, r[METHOD_NAME_ALL][path2]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }),
  _fc);
var SmartRouter =
  ((_gc = class {
    constructor(init) {
      __publicField(this, 'name', 'SmartRouter');
      __privateAdd(this, _routers, []);
      __privateAdd(this, _routes2, []);
      __privateSet(this, _routers, init.routers);
    }
    add(method, path2, handler) {
      if (!__privateGet(this, _routes2)) {
        throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
      }
      __privateGet(this, _routes2).push([method, path2, handler]);
    }
    match(method, path2) {
      if (!__privateGet(this, _routes2)) {
        throw new Error('Fatal error');
      }
      const routers = __privateGet(this, _routers);
      const routes = __privateGet(this, _routes2);
      const len = routers.length;
      let i = 0;
      let res2;
      for (; i < len; i++) {
        const router = routers[i];
        try {
          for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
            router.add(...routes[i2]);
          }
          res2 = router.match(method, path2);
        } catch (e) {
          if (e instanceof UnsupportedPathError) {
            continue;
          }
          throw e;
        }
        this.match = router.match.bind(router);
        __privateSet(this, _routers, [router]);
        __privateSet(this, _routes2, void 0);
        break;
      }
      if (i === len) {
        throw new Error('Fatal error');
      }
      this.name = `SmartRouter + ${this.activeRouter.name}`;
      return res2;
    }
    get activeRouter() {
      if (__privateGet(this, _routes2) || __privateGet(this, _routers).length !== 1) {
        throw new Error('No active router has been determined yet.');
      }
      return __privateGet(this, _routers)[0];
    }
  }),
  (_routers = new WeakMap()),
  (_routes2 = new WeakMap()),
  _gc);
var emptyParams = /* @__PURE__ */ Object.create(null);
var hasChildren = (children) => {
  for (const _ in children) {
    return true;
  }
  return false;
};
var Node =
  ((_hc = class {
    constructor(method, handler, children) {
      __privateAdd(this, __Node_instances);
      __privateAdd(this, _methods);
      __privateAdd(this, _children2);
      __privateAdd(this, _patterns);
      __privateAdd(this, _order, 0);
      __privateAdd(this, _params, emptyParams);
      __privateSet(this, _children2, children || /* @__PURE__ */ Object.create(null));
      __privateSet(this, _methods, []);
      if (method && handler) {
        const m = /* @__PURE__ */ Object.create(null);
        m[method] = { handler, possibleKeys: [], score: 0 };
        __privateSet(this, _methods, [m]);
      }
      __privateSet(this, _patterns, []);
    }
    insert(method, path2, handler) {
      __privateSet(this, _order, ++__privateWrapper(this, _order)._);
      let curNode = this;
      const parts = splitRoutingPath(path2);
      const possibleKeys = [];
      for (let i = 0, len = parts.length; i < len; i++) {
        const p = parts[i];
        const nextP = parts[i + 1];
        const pattern = getPattern(p, nextP);
        const key = Array.isArray(pattern) ? pattern[0] : p;
        if (key in __privateGet(curNode, _children2)) {
          curNode = __privateGet(curNode, _children2)[key];
          if (pattern) {
            possibleKeys.push(pattern[1]);
          }
          continue;
        }
        __privateGet(curNode, _children2)[key] = new _hc();
        if (pattern) {
          __privateGet(curNode, _patterns).push(pattern);
          possibleKeys.push(pattern[1]);
        }
        curNode = __privateGet(curNode, _children2)[key];
      }
      __privateGet(curNode, _methods).push({
        [method]: {
          handler,
          possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
          score: __privateGet(this, _order),
        },
      });
      return curNode;
    }
    search(method, path2) {
      var _a2;
      const handlerSets = [];
      __privateSet(this, _params, emptyParams);
      const curNode = this;
      let curNodes = [curNode];
      const parts = splitPath(path2);
      const curNodesQueue = [];
      const len = parts.length;
      let partOffsets = null;
      for (let i = 0; i < len; i++) {
        const part = parts[i];
        const isLast = i === len - 1;
        const tempNodes = [];
        for (let j = 0, len2 = curNodes.length; j < len2; j++) {
          const node = curNodes[j];
          const nextNode = __privateGet(node, _children2)[part];
          if (nextNode) {
            __privateSet(nextNode, _params, __privateGet(node, _params));
            if (isLast) {
              if (__privateGet(nextNode, _children2)['*']) {
                __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                  this,
                  handlerSets,
                  __privateGet(nextNode, _children2)['*'],
                  method,
                  __privateGet(node, _params)
                );
              }
              __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                this,
                handlerSets,
                nextNode,
                method,
                __privateGet(node, _params)
              );
            } else {
              tempNodes.push(nextNode);
            }
          }
          for (let k = 0, len3 = __privateGet(node, _patterns).length; k < len3; k++) {
            const pattern = __privateGet(node, _patterns)[k];
            const params =
              __privateGet(node, _params) === emptyParams ? {} : { ...__privateGet(node, _params) };
            if (pattern === '*') {
              const astNode = __privateGet(node, _children2)['*'];
              if (astNode) {
                __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                  this,
                  handlerSets,
                  astNode,
                  method,
                  __privateGet(node, _params)
                );
                __privateSet(astNode, _params, params);
                tempNodes.push(astNode);
              }
              continue;
            }
            const [key, name, matcher] = pattern;
            if (!part && !(matcher instanceof RegExp)) {
              continue;
            }
            const child = __privateGet(node, _children2)[key];
            if (matcher instanceof RegExp) {
              if (partOffsets === null) {
                partOffsets = new Array(len);
                let offset = path2[0] === '/' ? 1 : 0;
                for (let p = 0; p < len; p++) {
                  partOffsets[p] = offset;
                  offset += parts[p].length + 1;
                }
              }
              const restPathString = path2.substring(partOffsets[i]);
              const m = matcher.exec(restPathString);
              if (m) {
                params[name] = m[0];
                __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                  this,
                  handlerSets,
                  child,
                  method,
                  __privateGet(node, _params),
                  params
                );
                if (hasChildren(__privateGet(child, _children2))) {
                  __privateSet(child, _params, params);
                  const componentCount =
                    ((_a2 = m[0].match(/\//)) == null ? void 0 : _a2.length) ?? 0;
                  const targetCurNodes =
                    curNodesQueue[componentCount] || (curNodesQueue[componentCount] = []);
                  targetCurNodes.push(child);
                }
                continue;
              }
            }
            if (matcher === true || matcher.test(part)) {
              params[name] = part;
              if (isLast) {
                __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                  this,
                  handlerSets,
                  child,
                  method,
                  params,
                  __privateGet(node, _params)
                );
                if (__privateGet(child, _children2)['*']) {
                  __privateMethod(this, __Node_instances, pushHandlerSets_fn).call(
                    this,
                    handlerSets,
                    __privateGet(child, _children2)['*'],
                    method,
                    params,
                    __privateGet(node, _params)
                  );
                }
              } else {
                __privateSet(child, _params, params);
                tempNodes.push(child);
              }
            }
          }
        }
        const shifted = curNodesQueue.shift();
        curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
      }
      if (handlerSets.length > 1) {
        handlerSets.sort((a, b) => {
          return a.score - b.score;
        });
      }
      return [handlerSets.map(({ handler, params }) => [handler, params])];
    }
  }),
  (_methods = new WeakMap()),
  (_children2 = new WeakMap()),
  (_patterns = new WeakMap()),
  (_order = new WeakMap()),
  (_params = new WeakMap()),
  (__Node_instances = new WeakSet()),
  (pushHandlerSets_fn = function (handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = __privateGet(node, _methods).length; i < len; i++) {
      const m = __privateGet(node, _methods)[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || (params && params !== emptyParams)) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] =
              (params == null ? void 0 : params[key]) && !processed
                ? params[key]
                : (nodeParams[key] ?? (params == null ? void 0 : params[key]));
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
  }),
  _hc);
var TrieRouter =
  ((_ic = class {
    constructor() {
      __publicField(this, 'name', 'TrieRouter');
      __privateAdd(this, _node);
      __privateSet(this, _node, new Node());
    }
    add(method, path2, handler) {
      const results = checkOptionalParameter(path2);
      if (results) {
        for (let i = 0, len = results.length; i < len; i++) {
          __privateGet(this, _node).insert(method, results[i], handler);
        }
        return;
      }
      __privateGet(this, _node).insert(method, path2, handler);
    }
    match(method, path2) {
      return __privateGet(this, _node).search(method, path2);
    }
  }),
  (_node = new WeakMap()),
  _ic);
var Hono = class extends Hono$1 {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router =
      options.router ??
      new SmartRouter({
        routers: [new RegExpRouter(), new TrieRouter()],
      });
  }
};
const API_URL = 'https://models.dev/api.json';
const SYNC_INTERVAL_MS = 1e3 * 60 * 60;
async function fetchModelsDevData() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch models.dev: ${response.status}`);
  }
  return response.json();
}
async function syncModelsDevData(db2) {
  const data = await fetchModelsDevData();
  const now = /* @__PURE__ */ new Date();
  let providerCount = 0;
  let modelCount = 0;
  db2.transaction((tx) => {
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2;
    tx.delete(models).run();
    tx.delete(providers).run();
    for (const [providerId, providerData] of Object.entries(data)) {
      const modelEntries = Object.entries(providerData.models);
      tx.insert(providers)
        .values({
          id: providerId,
          name: providerData.name,
          npm: providerData.npm ?? null,
          api: providerData.api ?? null,
          doc: providerData.doc ?? null,
          env: providerData.env,
          modelCount: modelEntries.length,
          syncedAt: now,
        })
        .run();
      providerCount++;
      for (const [modelId, modelData] of modelEntries) {
        tx.insert(models)
          .values({
            id: `${providerId}:${modelId}`,
            providerId,
            modelId,
            name: modelData.name,
            family: modelData.family ?? null,
            toolCall: modelData.tool_call ?? false,
            attachment: modelData.attachment ?? false,
            reasoning: modelData.reasoning ?? false,
            temperature: modelData.temperature ?? true,
            structuredOutput: modelData.structured_output ?? false,
            knowledge: modelData.knowledge ?? null,
            releaseDate: modelData.release_date ?? null,
            lastUpdated: modelData.last_updated ?? null,
            modalities: modelData.modalities ? JSON.stringify(modelData.modalities) : null,
            openWeights: modelData.open_weights ?? false,
            costInput: ((_a2 = modelData.cost) == null ? void 0 : _a2.input) ?? null,
            costOutput: ((_b2 = modelData.cost) == null ? void 0 : _b2.output) ?? null,
            costCacheRead: ((_c2 = modelData.cost) == null ? void 0 : _c2.cache_read) ?? null,
            costCacheWrite: ((_d2 = modelData.cost) == null ? void 0 : _d2.cache_write) ?? null,
            contextLimit: ((_e2 = modelData.limit) == null ? void 0 : _e2.context) ?? null,
            outputLimit: ((_f2 = modelData.limit) == null ? void 0 : _f2.output) ?? null,
            inputLimit: ((_g2 = modelData.limit) == null ? void 0 : _g2.input) ?? null,
          })
          .run();
        modelCount++;
      }
    }
  });
  return { providers: providerCount, models: modelCount };
}
function startModelsSyncScheduler(db2, options = {}) {
  const intervalMs = options.intervalMs ?? SYNC_INTERVAL_MS;
  const onError =
    options.onError ??
    ((err2) => {
      const message = err2 instanceof Error ? err2.message : String(err2);
      console.error('models.dev sync failed:', message);
    });
  syncModelsDevData(db2).catch(onError);
  const interval = setInterval(() => {
    syncModelsDevData(db2).catch(onError);
  }, intervalMs);
  return () => clearInterval(interval);
}
var cors = (options) => {
  const defaults = {
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: [],
    exposeHeaders: [],
  };
  const opts = {
    ...defaults,
    ...options,
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === 'string') {
      if (optsOrigin === '*') {
        if (opts.credentials) {
          return (origin) => origin || null;
        }
        return () => optsOrigin;
      } else {
        return (origin) => (optsOrigin === origin ? origin : null);
      }
    } else if (typeof optsOrigin === 'function') {
      return optsOrigin;
    } else {
      return (origin) => (optsOrigin.includes(origin) ? origin : null);
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === 'function') {
      return optsAllowMethods;
    } else if (Array.isArray(optsAllowMethods)) {
      return () => optsAllowMethods;
    } else {
      return () => [];
    }
  })(opts.allowMethods);
  return async function cors2(c, next) {
    var _a2;
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header('origin') || '', c);
    if (allowOrigin) {
      set('Access-Control-Allow-Origin', allowOrigin);
    }
    if (opts.credentials) {
      set('Access-Control-Allow-Credentials', 'true');
    }
    if ((_a2 = opts.exposeHeaders) == null ? void 0 : _a2.length) {
      set('Access-Control-Expose-Headers', opts.exposeHeaders.join(','));
    }
    if (c.req.method === 'OPTIONS') {
      if (opts.origin !== '*' || opts.credentials) {
        set('Vary', 'Origin');
      }
      if (opts.maxAge != null) {
        set('Access-Control-Max-Age', opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header('origin') || '', c);
      if (allowMethods.length) {
        set('Access-Control-Allow-Methods', allowMethods.join(','));
      }
      let headers = opts.allowHeaders;
      if (!(headers == null ? void 0 : headers.length)) {
        const requestHeaders = c.req.header('Access-Control-Request-Headers');
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers == null ? void 0 : headers.length) {
        set('Access-Control-Allow-Headers', headers.join(','));
        c.res.headers.append('Vary', 'Access-Control-Request-Headers');
      }
      c.res.headers.delete('Content-Length');
      c.res.headers.delete('Content-Type');
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: 'No Content',
      });
    }
    await next();
    if (opts.origin !== '*' || opts.credentials) {
      c.header('Vary', 'Origin', { append: true });
    }
  };
};
var util;
(function (util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x2) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== 'number');
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function (e) {
      return obj[e];
    });
  };
  util2.objectKeys =
    typeof Object.keys === 'function'
      ? (obj) => Object.keys(obj)
      : (object) => {
          const keys = [];
          for (const key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
              keys.push(key);
            }
          }
          return keys;
        };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item)) return item;
    }
    return void 0;
  };
  util2.isInteger =
    typeof Number.isInteger === 'function'
      ? (val) => Number.isInteger(val)
      : (val) => typeof val === 'number' && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = ' | ') {
    return array.map((val) => (typeof val === 'string' ? `'${val}'` : val)).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function (objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second,
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  'string',
  'nan',
  'number',
  'integer',
  'float',
  'boolean',
  'date',
  'bigint',
  'symbol',
  'function',
  'undefined',
  'null',
  'array',
  'object',
  'unknown',
  'promise',
  'void',
  'never',
  'map',
  'set',
]);
const getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case 'undefined':
      return ZodParsedType.undefined;
    case 'string':
      return ZodParsedType.string;
    case 'number':
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case 'boolean':
      return ZodParsedType.boolean;
    case 'function':
      return ZodParsedType.function;
    case 'bigint':
      return ZodParsedType.bigint;
    case 'symbol':
      return ZodParsedType.symbol;
    case 'object':
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (
        data.then &&
        typeof data.then === 'function' &&
        data.catch &&
        typeof data.catch === 'function'
      ) {
        return ZodParsedType.promise;
      }
      if (typeof Map !== 'undefined' && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== 'undefined' && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== 'undefined' && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  'invalid_type',
  'invalid_literal',
  'custom',
  'invalid_union',
  'invalid_union_discriminator',
  'invalid_enum_value',
  'unrecognized_keys',
  'invalid_arguments',
  'invalid_return_type',
  'invalid_date',
  'invalid_string',
  'too_small',
  'too_big',
  'invalid_intersection_types',
  'not_multiple_of',
  'not_finite',
]);
class ZodError2 extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = 'ZodError';
    this.issues = issues;
  }
  format(_mapper) {
    const mapper =
      _mapper ||
      function (issue) {
        return issue.message;
      };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === 'invalid_union') {
          issue.unionErrors.map(processError);
        } else if (issue.code === 'invalid_return_type') {
          processError(issue.returnTypeError);
        } else if (issue.code === 'invalid_arguments') {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError2)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError2.create = (issues) => {
  const error = new ZodError2(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = 'Required';
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ', ')}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === 'object') {
        if ('includes' in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === 'number') {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ('startsWith' in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ('endsWith' in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== 'regex') {
        message = `Invalid ${issue.validation}`;
      } else {
        message = 'Invalid';
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? 'exactly' : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === 'bigint')
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode.too_big:
      if (issue.type === 'array')
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === 'string')
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === 'number')
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'bigint')
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === 'date')
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else message = 'Invalid input';
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = 'Number must be finite';
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path: path2, errorMaps, issueData } = params;
  const fullPath = [...path2, ...(issueData.path || [])];
  const fullIssue = {
    ...issueData,
    path: fullPath,
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message,
    };
  }
  let errorMessage = '';
  const maps = errorMaps
    .filter((m) => !!m)
    .slice()
    .reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage,
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap,
      // then global default map
    ].filter((x) => !!x),
  });
  ctx.common.issues.push(issue);
}
class ParseStatus2 {
  constructor() {
    this.value = 'valid';
  }
  dirty() {
    if (this.value === 'valid') this.value = 'dirty';
  }
  abort() {
    if (this.value !== 'aborted') this.value = 'aborted';
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === 'aborted') return INVALID;
      if (s.status === 'dirty') status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value,
      });
    }
    return ParseStatus2.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === 'aborted') return INVALID;
      if (value.status === 'aborted') return INVALID;
      if (key.status === 'dirty') status.dirty();
      if (value.status === 'dirty') status.dirty();
      if (key.value !== '__proto__' && (typeof value.value !== 'undefined' || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: 'aborted',
});
const DIRTY = (value) => ({ status: 'dirty', value });
const OK = (value) => ({ status: 'valid', value });
const isAborted = (x) => x.status === 'aborted';
const isDirty = (x) => x.status === 'dirty';
const isValid = (x) => x.status === 'valid';
const isAsync = (x) => typeof Promise !== 'undefined' && x instanceof Promise;
var errorUtil;
(function (errorUtil2) {
  errorUtil2.errToObj = (message) => (typeof message === 'string' ? { message } : message || {});
  errorUtil2.toString = (message) =>
    typeof message === 'string' ? message : message == null ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath2 {
  constructor(parent, value, path2, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path2;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error('Validation failed but no issues detected.');
    }
    return {
      success: false,
      get error() {
        if (this._error) return this._error;
        const error = new ZodError2(ctx.common.issues);
        this._error = error;
        return this._error;
      },
    };
  }
};
function processCreateParams(params) {
  if (!params) return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  }
  if (errorMap2) return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === 'invalid_enum_value') {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === 'undefined') {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== 'invalid_type') return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType2 {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return (
      ctx || {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      }
    );
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus2(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent,
      },
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error('Synchronous parse encountered promise.');
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: (params == null ? void 0 : params.async) ?? false,
        contextualErrorMap: params == null ? void 0 : params.errorMap,
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data),
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  '~validate'(data) {
    var _a2, _b2;
    const ctx = {
      common: {
        issues: [],
        async: !!this['~standard'].async,
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data),
    };
    if (!this['~standard'].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result)
          ? {
              value: result.value,
            }
          : {
              issues: ctx.common.issues,
            };
      } catch (err2) {
        if (
          (_b2 =
            (_a2 = err2 == null ? void 0 : err2.message) == null ? void 0 : _a2.toLowerCase()) ==
          null
            ? void 0
            : _b2.includes('encountered')
        ) {
          this['~standard'].async = true;
        }
        ctx.common = {
          issues: [],
          async: true,
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) =>
      isValid(result)
        ? {
            value: result.value,
          }
        : {
            issues: ctx.common.issues,
          }
    );
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success) return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params == null ? void 0 : params.errorMap,
        async: true,
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data),
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult)
      ? maybeAsyncResult
      : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === 'string' || typeof message === 'undefined') {
        return { message };
      } else if (typeof message === 'function') {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () =>
        ctx.addIssue({
          code: ZodIssueCode.custom,
          ...getIssueProperties(val),
        });
      if (typeof Promise !== 'undefined' && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(
          typeof refinementData === 'function' ? refinementData(val, ctx) : refinementData
        );
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects2({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: 'refinement', refinement },
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this['~standard'] = {
      version: 1,
      vendor: 'zod',
      validate: (data) => this['~validate'](data),
    };
  }
  optional() {
    return ZodOptional2.create(this, this._def);
  }
  nullable() {
    return ZodNullable2.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray2.create(this);
  }
  promise() {
    return ZodPromise2.create(this, this._def);
  }
  or(option) {
    return ZodUnion2.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection2.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects2({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: 'transform', transform },
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === 'function' ? def : () => def;
    return new ZodDefault2({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault,
    });
  }
  brand() {
    return new ZodBranded2({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def),
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === 'function' ? def : () => def;
    return new ZodCatch2({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch,
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description,
    });
  }
  pipe(target) {
    return ZodPipeline2.create(this, target);
  }
  readonly() {
    return ZodReadonly2.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex =
  /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex =
  /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? '+' : '?';
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset) opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join('|')})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === 'v4' || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === 'v6' || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt)) return false;
  try {
    const [header] = jwt.split('.');
    if (!header) return false;
    const base64 = header
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(header.length + ((4 - (header.length % 4)) % 4), '=');
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== 'object' || decoded === null) return false;
    if ('typ' in decoded && (decoded == null ? void 0 : decoded.typ) !== 'JWT') return false;
    if (!decoded.alg) return false;
    if (alg && decoded.alg !== alg) return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version2) {
  if ((version2 === 'v4' || !version2) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version2 === 'v6' || !version2) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString2 extends ZodType2 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType,
      });
      return INVALID;
    }
    const status = new ParseStatus2();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: 'string',
            inclusive: true,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'length') {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: 'string',
              inclusive: true,
              exact: true,
              message: check.message,
            });
          }
          status.dirty();
        }
      } else if (check.kind === 'email') {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'email',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'emoji') {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, 'u');
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'emoji',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'uuid') {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'uuid',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'nanoid') {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'nanoid',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid') {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'cuid',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cuid2') {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'cuid2',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ulid') {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'ulid',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'url') {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'url',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'regex') {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'regex',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'trim') {
        input.data = input.data.trim();
      } else if (check.kind === 'includes') {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'toLowerCase') {
        input.data = input.data.toLowerCase();
      } else if (check.kind === 'toUpperCase') {
        input.data = input.data.toUpperCase();
      } else if (check.kind === 'startsWith') {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'endsWith') {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'datetime') {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: 'datetime',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'date') {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: 'date',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'time') {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: 'time',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'duration') {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'duration',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'ip') {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'ip',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'jwt') {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'jwt',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'cidr') {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'cidr',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'base64') {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'base64',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'base64url') {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: 'base64url',
            code: ZodIssueCode.invalid_string,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message),
    });
  }
  _addCheck(check) {
    return new ZodString2({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  email(message) {
    return this._addCheck({ kind: 'email', ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: 'url', ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: 'emoji', ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: 'uuid', ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: 'nanoid', ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: 'cuid', ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: 'cuid2', ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: 'ulid', ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: 'base64', ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: 'base64url',
      ...errorUtil.errToObj(message),
    });
  }
  jwt(options) {
    return this._addCheck({ kind: 'jwt', ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: 'ip', ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: 'cidr', ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === 'string') {
      return this._addCheck({
        kind: 'datetime',
        precision: null,
        offset: false,
        local: false,
        message: options,
      });
    }
    return this._addCheck({
      kind: 'datetime',
      precision:
        typeof (options == null ? void 0 : options.precision) === 'undefined'
          ? null
          : options == null
            ? void 0
            : options.precision,
      offset: (options == null ? void 0 : options.offset) ?? false,
      local: (options == null ? void 0 : options.local) ?? false,
      ...errorUtil.errToObj(options == null ? void 0 : options.message),
    });
  }
  date(message) {
    return this._addCheck({ kind: 'date', message });
  }
  time(options) {
    if (typeof options === 'string') {
      return this._addCheck({
        kind: 'time',
        precision: null,
        message: options,
      });
    }
    return this._addCheck({
      kind: 'time',
      precision:
        typeof (options == null ? void 0 : options.precision) === 'undefined'
          ? null
          : options == null
            ? void 0
            : options.precision,
      ...errorUtil.errToObj(options == null ? void 0 : options.message),
    });
  }
  duration(message) {
    return this._addCheck({ kind: 'duration', ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: 'regex',
      regex,
      ...errorUtil.errToObj(message),
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: 'includes',
      value,
      position: options == null ? void 0 : options.position,
      ...errorUtil.errToObj(options == null ? void 0 : options.message),
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: 'startsWith',
      value,
      ...errorUtil.errToObj(message),
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: 'endsWith',
      value,
      ...errorUtil.errToObj(message),
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: 'min',
      value: minLength,
      ...errorUtil.errToObj(message),
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: 'max',
      value: maxLength,
      ...errorUtil.errToObj(message),
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: 'length',
      value: len,
      ...errorUtil.errToObj(message),
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: 'trim' }],
    });
  }
  toLowerCase() {
    return new ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toLowerCase' }],
    });
  }
  toUpperCase() {
    return new ZodString2({
      ...this._def,
      checks: [...this._def.checks, { kind: 'toUpperCase' }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === 'datetime');
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === 'date');
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === 'time');
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === 'duration');
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === 'email');
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === 'url');
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === 'emoji');
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'uuid');
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === 'nanoid');
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid');
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === 'cuid2');
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === 'ulid');
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === 'ip');
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === 'cidr');
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === 'base64');
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === 'base64url');
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
}
ZodString2.create = (params) => {
  return new ZodString2({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams(params),
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split('.')[1] || '').length;
  const stepDecCount = (step.toString().split('.')[1] || '').length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace('.', ''));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace('.', ''));
  return (valInt % stepInt) / 10 ** decCount;
}
class ZodNumber2 extends ZodType2 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType,
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus2();
    for (const check of this._def.checks) {
      if (check.kind === 'int') {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: 'integer',
            received: 'float',
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: 'number',
            inclusive: check.inclusive,
            exact: false,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'finite') {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit('min', value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber2({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new ZodNumber2({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  int(message) {
    return this._addCheck({
      kind: 'int',
      message: errorUtil.toString(message),
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value,
      message: errorUtil.toString(message),
    });
  }
  finite(message) {
    return this._addCheck({
      kind: 'finite',
      message: errorUtil.toString(message),
    });
  }
  safe(message) {
    return this._addCheck({
      kind: 'min',
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message),
    })._addCheck({
      kind: 'max',
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find(
      (ch) => ch.kind === 'int' || (ch.kind === 'multipleOf' && util.isInteger(ch.value))
    );
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'finite' || ch.kind === 'int' || ch.kind === 'multipleOf') {
        return true;
      } else if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      } else if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber2.create = (params) => {
  return new ZodNumber2({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams(params),
  });
};
class ZodBigInt2 extends ZodType2 {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus2();
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: 'bigint',
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: 'bigint',
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message,
          });
          status.dirty();
        }
      } else if (check.kind === 'multipleOf') {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message,
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType,
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit('min', value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit('min', value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit('max', value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit('max', value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt2({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message),
        },
      ],
    });
  }
  _addCheck(check) {
    return new ZodBigInt2({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  positive(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message),
    });
  }
  negative(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message),
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: 'max',
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message),
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: 'min',
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message),
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: 'multipleOf',
      value,
      message: errorUtil.toString(message),
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt2.create = (params) => {
  return new ZodBigInt2({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams(params),
  });
};
class ZodBoolean2 extends ZodType2 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean2.create = (params) => {
  return new ZodBoolean2({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams(params),
  });
};
class ZodDate2 extends ZodType2 {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType,
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date,
      });
      return INVALID;
    }
    const status = new ParseStatus2();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === 'min') {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else if (check.kind === 'max') {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: 'date',
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime()),
    };
  }
  _addCheck(check) {
    return new ZodDate2({
      ...this._def,
      checks: [...this._def.checks, check],
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: 'min',
      value: minDate.getTime(),
      message: errorUtil.toString(message),
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: 'max',
      value: maxDate.getTime(),
      message: errorUtil.toString(message),
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'min') {
        if (min === null || ch.value > min) min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === 'max') {
        if (max === null || ch.value < max) max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate2.create = (params) => {
  return new ZodDate2({
    checks: [],
    coerce: (params == null ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params),
  });
};
class ZodSymbol2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol2.create = (params) => {
  return new ZodSymbol2({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params),
  });
};
class ZodUndefined2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined2.create = (params) => {
  return new ZodUndefined2({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params),
  });
};
class ZodNull2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull2.create = (params) => {
  return new ZodNull2({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params),
  });
};
class ZodAny2 extends ZodType2 {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny2.create = (params) => {
  return new ZodAny2({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params),
  });
};
class ZodUnknown2 extends ZodType2 {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown2.create = (params) => {
  return new ZodUnknown2({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params),
  });
};
class ZodNever2 extends ZodType2 {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType,
    });
    return INVALID;
  }
}
ZodNever2.create = (params) => {
  return new ZodNever2({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params),
  });
};
class ZodVoid2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid2.create = (params) => {
  return new ZodVoid2({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params),
  });
};
class ZodArray2 extends ZodType2 {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: 'array',
          inclusive: true,
          exact: true,
          message: def.exactLength.message,
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.minLength.message,
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: 'array',
          inclusive: true,
          exact: false,
          message: def.maxLength.message,
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all(
        [...ctx.data].map((item, i) => {
          return def.type._parseAsync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
        })
      ).then((result2) => {
        return ParseStatus2.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath2(ctx, item, ctx.path, i));
    });
    return ParseStatus2.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray2({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) },
    });
  }
  max(maxLength, message) {
    return new ZodArray2({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) },
    });
  }
  length(len, message) {
    return new ZodArray2({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) },
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray2.create = (schema, params) => {
  return new ZodArray2({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params),
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject2) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional2.create(deepPartialify(fieldSchema));
    }
    return new ZodObject2({
      ...schema._def,
      shape: () => newShape,
    });
  } else if (schema instanceof ZodArray2) {
    return new ZodArray2({
      ...schema._def,
      type: deepPartialify(schema.element),
    });
  } else if (schema instanceof ZodOptional2) {
    return ZodOptional2.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable2) {
    return ZodNullable2.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple2) {
    return ZodTuple2.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject2 extends ZodType2 {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType,
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever2 && this._def.unknownKeys === 'strip')) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: 'valid', value: key },
        value: keyValidator._parse(new ParseInputLazyPath2(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data,
      });
    }
    if (this._def.catchall instanceof ZodNever2) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === 'passthrough') {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: 'valid', value: key },
            value: { status: 'valid', value: ctx.data[key] },
          });
        }
      } else if (unknownKeys === 'strict') {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys,
          });
          status.dirty();
        }
      } else if (unknownKeys === 'strip');
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: 'valid', value: key },
          value: catchall._parse(
            new ParseInputLazyPath2(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data,
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve()
        .then(async () => {
          const syncPairs = [];
          for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
              key,
              value,
              alwaysSet: pair.alwaysSet,
            });
          }
          return syncPairs;
        })
        .then((syncPairs) => {
          return ParseStatus2.mergeObjectSync(status, syncPairs);
        });
    } else {
      return ParseStatus2.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject2({
      ...this._def,
      unknownKeys: 'strict',
      ...(message !== void 0
        ? {
            errorMap: (issue, ctx) => {
              var _a2, _b2;
              const defaultError =
                ((_b2 = (_a2 = this._def).errorMap) == null
                  ? void 0
                  : _b2.call(_a2, issue, ctx).message) ?? ctx.defaultError;
              if (issue.code === 'unrecognized_keys')
                return {
                  message: errorUtil.errToObj(message).message ?? defaultError,
                };
              return {
                message: defaultError,
              };
            },
          }
        : {}),
    });
  }
  strip() {
    return new ZodObject2({
      ...this._def,
      unknownKeys: 'strip',
    });
  }
  passthrough() {
    return new ZodObject2({
      ...this._def,
      unknownKeys: 'passthrough',
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject2({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation,
      }),
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject2({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape(),
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject,
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new ZodObject2({
      ...this._def,
      catchall: index,
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject2({
      ...this._def,
      shape: () => shape,
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject2({
      ...this._def,
      shape: () => shape,
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject2({
      ...this._def,
      shape: () => newShape,
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional2) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject2({
      ...this._def,
      shape: () => newShape,
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject2.create = (shape, params) => {
  return new ZodObject2({
    shape: () => shape,
    unknownKeys: 'strip',
    catchall: ZodNever2.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params),
  });
};
ZodObject2.strictCreate = (shape, params) => {
  return new ZodObject2({
    shape: () => shape,
    unknownKeys: 'strict',
    catchall: ZodNever2.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params),
  });
};
ZodObject2.lazycreate = (shape, params) => {
  return new ZodObject2({
    shape,
    unknownKeys: 'strip',
    catchall: ZodNever2.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params),
  });
};
class ZodUnion2 extends ZodType2 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === 'valid') {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === 'dirty') {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError2(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors,
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(
        options.map(async (option) => {
          const childCtx = {
            ...ctx,
            common: {
              ...ctx.common,
              issues: [],
            },
            parent: null,
          };
          return {
            result: await option._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx,
            }),
            ctx: childCtx,
          };
        })
      ).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: [],
          },
          parent: null,
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx,
        });
        if (result.status === 'valid') {
          return result;
        } else if (result.status === 'dirty' && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError2(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors,
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion2.create = (types, params) => {
  return new ZodUnion2({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params),
  });
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection2 extends ZodType2 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types,
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(
        this._def.left._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        }),
        this._def.right._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        })
      );
    }
  }
}
ZodIntersection2.create = (left, right, params) => {
  return new ZodIntersection2({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params),
  });
};
class ZodTuple2 extends ZodType2 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: 'array',
      });
      status.dirty();
    }
    const items = [...ctx.data]
      .map((item, itemIndex) => {
        const schema = this._def.items[itemIndex] || this._def.rest;
        if (!schema) return null;
        return schema._parse(new ParseInputLazyPath2(ctx, item, ctx.path, itemIndex));
      })
      .filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus2.mergeArray(status, results);
      });
    } else {
      return ParseStatus2.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple2({
      ...this._def,
      rest,
    });
  }
}
ZodTuple2.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error('You must pass an array of schemas to z.tuple([ ... ])');
  }
  return new ZodTuple2({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params),
  });
};
class ZodMap2 extends ZodType2 {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath2(ctx, key, ctx.path, [index, 'key'])),
        value: valueType._parse(new ParseInputLazyPath2(ctx, value, ctx.path, [index, 'value'])),
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === 'aborted' || value.status === 'aborted') {
            return INVALID;
          }
          if (key.status === 'dirty' || value.status === 'dirty') {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === 'aborted' || value.status === 'aborted') {
          return INVALID;
        }
        if (key.status === 'dirty' || value.status === 'dirty') {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap2.create = (keyType, valueType, params) => {
  return new ZodMap2({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params),
  });
};
class ZodSet2 extends ZodType2 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.minSize.message,
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: 'set',
          inclusive: true,
          exact: false,
          message: def.maxSize.message,
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === 'aborted') return INVALID;
        if (element.status === 'dirty') status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) =>
      valueType._parse(new ParseInputLazyPath2(ctx, item, ctx.path, i))
    );
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet2({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) },
    });
  }
  max(maxSize, message) {
    return new ZodSet2({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) },
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet2.create = (valueType, params) => {
  return new ZodSet2({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params),
  });
};
class ZodLazy2 extends ZodType2 {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy2.create = (getter, params) => {
  return new ZodLazy2({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params),
  });
};
class ZodLiteral2 extends ZodType2 {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value,
      });
      return INVALID;
    }
    return { status: 'valid', value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral2.create = (value, params) => {
  return new ZodLiteral2({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params),
  });
};
function createZodEnum(values, params) {
  return new ZodEnum2({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params),
  });
}
class ZodEnum2 extends ZodType2 {
  _parse(input) {
    if (typeof input.data !== 'string') {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type,
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues,
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum2.create(values, {
      ...this._def,
      ...newDef,
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum2.create(
      this.options.filter((opt) => !values.includes(opt)),
      {
        ...this._def,
        ...newDef,
      }
    );
  }
}
ZodEnum2.create = createZodEnum;
class ZodNativeEnum2 extends ZodType2 {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type,
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues,
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum2.create = (values, params) => {
  return new ZodNativeEnum2({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params),
  });
};
class ZodPromise2 extends ZodType2 {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    const promisified =
      ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(
      promisified.then((data) => {
        return this._def.type.parseAsync(data, {
          path: ctx.path,
          errorMap: ctx.common.contextualErrorMap,
        });
      })
    );
  }
}
ZodPromise2.create = (schema, params) => {
  return new ZodPromise2({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params),
  });
};
class ZodEffects2 extends ZodType2 {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      },
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === 'preprocess') {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === 'aborted') return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx,
          });
          if (result.status === 'aborted') return INVALID;
          if (result.status === 'dirty') return DIRTY(result.value);
          if (status.value === 'dirty') return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === 'aborted') return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx,
        });
        if (result.status === 'aborted') return INVALID;
        if (result.status === 'dirty') return DIRTY(result.value);
        if (status.value === 'dirty') return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === 'refinement') {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error(
            'Async refinement encountered during synchronous parse operation. Use .parseAsync instead.'
          );
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inner.status === 'aborted') return INVALID;
        if (inner.status === 'dirty') status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema
          ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
          .then((inner) => {
            if (inner.status === 'aborted') return INVALID;
            if (inner.status === 'dirty') status.dirty();
            return executeRefinement(inner.value).then(() => {
              return { status: status.value, value: inner.value };
            });
          });
      }
    }
    if (effect.type === 'transform') {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (!isValid(base)) return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(
            `Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`
          );
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema
          ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
          .then((base) => {
            if (!isValid(base)) return INVALID;
            return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
              status: status.value,
              value: result,
            }));
          });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects2.create = (schema, effect, params) => {
  return new ZodEffects2({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params),
  });
};
ZodEffects2.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects2({
    schema,
    effect: { type: 'preprocess', transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params),
  });
};
class ZodOptional2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional2.create = (type, params) => {
  return new ZodOptional2({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params),
  });
};
class ZodNullable2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable2.create = (type, params) => {
  return new ZodNullable2({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params),
  });
};
class ZodDefault2 extends ZodType2 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx,
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault2.create = (type, params) => {
  return new ZodDefault2({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === 'function' ? params.default : () => params.default,
    ...processCreateParams(params),
  });
};
class ZodCatch2 extends ZodType2 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: [],
      },
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx,
      },
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: 'valid',
          value:
            result2.status === 'valid'
              ? result2.value
              : this._def.catchValue({
                  get error() {
                    return new ZodError2(newCtx.common.issues);
                  },
                  input: newCtx.data,
                }),
        };
      });
    } else {
      return {
        status: 'valid',
        value:
          result.status === 'valid'
            ? result.value
            : this._def.catchValue({
                get error() {
                  return new ZodError2(newCtx.common.issues);
                },
                input: newCtx.data,
              }),
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch2.create = (type, params) => {
  return new ZodCatch2({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === 'function' ? params.catch : () => params.catch,
    ...processCreateParams(params),
  });
};
class ZodNaN2 extends ZodType2 {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType,
      });
      return INVALID;
    }
    return { status: 'valid', value: input.data };
  }
}
ZodNaN2.create = (params) => {
  return new ZodNaN2({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params),
  });
};
class ZodBranded2 extends ZodType2 {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx,
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline2 extends ZodType2 {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx,
        });
        if (inResult.status === 'aborted') return INVALID;
        if (inResult.status === 'dirty') {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx,
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx,
      });
      if (inResult.status === 'aborted') return INVALID;
      if (inResult.status === 'dirty') {
        status.dirty();
        return {
          status: 'dirty',
          value: inResult.value,
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx,
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline2({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline,
    });
  }
}
class ZodReadonly2 extends ZodType2 {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly2.create = (type, params) => {
  return new ZodReadonly2({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params),
  });
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2['ZodString'] = 'ZodString';
  ZodFirstPartyTypeKind2['ZodNumber'] = 'ZodNumber';
  ZodFirstPartyTypeKind2['ZodNaN'] = 'ZodNaN';
  ZodFirstPartyTypeKind2['ZodBigInt'] = 'ZodBigInt';
  ZodFirstPartyTypeKind2['ZodBoolean'] = 'ZodBoolean';
  ZodFirstPartyTypeKind2['ZodDate'] = 'ZodDate';
  ZodFirstPartyTypeKind2['ZodSymbol'] = 'ZodSymbol';
  ZodFirstPartyTypeKind2['ZodUndefined'] = 'ZodUndefined';
  ZodFirstPartyTypeKind2['ZodNull'] = 'ZodNull';
  ZodFirstPartyTypeKind2['ZodAny'] = 'ZodAny';
  ZodFirstPartyTypeKind2['ZodUnknown'] = 'ZodUnknown';
  ZodFirstPartyTypeKind2['ZodNever'] = 'ZodNever';
  ZodFirstPartyTypeKind2['ZodVoid'] = 'ZodVoid';
  ZodFirstPartyTypeKind2['ZodArray'] = 'ZodArray';
  ZodFirstPartyTypeKind2['ZodObject'] = 'ZodObject';
  ZodFirstPartyTypeKind2['ZodUnion'] = 'ZodUnion';
  ZodFirstPartyTypeKind2['ZodDiscriminatedUnion'] = 'ZodDiscriminatedUnion';
  ZodFirstPartyTypeKind2['ZodIntersection'] = 'ZodIntersection';
  ZodFirstPartyTypeKind2['ZodTuple'] = 'ZodTuple';
  ZodFirstPartyTypeKind2['ZodRecord'] = 'ZodRecord';
  ZodFirstPartyTypeKind2['ZodMap'] = 'ZodMap';
  ZodFirstPartyTypeKind2['ZodSet'] = 'ZodSet';
  ZodFirstPartyTypeKind2['ZodFunction'] = 'ZodFunction';
  ZodFirstPartyTypeKind2['ZodLazy'] = 'ZodLazy';
  ZodFirstPartyTypeKind2['ZodLiteral'] = 'ZodLiteral';
  ZodFirstPartyTypeKind2['ZodEnum'] = 'ZodEnum';
  ZodFirstPartyTypeKind2['ZodEffects'] = 'ZodEffects';
  ZodFirstPartyTypeKind2['ZodNativeEnum'] = 'ZodNativeEnum';
  ZodFirstPartyTypeKind2['ZodOptional'] = 'ZodOptional';
  ZodFirstPartyTypeKind2['ZodNullable'] = 'ZodNullable';
  ZodFirstPartyTypeKind2['ZodDefault'] = 'ZodDefault';
  ZodFirstPartyTypeKind2['ZodCatch'] = 'ZodCatch';
  ZodFirstPartyTypeKind2['ZodPromise'] = 'ZodPromise';
  ZodFirstPartyTypeKind2['ZodBranded'] = 'ZodBranded';
  ZodFirstPartyTypeKind2['ZodPipeline'] = 'ZodPipeline';
  ZodFirstPartyTypeKind2['ZodReadonly'] = 'ZodReadonly';
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const stringType = ZodString2.create;
ZodNumber2.create;
ZodBigInt2.create;
ZodBoolean2.create;
ZodDate2.create;
ZodNever2.create;
ZodArray2.create;
const objectType = ZodObject2.create;
ZodUnion2.create;
ZodIntersection2.create;
ZodTuple2.create;
const enumType = ZodEnum2.create;
ZodPromise2.create;
ZodOptional2.create;
ZodNullable2.create;
const coerce = {
  string: (arg) => ZodString2.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber2.create({ ...arg, coerce: true }),
  boolean: (arg) =>
    ZodBoolean2.create({
      ...arg,
      coerce: true,
    }),
  bigint: (arg) => ZodBigInt2.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate2.create({ ...arg, coerce: true }),
};
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
function fillPool(bytes) {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    node_crypto.webcrypto.getRandomValues(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    node_crypto.webcrypto.getRandomValues(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
}
function nanoid(size = 21) {
  fillPool((size |= 0));
  let id = '';
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id;
}
const EnvSchema = objectType({
  PORT: coerce.number().int().min(1).max(65535).default(DEFAULT_SERVER_PORT),
  NODE_ENV: enumType(['development', 'production', 'test']).default('development'),
  DATABASE_URL: stringType().default(`file:${require$$0$1.homedir()}/.${APP_NAME}/data/app.db`),
  API_KEY: stringType().optional(),
  CORS_ORIGINS: stringType().optional(),
  RATE_LIMIT_ENABLED: stringType()
    .transform((v) => v === 'true')
    .default('false'),
  LOG_LEVEL: enumType(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
});
const env = EnvSchema.parse(process.env);
const apiKeyFile = `${require$$0$1.homedir()}/.${APP_NAME}/.api-key`;
function getResolvedApiKey() {
  if (env.API_KEY) {
    return env.API_KEY;
  }
  if (node_fs.existsSync(apiKeyFile)) {
    return node_fs.readFileSync(apiKeyFile, 'utf-8').trim();
  }
  const key = `sk-${nanoid(12)}`;
  node_fs.mkdirSync(require$$2.dirname(apiKeyFile), { recursive: true });
  node_fs.writeFileSync(apiKeyFile, key, 'utf-8');
  return key;
}
function getCorsOrigins() {
  if (env.NODE_ENV !== 'production') {
    return [];
  }
  if (!env.CORS_ORIGINS) {
    return [];
  }
  return env.CORS_ORIGINS.split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}
function createCorsMiddleware() {
  if (env.NODE_ENV !== 'production') {
    return cors({
      origin: (origin) => {
        if (
          !origin ||
          origin.startsWith('http://localhost:') ||
          origin.startsWith('http://10.0.0.')
        ) {
          return origin || '*';
        }
        return null;
      },
      credentials: true,
    });
  }
  const allowedOrigins = getCorsOrigins();
  return cors({
    origin: allowedOrigins,
    credentials: true,
  });
}
var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
        ? global
        : typeof self !== 'undefined'
          ? self
          : {};
var pino = { exports: {} };
var errHelpers;
var hasRequiredErrHelpers;
function requireErrHelpers() {
  if (hasRequiredErrHelpers) return errHelpers;
  hasRequiredErrHelpers = 1;
  const isErrorLike = (err2) => {
    return err2 && typeof err2.message === 'string';
  };
  const getErrorCause = (err2) => {
    if (!err2) return;
    const cause = err2.cause;
    if (typeof cause === 'function') {
      const causeResult = err2.cause();
      return isErrorLike(causeResult) ? causeResult : void 0;
    } else {
      return isErrorLike(cause) ? cause : void 0;
    }
  };
  const _stackWithCauses = (err2, seen) => {
    if (!isErrorLike(err2)) return '';
    const stack = err2.stack || '';
    if (seen.has(err2)) {
      return stack + '\ncauses have become circular...';
    }
    const cause = getErrorCause(err2);
    if (cause) {
      seen.add(err2);
      return stack + '\ncaused by: ' + _stackWithCauses(cause, seen);
    } else {
      return stack;
    }
  };
  const stackWithCauses = (err2) => _stackWithCauses(err2, /* @__PURE__ */ new Set());
  const _messageWithCauses = (err2, seen, skip) => {
    if (!isErrorLike(err2)) return '';
    const message = skip ? '' : err2.message || '';
    if (seen.has(err2)) {
      return message + ': ...';
    }
    const cause = getErrorCause(err2);
    if (cause) {
      seen.add(err2);
      const skipIfVErrorStyleCause = typeof err2.cause === 'function';
      return (
        message +
        (skipIfVErrorStyleCause ? '' : ': ') +
        _messageWithCauses(cause, seen, skipIfVErrorStyleCause)
      );
    } else {
      return message;
    }
  };
  const messageWithCauses = (err2) => _messageWithCauses(err2, /* @__PURE__ */ new Set());
  errHelpers = {
    isErrorLike,
    getErrorCause,
    stackWithCauses,
    messageWithCauses,
  };
  return errHelpers;
}
var errProto;
var hasRequiredErrProto;
function requireErrProto() {
  if (hasRequiredErrProto) return errProto;
  hasRequiredErrProto = 1;
  const seen = Symbol('circular-ref-tag');
  const rawSymbol = Symbol('pino-raw-err-ref');
  const pinoErrProto = Object.create(
    {},
    {
      type: {
        enumerable: true,
        writable: true,
        value: void 0,
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0,
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0,
      },
      aggregateErrors: {
        enumerable: true,
        writable: true,
        value: void 0,
      },
      raw: {
        enumerable: false,
        get: function () {
          return this[rawSymbol];
        },
        set: function (val) {
          this[rawSymbol] = val;
        },
      },
    }
  );
  Object.defineProperty(pinoErrProto, rawSymbol, {
    writable: true,
    value: {},
  });
  errProto = {
    pinoErrProto,
    pinoErrorSymbols: {
      seen,
      rawSymbol,
    },
  };
  return errProto;
}
var err;
var hasRequiredErr;
function requireErr() {
  if (hasRequiredErr) return err;
  hasRequiredErr = 1;
  err = errSerializer;
  const { messageWithCauses, stackWithCauses, isErrorLike } = requireErrHelpers();
  const { pinoErrProto, pinoErrorSymbols } = requireErrProto();
  const { seen } = pinoErrorSymbols;
  const { toString } = Object.prototype;
  function errSerializer(err2) {
    if (!isErrorLike(err2)) {
      return err2;
    }
    err2[seen] = void 0;
    const _err = Object.create(pinoErrProto);
    _err.type =
      toString.call(err2.constructor) === '[object Function]' ? err2.constructor.name : err2.name;
    _err.message = messageWithCauses(err2);
    _err.stack = stackWithCauses(err2);
    if (Array.isArray(err2.errors)) {
      _err.aggregateErrors = err2.errors.map((err3) => errSerializer(err3));
    }
    for (const key in err2) {
      if (_err[key] === void 0) {
        const val = err2[key];
        if (isErrorLike(val)) {
          if (key !== 'cause' && !Object.prototype.hasOwnProperty.call(val, seen)) {
            _err[key] = errSerializer(val);
          }
        } else {
          _err[key] = val;
        }
      }
    }
    delete err2[seen];
    _err.raw = err2;
    return _err;
  }
  return err;
}
var errWithCause;
var hasRequiredErrWithCause;
function requireErrWithCause() {
  if (hasRequiredErrWithCause) return errWithCause;
  hasRequiredErrWithCause = 1;
  errWithCause = errWithCauseSerializer;
  const { isErrorLike } = requireErrHelpers();
  const { pinoErrProto, pinoErrorSymbols } = requireErrProto();
  const { seen } = pinoErrorSymbols;
  const { toString } = Object.prototype;
  function errWithCauseSerializer(err2) {
    if (!isErrorLike(err2)) {
      return err2;
    }
    err2[seen] = void 0;
    const _err = Object.create(pinoErrProto);
    _err.type =
      toString.call(err2.constructor) === '[object Function]' ? err2.constructor.name : err2.name;
    _err.message = err2.message;
    _err.stack = err2.stack;
    if (Array.isArray(err2.errors)) {
      _err.aggregateErrors = err2.errors.map((err3) => errWithCauseSerializer(err3));
    }
    if (isErrorLike(err2.cause) && !Object.prototype.hasOwnProperty.call(err2.cause, seen)) {
      _err.cause = errWithCauseSerializer(err2.cause);
    }
    for (const key in err2) {
      if (_err[key] === void 0) {
        const val = err2[key];
        if (isErrorLike(val)) {
          if (!Object.prototype.hasOwnProperty.call(val, seen)) {
            _err[key] = errWithCauseSerializer(val);
          }
        } else {
          _err[key] = val;
        }
      }
    }
    delete err2[seen];
    _err.raw = err2;
    return _err;
  }
  return errWithCause;
}
var req;
var hasRequiredReq;
function requireReq() {
  if (hasRequiredReq) return req;
  hasRequiredReq = 1;
  req = {
    mapHttpRequest,
    reqSerializer,
  };
  const rawSymbol = Symbol('pino-raw-req-ref');
  const pinoReqProto = Object.create(
    {},
    {
      id: {
        enumerable: true,
        writable: true,
        value: '',
      },
      method: {
        enumerable: true,
        writable: true,
        value: '',
      },
      url: {
        enumerable: true,
        writable: true,
        value: '',
      },
      query: {
        enumerable: true,
        writable: true,
        value: '',
      },
      params: {
        enumerable: true,
        writable: true,
        value: '',
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {},
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: '',
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: '',
      },
      raw: {
        enumerable: false,
        get: function () {
          return this[rawSymbol];
        },
        set: function (val) {
          this[rawSymbol] = val;
        },
      },
    }
  );
  Object.defineProperty(pinoReqProto, rawSymbol, {
    writable: true,
    value: {},
  });
  function reqSerializer(req2) {
    const connection = req2.info || req2.socket;
    const _req2 = Object.create(pinoReqProto);
    _req2.id =
      typeof req2.id === 'function' ? req2.id() : req2.id || (req2.info ? req2.info.id : void 0);
    _req2.method = req2.method;
    if (req2.originalUrl) {
      _req2.url = req2.originalUrl;
    } else {
      const path2 = req2.path;
      _req2.url = typeof path2 === 'string' ? path2 : req2.url ? req2.url.path || req2.url : void 0;
    }
    if (req2.query) {
      _req2.query = req2.query;
    }
    if (req2.params) {
      _req2.params = req2.params;
    }
    _req2.headers = req2.headers;
    _req2.remoteAddress = connection && connection.remoteAddress;
    _req2.remotePort = connection && connection.remotePort;
    _req2.raw = req2.raw || req2;
    return _req2;
  }
  function mapHttpRequest(req2) {
    return {
      req: reqSerializer(req2),
    };
  }
  return req;
}
var res;
var hasRequiredRes;
function requireRes() {
  if (hasRequiredRes) return res;
  hasRequiredRes = 1;
  res = {
    mapHttpResponse,
    resSerializer,
  };
  const rawSymbol = Symbol('pino-raw-res-ref');
  const pinoResProto = Object.create(
    {},
    {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0,
      },
      headers: {
        enumerable: true,
        writable: true,
        value: '',
      },
      raw: {
        enumerable: false,
        get: function () {
          return this[rawSymbol];
        },
        set: function (val) {
          this[rawSymbol] = val;
        },
      },
    }
  );
  Object.defineProperty(pinoResProto, rawSymbol, {
    writable: true,
    value: {},
  });
  function resSerializer(res2) {
    const _res2 = Object.create(pinoResProto);
    _res2.statusCode = res2.headersSent ? res2.statusCode : null;
    _res2.headers = res2.getHeaders ? res2.getHeaders() : res2._headers;
    _res2.raw = res2;
    return _res2;
  }
  function mapHttpResponse(res2) {
    return {
      res: resSerializer(res2),
    };
  }
  return res;
}
var pinoStdSerializers;
var hasRequiredPinoStdSerializers;
function requirePinoStdSerializers() {
  if (hasRequiredPinoStdSerializers) return pinoStdSerializers;
  hasRequiredPinoStdSerializers = 1;
  const errSerializer = requireErr();
  const errWithCauseSerializer = requireErrWithCause();
  const reqSerializers = requireReq();
  const resSerializers = requireRes();
  pinoStdSerializers = {
    err: errSerializer,
    errWithCause: errWithCauseSerializer,
    mapHttpRequest: reqSerializers.mapHttpRequest,
    mapHttpResponse: resSerializers.mapHttpResponse,
    req: reqSerializers.reqSerializer,
    res: resSerializers.resSerializer,
    wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
      if (customSerializer === errSerializer) return customSerializer;
      return function wrapErrSerializer(err2) {
        return customSerializer(errSerializer(err2));
      };
    },
    wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
      if (customSerializer === reqSerializers.reqSerializer) return customSerializer;
      return function wrappedReqSerializer(req2) {
        return customSerializer(reqSerializers.reqSerializer(req2));
      };
    },
    wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
      if (customSerializer === resSerializers.resSerializer) return customSerializer;
      return function wrappedResSerializer(res2) {
        return customSerializer(resSerializers.resSerializer(res2));
      };
    },
  };
  return pinoStdSerializers;
}
var caller;
var hasRequiredCaller;
function requireCaller() {
  if (hasRequiredCaller) return caller;
  hasRequiredCaller = 1;
  function noOpPrepareStackTrace(_, stack) {
    return stack;
  }
  caller = function getCallers() {
    const originalPrepare = Error.prepareStackTrace;
    Error.prepareStackTrace = noOpPrepareStackTrace;
    const stack = new Error().stack;
    Error.prepareStackTrace = originalPrepare;
    if (!Array.isArray(stack)) {
      return void 0;
    }
    const entries = stack.slice(2);
    const fileNames = [];
    for (const entry of entries) {
      if (!entry) {
        continue;
      }
      fileNames.push(entry.getFileName());
    }
    return fileNames;
  };
  return caller;
}
var redact;
var hasRequiredRedact;
function requireRedact() {
  if (hasRequiredRedact) return redact;
  hasRequiredRedact = 1;
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof Array) {
      const cloned = [];
      for (let i = 0; i < obj.length; i++) {
        cloned[i] = deepClone(obj[i]);
      }
      return cloned;
    }
    if (typeof obj === 'object') {
      const cloned = Object.create(Object.getPrototypeOf(obj));
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          cloned[key] = deepClone(obj[key]);
        }
      }
      return cloned;
    }
    return obj;
  }
  function parsePath(path2) {
    const parts = [];
    let current = '';
    let inBrackets = false;
    let inQuotes = false;
    let quoteChar = '';
    for (let i = 0; i < path2.length; i++) {
      const char = path2[i];
      if (!inBrackets && char === '.') {
        if (current) {
          parts.push(current);
          current = '';
        }
      } else if (char === '[') {
        if (current) {
          parts.push(current);
          current = '';
        }
        inBrackets = true;
      } else if (char === ']' && inBrackets) {
        parts.push(current);
        current = '';
        inBrackets = false;
        inQuotes = false;
      } else if ((char === '"' || char === "'") && inBrackets) {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
          quoteChar = '';
        } else {
          current += char;
        }
      } else {
        current += char;
      }
    }
    if (current) {
      parts.push(current);
    }
    return parts;
  }
  function setValue(obj, parts, value) {
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (typeof current !== 'object' || current === null || !(key in current)) {
        return false;
      }
      if (typeof current[key] !== 'object' || current[key] === null) {
        return false;
      }
      current = current[key];
    }
    const lastKey = parts[parts.length - 1];
    if (lastKey === '*') {
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          current[i] = value;
        }
      } else if (typeof current === 'object' && current !== null) {
        for (const key in current) {
          if (Object.prototype.hasOwnProperty.call(current, key)) {
            current[key] = value;
          }
        }
      }
    } else {
      if (
        typeof current === 'object' &&
        current !== null &&
        lastKey in current &&
        Object.prototype.hasOwnProperty.call(current, lastKey)
      ) {
        current[lastKey] = value;
      }
    }
    return true;
  }
  function removeKey(obj, parts) {
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (typeof current !== 'object' || current === null || !(key in current)) {
        return false;
      }
      if (typeof current[key] !== 'object' || current[key] === null) {
        return false;
      }
      current = current[key];
    }
    const lastKey = parts[parts.length - 1];
    if (lastKey === '*') {
      if (Array.isArray(current)) {
        for (let i = 0; i < current.length; i++) {
          current[i] = void 0;
        }
      } else if (typeof current === 'object' && current !== null) {
        for (const key in current) {
          if (Object.prototype.hasOwnProperty.call(current, key)) {
            delete current[key];
          }
        }
      }
    } else {
      if (
        typeof current === 'object' &&
        current !== null &&
        lastKey in current &&
        Object.prototype.hasOwnProperty.call(current, lastKey)
      ) {
        delete current[lastKey];
      }
    }
    return true;
  }
  const PATH_NOT_FOUND = Symbol('PATH_NOT_FOUND');
  function getValueIfExists(obj, parts) {
    let current = obj;
    for (const part of parts) {
      if (current === null || current === void 0) {
        return PATH_NOT_FOUND;
      }
      if (typeof current !== 'object' || current === null) {
        return PATH_NOT_FOUND;
      }
      if (!(part in current)) {
        return PATH_NOT_FOUND;
      }
      current = current[part];
    }
    return current;
  }
  function getValue(obj, parts) {
    let current = obj;
    for (const part of parts) {
      if (current === null || current === void 0) {
        return void 0;
      }
      if (typeof current !== 'object' || current === null) {
        return void 0;
      }
      current = current[part];
    }
    return current;
  }
  function redactPaths(obj, paths, censor, remove = false) {
    for (const path2 of paths) {
      const parts = parsePath(path2);
      if (parts.includes('*')) {
        redactWildcardPath(obj, parts, censor, path2, remove);
      } else {
        if (remove) {
          removeKey(obj, parts);
        } else {
          const value = getValueIfExists(obj, parts);
          if (value === PATH_NOT_FOUND) {
            continue;
          }
          const actualCensor = typeof censor === 'function' ? censor(value, parts) : censor;
          setValue(obj, parts, actualCensor);
        }
      }
    }
  }
  function redactWildcardPath(obj, parts, censor, originalPath, remove = false) {
    const wildcardIndex = parts.indexOf('*');
    if (wildcardIndex === parts.length - 1) {
      const parentParts = parts.slice(0, -1);
      let current = obj;
      for (const part of parentParts) {
        if (current === null || current === void 0) return;
        if (typeof current !== 'object' || current === null) return;
        current = current[part];
      }
      if (Array.isArray(current)) {
        if (remove) {
          for (let i = 0; i < current.length; i++) {
            current[i] = void 0;
          }
        } else {
          for (let i = 0; i < current.length; i++) {
            const indexPath = [...parentParts, i.toString()];
            const actualCensor =
              typeof censor === 'function' ? censor(current[i], indexPath) : censor;
            current[i] = actualCensor;
          }
        }
      } else if (typeof current === 'object' && current !== null) {
        if (remove) {
          const keysToDelete = [];
          for (const key in current) {
            if (Object.prototype.hasOwnProperty.call(current, key)) {
              keysToDelete.push(key);
            }
          }
          for (const key of keysToDelete) {
            delete current[key];
          }
        } else {
          for (const key in current) {
            const keyPath = [...parentParts, key];
            const actualCensor =
              typeof censor === 'function' ? censor(current[key], keyPath) : censor;
            current[key] = actualCensor;
          }
        }
      }
    } else {
      redactIntermediateWildcard(obj, parts, censor, wildcardIndex, originalPath, remove);
    }
  }
  function redactIntermediateWildcard(
    obj,
    parts,
    censor,
    wildcardIndex,
    originalPath,
    remove = false
  ) {
    const beforeWildcard = parts.slice(0, wildcardIndex);
    const afterWildcard = parts.slice(wildcardIndex + 1);
    const pathArray = [];
    function traverse(current, pathLength) {
      if (pathLength === beforeWildcard.length) {
        if (Array.isArray(current)) {
          for (let i = 0; i < current.length; i++) {
            pathArray[pathLength] = i.toString();
            traverse(current[i], pathLength + 1);
          }
        } else if (typeof current === 'object' && current !== null) {
          for (const key in current) {
            pathArray[pathLength] = key;
            traverse(current[key], pathLength + 1);
          }
        }
      } else if (pathLength < beforeWildcard.length) {
        const nextKey = beforeWildcard[pathLength];
        if (current && typeof current === 'object' && current !== null && nextKey in current) {
          pathArray[pathLength] = nextKey;
          traverse(current[nextKey], pathLength + 1);
        }
      } else {
        if (afterWildcard.includes('*')) {
          const wrappedCensor =
            typeof censor === 'function'
              ? (value, path2) => {
                  const fullPath = [...pathArray.slice(0, pathLength), ...path2];
                  return censor(value, fullPath);
                }
              : censor;
          redactWildcardPath(current, afterWildcard, wrappedCensor, originalPath, remove);
        } else {
          if (remove) {
            removeKey(current, afterWildcard);
          } else {
            const actualCensor =
              typeof censor === 'function'
                ? censor(getValue(current, afterWildcard), [
                    ...pathArray.slice(0, pathLength),
                    ...afterWildcard,
                  ])
                : censor;
            setValue(current, afterWildcard, actualCensor);
          }
        }
      }
    }
    if (beforeWildcard.length === 0) {
      traverse(obj, 0);
    } else {
      let current = obj;
      for (let i = 0; i < beforeWildcard.length; i++) {
        const part = beforeWildcard[i];
        if (current === null || current === void 0) return;
        if (typeof current !== 'object' || current === null) return;
        current = current[part];
        pathArray[i] = part;
      }
      if (current !== null && current !== void 0) {
        traverse(current, beforeWildcard.length);
      }
    }
  }
  function buildPathStructure(pathsToClone) {
    if (pathsToClone.length === 0) {
      return null;
    }
    const pathStructure = /* @__PURE__ */ new Map();
    for (const path2 of pathsToClone) {
      const parts = parsePath(path2);
      let current = pathStructure;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!current.has(part)) {
          current.set(part, /* @__PURE__ */ new Map());
        }
        current = current.get(part);
      }
    }
    return pathStructure;
  }
  function selectiveClone(obj, pathStructure) {
    if (!pathStructure) {
      return obj;
    }
    function cloneSelectively(source, pathMap, depth = 0) {
      if (!pathMap || pathMap.size === 0) {
        return source;
      }
      if (source === null || typeof source !== 'object') {
        return source;
      }
      if (source instanceof Date) {
        return new Date(source.getTime());
      }
      if (Array.isArray(source)) {
        const cloned2 = [];
        for (let i = 0; i < source.length; i++) {
          const indexStr = i.toString();
          if (pathMap.has(indexStr) || pathMap.has('*')) {
            cloned2[i] = cloneSelectively(source[i], pathMap.get(indexStr) || pathMap.get('*'));
          } else {
            cloned2[i] = source[i];
          }
        }
        return cloned2;
      }
      const cloned = Object.create(Object.getPrototypeOf(source));
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          if (pathMap.has(key) || pathMap.has('*')) {
            cloned[key] = cloneSelectively(source[key], pathMap.get(key) || pathMap.get('*'));
          } else {
            cloned[key] = source[key];
          }
        }
      }
      return cloned;
    }
    return cloneSelectively(obj, pathStructure);
  }
  function validatePath(path2) {
    if (typeof path2 !== 'string') {
      throw new Error('Paths must be (non-empty) strings');
    }
    if (path2 === '') {
      throw new Error('Invalid redaction path ()');
    }
    if (path2.includes('..')) {
      throw new Error(`Invalid redaction path (${path2})`);
    }
    if (path2.includes(',')) {
      throw new Error(`Invalid redaction path (${path2})`);
    }
    let bracketCount = 0;
    let inQuotes = false;
    let quoteChar = '';
    for (let i = 0; i < path2.length; i++) {
      const char = path2[i];
      if ((char === '"' || char === "'") && bracketCount > 0) {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
          quoteChar = '';
        }
      } else if (char === '[' && !inQuotes) {
        bracketCount++;
      } else if (char === ']' && !inQuotes) {
        bracketCount--;
        if (bracketCount < 0) {
          throw new Error(`Invalid redaction path (${path2})`);
        }
      }
    }
    if (bracketCount !== 0) {
      throw new Error(`Invalid redaction path (${path2})`);
    }
  }
  function validatePaths(paths) {
    if (!Array.isArray(paths)) {
      throw new TypeError('paths must be an array');
    }
    for (const path2 of paths) {
      validatePath(path2);
    }
  }
  function slowRedact(options = {}) {
    const {
      paths = [],
      censor = '[REDACTED]',
      serialize = JSON.stringify,
      strict = true,
      remove = false,
    } = options;
    validatePaths(paths);
    const pathStructure = buildPathStructure(paths);
    return function redact2(obj) {
      if (strict && (obj === null || typeof obj !== 'object')) {
        if (obj === null || obj === void 0) {
          return serialize ? serialize(obj) : obj;
        }
        if (typeof obj !== 'object') {
          return serialize ? serialize(obj) : obj;
        }
      }
      const cloned = selectiveClone(obj, pathStructure);
      const original = obj;
      let actualCensor = censor;
      if (typeof censor === 'function') {
        actualCensor = censor;
      }
      redactPaths(cloned, paths, actualCensor, remove);
      if (serialize === false) {
        cloned.restore = function () {
          return deepClone(original);
        };
        return cloned;
      }
      if (typeof serialize === 'function') {
        return serialize(cloned);
      }
      return JSON.stringify(cloned);
    };
  }
  redact = slowRedact;
  return redact;
}
var symbols;
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols) return symbols;
  hasRequiredSymbols = 1;
  const setLevelSym = Symbol('pino.setLevel');
  const getLevelSym = Symbol('pino.getLevel');
  const levelValSym = Symbol('pino.levelVal');
  const levelCompSym = Symbol('pino.levelComp');
  const useLevelLabelsSym = Symbol('pino.useLevelLabels');
  const useOnlyCustomLevelsSym = Symbol('pino.useOnlyCustomLevels');
  const mixinSym = Symbol('pino.mixin');
  const lsCacheSym = Symbol('pino.lsCache');
  const chindingsSym = Symbol('pino.chindings');
  const asJsonSym = Symbol('pino.asJson');
  const writeSym = Symbol('pino.write');
  const redactFmtSym = Symbol('pino.redactFmt');
  const timeSym = Symbol('pino.time');
  const timeSliceIndexSym = Symbol('pino.timeSliceIndex');
  const streamSym = Symbol('pino.stream');
  const stringifySym = Symbol('pino.stringify');
  const stringifySafeSym = Symbol('pino.stringifySafe');
  const stringifiersSym = Symbol('pino.stringifiers');
  const endSym = Symbol('pino.end');
  const formatOptsSym = Symbol('pino.formatOpts');
  const messageKeySym = Symbol('pino.messageKey');
  const errorKeySym = Symbol('pino.errorKey');
  const nestedKeySym = Symbol('pino.nestedKey');
  const nestedKeyStrSym = Symbol('pino.nestedKeyStr');
  const mixinMergeStrategySym = Symbol('pino.mixinMergeStrategy');
  const msgPrefixSym = Symbol('pino.msgPrefix');
  const wildcardFirstSym = Symbol('pino.wildcardFirst');
  const serializersSym = Symbol.for('pino.serializers');
  const formattersSym = Symbol.for('pino.formatters');
  const hooksSym = Symbol.for('pino.hooks');
  const needsMetadataGsym = Symbol.for('pino.metadata');
  symbols = {
    setLevelSym,
    getLevelSym,
    levelValSym,
    levelCompSym,
    useLevelLabelsSym,
    mixinSym,
    lsCacheSym,
    chindingsSym,
    asJsonSym,
    writeSym,
    serializersSym,
    redactFmtSym,
    timeSym,
    timeSliceIndexSym,
    streamSym,
    stringifySym,
    stringifySafeSym,
    stringifiersSym,
    endSym,
    formatOptsSym,
    messageKeySym,
    errorKeySym,
    nestedKeySym,
    wildcardFirstSym,
    needsMetadataGsym,
    useOnlyCustomLevelsSym,
    formattersSym,
    hooksSym,
    nestedKeyStrSym,
    mixinMergeStrategySym,
    msgPrefixSym,
  };
  return symbols;
}
var redaction_1;
var hasRequiredRedaction;
function requireRedaction() {
  if (hasRequiredRedaction) return redaction_1;
  hasRequiredRedaction = 1;
  const Redact = requireRedact();
  const { redactFmtSym, wildcardFirstSym } = requireSymbols();
  const rx = /[^.[\]]+|\[([^[\]]*?)\]/g;
  const CENSOR = '[Redacted]';
  const strict = false;
  function redaction(opts, serialize) {
    const { paths, censor, remove } = handle(opts);
    const shape = paths.reduce((o, str) => {
      rx.lastIndex = 0;
      const first = rx.exec(str);
      const next = rx.exec(str);
      let ns = first[1] !== void 0 ? first[1].replace(/^(?:"|'|`)(.*)(?:"|'|`)$/, '$1') : first[0];
      if (ns === '*') {
        ns = wildcardFirstSym;
      }
      if (next === null) {
        o[ns] = null;
        return o;
      }
      if (o[ns] === null) {
        return o;
      }
      const { index } = next;
      const nextPath = `${str.substr(index, str.length - 1)}`;
      o[ns] = o[ns] || [];
      if (ns !== wildcardFirstSym && o[ns].length === 0) {
        o[ns].push(...(o[wildcardFirstSym] || []));
      }
      if (ns === wildcardFirstSym) {
        Object.keys(o).forEach(function (k) {
          if (o[k]) {
            o[k].push(nextPath);
          }
        });
      }
      o[ns].push(nextPath);
      return o;
    }, {});
    const result = {
      [redactFmtSym]: Redact({ paths, censor, serialize, strict, remove }),
    };
    const topCensor = (...args) => {
      return typeof censor === 'function' ? serialize(censor(...args)) : serialize(censor);
    };
    return [...Object.keys(shape), ...Object.getOwnPropertySymbols(shape)].reduce((o, k) => {
      if (shape[k] === null) {
        o[k] = (value) => topCensor(value, [k]);
      } else {
        const wrappedCensor =
          typeof censor === 'function'
            ? (value, path2) => {
                return censor(value, [k, ...path2]);
              }
            : censor;
        o[k] = Redact({
          paths: shape[k],
          censor: wrappedCensor,
          serialize,
          strict,
          remove,
        });
      }
      return o;
    }, result);
  }
  function handle(opts) {
    if (Array.isArray(opts)) {
      opts = { paths: opts, censor: CENSOR };
      return opts;
    }
    let { paths, censor = CENSOR, remove } = opts;
    if (Array.isArray(paths) === false) {
      throw Error('pino – redact must contain an array of strings');
    }
    if (remove === true) censor = void 0;
    return { paths, censor, remove };
  }
  redaction_1 = redaction;
  return redaction_1;
}
var time;
var hasRequiredTime;
function requireTime() {
  if (hasRequiredTime) return time;
  hasRequiredTime = 1;
  const nullTime = () => '';
  const epochTime = () => `,"time":${Date.now()}`;
  const unixTime = () => `,"time":${Math.round(Date.now() / 1e3)}`;
  const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`;
  const NS_PER_MS = 1000000n;
  const NS_PER_SEC = 1000000000n;
  const startWallTimeNs = BigInt(Date.now()) * NS_PER_MS;
  const startHrTime = process.hrtime.bigint();
  const isoTimeNano = () => {
    const elapsedNs = process.hrtime.bigint() - startHrTime;
    const currentTimeNs = startWallTimeNs + elapsedNs;
    const secondsSinceEpoch = currentTimeNs / NS_PER_SEC;
    const nanosWithinSecond = currentTimeNs % NS_PER_SEC;
    const msSinceEpoch = Number(secondsSinceEpoch * 1000n + nanosWithinSecond / 1000000n);
    const date = new Date(msSinceEpoch);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    return `,"time":"${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${nanosWithinSecond.toString().padStart(9, '0')}Z"`;
  };
  time = { nullTime, epochTime, unixTime, isoTime, isoTimeNano };
  return time;
}
var quickFormatUnescaped;
var hasRequiredQuickFormatUnescaped;
function requireQuickFormatUnescaped() {
  if (hasRequiredQuickFormatUnescaped) return quickFormatUnescaped;
  hasRequiredQuickFormatUnescaped = 1;
  function tryStringify(o) {
    try {
      return JSON.stringify(o);
    } catch (e) {
      return '"[Circular]"';
    }
  }
  quickFormatUnescaped = format;
  function format(f, args, opts) {
    var ss = (opts && opts.stringify) || tryStringify;
    var offset = 1;
    if (typeof f === 'object' && f !== null) {
      var len = args.length + offset;
      if (len === 1) return f;
      var objects = new Array(len);
      objects[0] = ss(f);
      for (var index = 1; index < len; index++) {
        objects[index] = ss(args[index]);
      }
      return objects.join(' ');
    }
    if (typeof f !== 'string') {
      return f;
    }
    var argLen = args.length;
    if (argLen === 0) return f;
    var str = '';
    var a = 1 - offset;
    var lastPos = -1;
    var flen = (f && f.length) || 0;
    for (var i = 0; i < flen; ) {
      if (f.charCodeAt(i) === 37 && i + 1 < flen) {
        lastPos = lastPos > -1 ? lastPos : 0;
        switch (f.charCodeAt(i + 1)) {
          case 100:
          // 'd'
          case 102:
            if (a >= argLen) break;
            if (args[a] == null) break;
            if (lastPos < i) str += f.slice(lastPos, i);
            str += Number(args[a]);
            lastPos = i + 2;
            i++;
            break;
          case 105:
            if (a >= argLen) break;
            if (args[a] == null) break;
            if (lastPos < i) str += f.slice(lastPos, i);
            str += Math.floor(Number(args[a]));
            lastPos = i + 2;
            i++;
            break;
          case 79:
          // 'O'
          case 111:
          // 'o'
          case 106:
            if (a >= argLen) break;
            if (args[a] === void 0) break;
            if (lastPos < i) str += f.slice(lastPos, i);
            var type = typeof args[a];
            if (type === 'string') {
              str += "'" + args[a] + "'";
              lastPos = i + 2;
              i++;
              break;
            }
            if (type === 'function') {
              str += args[a].name || '<anonymous>';
              lastPos = i + 2;
              i++;
              break;
            }
            str += ss(args[a]);
            lastPos = i + 2;
            i++;
            break;
          case 115:
            if (a >= argLen) break;
            if (lastPos < i) str += f.slice(lastPos, i);
            str += String(args[a]);
            lastPos = i + 2;
            i++;
            break;
          case 37:
            if (lastPos < i) str += f.slice(lastPos, i);
            str += '%';
            lastPos = i + 2;
            i++;
            a--;
            break;
        }
        ++a;
      }
      ++i;
    }
    if (lastPos === -1) return f;
    else if (lastPos < flen) {
      str += f.slice(lastPos);
    }
    return str;
  }
  return quickFormatUnescaped;
}
var atomicSleep = { exports: {} };
var hasRequiredAtomicSleep;
function requireAtomicSleep() {
  if (hasRequiredAtomicSleep) return atomicSleep.exports;
  hasRequiredAtomicSleep = 1;
  if (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined') {
    let sleep = function (ms) {
      const valid = ms > 0 && ms < Infinity;
      if (valid === false) {
        if (typeof ms !== 'number' && typeof ms !== 'bigint') {
          throw TypeError('sleep: ms must be a number');
        }
        throw RangeError(
          'sleep: ms must be a number that is greater than 0 but less than Infinity'
        );
      }
      Atomics.wait(nil, 0, 0, Number(ms));
    };
    const nil = new Int32Array(new SharedArrayBuffer(4));
    atomicSleep.exports = sleep;
  } else {
    let sleep = function (ms) {
      const valid = ms > 0 && ms < Infinity;
      if (valid === false) {
        if (typeof ms !== 'number' && typeof ms !== 'bigint') {
          throw TypeError('sleep: ms must be a number');
        }
        throw RangeError(
          'sleep: ms must be a number that is greater than 0 but less than Infinity'
        );
      }
    };
    atomicSleep.exports = sleep;
  }
  return atomicSleep.exports;
}
var sonicBoom;
var hasRequiredSonicBoom;
function requireSonicBoom() {
  if (hasRequiredSonicBoom) return sonicBoom;
  hasRequiredSonicBoom = 1;
  const fs = require$$0$2;
  const EventEmitter = require$$1;
  const inherits = require$$2$1.inherits;
  const path$1 = path;
  const sleep = requireAtomicSleep();
  const assert = require$$5;
  const BUSY_WRITE_TIMEOUT = 100;
  const kEmptyBuffer = Buffer.allocUnsafe(0);
  const MAX_WRITE = 16 * 1024;
  const kContentModeBuffer = 'buffer';
  const kContentModeUtf8 = 'utf8';
  const [major, minor] = (process.versions.node || '0.0').split('.').map(Number);
  const kCopyBuffer = major >= 22 && minor >= 7;
  function openFile(file, sonic) {
    sonic._opening = true;
    sonic._writing = true;
    sonic._asyncDrainScheduled = false;
    function fileOpened(err2, fd) {
      if (err2) {
        sonic._reopening = false;
        sonic._writing = false;
        sonic._opening = false;
        if (sonic.sync) {
          process.nextTick(() => {
            if (sonic.listenerCount('error') > 0) {
              sonic.emit('error', err2);
            }
          });
        } else {
          sonic.emit('error', err2);
        }
        return;
      }
      const reopening = sonic._reopening;
      sonic.fd = fd;
      sonic.file = file;
      sonic._reopening = false;
      sonic._opening = false;
      sonic._writing = false;
      if (sonic.sync) {
        process.nextTick(() => sonic.emit('ready'));
      } else {
        sonic.emit('ready');
      }
      if (sonic.destroyed) {
        return;
      }
      if ((!sonic._writing && sonic._len > sonic.minLength) || sonic._flushPending) {
        sonic._actualWrite();
      } else if (reopening) {
        process.nextTick(() => sonic.emit('drain'));
      }
    }
    const flags = sonic.append ? 'a' : 'w';
    const mode = sonic.mode;
    if (sonic.sync) {
      try {
        if (sonic.mkdir) fs.mkdirSync(path$1.dirname(file), { recursive: true });
        const fd = fs.openSync(file, flags, mode);
        fileOpened(null, fd);
      } catch (err2) {
        fileOpened(err2);
        throw err2;
      }
    } else if (sonic.mkdir) {
      fs.mkdir(path$1.dirname(file), { recursive: true }, (err2) => {
        if (err2) return fileOpened(err2);
        fs.open(file, flags, mode, fileOpened);
      });
    } else {
      fs.open(file, flags, mode, fileOpened);
    }
  }
  function SonicBoom(opts) {
    if (!(this instanceof SonicBoom)) {
      return new SonicBoom(opts);
    }
    let {
      fd,
      dest,
      minLength,
      maxLength,
      maxWrite,
      periodicFlush,
      sync,
      append = true,
      mkdir,
      retryEAGAIN,
      fsync,
      contentMode,
      mode,
    } = opts || {};
    fd = fd || dest;
    this._len = 0;
    this.fd = -1;
    this._bufs = [];
    this._lens = [];
    this._writing = false;
    this._ending = false;
    this._reopening = false;
    this._asyncDrainScheduled = false;
    this._flushPending = false;
    this._hwm = Math.max(minLength || 0, 16387);
    this.file = null;
    this.destroyed = false;
    this.minLength = minLength || 0;
    this.maxLength = maxLength || 0;
    this.maxWrite = maxWrite || MAX_WRITE;
    this._periodicFlush = periodicFlush || 0;
    this._periodicFlushTimer = void 0;
    this.sync = sync || false;
    this.writable = true;
    this._fsync = fsync || false;
    this.append = append || false;
    this.mode = mode;
    this.retryEAGAIN = retryEAGAIN || (() => true);
    this.mkdir = mkdir || false;
    let fsWriteSync;
    let fsWrite;
    if (contentMode === kContentModeBuffer) {
      this._writingBuf = kEmptyBuffer;
      this.write = writeBuffer;
      this.flush = flushBuffer;
      this.flushSync = flushBufferSync;
      this._actualWrite = actualWriteBuffer;
      fsWriteSync = () => fs.writeSync(this.fd, this._writingBuf);
      fsWrite = () => fs.write(this.fd, this._writingBuf, this.release);
    } else if (contentMode === void 0 || contentMode === kContentModeUtf8) {
      this._writingBuf = '';
      this.write = write;
      this.flush = flush;
      this.flushSync = flushSync;
      this._actualWrite = actualWrite;
      fsWriteSync = () => {
        if (Buffer.isBuffer(this._writingBuf)) {
          return fs.writeSync(this.fd, this._writingBuf);
        }
        return fs.writeSync(this.fd, this._writingBuf, 'utf8');
      };
      fsWrite = () => {
        if (Buffer.isBuffer(this._writingBuf)) {
          return fs.write(this.fd, this._writingBuf, this.release);
        }
        return fs.write(this.fd, this._writingBuf, 'utf8', this.release);
      };
    } else {
      throw new Error(
        `SonicBoom supports "${kContentModeUtf8}" and "${kContentModeBuffer}", but passed ${contentMode}`
      );
    }
    if (typeof fd === 'number') {
      this.fd = fd;
      process.nextTick(() => this.emit('ready'));
    } else if (typeof fd === 'string') {
      openFile(fd, this);
    } else {
      throw new Error('SonicBoom supports only file descriptors and files');
    }
    if (this.minLength >= this.maxWrite) {
      throw new Error(`minLength should be smaller than maxWrite (${this.maxWrite})`);
    }
    this.release = (err2, n) => {
      if (err2) {
        if (
          (err2.code === 'EAGAIN' || err2.code === 'EBUSY') &&
          this.retryEAGAIN(err2, this._writingBuf.length, this._len - this._writingBuf.length)
        ) {
          if (this.sync) {
            try {
              sleep(BUSY_WRITE_TIMEOUT);
              this.release(void 0, 0);
            } catch (err3) {
              this.release(err3);
            }
          } else {
            setTimeout(fsWrite, BUSY_WRITE_TIMEOUT);
          }
        } else {
          this._writing = false;
          this.emit('error', err2);
        }
        return;
      }
      this.emit('write', n);
      const releasedBufObj = releaseWritingBuf(this._writingBuf, this._len, n);
      this._len = releasedBufObj.len;
      this._writingBuf = releasedBufObj.writingBuf;
      if (this._writingBuf.length) {
        if (!this.sync) {
          fsWrite();
          return;
        }
        try {
          do {
            const n2 = fsWriteSync();
            const releasedBufObj2 = releaseWritingBuf(this._writingBuf, this._len, n2);
            this._len = releasedBufObj2.len;
            this._writingBuf = releasedBufObj2.writingBuf;
          } while (this._writingBuf.length);
        } catch (err3) {
          this.release(err3);
          return;
        }
      }
      if (this._fsync) {
        fs.fsyncSync(this.fd);
      }
      const len = this._len;
      if (this._reopening) {
        this._writing = false;
        this._reopening = false;
        this.reopen();
      } else if (len > this.minLength) {
        this._actualWrite();
      } else if (this._ending) {
        if (len > 0) {
          this._actualWrite();
        } else {
          this._writing = false;
          actualClose(this);
        }
      } else {
        this._writing = false;
        if (this.sync) {
          if (!this._asyncDrainScheduled) {
            this._asyncDrainScheduled = true;
            process.nextTick(emitDrain, this);
          }
        } else {
          this.emit('drain');
        }
      }
    };
    this.on('newListener', function (name) {
      if (name === 'drain') {
        this._asyncDrainScheduled = false;
      }
    });
    if (this._periodicFlush !== 0) {
      this._periodicFlushTimer = setInterval(() => this.flush(null), this._periodicFlush);
      this._periodicFlushTimer.unref();
    }
  }
  function releaseWritingBuf(writingBuf, len, n) {
    if (typeof writingBuf === 'string') {
      writingBuf = Buffer.from(writingBuf);
    }
    len = Math.max(len - n, 0);
    writingBuf = writingBuf.subarray(n);
    return { writingBuf, len };
  }
  function emitDrain(sonic) {
    const hasListeners = sonic.listenerCount('drain') > 0;
    if (!hasListeners) return;
    sonic._asyncDrainScheduled = false;
    sonic.emit('drain');
  }
  inherits(SonicBoom, EventEmitter);
  function mergeBuf(bufs, len) {
    if (bufs.length === 0) {
      return kEmptyBuffer;
    }
    if (bufs.length === 1) {
      return bufs[0];
    }
    return Buffer.concat(bufs, len);
  }
  function write(data) {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    data = '' + data;
    const dataLen = Buffer.byteLength(data);
    const len = this._len + dataLen;
    const bufs = this._bufs;
    if (this.maxLength && len > this.maxLength) {
      this.emit('drop', data);
      return this._len < this._hwm;
    }
    if (bufs.length === 0 || Buffer.byteLength(bufs[bufs.length - 1]) + dataLen > this.maxWrite) {
      bufs.push(data);
    } else {
      bufs[bufs.length - 1] += data;
    }
    this._len = len;
    if (!this._writing && this._len >= this.minLength) {
      this._actualWrite();
    }
    return this._len < this._hwm;
  }
  function writeBuffer(data) {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    const len = this._len + data.length;
    const bufs = this._bufs;
    const lens = this._lens;
    if (this.maxLength && len > this.maxLength) {
      this.emit('drop', data);
      return this._len < this._hwm;
    }
    if (bufs.length === 0 || lens[lens.length - 1] + data.length > this.maxWrite) {
      bufs.push([data]);
      lens.push(data.length);
    } else {
      bufs[bufs.length - 1].push(data);
      lens[lens.length - 1] += data.length;
    }
    this._len = len;
    if (!this._writing && this._len >= this.minLength) {
      this._actualWrite();
    }
    return this._len < this._hwm;
  }
  function callFlushCallbackOnDrain(cb) {
    this._flushPending = true;
    const onDrain = () => {
      if (!this._fsync) {
        try {
          fs.fsync(this.fd, (err2) => {
            this._flushPending = false;
            cb(err2);
          });
        } catch (err2) {
          cb(err2);
        }
      } else {
        this._flushPending = false;
        cb();
      }
      this.off('error', onError);
    };
    const onError = (err2) => {
      this._flushPending = false;
      cb(err2);
      this.off('drain', onDrain);
    };
    this.once('drain', onDrain);
    this.once('error', onError);
  }
  function flush(cb) {
    if (cb != null && typeof cb !== 'function') {
      throw new Error('flush cb must be a function');
    }
    if (this.destroyed) {
      const error = new Error('SonicBoom destroyed');
      if (cb) {
        cb(error);
        return;
      }
      throw error;
    }
    if (this.minLength <= 0) {
      cb == null ? void 0 : cb();
      return;
    }
    if (cb) {
      callFlushCallbackOnDrain.call(this, cb);
    }
    if (this._writing) {
      return;
    }
    if (this._bufs.length === 0) {
      this._bufs.push('');
    }
    this._actualWrite();
  }
  function flushBuffer(cb) {
    if (cb != null && typeof cb !== 'function') {
      throw new Error('flush cb must be a function');
    }
    if (this.destroyed) {
      const error = new Error('SonicBoom destroyed');
      if (cb) {
        cb(error);
        return;
      }
      throw error;
    }
    if (this.minLength <= 0) {
      cb == null ? void 0 : cb();
      return;
    }
    if (cb) {
      callFlushCallbackOnDrain.call(this, cb);
    }
    if (this._writing) {
      return;
    }
    if (this._bufs.length === 0) {
      this._bufs.push([]);
      this._lens.push(0);
    }
    this._actualWrite();
  }
  SonicBoom.prototype.reopen = function (file) {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    if (this._opening) {
      this.once('ready', () => {
        this.reopen(file);
      });
      return;
    }
    if (this._ending) {
      return;
    }
    if (!this.file) {
      throw new Error('Unable to reopen a file descriptor, you must pass a file to SonicBoom');
    }
    if (file) {
      this.file = file;
    }
    this._reopening = true;
    if (this._writing) {
      return;
    }
    const fd = this.fd;
    this.once('ready', () => {
      if (fd !== this.fd) {
        fs.close(fd, (err2) => {
          if (err2) {
            return this.emit('error', err2);
          }
        });
      }
    });
    openFile(this.file, this);
  };
  SonicBoom.prototype.end = function () {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    if (this._opening) {
      this.once('ready', () => {
        this.end();
      });
      return;
    }
    if (this._ending) {
      return;
    }
    this._ending = true;
    if (this._writing) {
      return;
    }
    if (this._len > 0 && this.fd >= 0) {
      this._actualWrite();
    } else {
      actualClose(this);
    }
  };
  function flushSync() {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    if (this.fd < 0) {
      throw new Error('sonic boom is not ready yet');
    }
    if (!this._writing && this._writingBuf.length > 0) {
      this._bufs.unshift(this._writingBuf);
      this._writingBuf = '';
    }
    let buf = '';
    while (this._bufs.length || buf.length) {
      if (buf.length <= 0) {
        buf = this._bufs[0];
      }
      try {
        const n = Buffer.isBuffer(buf)
          ? fs.writeSync(this.fd, buf)
          : fs.writeSync(this.fd, buf, 'utf8');
        const releasedBufObj = releaseWritingBuf(buf, this._len, n);
        buf = releasedBufObj.writingBuf;
        this._len = releasedBufObj.len;
        if (buf.length <= 0) {
          this._bufs.shift();
        }
      } catch (err2) {
        const shouldRetry = err2.code === 'EAGAIN' || err2.code === 'EBUSY';
        if (shouldRetry && !this.retryEAGAIN(err2, buf.length, this._len - buf.length)) {
          throw err2;
        }
        sleep(BUSY_WRITE_TIMEOUT);
      }
    }
    try {
      fs.fsyncSync(this.fd);
    } catch {}
  }
  function flushBufferSync() {
    if (this.destroyed) {
      throw new Error('SonicBoom destroyed');
    }
    if (this.fd < 0) {
      throw new Error('sonic boom is not ready yet');
    }
    if (!this._writing && this._writingBuf.length > 0) {
      this._bufs.unshift([this._writingBuf]);
      this._writingBuf = kEmptyBuffer;
    }
    let buf = kEmptyBuffer;
    while (this._bufs.length || buf.length) {
      if (buf.length <= 0) {
        buf = mergeBuf(this._bufs[0], this._lens[0]);
      }
      try {
        const n = fs.writeSync(this.fd, buf);
        buf = buf.subarray(n);
        this._len = Math.max(this._len - n, 0);
        if (buf.length <= 0) {
          this._bufs.shift();
          this._lens.shift();
        }
      } catch (err2) {
        const shouldRetry = err2.code === 'EAGAIN' || err2.code === 'EBUSY';
        if (shouldRetry && !this.retryEAGAIN(err2, buf.length, this._len - buf.length)) {
          throw err2;
        }
        sleep(BUSY_WRITE_TIMEOUT);
      }
    }
  }
  SonicBoom.prototype.destroy = function () {
    if (this.destroyed) {
      return;
    }
    actualClose(this);
  };
  function actualWrite() {
    const release = this.release;
    this._writing = true;
    this._writingBuf = this._writingBuf.length ? this._writingBuf : this._bufs.shift() || '';
    if (this.sync) {
      try {
        const written = Buffer.isBuffer(this._writingBuf)
          ? fs.writeSync(this.fd, this._writingBuf)
          : fs.writeSync(this.fd, this._writingBuf, 'utf8');
        release(null, written);
      } catch (err2) {
        release(err2);
      }
    } else {
      fs.write(this.fd, this._writingBuf, release);
    }
  }
  function actualWriteBuffer() {
    const release = this.release;
    this._writing = true;
    this._writingBuf = this._writingBuf.length
      ? this._writingBuf
      : mergeBuf(this._bufs.shift(), this._lens.shift());
    if (this.sync) {
      try {
        const written = fs.writeSync(this.fd, this._writingBuf);
        release(null, written);
      } catch (err2) {
        release(err2);
      }
    } else {
      if (kCopyBuffer) {
        this._writingBuf = Buffer.from(this._writingBuf);
      }
      fs.write(this.fd, this._writingBuf, release);
    }
  }
  function actualClose(sonic) {
    if (sonic.fd === -1) {
      sonic.once('ready', actualClose.bind(null, sonic));
      return;
    }
    if (sonic._periodicFlushTimer !== void 0) {
      clearInterval(sonic._periodicFlushTimer);
    }
    sonic.destroyed = true;
    sonic._bufs = [];
    sonic._lens = [];
    assert(typeof sonic.fd === 'number', `sonic.fd must be a number, got ${typeof sonic.fd}`);
    try {
      fs.fsync(sonic.fd, closeWrapped);
    } catch {}
    function closeWrapped() {
      if (sonic.fd !== 1 && sonic.fd !== 2) {
        fs.close(sonic.fd, done);
      } else {
        done();
      }
    }
    function done(err2) {
      if (err2) {
        sonic.emit('error', err2);
        return;
      }
      if (sonic._ending && !sonic._writing) {
        sonic.emit('finish');
      }
      sonic.emit('close');
    }
  }
  SonicBoom.SonicBoom = SonicBoom;
  SonicBoom.default = SonicBoom;
  sonicBoom = SonicBoom;
  return sonicBoom;
}
var onExitLeakFree;
var hasRequiredOnExitLeakFree;
function requireOnExitLeakFree() {
  if (hasRequiredOnExitLeakFree) return onExitLeakFree;
  hasRequiredOnExitLeakFree = 1;
  const refs = {
    exit: [],
    beforeExit: [],
  };
  const functions = {
    exit: onExit,
    beforeExit: onBeforeExit,
  };
  let registry;
  function ensureRegistry() {
    if (registry === void 0) {
      registry = new FinalizationRegistry(clear);
    }
  }
  function install(event) {
    if (refs[event].length > 0) {
      return;
    }
    process.on(event, functions[event]);
  }
  function uninstall(event) {
    if (refs[event].length > 0) {
      return;
    }
    process.removeListener(event, functions[event]);
    if (refs.exit.length === 0 && refs.beforeExit.length === 0) {
      registry = void 0;
    }
  }
  function onExit() {
    callRefs('exit');
  }
  function onBeforeExit() {
    callRefs('beforeExit');
  }
  function callRefs(event) {
    for (const ref of refs[event]) {
      const obj = ref.deref();
      const fn = ref.fn;
      if (obj !== void 0) {
        fn(obj, event);
      }
    }
    refs[event] = [];
  }
  function clear(ref) {
    for (const event of ['exit', 'beforeExit']) {
      const index = refs[event].indexOf(ref);
      refs[event].splice(index, index + 1);
      uninstall(event);
    }
  }
  function _register(event, obj, fn) {
    if (obj === void 0) {
      throw new Error("the object can't be undefined");
    }
    install(event);
    const ref = new WeakRef(obj);
    ref.fn = fn;
    ensureRegistry();
    registry.register(obj, ref);
    refs[event].push(ref);
  }
  function register(obj, fn) {
    _register('exit', obj, fn);
  }
  function registerBeforeExit(obj, fn) {
    _register('beforeExit', obj, fn);
  }
  function unregister(obj) {
    if (registry === void 0) {
      return;
    }
    registry.unregister(obj);
    for (const event of ['exit', 'beforeExit']) {
      refs[event] = refs[event].filter((ref) => {
        const _obj = ref.deref();
        return _obj && _obj !== obj;
      });
      uninstall(event);
    }
  }
  onExitLeakFree = {
    register,
    registerBeforeExit,
    unregister,
  };
  return onExitLeakFree;
}
const version = '3.1.0';
const require$$0 = {
  version,
};
var wait_1;
var hasRequiredWait;
function requireWait() {
  if (hasRequiredWait) return wait_1;
  hasRequiredWait = 1;
  const MAX_TIMEOUT = 1e3;
  function wait(state, index, expected, timeout, done) {
    const max = Date.now() + timeout;
    let current = Atomics.load(state, index);
    if (current === expected) {
      done(null, 'ok');
      return;
    }
    let prior = current;
    const check = (backoff) => {
      if (Date.now() > max) {
        done(null, 'timed-out');
      } else {
        setTimeout(() => {
          prior = current;
          current = Atomics.load(state, index);
          if (current === prior) {
            check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
          } else {
            if (current === expected) done(null, 'ok');
            else done(null, 'not-equal');
          }
        }, backoff);
      }
    };
    check(1);
  }
  function waitDiff(state, index, expected, timeout, done) {
    const max = Date.now() + timeout;
    let current = Atomics.load(state, index);
    if (current !== expected) {
      done(null, 'ok');
      return;
    }
    const check = (backoff) => {
      if (Date.now() > max) {
        done(null, 'timed-out');
      } else {
        setTimeout(() => {
          current = Atomics.load(state, index);
          if (current !== expected) {
            done(null, 'ok');
          } else {
            check(backoff >= MAX_TIMEOUT ? MAX_TIMEOUT : backoff * 2);
          }
        }, backoff);
      }
    };
    check(1);
  }
  wait_1 = { wait, waitDiff };
  return wait_1;
}
var indexes;
var hasRequiredIndexes;
function requireIndexes() {
  if (hasRequiredIndexes) return indexes;
  hasRequiredIndexes = 1;
  const WRITE_INDEX = 4;
  const READ_INDEX = 8;
  indexes = {
    WRITE_INDEX,
    READ_INDEX,
  };
  return indexes;
}
var threadStream;
var hasRequiredThreadStream;
function requireThreadStream() {
  if (hasRequiredThreadStream) return threadStream;
  hasRequiredThreadStream = 1;
  const { version: version2 } = require$$0;
  const { EventEmitter } = require$$1;
  const { Worker } = require$$2$2;
  const { join } = path;
  const { pathToFileURL } = require$$4;
  const { wait } = requireWait();
  const { WRITE_INDEX, READ_INDEX } = requireIndexes();
  const buffer = require$$7;
  const assert = require$$5;
  const kImpl = Symbol('kImpl');
  const MAX_STRING = buffer.constants.MAX_STRING_LENGTH;
  class FakeWeakRef {
    constructor(value) {
      this._value = value;
    }
    deref() {
      return this._value;
    }
  }
  class FakeFinalizationRegistry {
    register() {}
    unregister() {}
  }
  const FinalizationRegistry2 = process.env.NODE_V8_COVERAGE
    ? FakeFinalizationRegistry
    : commonjsGlobal.FinalizationRegistry || FakeFinalizationRegistry;
  const WeakRef2 = process.env.NODE_V8_COVERAGE
    ? FakeWeakRef
    : commonjsGlobal.WeakRef || FakeWeakRef;
  const registry = new FinalizationRegistry2((worker) => {
    if (worker.exited) {
      return;
    }
    worker.terminate();
  });
  function createWorker(stream, opts) {
    const { filename, workerData } = opts;
    const bundlerOverrides =
      '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};
    const toExecute =
      bundlerOverrides['thread-stream-worker'] || join(__dirname, 'lib', 'worker.js');
    const worker = new Worker(toExecute, {
      ...opts.workerOpts,
      trackUnmanagedFds: false,
      workerData: {
        filename: filename.indexOf('file://') === 0 ? filename : pathToFileURL(filename).href,
        dataBuf: stream[kImpl].dataBuf,
        stateBuf: stream[kImpl].stateBuf,
        workerData: {
          $context: {
            threadStreamVersion: version2,
          },
          ...workerData,
        },
      },
    });
    worker.stream = new FakeWeakRef(stream);
    worker.on('message', onWorkerMessage);
    worker.on('exit', onWorkerExit);
    registry.register(stream, worker);
    return worker;
  }
  function drain(stream) {
    assert(!stream[kImpl].sync);
    if (stream[kImpl].needDrain) {
      stream[kImpl].needDrain = false;
      stream.emit('drain');
    }
  }
  function nextFlush(stream) {
    const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
    let leftover = stream[kImpl].data.length - writeIndex;
    if (leftover > 0) {
      if (stream[kImpl].buf.length === 0) {
        stream[kImpl].flushing = false;
        if (stream[kImpl].ending) {
          end(stream);
        } else if (stream[kImpl].needDrain) {
          process.nextTick(drain, stream);
        }
        return;
      }
      let toWrite = stream[kImpl].buf.slice(0, leftover);
      let toWriteBytes = Buffer.byteLength(toWrite);
      if (toWriteBytes <= leftover) {
        stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
        write(stream, toWrite, nextFlush.bind(null, stream));
      } else {
        stream.flush(() => {
          if (stream.destroyed) {
            return;
          }
          Atomics.store(stream[kImpl].state, READ_INDEX, 0);
          Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
          while (toWriteBytes > stream[kImpl].data.length) {
            leftover = leftover / 2;
            toWrite = stream[kImpl].buf.slice(0, leftover);
            toWriteBytes = Buffer.byteLength(toWrite);
          }
          stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
          write(stream, toWrite, nextFlush.bind(null, stream));
        });
      }
    } else if (leftover === 0) {
      if (writeIndex === 0 && stream[kImpl].buf.length === 0) {
        return;
      }
      stream.flush(() => {
        Atomics.store(stream[kImpl].state, READ_INDEX, 0);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
        nextFlush(stream);
      });
    } else {
      destroy(stream, new Error('overwritten'));
    }
  }
  function onWorkerMessage(msg) {
    const stream = this.stream.deref();
    if (stream === void 0) {
      this.exited = true;
      this.terminate();
      return;
    }
    switch (msg.code) {
      case 'READY':
        this.stream = new WeakRef2(stream);
        stream.flush(() => {
          stream[kImpl].ready = true;
          stream.emit('ready');
        });
        break;
      case 'ERROR':
        destroy(stream, msg.err);
        break;
      case 'EVENT':
        if (Array.isArray(msg.args)) {
          stream.emit(msg.name, ...msg.args);
        } else {
          stream.emit(msg.name, msg.args);
        }
        break;
      case 'WARNING':
        process.emitWarning(msg.err);
        break;
      default:
        destroy(stream, new Error('this should not happen: ' + msg.code));
    }
  }
  function onWorkerExit(code) {
    const stream = this.stream.deref();
    if (stream === void 0) {
      return;
    }
    registry.unregister(stream);
    stream.worker.exited = true;
    stream.worker.off('exit', onWorkerExit);
    destroy(stream, code !== 0 ? new Error('the worker thread exited') : null);
  }
  class ThreadStream extends EventEmitter {
    constructor(opts = {}) {
      super();
      if (opts.bufferSize < 4) {
        throw new Error('bufferSize must at least fit a 4-byte utf-8 char');
      }
      this[kImpl] = {};
      this[kImpl].stateBuf = new SharedArrayBuffer(128);
      this[kImpl].state = new Int32Array(this[kImpl].stateBuf);
      this[kImpl].dataBuf = new SharedArrayBuffer(opts.bufferSize || 4 * 1024 * 1024);
      this[kImpl].data = Buffer.from(this[kImpl].dataBuf);
      this[kImpl].sync = opts.sync || false;
      this[kImpl].ending = false;
      this[kImpl].ended = false;
      this[kImpl].needDrain = false;
      this[kImpl].destroyed = false;
      this[kImpl].flushing = false;
      this[kImpl].ready = false;
      this[kImpl].finished = false;
      this[kImpl].errored = null;
      this[kImpl].closed = false;
      this[kImpl].buf = '';
      this.worker = createWorker(this, opts);
      this.on('message', (message, transferList) => {
        this.worker.postMessage(message, transferList);
      });
    }
    write(data) {
      if (this[kImpl].destroyed) {
        error(this, new Error('the worker has exited'));
        return false;
      }
      if (this[kImpl].ending) {
        error(this, new Error('the worker is ending'));
        return false;
      }
      if (this[kImpl].flushing && this[kImpl].buf.length + data.length >= MAX_STRING) {
        try {
          writeSync(this);
          this[kImpl].flushing = true;
        } catch (err2) {
          destroy(this, err2);
          return false;
        }
      }
      this[kImpl].buf += data;
      if (this[kImpl].sync) {
        try {
          writeSync(this);
          return true;
        } catch (err2) {
          destroy(this, err2);
          return false;
        }
      }
      if (!this[kImpl].flushing) {
        this[kImpl].flushing = true;
        setImmediate(nextFlush, this);
      }
      this[kImpl].needDrain =
        this[kImpl].data.length -
          this[kImpl].buf.length -
          Atomics.load(this[kImpl].state, WRITE_INDEX) <=
        0;
      return !this[kImpl].needDrain;
    }
    end() {
      if (this[kImpl].destroyed) {
        return;
      }
      this[kImpl].ending = true;
      end(this);
    }
    flush(cb) {
      if (this[kImpl].destroyed) {
        if (typeof cb === 'function') {
          process.nextTick(cb, new Error('the worker has exited'));
        }
        return;
      }
      const writeIndex = Atomics.load(this[kImpl].state, WRITE_INDEX);
      wait(this[kImpl].state, READ_INDEX, writeIndex, Infinity, (err2, res2) => {
        if (err2) {
          destroy(this, err2);
          process.nextTick(cb, err2);
          return;
        }
        if (res2 === 'not-equal') {
          this.flush(cb);
          return;
        }
        process.nextTick(cb);
      });
    }
    flushSync() {
      if (this[kImpl].destroyed) {
        return;
      }
      writeSync(this);
      flushSync(this);
    }
    unref() {
      this.worker.unref();
    }
    ref() {
      this.worker.ref();
    }
    get ready() {
      return this[kImpl].ready;
    }
    get destroyed() {
      return this[kImpl].destroyed;
    }
    get closed() {
      return this[kImpl].closed;
    }
    get writable() {
      return !this[kImpl].destroyed && !this[kImpl].ending;
    }
    get writableEnded() {
      return this[kImpl].ending;
    }
    get writableFinished() {
      return this[kImpl].finished;
    }
    get writableNeedDrain() {
      return this[kImpl].needDrain;
    }
    get writableObjectMode() {
      return false;
    }
    get writableErrored() {
      return this[kImpl].errored;
    }
  }
  function error(stream, err2) {
    setImmediate(() => {
      stream.emit('error', err2);
    });
  }
  function destroy(stream, err2) {
    if (stream[kImpl].destroyed) {
      return;
    }
    stream[kImpl].destroyed = true;
    if (err2) {
      stream[kImpl].errored = err2;
      error(stream, err2);
    }
    if (!stream.worker.exited) {
      stream.worker
        .terminate()
        .catch(() => {})
        .then(() => {
          stream[kImpl].closed = true;
          stream.emit('close');
        });
    } else {
      setImmediate(() => {
        stream[kImpl].closed = true;
        stream.emit('close');
      });
    }
  }
  function write(stream, data, cb) {
    const current = Atomics.load(stream[kImpl].state, WRITE_INDEX);
    const length = Buffer.byteLength(data);
    stream[kImpl].data.write(data, current);
    Atomics.store(stream[kImpl].state, WRITE_INDEX, current + length);
    Atomics.notify(stream[kImpl].state, WRITE_INDEX);
    cb();
    return true;
  }
  function end(stream) {
    if (stream[kImpl].ended || !stream[kImpl].ending || stream[kImpl].flushing) {
      return;
    }
    stream[kImpl].ended = true;
    try {
      stream.flushSync();
      let readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
      Atomics.store(stream[kImpl].state, WRITE_INDEX, -1);
      Atomics.notify(stream[kImpl].state, WRITE_INDEX);
      let spins = 0;
      while (readIndex !== -1) {
        Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
        readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
        if (readIndex === -2) {
          destroy(stream, new Error('end() failed'));
          return;
        }
        if (++spins === 10) {
          destroy(stream, new Error('end() took too long (10s)'));
          return;
        }
      }
      process.nextTick(() => {
        stream[kImpl].finished = true;
        stream.emit('finish');
      });
    } catch (err2) {
      destroy(stream, err2);
    }
  }
  function writeSync(stream) {
    const cb = () => {
      if (stream[kImpl].ending) {
        end(stream);
      } else if (stream[kImpl].needDrain) {
        process.nextTick(drain, stream);
      }
    };
    stream[kImpl].flushing = false;
    while (stream[kImpl].buf.length !== 0) {
      const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
      let leftover = stream[kImpl].data.length - writeIndex;
      if (leftover === 0) {
        flushSync(stream);
        Atomics.store(stream[kImpl].state, READ_INDEX, 0);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
        continue;
      } else if (leftover < 0) {
        throw new Error('overwritten');
      }
      let toWrite = stream[kImpl].buf.slice(0, leftover);
      let toWriteBytes = Buffer.byteLength(toWrite);
      if (toWriteBytes <= leftover) {
        stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
        write(stream, toWrite, cb);
      } else {
        flushSync(stream);
        Atomics.store(stream[kImpl].state, READ_INDEX, 0);
        Atomics.store(stream[kImpl].state, WRITE_INDEX, 0);
        while (toWriteBytes > stream[kImpl].buf.length) {
          leftover = leftover / 2;
          toWrite = stream[kImpl].buf.slice(0, leftover);
          toWriteBytes = Buffer.byteLength(toWrite);
        }
        stream[kImpl].buf = stream[kImpl].buf.slice(leftover);
        write(stream, toWrite, cb);
      }
    }
  }
  function flushSync(stream) {
    if (stream[kImpl].flushing) {
      throw new Error('unable to flush while flushing');
    }
    const writeIndex = Atomics.load(stream[kImpl].state, WRITE_INDEX);
    let spins = 0;
    while (true) {
      const readIndex = Atomics.load(stream[kImpl].state, READ_INDEX);
      if (readIndex === -2) {
        throw Error('_flushSync failed');
      }
      if (readIndex !== writeIndex) {
        Atomics.wait(stream[kImpl].state, READ_INDEX, readIndex, 1e3);
      } else {
        break;
      }
      if (++spins === 10) {
        throw new Error('_flushSync took too long (10s)');
      }
    }
  }
  threadStream = ThreadStream;
  return threadStream;
}
var transport_1;
var hasRequiredTransport;
function requireTransport() {
  if (hasRequiredTransport) return transport_1;
  hasRequiredTransport = 1;
  const { createRequire } = require$$0$3;
  const getCallers = requireCaller();
  const { join, isAbsolute, sep } = require$$2;
  const sleep = requireAtomicSleep();
  const onExit = requireOnExitLeakFree();
  const ThreadStream = requireThreadStream();
  function setupOnExit(stream) {
    onExit.register(stream, autoEnd);
    onExit.registerBeforeExit(stream, flush);
    stream.on('close', function () {
      onExit.unregister(stream);
    });
  }
  function buildStream(filename, workerData, workerOpts, sync) {
    const stream = new ThreadStream({
      filename,
      workerData,
      workerOpts,
      sync,
    });
    stream.on('ready', onReady);
    stream.on('close', function () {
      process.removeListener('exit', onExit2);
    });
    process.on('exit', onExit2);
    function onReady() {
      process.removeListener('exit', onExit2);
      stream.unref();
      if (workerOpts.autoEnd !== false) {
        setupOnExit(stream);
      }
    }
    function onExit2() {
      if (stream.closed) {
        return;
      }
      stream.flushSync();
      sleep(100);
      stream.end();
    }
    return stream;
  }
  function autoEnd(stream) {
    stream.ref();
    stream.flushSync();
    stream.end();
    stream.once('close', function () {
      stream.unref();
    });
  }
  function flush(stream) {
    stream.flushSync();
  }
  function transport(fullOptions) {
    const {
      pipeline,
      targets,
      levels: levels2,
      dedupe,
      worker = {},
      caller: caller2 = getCallers(),
      sync = false,
    } = fullOptions;
    const options = {
      ...fullOptions.options,
    };
    const callers = typeof caller2 === 'string' ? [caller2] : caller2;
    const bundlerOverrides =
      '__bundlerPathsOverrides' in globalThis ? globalThis.__bundlerPathsOverrides : {};
    let target = fullOptions.target;
    if (target && targets) {
      throw new Error('only one of target or targets can be specified');
    }
    if (targets) {
      target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
      options.targets = targets
        .filter((dest) => dest.target)
        .map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target),
          };
        });
      options.pipelines = targets
        .filter((dest) => dest.pipeline)
        .map((dest) => {
          return dest.pipeline.map((t) => {
            return {
              ...t,
              level: dest.level,
              // duplicate the pipeline `level` property defined in the upper level
              target: fixTarget(t.target),
            };
          });
        });
    } else if (pipeline) {
      target = bundlerOverrides['pino-worker'] || join(__dirname, 'worker.js');
      options.pipelines = [
        pipeline.map((dest) => {
          return {
            ...dest,
            target: fixTarget(dest.target),
          };
        }),
      ];
    }
    if (levels2) {
      options.levels = levels2;
    }
    if (dedupe) {
      options.dedupe = dedupe;
    }
    options.pinoWillSendConfig = true;
    return buildStream(fixTarget(target), options, worker, sync);
    function fixTarget(origin) {
      origin = bundlerOverrides[origin] || origin;
      if (isAbsolute(origin) || origin.indexOf('file://') === 0) {
        return origin;
      }
      if (origin === 'pino/file') {
        return join(__dirname, '..', 'file.js');
      }
      let fixTarget2;
      for (const filePath of callers) {
        try {
          const context = filePath === 'node:repl' ? process.cwd() + sep : filePath;
          fixTarget2 = createRequire(context).resolve(origin);
          break;
        } catch (err2) {
          continue;
        }
      }
      if (!fixTarget2) {
        throw new Error(`unable to determine transport target for "${origin}"`);
      }
      return fixTarget2;
    }
  }
  transport_1 = transport;
  return transport_1;
}
var tools;
var hasRequiredTools;
function requireTools() {
  if (hasRequiredTools) return tools;
  hasRequiredTools = 1;
  const diagChan = require$$0$4;
  const format = requireQuickFormatUnescaped();
  const { mapHttpRequest, mapHttpResponse } = requirePinoStdSerializers();
  const SonicBoom = requireSonicBoom();
  const onExit = requireOnExitLeakFree();
  const {
    lsCacheSym,
    chindingsSym,
    writeSym,
    serializersSym,
    formatOptsSym,
    endSym,
    stringifiersSym,
    stringifySym,
    stringifySafeSym,
    wildcardFirstSym,
    nestedKeySym,
    formattersSym,
    messageKeySym,
    errorKeySym,
    nestedKeyStrSym,
    msgPrefixSym,
  } = requireSymbols();
  const { isMainThread } = require$$2$2;
  const transport = requireTransport();
  let asJsonChan;
  if (typeof diagChan.tracingChannel === 'function') {
    asJsonChan = diagChan.tracingChannel('pino_asJson');
  } else {
    asJsonChan = {
      hasSubscribers: false,
      traceSync(fn, store2, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      },
    };
  }
  function noop() {}
  function genLog(level, hook) {
    if (!hook) return LOG;
    return function hookWrappedLog(...args) {
      hook.call(this, args, LOG, level);
    };
    function LOG(o, ...n) {
      if (typeof o === 'object') {
        let msg = o;
        if (o !== null) {
          if (o.method && o.headers && o.socket) {
            o = mapHttpRequest(o);
          } else if (typeof o.setHeader === 'function') {
            o = mapHttpResponse(o);
          }
        }
        let formatParams;
        if (msg === null && n.length === 0) {
          formatParams = [null];
        } else {
          msg = n.shift();
          formatParams = n;
        }
        if (typeof this[msgPrefixSym] === 'string' && msg !== void 0 && msg !== null) {
          msg = this[msgPrefixSym] + msg;
        }
        this[writeSym](o, format(msg, formatParams, this[formatOptsSym]), level);
      } else {
        let msg = o === void 0 ? n.shift() : o;
        if (typeof this[msgPrefixSym] === 'string' && msg !== void 0 && msg !== null) {
          msg = this[msgPrefixSym] + msg;
        }
        this[writeSym](null, format(msg, n, this[formatOptsSym]), level);
      }
    }
  }
  function asString(str) {
    let result = '';
    let last = 0;
    let found = false;
    let point = 255;
    const l = str.length;
    if (l > 100) {
      return JSON.stringify(str);
    }
    for (var i = 0; i < l && point >= 32; i++) {
      point = str.charCodeAt(i);
      if (point === 34 || point === 92) {
        result += str.slice(last, i) + '\\';
        last = i;
        found = true;
      }
    }
    if (!found) {
      result = str;
    } else {
      result += str.slice(last);
    }
    return point < 32 ? JSON.stringify(str) : '"' + result + '"';
  }
  function asJson(obj, msg, num, time2) {
    if (asJsonChan.hasSubscribers === false) {
      return _asJson.call(this, obj, msg, num, time2);
    }
    const store2 = { instance: this, arguments };
    return asJsonChan.traceSync(_asJson, store2, this, obj, msg, num, time2);
  }
  function _asJson(obj, msg, num, time2) {
    const stringify2 = this[stringifySym];
    const stringifySafe = this[stringifySafeSym];
    const stringifiers = this[stringifiersSym];
    const end = this[endSym];
    const chindings = this[chindingsSym];
    const serializers = this[serializersSym];
    const formatters = this[formattersSym];
    const messageKey = this[messageKeySym];
    const errorKey = this[errorKeySym];
    let data = this[lsCacheSym][num] + time2;
    data = data + chindings;
    let value;
    if (formatters.log) {
      obj = formatters.log(obj);
    }
    const wildcardStringifier = stringifiers[wildcardFirstSym];
    let propStr = '';
    for (const key in obj) {
      value = obj[key];
      if (Object.prototype.hasOwnProperty.call(obj, key) && value !== void 0) {
        if (serializers[key]) {
          value = serializers[key](value);
        } else if (key === errorKey && serializers.err) {
          value = serializers.err(value);
        }
        const stringifier = stringifiers[key] || wildcardStringifier;
        switch (typeof value) {
          case 'undefined':
          case 'function':
            continue;
          case 'number':
            if (Number.isFinite(value) === false) {
              value = null;
            }
          // this case explicitly falls through to the next one
          case 'boolean':
            if (stringifier) value = stringifier(value);
            break;
          case 'string':
            value = (stringifier || asString)(value);
            break;
          default:
            value = (stringifier || stringify2)(value, stringifySafe);
        }
        if (value === void 0) continue;
        const strKey = asString(key);
        propStr += ',' + strKey + ':' + value;
      }
    }
    let msgStr = '';
    if (msg !== void 0) {
      value = serializers[messageKey] ? serializers[messageKey](msg) : msg;
      const stringifier = stringifiers[messageKey] || wildcardStringifier;
      switch (typeof value) {
        case 'function':
          break;
        case 'number':
          if (Number.isFinite(value) === false) {
            value = null;
          }
        // this case explicitly falls through to the next one
        case 'boolean':
          if (stringifier) value = stringifier(value);
          msgStr = ',"' + messageKey + '":' + value;
          break;
        case 'string':
          value = (stringifier || asString)(value);
          msgStr = ',"' + messageKey + '":' + value;
          break;
        default:
          value = (stringifier || stringify2)(value, stringifySafe);
          msgStr = ',"' + messageKey + '":' + value;
      }
    }
    if (this[nestedKeySym] && propStr) {
      return data + this[nestedKeyStrSym] + propStr.slice(1) + '}' + msgStr + end;
    } else {
      return data + propStr + msgStr + end;
    }
  }
  function asChindings(instance, bindings) {
    let value;
    let data = instance[chindingsSym];
    const stringify2 = instance[stringifySym];
    const stringifySafe = instance[stringifySafeSym];
    const stringifiers = instance[stringifiersSym];
    const wildcardStringifier = stringifiers[wildcardFirstSym];
    const serializers = instance[serializersSym];
    const formatter = instance[formattersSym].bindings;
    bindings = formatter(bindings);
    for (const key in bindings) {
      value = bindings[key];
      const valid =
        (key.length < 5 ||
          (key !== 'level' &&
            key !== 'serializers' &&
            key !== 'formatters' &&
            key !== 'customLevels')) &&
        bindings.hasOwnProperty(key) &&
        value !== void 0;
      if (valid === true) {
        value = serializers[key] ? serializers[key](value) : value;
        value = (stringifiers[key] || wildcardStringifier || stringify2)(value, stringifySafe);
        if (value === void 0) continue;
        data += ',"' + key + '":' + value;
      }
    }
    return data;
  }
  function hasBeenTampered(stream) {
    return stream.write !== stream.constructor.prototype.write;
  }
  function buildSafeSonicBoom(opts) {
    const stream = new SonicBoom(opts);
    stream.on('error', filterBrokenPipe);
    if (!opts.sync && isMainThread) {
      onExit.register(stream, autoEnd);
      stream.on('close', function () {
        onExit.unregister(stream);
      });
    }
    return stream;
    function filterBrokenPipe(err2) {
      if (err2.code === 'EPIPE') {
        stream.write = noop;
        stream.end = noop;
        stream.flushSync = noop;
        stream.destroy = noop;
        return;
      }
      stream.removeListener('error', filterBrokenPipe);
      stream.emit('error', err2);
    }
  }
  function autoEnd(stream, eventName) {
    if (stream.destroyed) {
      return;
    }
    if (eventName === 'beforeExit') {
      stream.flush();
      stream.on('drain', function () {
        stream.end();
      });
    } else {
      stream.flushSync();
    }
  }
  function createArgsNormalizer(defaultOptions) {
    return function normalizeArgs(instance, caller2, opts = {}, stream) {
      if (typeof opts === 'string') {
        stream = buildSafeSonicBoom({ dest: opts });
        opts = {};
      } else if (typeof stream === 'string') {
        if (opts && opts.transport) {
          throw Error('only one of option.transport or stream can be specified');
        }
        stream = buildSafeSonicBoom({ dest: stream });
      } else if (opts instanceof SonicBoom || opts.writable || opts._writableState) {
        stream = opts;
        opts = {};
      } else if (opts.transport) {
        if (
          opts.transport instanceof SonicBoom ||
          opts.transport.writable ||
          opts.transport._writableState
        ) {
          throw Error(
            'option.transport do not allow stream, please pass to option directly. e.g. pino(transport)'
          );
        }
        if (
          opts.transport.targets &&
          opts.transport.targets.length &&
          opts.formatters &&
          typeof opts.formatters.level === 'function'
        ) {
          throw Error('option.transport.targets do not allow custom level formatters');
        }
        let customLevels;
        if (opts.customLevels) {
          customLevels = opts.useOnlyCustomLevels
            ? opts.customLevels
            : Object.assign({}, opts.levels, opts.customLevels);
        }
        stream = transport({ caller: caller2, ...opts.transport, levels: customLevels });
      }
      opts = Object.assign({}, defaultOptions, opts);
      opts.serializers = Object.assign({}, defaultOptions.serializers, opts.serializers);
      opts.formatters = Object.assign({}, defaultOptions.formatters, opts.formatters);
      if (opts.prettyPrint) {
        throw new Error(
          'prettyPrint option is no longer supported, see the pino-pretty package (https://github.com/pinojs/pino-pretty)'
        );
      }
      const { enabled, onChild } = opts;
      if (enabled === false) opts.level = 'silent';
      if (!onChild) opts.onChild = noop;
      if (!stream) {
        if (!hasBeenTampered(process.stdout)) {
          stream = buildSafeSonicBoom({ fd: process.stdout.fd || 1 });
        } else {
          stream = process.stdout;
        }
      }
      return { opts, stream };
    };
  }
  function stringify(obj, stringifySafeFn) {
    try {
      return JSON.stringify(obj);
    } catch (_) {
      try {
        const stringify2 = stringifySafeFn || this[stringifySafeSym];
        return stringify2(obj);
      } catch (_2) {
        return '"[unable to serialize, circular reference is too complex to analyze]"';
      }
    }
  }
  function buildFormatters(level, bindings, log) {
    return {
      level,
      bindings,
      log,
    };
  }
  function normalizeDestFileDescriptor(destination) {
    const fd = Number(destination);
    if (typeof destination === 'string' && Number.isFinite(fd)) {
      return fd;
    }
    if (destination === void 0) {
      return 1;
    }
    return destination;
  }
  tools = {
    noop,
    buildSafeSonicBoom,
    asChindings,
    asJson,
    genLog,
    createArgsNormalizer,
    stringify,
    buildFormatters,
    normalizeDestFileDescriptor,
  };
  return tools;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const DEFAULT_LEVELS = {
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  };
  const SORTING_ORDER = {
    ASC: 'ASC',
    DESC: 'DESC',
  };
  constants = {
    DEFAULT_LEVELS,
    SORTING_ORDER,
  };
  return constants;
}
var levels;
var hasRequiredLevels;
function requireLevels() {
  if (hasRequiredLevels) return levels;
  hasRequiredLevels = 1;
  const {
    lsCacheSym,
    levelValSym,
    useOnlyCustomLevelsSym,
    streamSym,
    formattersSym,
    hooksSym,
    levelCompSym,
  } = requireSymbols();
  const { noop, genLog } = requireTools();
  const { DEFAULT_LEVELS, SORTING_ORDER } = requireConstants();
  const levelMethods = {
    fatal: (hook) => {
      const logFatal = genLog(DEFAULT_LEVELS.fatal, hook);
      return function (...args) {
        const stream = this[streamSym];
        logFatal.call(this, ...args);
        if (typeof stream.flushSync === 'function') {
          try {
            stream.flushSync();
          } catch (e) {}
        }
      };
    },
    error: (hook) => genLog(DEFAULT_LEVELS.error, hook),
    warn: (hook) => genLog(DEFAULT_LEVELS.warn, hook),
    info: (hook) => genLog(DEFAULT_LEVELS.info, hook),
    debug: (hook) => genLog(DEFAULT_LEVELS.debug, hook),
    trace: (hook) => genLog(DEFAULT_LEVELS.trace, hook),
  };
  const nums = Object.keys(DEFAULT_LEVELS).reduce((o, k) => {
    o[DEFAULT_LEVELS[k]] = k;
    return o;
  }, {});
  const initialLsCache = Object.keys(nums).reduce((o, k) => {
    o[k] = '{"level":' + Number(k);
    return o;
  }, {});
  function genLsCache(instance) {
    const formatter = instance[formattersSym].level;
    const { labels } = instance.levels;
    const cache = {};
    for (const label in labels) {
      const level = formatter(labels[label], Number(label));
      cache[label] = JSON.stringify(level).slice(0, -1);
    }
    instance[lsCacheSym] = cache;
    return instance;
  }
  function isStandardLevel(level, useOnlyCustomLevels) {
    if (useOnlyCustomLevels) {
      return false;
    }
    switch (level) {
      case 'fatal':
      case 'error':
      case 'warn':
      case 'info':
      case 'debug':
      case 'trace':
        return true;
      default:
        return false;
    }
  }
  function setLevel(level) {
    const { labels, values } = this.levels;
    if (typeof level === 'number') {
      if (labels[level] === void 0) throw Error('unknown level value' + level);
      level = labels[level];
    }
    if (values[level] === void 0) throw Error('unknown level ' + level);
    const preLevelVal = this[levelValSym];
    const levelVal = (this[levelValSym] = values[level]);
    const useOnlyCustomLevelsVal = this[useOnlyCustomLevelsSym];
    const levelComparison = this[levelCompSym];
    const hook = this[hooksSym].logMethod;
    for (const key in values) {
      if (levelComparison(values[key], levelVal) === false) {
        this[key] = noop;
        continue;
      }
      this[key] = isStandardLevel(key, useOnlyCustomLevelsVal)
        ? levelMethods[key](hook)
        : genLog(values[key], hook);
    }
    this.emit('level-change', level, levelVal, labels[preLevelVal], preLevelVal, this);
  }
  function getLevel(level) {
    const { levels: levels2, levelVal } = this;
    return levels2 && levels2.labels ? levels2.labels[levelVal] : '';
  }
  function isLevelEnabled(logLevel) {
    const { values } = this.levels;
    const logLevelVal = values[logLevel];
    return logLevelVal !== void 0 && this[levelCompSym](logLevelVal, this[levelValSym]);
  }
  function compareLevel(direction, current, expected) {
    if (direction === SORTING_ORDER.DESC) {
      return current <= expected;
    }
    return current >= expected;
  }
  function genLevelComparison(levelComparison) {
    if (typeof levelComparison === 'string') {
      return compareLevel.bind(null, levelComparison);
    }
    return levelComparison;
  }
  function mappings(customLevels = null, useOnlyCustomLevels = false) {
    const customNums = customLevels
      ? Object.keys(customLevels).reduce((o, k) => {
          o[customLevels[k]] = k;
          return o;
        }, {})
      : null;
    const labels = Object.assign(
      Object.create(Object.prototype, { Infinity: { value: 'silent' } }),
      useOnlyCustomLevels ? null : nums,
      customNums
    );
    const values = Object.assign(
      Object.create(Object.prototype, { silent: { value: Infinity } }),
      useOnlyCustomLevels ? null : DEFAULT_LEVELS,
      customLevels
    );
    return { labels, values };
  }
  function assertDefaultLevelFound(defaultLevel, customLevels, useOnlyCustomLevels) {
    if (typeof defaultLevel === 'number') {
      const values = [].concat(
        Object.keys(customLevels || {}).map((key) => customLevels[key]),
        useOnlyCustomLevels ? [] : Object.keys(nums).map((level) => +level),
        Infinity
      );
      if (!values.includes(defaultLevel)) {
        throw Error(`default level:${defaultLevel} must be included in custom levels`);
      }
      return;
    }
    const labels = Object.assign(
      Object.create(Object.prototype, { silent: { value: Infinity } }),
      useOnlyCustomLevels ? null : DEFAULT_LEVELS,
      customLevels
    );
    if (!(defaultLevel in labels)) {
      throw Error(`default level:${defaultLevel} must be included in custom levels`);
    }
  }
  function assertNoLevelCollisions(levels2, customLevels) {
    const { labels, values } = levels2;
    for (const k in customLevels) {
      if (k in values) {
        throw Error('levels cannot be overridden');
      }
      if (customLevels[k] in labels) {
        throw Error('pre-existing level values cannot be used for new levels');
      }
    }
  }
  function assertLevelComparison(levelComparison) {
    if (typeof levelComparison === 'function') {
      return;
    }
    if (
      typeof levelComparison === 'string' &&
      Object.values(SORTING_ORDER).includes(levelComparison)
    ) {
      return;
    }
    throw new Error('Levels comparison should be one of "ASC", "DESC" or "function" type');
  }
  levels = {
    initialLsCache,
    genLsCache,
    levelMethods,
    getLevel,
    setLevel,
    isLevelEnabled,
    mappings,
    assertNoLevelCollisions,
    assertDefaultLevelFound,
    genLevelComparison,
    assertLevelComparison,
  };
  return levels;
}
var meta;
var hasRequiredMeta;
function requireMeta() {
  if (hasRequiredMeta) return meta;
  hasRequiredMeta = 1;
  meta = { version: '9.14.0' };
  return meta;
}
var proto;
var hasRequiredProto;
function requireProto() {
  if (hasRequiredProto) return proto;
  hasRequiredProto = 1;
  const { EventEmitter } = require$$0$5;
  const {
    lsCacheSym,
    levelValSym,
    setLevelSym,
    getLevelSym,
    chindingsSym,
    parsedChindingsSym,
    mixinSym,
    asJsonSym,
    writeSym,
    mixinMergeStrategySym,
    timeSym,
    timeSliceIndexSym,
    streamSym,
    serializersSym,
    formattersSym,
    errorKeySym,
    messageKeySym,
    useOnlyCustomLevelsSym,
    needsMetadataGsym,
    redactFmtSym,
    stringifySym,
    formatOptsSym,
    stringifiersSym,
    msgPrefixSym,
    hooksSym,
  } = requireSymbols();
  const {
    getLevel,
    setLevel,
    isLevelEnabled,
    mappings,
    initialLsCache,
    genLsCache,
    assertNoLevelCollisions,
  } = requireLevels();
  const { asChindings, asJson, buildFormatters, stringify, noop } = requireTools();
  const { version: version2 } = requireMeta();
  const redaction = requireRedaction();
  const constructor = class Pino {};
  const prototype = {
    constructor,
    child,
    bindings,
    setBindings,
    flush,
    isLevelEnabled,
    version: version2,
    get level() {
      return this[getLevelSym]();
    },
    set level(lvl) {
      this[setLevelSym](lvl);
    },
    get levelVal() {
      return this[levelValSym];
    },
    set levelVal(n) {
      throw Error('levelVal is read-only');
    },
    get msgPrefix() {
      return this[msgPrefixSym];
    },
    get [Symbol.toStringTag]() {
      return 'Pino';
    },
    [lsCacheSym]: initialLsCache,
    [writeSym]: write,
    [asJsonSym]: asJson,
    [getLevelSym]: getLevel,
    [setLevelSym]: setLevel,
  };
  Object.setPrototypeOf(prototype, EventEmitter.prototype);
  proto = function () {
    return Object.create(prototype);
  };
  const resetChildingsFormatter = (bindings2) => bindings2;
  function child(bindings2, options) {
    if (!bindings2) {
      throw Error('missing bindings for child Pino');
    }
    const serializers = this[serializersSym];
    const formatters = this[formattersSym];
    const instance = Object.create(this);
    if (options == null) {
      if (instance[formattersSym].bindings !== resetChildingsFormatter) {
        instance[formattersSym] = buildFormatters(
          formatters.level,
          resetChildingsFormatter,
          formatters.log
        );
      }
      instance[chindingsSym] = asChindings(instance, bindings2);
      instance[setLevelSym](this.level);
      if (this.onChild !== noop) {
        this.onChild(instance);
      }
      return instance;
    }
    if (options.hasOwnProperty('serializers') === true) {
      instance[serializersSym] = /* @__PURE__ */ Object.create(null);
      for (const k in serializers) {
        instance[serializersSym][k] = serializers[k];
      }
      const parentSymbols = Object.getOwnPropertySymbols(serializers);
      for (var i = 0; i < parentSymbols.length; i++) {
        const ks = parentSymbols[i];
        instance[serializersSym][ks] = serializers[ks];
      }
      for (const bk in options.serializers) {
        instance[serializersSym][bk] = options.serializers[bk];
      }
      const bindingsSymbols = Object.getOwnPropertySymbols(options.serializers);
      for (var bi = 0; bi < bindingsSymbols.length; bi++) {
        const bks = bindingsSymbols[bi];
        instance[serializersSym][bks] = options.serializers[bks];
      }
    } else instance[serializersSym] = serializers;
    if (options.hasOwnProperty('formatters')) {
      const { level, bindings: chindings, log } = options.formatters;
      instance[formattersSym] = buildFormatters(
        level || formatters.level,
        chindings || resetChildingsFormatter,
        log || formatters.log
      );
    } else {
      instance[formattersSym] = buildFormatters(
        formatters.level,
        resetChildingsFormatter,
        formatters.log
      );
    }
    if (options.hasOwnProperty('customLevels') === true) {
      assertNoLevelCollisions(this.levels, options.customLevels);
      instance.levels = mappings(options.customLevels, instance[useOnlyCustomLevelsSym]);
      genLsCache(instance);
    }
    if (
      (typeof options.redact === 'object' && options.redact !== null) ||
      Array.isArray(options.redact)
    ) {
      instance.redact = options.redact;
      const stringifiers = redaction(instance.redact, stringify);
      const formatOpts = { stringify: stringifiers[redactFmtSym] };
      instance[stringifySym] = stringify;
      instance[stringifiersSym] = stringifiers;
      instance[formatOptsSym] = formatOpts;
    }
    if (typeof options.msgPrefix === 'string') {
      instance[msgPrefixSym] = (this[msgPrefixSym] || '') + options.msgPrefix;
    }
    instance[chindingsSym] = asChindings(instance, bindings2);
    const childLevel = options.level || this.level;
    instance[setLevelSym](childLevel);
    this.onChild(instance);
    return instance;
  }
  function bindings() {
    const chindings = this[chindingsSym];
    const chindingsJson = `{${chindings.substr(1)}}`;
    const bindingsFromJson = JSON.parse(chindingsJson);
    delete bindingsFromJson.pid;
    delete bindingsFromJson.hostname;
    return bindingsFromJson;
  }
  function setBindings(newBindings) {
    const chindings = asChindings(this, newBindings);
    this[chindingsSym] = chindings;
    delete this[parsedChindingsSym];
  }
  function defaultMixinMergeStrategy(mergeObject, mixinObject) {
    return Object.assign(mixinObject, mergeObject);
  }
  function write(_obj, msg, num) {
    const t = this[timeSym]();
    const mixin = this[mixinSym];
    const errorKey = this[errorKeySym];
    const messageKey = this[messageKeySym];
    const mixinMergeStrategy = this[mixinMergeStrategySym] || defaultMixinMergeStrategy;
    let obj;
    const streamWriteHook = this[hooksSym].streamWrite;
    if (_obj === void 0 || _obj === null) {
      obj = {};
    } else if (_obj instanceof Error) {
      obj = { [errorKey]: _obj };
      if (msg === void 0) {
        msg = _obj.message;
      }
    } else {
      obj = _obj;
      if (msg === void 0 && _obj[messageKey] === void 0 && _obj[errorKey]) {
        msg = _obj[errorKey].message;
      }
    }
    if (mixin) {
      obj = mixinMergeStrategy(obj, mixin(obj, num, this));
    }
    const s = this[asJsonSym](obj, msg, num, t);
    const stream = this[streamSym];
    if (stream[needsMetadataGsym] === true) {
      stream.lastLevel = num;
      stream.lastObj = obj;
      stream.lastMsg = msg;
      stream.lastTime = t.slice(this[timeSliceIndexSym]);
      stream.lastLogger = this;
    }
    stream.write(streamWriteHook ? streamWriteHook(s) : s);
  }
  function flush(cb) {
    if (cb != null && typeof cb !== 'function') {
      throw Error('callback must be a function');
    }
    const stream = this[streamSym];
    if (typeof stream.flush === 'function') {
      stream.flush(cb || noop);
    } else if (cb) cb();
  }
  return proto;
}
var safeStableStringify = { exports: {} };
var hasRequiredSafeStableStringify;
function requireSafeStableStringify() {
  if (hasRequiredSafeStableStringify) return safeStableStringify.exports;
  hasRequiredSafeStableStringify = 1;
  (function (module2, exports$1) {
    const { hasOwnProperty } = Object.prototype;
    const stringify = configure();
    stringify.configure = configure;
    stringify.stringify = stringify;
    stringify.default = stringify;
    exports$1.stringify = stringify;
    exports$1.configure = configure;
    module2.exports = stringify;
    const strEscapeSequencesRegExp = /[\u0000-\u001f\u0022\u005c\ud800-\udfff]/;
    function strEscape(str) {
      if (str.length < 5e3 && !strEscapeSequencesRegExp.test(str)) {
        return `"${str}"`;
      }
      return JSON.stringify(str);
    }
    function sort(array, comparator) {
      if (array.length > 200 || comparator) {
        return array.sort(comparator);
      }
      for (let i = 1; i < array.length; i++) {
        const currentValue = array[i];
        let position = i;
        while (position !== 0 && array[position - 1] > currentValue) {
          array[position] = array[position - 1];
          position--;
        }
        array[position] = currentValue;
      }
      return array;
    }
    const typedArrayPrototypeGetSymbolToStringTag = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(Object.getPrototypeOf(new Int8Array())),
      Symbol.toStringTag
    ).get;
    function isTypedArrayWithEntries(value) {
      return typedArrayPrototypeGetSymbolToStringTag.call(value) !== void 0 && value.length !== 0;
    }
    function stringifyTypedArray(array, separator, maximumBreadth) {
      if (array.length < maximumBreadth) {
        maximumBreadth = array.length;
      }
      const whitespace = separator === ',' ? '' : ' ';
      let res2 = `"0":${whitespace}${array[0]}`;
      for (let i = 1; i < maximumBreadth; i++) {
        res2 += `${separator}"${i}":${whitespace}${array[i]}`;
      }
      return res2;
    }
    function getCircularValueOption(options) {
      if (hasOwnProperty.call(options, 'circularValue')) {
        const circularValue = options.circularValue;
        if (typeof circularValue === 'string') {
          return `"${circularValue}"`;
        }
        if (circularValue == null) {
          return circularValue;
        }
        if (circularValue === Error || circularValue === TypeError) {
          return {
            toString() {
              throw new TypeError('Converting circular structure to JSON');
            },
          };
        }
        throw new TypeError(
          'The "circularValue" argument must be of type string or the value null or undefined'
        );
      }
      return '"[Circular]"';
    }
    function getDeterministicOption(options) {
      let value;
      if (hasOwnProperty.call(options, 'deterministic')) {
        value = options.deterministic;
        if (typeof value !== 'boolean' && typeof value !== 'function') {
          throw new TypeError(
            'The "deterministic" argument must be of type boolean or comparator function'
          );
        }
      }
      return value === void 0 ? true : value;
    }
    function getBooleanOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== 'boolean') {
          throw new TypeError(`The "${key}" argument must be of type boolean`);
        }
      }
      return value === void 0 ? true : value;
    }
    function getPositiveIntegerOption(options, key) {
      let value;
      if (hasOwnProperty.call(options, key)) {
        value = options[key];
        if (typeof value !== 'number') {
          throw new TypeError(`The "${key}" argument must be of type number`);
        }
        if (!Number.isInteger(value)) {
          throw new TypeError(`The "${key}" argument must be an integer`);
        }
        if (value < 1) {
          throw new RangeError(`The "${key}" argument must be >= 1`);
        }
      }
      return value === void 0 ? Infinity : value;
    }
    function getItemCount(number) {
      if (number === 1) {
        return '1 item';
      }
      return `${number} items`;
    }
    function getUniqueReplacerSet(replacerArray) {
      const replacerSet = /* @__PURE__ */ new Set();
      for (const value of replacerArray) {
        if (typeof value === 'string' || typeof value === 'number') {
          replacerSet.add(String(value));
        }
      }
      return replacerSet;
    }
    function getStrictOption(options) {
      if (hasOwnProperty.call(options, 'strict')) {
        const value = options.strict;
        if (typeof value !== 'boolean') {
          throw new TypeError('The "strict" argument must be of type boolean');
        }
        if (value) {
          return (value2) => {
            let message = `Object can not safely be stringified. Received type ${typeof value2}`;
            if (typeof value2 !== 'function') message += ` (${value2.toString()})`;
            throw new Error(message);
          };
        }
      }
    }
    function configure(options) {
      options = { ...options };
      const fail2 = getStrictOption(options);
      if (fail2) {
        if (options.bigint === void 0) {
          options.bigint = false;
        }
        if (!('circularValue' in options)) {
          options.circularValue = Error;
        }
      }
      const circularValue = getCircularValueOption(options);
      const bigint = getBooleanOption(options, 'bigint');
      const deterministic = getDeterministicOption(options);
      const comparator = typeof deterministic === 'function' ? deterministic : void 0;
      const maximumDepth = getPositiveIntegerOption(options, 'maximumDepth');
      const maximumBreadth = getPositiveIntegerOption(options, 'maximumBreadth');
      function stringifyFnReplacer(key, parent, stack, replacer, spacer, indentation) {
        let value = parent[key];
        if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
          value = value.toJSON(key);
        }
        value = replacer.call(parent, key, value);
        switch (typeof value) {
          case 'string':
            return strEscape(value);
          case 'object': {
            if (value === null) {
              return 'null';
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res2 = '';
            let join = ',';
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return '[]';
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== '') {
                indentation += spacer;
                res2 += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyFnReplacer(
                  String(i),
                  value,
                  stack,
                  replacer,
                  spacer,
                  indentation
                );
                res2 += tmp2 !== void 0 ? tmp2 : 'null';
                res2 += join;
              }
              const tmp = stringifyFnReplacer(
                String(i),
                value,
                stack,
                replacer,
                spacer,
                indentation
              );
              res2 += tmp !== void 0 ? tmp : 'null';
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== '') {
                res2 += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res2}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return '{}';
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let whitespace = '';
            let separator = '';
            if (spacer !== '') {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = ' ';
            }
            const maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (deterministic && !isTypedArrayWithEntries(value)) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyFnReplacer(key2, value, stack, replacer, spacer, indentation);
              if (tmp !== void 0) {
                res2 += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res2 += `${separator}"...":${whitespace}"${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (spacer !== '' && separator.length > 1) {
              res2 = `
${indentation}${res2}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res2}}`;
          }
          case 'number':
            return isFinite(value) ? String(value) : fail2 ? fail2(value) : 'null';
          case 'boolean':
            return value === true ? 'true' : 'false';
          case 'undefined':
            return void 0;
          case 'bigint':
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail2 ? fail2(value) : void 0;
        }
      }
      function stringifyArrayReplacer(key, value, stack, replacer, spacer, indentation) {
        if (typeof value === 'object' && value !== null && typeof value.toJSON === 'function') {
          value = value.toJSON(key);
        }
        switch (typeof value) {
          case 'string':
            return strEscape(value);
          case 'object': {
            if (value === null) {
              return 'null';
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            let res2 = '';
            let join = ',';
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return '[]';
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              if (spacer !== '') {
                indentation += spacer;
                res2 += `
${indentation}`;
                join = `,
${indentation}`;
              }
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyArrayReplacer(
                  String(i),
                  value[i],
                  stack,
                  replacer,
                  spacer,
                  indentation
                );
                res2 += tmp2 !== void 0 ? tmp2 : 'null';
                res2 += join;
              }
              const tmp = stringifyArrayReplacer(
                String(i),
                value[i],
                stack,
                replacer,
                spacer,
                indentation
              );
              res2 += tmp !== void 0 ? tmp : 'null';
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `${join}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              if (spacer !== '') {
                res2 += `
${originalIndentation}`;
              }
              stack.pop();
              return `[${res2}]`;
            }
            stack.push(value);
            let whitespace = '';
            if (spacer !== '') {
              indentation += spacer;
              join = `,
${indentation}`;
              whitespace = ' ';
            }
            let separator = '';
            for (const key2 of replacer) {
              const tmp = stringifyArrayReplacer(
                key2,
                value[key2],
                stack,
                replacer,
                spacer,
                indentation
              );
              if (tmp !== void 0) {
                res2 += `${separator}${strEscape(key2)}:${whitespace}${tmp}`;
                separator = join;
              }
            }
            if (spacer !== '' && separator.length > 1) {
              res2 = `
${indentation}${res2}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res2}}`;
          }
          case 'number':
            return isFinite(value) ? String(value) : fail2 ? fail2(value) : 'null';
          case 'boolean':
            return value === true ? 'true' : 'false';
          case 'undefined':
            return void 0;
          case 'bigint':
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail2 ? fail2(value) : void 0;
        }
      }
      function stringifyIndent(key, value, stack, spacer, indentation) {
        switch (typeof value) {
          case 'string':
            return strEscape(value);
          case 'object': {
            if (value === null) {
              return 'null';
            }
            if (typeof value.toJSON === 'function') {
              value = value.toJSON(key);
              if (typeof value !== 'object') {
                return stringifyIndent(key, value, stack, spacer, indentation);
              }
              if (value === null) {
                return 'null';
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            const originalIndentation = indentation;
            if (Array.isArray(value)) {
              if (value.length === 0) {
                return '[]';
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              indentation += spacer;
              let res3 = `
${indentation}`;
              const join2 = `,
${indentation}`;
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifyIndent(String(i), value[i], stack, spacer, indentation);
                res3 += tmp2 !== void 0 ? tmp2 : 'null';
                res3 += join2;
              }
              const tmp = stringifyIndent(String(i), value[i], stack, spacer, indentation);
              res3 += tmp !== void 0 ? tmp : 'null';
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res3 += `${join2}"... ${getItemCount(removedKeys)} not stringified"`;
              }
              res3 += `
${originalIndentation}`;
              stack.pop();
              return `[${res3}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return '{}';
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            indentation += spacer;
            const join = `,
${indentation}`;
            let res2 = '';
            let separator = '';
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (isTypedArrayWithEntries(value)) {
              res2 += stringifyTypedArray(value, join, maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = join;
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifyIndent(key2, value[key2], stack, spacer, indentation);
              if (tmp !== void 0) {
                res2 += `${separator}${strEscape(key2)}: ${tmp}`;
                separator = join;
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res2 += `${separator}"...": "${getItemCount(removedKeys)} not stringified"`;
              separator = join;
            }
            if (separator !== '') {
              res2 = `
${indentation}${res2}
${originalIndentation}`;
            }
            stack.pop();
            return `{${res2}}`;
          }
          case 'number':
            return isFinite(value) ? String(value) : fail2 ? fail2(value) : 'null';
          case 'boolean':
            return value === true ? 'true' : 'false';
          case 'undefined':
            return void 0;
          case 'bigint':
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail2 ? fail2(value) : void 0;
        }
      }
      function stringifySimple(key, value, stack) {
        switch (typeof value) {
          case 'string':
            return strEscape(value);
          case 'object': {
            if (value === null) {
              return 'null';
            }
            if (typeof value.toJSON === 'function') {
              value = value.toJSON(key);
              if (typeof value !== 'object') {
                return stringifySimple(key, value, stack);
              }
              if (value === null) {
                return 'null';
              }
            }
            if (stack.indexOf(value) !== -1) {
              return circularValue;
            }
            let res2 = '';
            const hasLength = value.length !== void 0;
            if (hasLength && Array.isArray(value)) {
              if (value.length === 0) {
                return '[]';
              }
              if (maximumDepth < stack.length + 1) {
                return '"[Array]"';
              }
              stack.push(value);
              const maximumValuesToStringify = Math.min(value.length, maximumBreadth);
              let i = 0;
              for (; i < maximumValuesToStringify - 1; i++) {
                const tmp2 = stringifySimple(String(i), value[i], stack);
                res2 += tmp2 !== void 0 ? tmp2 : 'null';
                res2 += ',';
              }
              const tmp = stringifySimple(String(i), value[i], stack);
              res2 += tmp !== void 0 ? tmp : 'null';
              if (value.length - 1 > maximumBreadth) {
                const removedKeys = value.length - maximumBreadth - 1;
                res2 += `,"... ${getItemCount(removedKeys)} not stringified"`;
              }
              stack.pop();
              return `[${res2}]`;
            }
            let keys = Object.keys(value);
            const keyLength = keys.length;
            if (keyLength === 0) {
              return '{}';
            }
            if (maximumDepth < stack.length + 1) {
              return '"[Object]"';
            }
            let separator = '';
            let maximumPropertiesToStringify = Math.min(keyLength, maximumBreadth);
            if (hasLength && isTypedArrayWithEntries(value)) {
              res2 += stringifyTypedArray(value, ',', maximumBreadth);
              keys = keys.slice(value.length);
              maximumPropertiesToStringify -= value.length;
              separator = ',';
            }
            if (deterministic) {
              keys = sort(keys, comparator);
            }
            stack.push(value);
            for (let i = 0; i < maximumPropertiesToStringify; i++) {
              const key2 = keys[i];
              const tmp = stringifySimple(key2, value[key2], stack);
              if (tmp !== void 0) {
                res2 += `${separator}${strEscape(key2)}:${tmp}`;
                separator = ',';
              }
            }
            if (keyLength > maximumBreadth) {
              const removedKeys = keyLength - maximumBreadth;
              res2 += `${separator}"...":"${getItemCount(removedKeys)} not stringified"`;
            }
            stack.pop();
            return `{${res2}}`;
          }
          case 'number':
            return isFinite(value) ? String(value) : fail2 ? fail2(value) : 'null';
          case 'boolean':
            return value === true ? 'true' : 'false';
          case 'undefined':
            return void 0;
          case 'bigint':
            if (bigint) {
              return String(value);
            }
          // fallthrough
          default:
            return fail2 ? fail2(value) : void 0;
        }
      }
      function stringify2(value, replacer, space) {
        if (arguments.length > 1) {
          let spacer = '';
          if (typeof space === 'number') {
            spacer = ' '.repeat(Math.min(space, 10));
          } else if (typeof space === 'string') {
            spacer = space.slice(0, 10);
          }
          if (replacer != null) {
            if (typeof replacer === 'function') {
              return stringifyFnReplacer('', { '': value }, [], replacer, spacer, '');
            }
            if (Array.isArray(replacer)) {
              return stringifyArrayReplacer(
                '',
                value,
                [],
                getUniqueReplacerSet(replacer),
                spacer,
                ''
              );
            }
          }
          if (spacer.length !== 0) {
            return stringifyIndent('', value, [], spacer, '');
          }
        }
        return stringifySimple('', value, []);
      }
      return stringify2;
    }
  })(safeStableStringify, safeStableStringify.exports);
  return safeStableStringify.exports;
}
var multistream_1;
var hasRequiredMultistream;
function requireMultistream() {
  if (hasRequiredMultistream) return multistream_1;
  hasRequiredMultistream = 1;
  const metadata = Symbol.for('pino.metadata');
  const { DEFAULT_LEVELS } = requireConstants();
  const DEFAULT_INFO_LEVEL = DEFAULT_LEVELS.info;
  function multistream(streamsArray, opts) {
    streamsArray = streamsArray || [];
    opts = opts || { dedupe: false };
    const streamLevels = Object.create(DEFAULT_LEVELS);
    streamLevels.silent = Infinity;
    if (opts.levels && typeof opts.levels === 'object') {
      Object.keys(opts.levels).forEach((i) => {
        streamLevels[i] = opts.levels[i];
      });
    }
    const res2 = {
      write,
      add,
      remove,
      emit,
      flushSync,
      end,
      minLevel: 0,
      lastId: 0,
      streams: [],
      clone,
      [metadata]: true,
      streamLevels,
    };
    if (Array.isArray(streamsArray)) {
      streamsArray.forEach(add, res2);
    } else {
      add.call(res2, streamsArray);
    }
    streamsArray = null;
    return res2;
    function write(data) {
      let dest;
      const level = this.lastLevel;
      const { streams } = this;
      let recordedLevel = 0;
      let stream;
      for (
        let i = initLoopVar(streams.length, opts.dedupe);
        checkLoopVar(i, streams.length, opts.dedupe);
        i = adjustLoopVar(i, opts.dedupe)
      ) {
        dest = streams[i];
        if (dest.level <= level) {
          if (recordedLevel !== 0 && recordedLevel !== dest.level) {
            break;
          }
          stream = dest.stream;
          if (stream[metadata]) {
            const { lastTime, lastMsg, lastObj, lastLogger } = this;
            stream.lastLevel = level;
            stream.lastTime = lastTime;
            stream.lastMsg = lastMsg;
            stream.lastObj = lastObj;
            stream.lastLogger = lastLogger;
          }
          stream.write(data);
          if (opts.dedupe) {
            recordedLevel = dest.level;
          }
        } else if (!opts.dedupe) {
          break;
        }
      }
    }
    function emit(...args) {
      for (const { stream } of this.streams) {
        if (typeof stream.emit === 'function') {
          stream.emit(...args);
        }
      }
    }
    function flushSync() {
      for (const { stream } of this.streams) {
        if (typeof stream.flushSync === 'function') {
          stream.flushSync();
        }
      }
    }
    function add(dest) {
      if (!dest) {
        return res2;
      }
      const isStream = typeof dest.write === 'function' || dest.stream;
      const stream_ = dest.write ? dest : dest.stream;
      if (!isStream) {
        throw Error(
          'stream object needs to implement either StreamEntry or DestinationStream interface'
        );
      }
      const { streams, streamLevels: streamLevels2 } = this;
      let level;
      if (typeof dest.levelVal === 'number') {
        level = dest.levelVal;
      } else if (typeof dest.level === 'string') {
        level = streamLevels2[dest.level];
      } else if (typeof dest.level === 'number') {
        level = dest.level;
      } else {
        level = DEFAULT_INFO_LEVEL;
      }
      const dest_ = {
        stream: stream_,
        level,
        levelVal: void 0,
        id: ++res2.lastId,
      };
      streams.unshift(dest_);
      streams.sort(compareByLevel);
      this.minLevel = streams[0].level;
      return res2;
    }
    function remove(id) {
      const { streams } = this;
      const index = streams.findIndex((s) => s.id === id);
      if (index >= 0) {
        streams.splice(index, 1);
        streams.sort(compareByLevel);
        this.minLevel = streams.length > 0 ? streams[0].level : -1;
      }
      return res2;
    }
    function end() {
      for (const { stream } of this.streams) {
        if (typeof stream.flushSync === 'function') {
          stream.flushSync();
        }
        stream.end();
      }
    }
    function clone(level) {
      const streams = new Array(this.streams.length);
      for (let i = 0; i < streams.length; i++) {
        streams[i] = {
          level,
          stream: this.streams[i].stream,
        };
      }
      return {
        write,
        add,
        remove,
        minLevel: level,
        streams,
        clone,
        emit,
        flushSync,
        [metadata]: true,
      };
    }
  }
  function compareByLevel(a, b) {
    return a.level - b.level;
  }
  function initLoopVar(length, dedupe) {
    return dedupe ? length - 1 : 0;
  }
  function adjustLoopVar(i, dedupe) {
    return dedupe ? i - 1 : i + 1;
  }
  function checkLoopVar(i, length, dedupe) {
    return dedupe ? i >= 0 : i < length;
  }
  multistream_1 = multistream;
  return multistream_1;
}
var hasRequiredPino;
function requirePino() {
  if (hasRequiredPino) return pino.exports;
  hasRequiredPino = 1;
  const os = require$$0$1;
  const stdSerializers = requirePinoStdSerializers();
  const caller2 = requireCaller();
  const redaction = requireRedaction();
  const time2 = requireTime();
  const proto2 = requireProto();
  const symbols2 = requireSymbols();
  const { configure } = requireSafeStableStringify();
  const {
    assertDefaultLevelFound,
    mappings,
    genLsCache,
    genLevelComparison,
    assertLevelComparison,
  } = requireLevels();
  const { DEFAULT_LEVELS, SORTING_ORDER } = requireConstants();
  const {
    createArgsNormalizer,
    asChindings,
    buildSafeSonicBoom,
    buildFormatters,
    stringify,
    normalizeDestFileDescriptor,
    noop,
  } = requireTools();
  const { version: version2 } = requireMeta();
  const {
    chindingsSym,
    redactFmtSym,
    serializersSym,
    timeSym,
    timeSliceIndexSym,
    streamSym,
    stringifySym,
    stringifySafeSym,
    stringifiersSym,
    setLevelSym,
    endSym,
    formatOptsSym,
    messageKeySym,
    errorKeySym,
    nestedKeySym,
    mixinSym,
    levelCompSym,
    useOnlyCustomLevelsSym,
    formattersSym,
    hooksSym,
    nestedKeyStrSym,
    mixinMergeStrategySym,
    msgPrefixSym,
  } = symbols2;
  const { epochTime, nullTime } = time2;
  const { pid } = process;
  const hostname = os.hostname();
  const defaultErrorSerializer = stdSerializers.err;
  const defaultOptions = {
    level: 'info',
    levelComparison: SORTING_ORDER.ASC,
    levels: DEFAULT_LEVELS,
    messageKey: 'msg',
    errorKey: 'err',
    nestedKey: null,
    enabled: true,
    base: { pid, hostname },
    serializers: Object.assign(/* @__PURE__ */ Object.create(null), {
      err: defaultErrorSerializer,
    }),
    formatters: Object.assign(/* @__PURE__ */ Object.create(null), {
      bindings(bindings) {
        return bindings;
      },
      level(label, number) {
        return { level: number };
      },
    }),
    hooks: {
      logMethod: void 0,
      streamWrite: void 0,
    },
    timestamp: epochTime,
    name: void 0,
    redact: null,
    customLevels: null,
    useOnlyCustomLevels: false,
    depthLimit: 5,
    edgeLimit: 100,
  };
  const normalize = createArgsNormalizer(defaultOptions);
  const serializers = Object.assign(/* @__PURE__ */ Object.create(null), stdSerializers);
  function pino$1(...args) {
    const instance = {};
    const { opts, stream } = normalize(instance, caller2(), ...args);
    if (
      opts.level &&
      typeof opts.level === 'string' &&
      DEFAULT_LEVELS[opts.level.toLowerCase()] !== void 0
    )
      opts.level = opts.level.toLowerCase();
    const {
      redact: redact2,
      crlf,
      serializers: serializers2,
      timestamp,
      messageKey,
      errorKey,
      nestedKey,
      base,
      name,
      level,
      customLevels,
      levelComparison,
      mixin,
      mixinMergeStrategy,
      useOnlyCustomLevels,
      formatters,
      hooks,
      depthLimit,
      edgeLimit,
      onChild,
      msgPrefix,
    } = opts;
    const stringifySafe = configure({
      maximumDepth: depthLimit,
      maximumBreadth: edgeLimit,
    });
    const allFormatters = buildFormatters(formatters.level, formatters.bindings, formatters.log);
    const stringifyFn = stringify.bind({
      [stringifySafeSym]: stringifySafe,
    });
    const stringifiers = redact2 ? redaction(redact2, stringifyFn) : {};
    const formatOpts = redact2
      ? { stringify: stringifiers[redactFmtSym] }
      : { stringify: stringifyFn };
    const end = '}' + (crlf ? '\r\n' : '\n');
    const coreChindings = asChindings.bind(null, {
      [chindingsSym]: '',
      [serializersSym]: serializers2,
      [stringifiersSym]: stringifiers,
      [stringifySym]: stringify,
      [stringifySafeSym]: stringifySafe,
      [formattersSym]: allFormatters,
    });
    let chindings = '';
    if (base !== null) {
      if (name === void 0) {
        chindings = coreChindings(base);
      } else {
        chindings = coreChindings(Object.assign({}, base, { name }));
      }
    }
    const time3 = timestamp instanceof Function ? timestamp : timestamp ? epochTime : nullTime;
    const timeSliceIndex = time3().indexOf(':') + 1;
    if (useOnlyCustomLevels && !customLevels)
      throw Error('customLevels is required if useOnlyCustomLevels is set true');
    if (mixin && typeof mixin !== 'function')
      throw Error(`Unknown mixin type "${typeof mixin}" - expected "function"`);
    if (msgPrefix && typeof msgPrefix !== 'string')
      throw Error(`Unknown msgPrefix type "${typeof msgPrefix}" - expected "string"`);
    assertDefaultLevelFound(level, customLevels, useOnlyCustomLevels);
    const levels2 = mappings(customLevels, useOnlyCustomLevels);
    if (typeof stream.emit === 'function') {
      stream.emit('message', {
        code: 'PINO_CONFIG',
        config: { levels: levels2, messageKey, errorKey },
      });
    }
    assertLevelComparison(levelComparison);
    const levelCompFunc = genLevelComparison(levelComparison);
    Object.assign(instance, {
      levels: levels2,
      [levelCompSym]: levelCompFunc,
      [useOnlyCustomLevelsSym]: useOnlyCustomLevels,
      [streamSym]: stream,
      [timeSym]: time3,
      [timeSliceIndexSym]: timeSliceIndex,
      [stringifySym]: stringify,
      [stringifySafeSym]: stringifySafe,
      [stringifiersSym]: stringifiers,
      [endSym]: end,
      [formatOptsSym]: formatOpts,
      [messageKeySym]: messageKey,
      [errorKeySym]: errorKey,
      [nestedKeySym]: nestedKey,
      // protect against injection
      [nestedKeyStrSym]: nestedKey ? `,${JSON.stringify(nestedKey)}:{` : '',
      [serializersSym]: serializers2,
      [mixinSym]: mixin,
      [mixinMergeStrategySym]: mixinMergeStrategy,
      [chindingsSym]: chindings,
      [formattersSym]: allFormatters,
      [hooksSym]: hooks,
      silent: noop,
      onChild,
      [msgPrefixSym]: msgPrefix,
    });
    Object.setPrototypeOf(instance, proto2());
    genLsCache(instance);
    instance[setLevelSym](level);
    return instance;
  }
  pino.exports = pino$1;
  pino.exports.destination = (dest = process.stdout.fd) => {
    if (typeof dest === 'object') {
      dest.dest = normalizeDestFileDescriptor(dest.dest || process.stdout.fd);
      return buildSafeSonicBoom(dest);
    } else {
      return buildSafeSonicBoom({ dest: normalizeDestFileDescriptor(dest), minLength: 0 });
    }
  };
  pino.exports.transport = requireTransport();
  pino.exports.multistream = requireMultistream();
  pino.exports.levels = mappings();
  pino.exports.stdSerializers = serializers;
  pino.exports.stdTimeFunctions = Object.assign({}, time2);
  pino.exports.symbols = symbols2;
  pino.exports.version = version2;
  pino.exports.default = pino$1;
  pino.exports.pino = pino$1;
  return pino.exports;
}
var pinoExports = requirePino();
function createLogger() {
  const base = { level: env.LOG_LEVEL };
  if (env.NODE_ENV === 'production') {
    return pinoExports.pino(base);
  }
  try {
    return pinoExports.pino({
      ...base,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
    });
  } catch {
    return pinoExports.pino(base);
  }
}
const logger = createLogger();
const requestLogger = async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  logger.info({
    method: c.req.method,
    path: c.req.path,
    status: c.res.status,
    duration: `${duration}ms`,
  });
};
const apiKeyAuth = async (c, next) => {
  if (c.req.path.startsWith('/api/health')) {
    await next();
    return;
  }
  if (!env.API_KEY) {
    await next();
    return;
  }
  const headerKey = c.req.header('x-api-key');
  if (!headerKey || headerKey !== getResolvedApiKey()) {
    return c.json(fail(ErrorCode.UNAUTHORIZED, 'Invalid or missing API key'), 401);
  }
  await next();
};
const store = /* @__PURE__ */ new Map();
const DEFAULT_MAX_REQUESTS = 100;
const DEFAULT_WINDOW_MS = 60 * 1e3;
function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetTime <= now) {
      store.delete(key);
    }
  }
}
const cleanupInterval = setInterval(cleanupExpiredEntries, 5 * 60 * 1e3);
cleanupInterval.unref();
function createRateLimitMiddleware(config = {}) {
  const maxRequests = config.maxRequests ?? DEFAULT_MAX_REQUESTS;
  const windowMs = config.windowMs ?? DEFAULT_WINDOW_MS;
  return async (c, next) => {
    if (!env.RATE_LIMIT_ENABLED) {
      await next();
      return;
    }
    const ip = c.req.header('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const entry = store.get(ip);
    if (!entry || entry.resetTime <= now) {
      store.set(ip, { count: 1, resetTime: now + windowMs });
      await next();
      return;
    }
    if (entry.count >= maxRequests) {
      return c.json(fail(ErrorCode.RATE_LIMITED, 'Rate limit exceeded'), 429);
    }
    entry.count++;
    await next();
  };
}
const rateLimit = createRateLimitMiddleware();
const errorHandler = (err2, c) => {
  if (err2 instanceof ZodError2) {
    return c.json(fail(ErrorCode.VALIDATION_FAILED, 'Validation failed', err2.issues), 400);
  }
  if (err2 instanceof HTTPException && err2.status === 404) {
    return c.json(fail(ErrorCode.NOT_FOUND, 'Not found'), 404);
  }
  const message = err2 instanceof Error ? err2.message : 'Internal server error';
  return c.json(fail(ErrorCode.INTERNAL_ERROR, message), 500);
};
const healthRoutes = new Hono();
healthRoutes.get('/api/health', (c) => {
  return c.json(
    ok({
      status: 'ok',
      timestamp: /* @__PURE__ */ new Date().toISOString(),
      version: APP_VERSION,
    })
  );
});
var validCookieNameRegEx = /^[\w!#$%&'*.^`|~+-]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = (value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
};
var parse = (cookie, name) => {
  const pairs = cookie.split(';');
  const parsedCookie = {};
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf('=');
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (!validCookieNameRegEx.test(cookieName)) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] =
        cookieValue.indexOf('%') !== -1 ? tryDecode(cookieValue, decodeURIComponent_) : cookieValue;
    }
  }
  return parsedCookie;
};
var getCookie = (c, key, prefix) => {
  const cookie = c.req.raw.headers.get('Cookie');
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
};
var bufferToFormData = (arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      'Content-Type': contentType,
    },
  });
  return response.formData();
};
var jsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var multipartRegex = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/;
var urlencodedRegex = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/;
var validator = (target, validationFunc) => {
  return async (c, next) => {
    let value = {};
    const contentType = c.req.header('Content-Type');
    switch (target) {
      case 'json':
        if (!contentType || !jsonRegex.test(contentType)) {
          break;
        }
        try {
          value = await c.req.json();
        } catch {
          const message = 'Malformed JSON in request body';
          throw new HTTPException(400, { message });
        }
        break;
      case 'form': {
        if (
          !contentType ||
          !(multipartRegex.test(contentType) || urlencodedRegex.test(contentType))
        ) {
          break;
        }
        let formData;
        if (c.req.bodyCache.formData) {
          formData = await c.req.bodyCache.formData;
        } else {
          try {
            const arrayBuffer = await c.req.arrayBuffer();
            formData = await bufferToFormData(arrayBuffer, contentType);
            c.req.bodyCache.formData = formData;
          } catch (e) {
            let message = 'Malformed FormData request.';
            message += e instanceof Error ? ` ${e.message}` : ` ${String(e)}`;
            throw new HTTPException(400, { message });
          }
        }
        const form = /* @__PURE__ */ Object.create(null);
        formData.forEach((value2, key) => {
          if (key.endsWith('[]')) {
            (form[key] ?? (form[key] = [])).push(value2);
          } else if (Array.isArray(form[key])) {
            form[key].push(value2);
          } else if (Object.hasOwn(form, key)) {
            form[key] = [form[key], value2];
          } else {
            form[key] = value2;
          }
        });
        value = form;
        break;
      }
      case 'query':
        value = Object.fromEntries(
          Object.entries(c.req.queries()).map(([k, v]) => {
            return v.length === 1 ? [k, v[0]] : [k, v];
          })
        );
        break;
      case 'param':
        value = c.req.param();
        break;
      case 'header':
        value = c.req.header();
        break;
      case 'cookie':
        value = getCookie(c);
        break;
    }
    const res2 = await validationFunc(value, c);
    if (res2 instanceof Response) {
      return res2;
    }
    c.req.addValidatedData(target, res2);
    return await next();
  };
};
var zValidator = (target, schema, hook, options) =>
  // @ts-expect-error not typed well
  validator(target, async (value, c) => {
    let validatorValue = value;
    if (target === 'header' && schema instanceof ZodObject2) {
      const schemaKeys = Object.keys(schema.shape);
      const caseInsensitiveKeymap = Object.fromEntries(
        schemaKeys.map((key) => [key.toLowerCase(), key])
      );
      validatorValue = Object.fromEntries(
        Object.entries(value).map(([key, value2]) => [caseInsensitiveKeymap[key] || key, value2])
      );
    }
    const result = await schema.safeParseAsync(validatorValue);
    if (hook) {
      const hookResult = await hook({ data: validatorValue, ...result, target }, c);
      if (hookResult) {
        if (hookResult instanceof Response) {
          return hookResult;
        }
        if ('response' in hookResult) {
          return hookResult.response;
        }
      }
    }
    if (!result.success) {
      return c.json(result, 400);
    }
    return result.data;
  });
class TaskRepository {
  constructor(db2) {
    this.db = db2;
  }
  async findAll(filter) {
    const query = (filter == null ? void 0 : filter.status)
      ? this.db.select().from(tasks).where(eq(tasks.status, filter.status))
      : this.db.select().from(tasks);
    const rows = query.all();
    return rows.map((row) => this.toTask(row));
  }
  async findById(id) {
    const rows = this.db.select().from(tasks).where(eq(tasks.id, id)).all();
    if (rows.length === 0) {
      return null;
    }
    return this.toTask(rows[0]);
  }
  async create(input) {
    const now = /* @__PURE__ */ new Date();
    const id = nanoid();
    const row = {
      id,
      title: input.title,
      description: input.description ?? null,
      status: input.status ?? 'todo',
      priority: input.priority ?? 'medium',
      tags: input.tags ?? null,
      dueDate: input.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
    };
    this.db.insert(tasks).values(row).run();
    return this.toTask(row);
  }
  async update(id, input) {
    const existing = await this.findById(id);
    if (!existing) {
      return null;
    }
    const updates = {
      updatedAt: /* @__PURE__ */ new Date(),
    };
    if (input.title !== void 0) updates.title = input.title;
    if (input.description !== void 0) updates.description = input.description;
    if (input.status !== void 0) updates.status = input.status;
    if (input.priority !== void 0) updates.priority = input.priority;
    if (input.tags !== void 0) updates.tags = input.tags;
    if (input.dueDate !== void 0) updates.dueDate = input.dueDate;
    this.db.update(tasks).set(updates).where(eq(tasks.id, id)).run();
    return this.findById(id);
  }
  async delete(id) {
    const result = this.db.delete(tasks).where(eq(tasks.id, id)).run();
    return result.changes > 0;
  }
  toTask(row) {
    return {
      id: row.id,
      title: row.title,
      description: row.description ?? null,
      status: row.status,
      priority: row.priority,
      tags: row.tags ?? null,
      dueDate: row.dueDate ? new Date(row.dueDate) : null,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }
}
class ProviderRepository {
  constructor(db2) {
    this.db = db2;
  }
  async list(input = {}) {
    const sortBy = input.sortBy ?? 'name';
    const sortOrder = input.sortOrder ?? 'asc';
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 20;
    let whereClause;
    if (input.query) {
      const nameLike = like(providers.name, `%${input.query}%`);
      const matchingModels = this.db
        .select({ providerId: models.providerId })
        .from(models)
        .where(like(models.name, `%${input.query}%`))
        .all();
      const providerIds = [...new Set(matchingModels.map((m) => m.providerId))];
      if (providerIds.length > 0) {
        whereClause = or(nameLike, sql`${providers.id} IN ${providerIds}`);
      } else {
        whereClause = nameLike;
      }
    }
    const countResult = this.db
      .select({ count: sql`count(*)` })
      .from(providers)
      .where(whereClause)
      .get();
    const total = (countResult == null ? void 0 : countResult.count) ?? 0;
    const baseOrderBy =
      sortBy === 'modelCount'
        ? sortOrder === 'desc'
          ? desc(providers.modelCount)
          : asc(providers.modelCount)
        : sortOrder === 'desc'
          ? desc(providers.name)
          : asc(providers.name);
    const orderBy = input.query
      ? [sql`CASE WHEN ${providers.name} LIKE ${`%${input.query}%`} THEN 0 ELSE 1 END`, baseOrderBy]
      : [baseOrderBy];
    const offset = (page - 1) * pageSize;
    const items = this.db
      .select()
      .from(providers)
      .where(whereClause)
      .orderBy(...orderBy)
      .limit(pageSize)
      .offset(offset)
      .all();
    return { items, total, page, pageSize };
  }
  async findById(id) {
    const provider = this.db.select().from(providers).where(eq(providers.id, id)).get();
    return provider ?? null;
  }
  async listModels(input) {
    const page = input.page ?? 1;
    const pageSize = input.pageSize ?? 20;
    const modelWhere = input.query
      ? and(eq(models.providerId, input.providerId), like(models.name, `%${input.query}%`))
      : eq(models.providerId, input.providerId);
    const countResult = this.db
      .select({ count: sql`count(*)` })
      .from(models)
      .where(modelWhere)
      .get();
    const total = (countResult == null ? void 0 : countResult.count) ?? 0;
    const offset = (page - 1) * pageSize;
    const items = this.db
      .select()
      .from(models)
      .where(modelWhere)
      .orderBy(asc(models.name))
      .limit(pageSize)
      .offset(offset)
      .all();
    return { items, total, page, pageSize };
  }
}
function honoValidator(target, schema) {
  return zValidator(target, schema, (result, c) => {
    if (!result.success) {
      return c.json(
        fail(ErrorCode.VALIDATION_FAILED, 'Validation failed', result.error.issues),
        400
      );
    }
  });
}
function getTaskId(c) {
  const id = c.req.param('id');
  return id ?? null;
}
function createTaskRoutes(db2) {
  const app = new Hono();
  const repo = new TaskRepository(db2);
  app.get('/api/tasks', honoValidator('query', TaskListQuery), async (c) => {
    const query = c.req.valid('query');
    const tasks2 = await repo.findAll(query.status ? { status: query.status } : void 0);
    return c.json(ok(tasks2));
  });
  app.post('/api/tasks', honoValidator('json', CreateTaskInput), async (c) => {
    const input = c.req.valid('json');
    const task = await repo.create(input);
    return c.json(ok(task), 201);
  });
  app.get('/api/tasks/:id', async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const task = await repo.findById(id);
    if (!task) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok(task));
  });
  app.put('/api/tasks/:id', honoValidator('json', UpdateTaskInput), async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const input = c.req.valid('json');
    const task = await repo.update(id, input);
    if (!task) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok(task));
  });
  app.delete('/api/tasks/:id', async (c) => {
    const id = getTaskId(c);
    if (!id) {
      return c.json(fail(ErrorCode.NOT_FOUND, 'Task not found'), 404);
    }
    const deleted = await repo.delete(id);
    if (!deleted) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Task ${id} not found`), 404);
    }
    return c.json(ok({ deleted: true }));
  });
  return app;
}
const ListProvidersQuery = objectType({
  query: stringType().optional(),
  sortBy: enumType(['name', 'modelCount']).optional().default('name'),
  sortOrder: enumType(['asc', 'desc']).optional().default('asc'),
  page: coerce.number().min(1).optional().default(1),
  pageSize: coerce.number().min(1).max(100).optional().default(20),
});
const ListModelsQuery = objectType({
  query: stringType().optional(),
  page: coerce.number().min(1).optional().default(1),
  pageSize: coerce.number().min(1).max(100).optional().default(20),
});
function createProviderRoutes(db2) {
  const app = new Hono();
  const repo = new ProviderRepository(db2);
  app.get('/api/providers', zValidator('query', ListProvidersQuery), async (c) => {
    const query = c.req.valid('query');
    const result = await repo.list({
      query: query.query,
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
      page: query.page,
      pageSize: query.pageSize,
    });
    return c.json(ok(result));
  });
  app.get('/api/providers/:id', async (c) => {
    const id = c.req.param('id');
    const provider = await repo.findById(id);
    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }
    return c.json(ok(provider));
  });
  app.get('/api/providers/:id/models', zValidator('query', ListModelsQuery), async (c) => {
    const id = c.req.param('id');
    const query = c.req.valid('query');
    const provider = await repo.findById(id);
    if (!provider) {
      return c.json(fail(ErrorCode.NOT_FOUND, `Provider ${id} not found`), 404);
    }
    const result = await repo.listModels({
      providerId: id,
      query: query.query,
      page: query.page,
      pageSize: query.pageSize,
    });
    return c.json(ok(result));
  });
  return app;
}
function createApp(db2, options = {}) {
  const app = new Hono();
  startModelsSyncScheduler(db2, { onError: options.onSyncError });
  app.use(createCorsMiddleware());
  app.use(requestLogger);
  app.use(apiKeyAuth);
  app.use(rateLimit);
  app.route('/', healthRoutes);
  app.route('/', createTaskRoutes(db2));
  app.route('/', createProviderRoutes(db2));
  app.onError(errorHandler);
  return app;
}
const userDataPath = electron.app.getPath('userData');
const dbUrl = `file:${path.join(userDataPath, 'app.db')}`;
const { db, sqlite } = createDb(dbUrl);
const honoApp = createApp(db, {
  onSyncError: () => {},
});
let mainWindow = null;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });
  if (!electron.app.isPackaged) {
    mainWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${'main_window'}/index.html`));
  }
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
});
electron.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    electron.app.quit();
  }
});
electron.app.on('before-quit', () => {
  sqlite.close();
});
electron.ipcMain.handle('rpc', async (_event, req2) => {
  const urlObj = new URL(req2.url, 'http://localhost');
  if (req2.params && typeof req2.params === 'object') {
    for (const [k, v] of Object.entries(req2.params)) {
      if (v !== void 0 && v !== null) {
        urlObj.searchParams.set(k, String(v));
      }
    }
  }
  const headers = {
    'Content-Type': 'application/json',
  };
  const honoReq = new Request(urlObj.toString(), {
    method: req2.method,
    headers,
    body: req2.body ? JSON.stringify(req2.body) : void 0,
  });
  const res2 = await honoApp.fetch(honoReq);
  return res2.json();
});
//# sourceMappingURL=main.js.map
