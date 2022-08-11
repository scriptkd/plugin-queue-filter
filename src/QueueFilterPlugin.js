import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import FilterCheckBox from './components/FilterCheckBox';
import FilterButtons from './components/FilterButtons';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'QueueFilterPlugin';

export default class QueueFilterPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
    console.log('manager: ', manager);

    //declare notifications
    flex.Notifications.registerNotification({
      id: "NoQueuesSelected",
      content: "First select queues from filter column", 
      type: flex.NotificationType.warning,
      timeout: 2300
      });

    flex.Notifications.registerNotification({
      id: "NotFilteringQueues",
      content: "You are not filtering your queues", 
      type: flex.NotificationType.warning,
      timeout: 2300
    });

    const { ColumnDefinition } = flex;

    // globally scope filter data within object to leverage JS copy-by-reference
    let filterObject = {
      queuesAreFiltered: false,
      queuesSelected: [],
      queuesFiltered: []
    }

    const workerSid = manager.workerClient.sid;

    // check if this worker has queues filtered on this machine from a previous session
    if ( localStorage[`filteredFlexQueues_${workerSid}`]) {
      filterObject.queuesAreFiltered = true;
      filterObject.queuesSelected = JSON.parse(localStorage[`filteredFlexQueues_${workerSid}`]);
      filterObject.queuesSelected = JSON.parse(localStorage[`filteredFlexQueues_${workerSid}`]);
      flex.QueuesStats.setFilter((queue) => filterObject.queuesSelected.includes(queue.key));
    }

    // column of "filter" checkboxes
    flex.QueuesStats.QueuesDataTable.Content.add(
      <ColumnDefinition
        key="filter"
        header="filter"
        content={(props) =>
          <FilterCheckBox queueSid={props.key} filterObject={filterObject} key="fcb"/>
        }
      />,
      {sortOrder: 9}
    );

    // buttons to apply and remove filters
    flex.QueuesStatsView.Content.add(<FilterButtons key='fb' flex={flex} manager={manager} filterObject={filterObject}/>, {
      sortOrder: 0
    });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
