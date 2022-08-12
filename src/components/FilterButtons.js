import React, { Component } from 'react';
import './styles.css';

class FilterButtons extends Component {
  constructor(props) {
      super(props);
      this.state = {applyTip: '', removeTip: ''};
      this.applyFilter = this.applyFilter.bind(this);
      this.removeFilter = this.removeFilter.bind(this);
      this.hoverApply = this.hoverApply.bind(this);
      this.hoverRemove = this.hoverRemove.bind(this);
  }


  applyFilter() {
    console.log('apply clicked');
    const { filterObject, flex, manager } = this.props;
    const workerSid = manager.workerClient.sid;
    console.log('workerSid: ', workerSid);
    if (filterObject.queuesSelected.length) {
      flex.QueuesStats.setFilter((queue) => filterObject.queuesSelected.includes(queue.key));
      filterObject.queuesAreFiltered = true;
      localStorage[`filteredFlexQueues_${workerSid}`] = JSON.stringify(filterObject.queuesSelected);
    } else {
      flex.Notifications.showNotification("NoQueuesSelected", null);
    }
  }

  removeFilter() {
    console.log('remove clicked');
    const { filterObject, flex, manager } = this.props;
    const workerSid = manager.workerClient.sid;
    if (filterObject.queuesAreFiltered) {
      flex.QueuesStats.setFilter(() => true);
      filterObject.queuesAreFiltered = false;
      delete  localStorage[`filteredFlexQueues_${workerSid}`];
      this.setState({removeTip: 'filter removed'})
    } else {
      flex.Notifications.showNotification("NotFilteringQueues", null);
    }
  }

  hoverApply() {
    const { filterObject } = this.props;
    const applyTip = filterObject?.queuesSelected?.length ? 'filter queues' : 'no queues selected';
    this.setState({ applyTip })
  }

  hoverRemove() {
    const { filterObject } = this.props;
    const removeTip = filterObject?.queuesAreFiltered ? 'see all queues' : 'not filtering'
    this.setState({ removeTip })
  }

  render() {
    const { applyTip, removeTip } = this.state;
    return( 
      <div className="button-holder">
        <div className="tooltip" onMouseOver={()=>this.hoverApply()} onClick={()=>this.applyFilter()}>
          <span className="tooltiptext">{applyTip}</span>
          <button className="filterButton">Filter Queues</button>
        </div>
        <div className="tooltip" onMouseOver={()=>this.hoverRemove()} onClick={()=>this.removeFilter()}>
            <span className="tooltiptext">{removeTip}</span>
            <button className="filterButton">Remove Filter</button>
        </div>
      </div>
        )
  }
}

export default FilterButtons;

