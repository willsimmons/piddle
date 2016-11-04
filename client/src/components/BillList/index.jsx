import React from 'react';
import Bill from './../Bill';
import Request from '../../utils/requestHandler';

class BillList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      billList: [],
    };
  }

  componentDidMount() {
    const context = this;
    Request.postLogin((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line no-undef
        context.setState({
          billList: res.data,
        });
      } else {
        this.setState({ error: res.body.error.message });
      }
    });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.billList !== this.props.billList) {
      Request.postLogin((res) => {
      if (res.status === 200) {
        context.setState({
          billList: res.data,
        });
      } else {
        this.setState({ error: res.body.error.message });
      }
    });
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
