import React from 'react';
import Bill from './../Bill';

class BillList extends React.Component {

  constructor(props) {
    super(props);
    const token = localStorage.getItem('piddleToken');
    this.state = {
      billList: [],
      token : token,
    };
  }

  grabData() {
    // eslint-disable-next-line no-undef
    console.log('grabbing data');
    fetch(`${this.serverUrl}/api/bills`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${this.state.token.raw}`,
      },
    })
    .then(response => response.json())
    .then(({ data }) => {
      console.log(data);
      return this.setState({
        billList: data,
      });
    })
    .catch((error) => {
      this.setState({ error });
    });
  }

  componentDidMount() {
    this.grabData();
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.billList !== this.props.billList) {
      this.grabData();
    }
  }

  render() {
    return (
      <div>
        {
          this.state.billList.map((bill, index) =>
            <Bill key={index} bill={bill}/>
          )
        }
      </div>
    );
  }

}

export default BillList;
