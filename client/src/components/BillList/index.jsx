import React from 'react';

const url = /^(development|test)$/.test(process.env.NODE_ENV) ? 'http://localhost:3000' : '';


class BillList extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('piddleToken');
    this.state = {
      token: token.raw,
      bills: null,
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
      let converter = [];
      for (let key in data) {
        let bill = [data.description, data.shortId];
        converter.push(bill);
      }
      return this.setState({bills: converter });
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

  // componentDidUpdate(previousProps, previousState) {
  //   if (previousState.billList !== this.state.billList) {
  //     this.grabData(`JWT ${this.state.token}`);
  //   }
  // }

  render() {
    console.log('STATE', this.state.bills);
    return (
    );
  }

}

export default BillList;
