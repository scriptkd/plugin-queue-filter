import React, { Component } from 'react';

class FilterCheckBox extends Component {
  constructor(props) {
      super(props);
      this.state = {};
      this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(queueSid, queuesSelected) {
    console.log('checked');
    console.log(queueSid);
    // add / remove from list of selected queues
    if(queuesSelected.includes(queueSid)) {
      const index = queuesSelected.indexOf(queueSid);
      queuesSelected.splice(index, 1);
    } else {
      queuesSelected.push(queueSid);
    }
    //refresh state so the checks show up 
    this.setState({});
  }

  render() {
      const { queueSid, filterObject } = this.props;
      const { queuesSelected } = filterObject;
      return <input type="checkbox" 
                    checked={queuesSelected.includes(queueSid)} 
                    onClick={()=>this.handleCheck(queueSid, queuesSelected)} onChange={()=>{}}/>
  }
}

export default FilterCheckBox;