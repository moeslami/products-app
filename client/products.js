const SortOrder = {
  Asc: -1,
  Desc: 1
}

class ProductsList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sortCol: 'Name',
      sortOrder: SortOrder.Asc
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/products`)
      .then(res => {
        this.sort(res.data.Items);
      });
  }

  sort(products, sortCol) {


    const sortOrder = sortCol === this.state.sortCol?
      (-1) * this.state.sortOrder :
      this.state.sortOrder;

    if(!sortCol) sortCol = this.state.sortCol;

    const sortedProducts = products.sort((p1, p2) => {
      if(p1[sortCol] < p2[sortCol]) return sortOrder;
      if(p1[sortCol] > p2[sortCol]) return (-1) * sortOrder;
      return 0;
    });

    this.setState({sortCol, sortOrder, products: sortedProducts});
  }

  sortOrderIcon(sortCol){
    if(sortCol !== this.state.sortCol) return '';

    return this.state.sortOrder == SortOrder.Asc? '▲':'▼'
  }

  render() {

    return (
    <div className = "products-list" >
      <div className="product-row product-head">
          <div className="product-col product-head" onClick={()=> {this.sort(this.state.products, 'Name')}}>Name {this.sortOrderIcon('Name')}</div>
          <div className="product-col product-head" onClick={() => {this.sort(this.state.products, 'Price')}}>Price {this.sortOrderIcon('Price')}</div>
        </div>
      { this.state.products? this.state.products.map((product => (
        <div className="product-row" key={product.Name}>
          <div className="product-col">{product.Name}</div>
          <div className="product-col">{product.Price}</div>
        </div>
      ))) : ''}
    </div>
    );
  }
}

ReactDOM.render(
  <ProductsList /> ,
  document.getElementById('products-view')
);
