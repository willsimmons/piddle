const url = /^(development|test)$/.test(process.env.NODE_ENV) ? 'http://localhost:3000' : '';

import React from 'react';

class BillList extends React.Component {

  constructor(props) {
    super(props);
    this.bills = [];
    const token = localStorage.getItem('piddleToken');
    this.state = {
      billList: [],
      token : token.raw,
    };
  }

  grabData(token) {
    // eslint-disable-next-line no-undef
    fetch(`${url}/api/bills`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.props.bills = data;
      return this.setState({
        billList: data,
      });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }
  
  componentWillMount() {
    const loadingToken = localStorage.getItem('piddleToken');
    this.setState({
      token: loadingToken,
    });
  }

  componentDidMount() {
    this.grabData(`JWT ${this.state.token}`);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.billList !== this.state.billList) {
      this.grabData(`JWT ${this.state.token}`);
    }
  }

  render() {
    return (
      <div>
        {
          this.state.bills === undefined ? <p>you have no bills</p> : this.state.bills.map((bill, index) =>
            <p> {bill.description}</p>
          )
        }
      </div>
    );
  }

}

export default BillList;
