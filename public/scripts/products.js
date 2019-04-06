var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortOrder = {
  Asc: -1,
  Desc: 1
};

var ProductsList = function (_React$Component) {
  _inherits(ProductsList, _React$Component);

  function ProductsList(props) {
    _classCallCheck(this, ProductsList);

    var _this = _possibleConstructorReturn(this, (ProductsList.__proto__ || Object.getPrototypeOf(ProductsList)).call(this, props));

    _this.state = {
      sortCol: 'Name',
      sortOrder: SortOrder.Asc
    };
    return _this;
  }

  _createClass(ProductsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      axios.get('http://localhost:3000/products').then(function (res) {
        _this2.sort(res.data.Items);
      });
    }
  }, {
    key: 'sort',
    value: function sort(products, sortCol) {

      var sortOrder = sortCol === this.state.sortCol ? -1 * this.state.sortOrder : this.state.sortOrder;

      if (!sortCol) sortCol = this.state.sortCol;

      var sortedProducts = products.sort(function (p1, p2) {
        if (p1[sortCol] < p2[sortCol]) return sortOrder;
        if (p1[sortCol] > p2[sortCol]) return -1 * sortOrder;
        return 0;
      });

      this.setState({ sortCol: sortCol, sortOrder: sortOrder, products: sortedProducts });
    }
  }, {
    key: 'sortOrderIcon',
    value: function sortOrderIcon(sortCol) {
      if (sortCol !== this.state.sortCol) return '';

      return this.state.sortOrder == SortOrder.Asc ? '▲' : '▼';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return React.createElement(
        'div',
        { className: 'products-list' },
        React.createElement(
          'div',
          { className: 'product-row product-head' },
          React.createElement(
            'div',
            { className: 'product-col product-head', onClick: function onClick() {
                _this3.sort(_this3.state.products, 'Name');
              } },
            'Name ',
            this.sortOrderIcon('Name')
          ),
          React.createElement(
            'div',
            { className: 'product-col product-head', onClick: function onClick() {
                _this3.sort(_this3.state.products, 'Price');
              } },
            'Price ',
            this.sortOrderIcon('Price')
          )
        ),
        this.state.products ? this.state.products.map(function (product) {
          return React.createElement(
            'div',
            { className: 'product-row', key: product.Name },
            React.createElement(
              'div',
              { className: 'product-col' },
              product.Name
            ),
            React.createElement(
              'div',
              { className: 'product-col' },
              product.Price
            )
          );
        }) : ''
      );
    }
  }]);

  return ProductsList;
}(React.Component);

ReactDOM.render(React.createElement(ProductsList, null), document.getElementById('products-view'));