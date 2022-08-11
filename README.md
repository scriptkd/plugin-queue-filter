# Queue Filter Plugin

This plugin adds a checkbox column to the queues-stats-view table that lets supervisors see only the queues they select

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Create a file appConfig.js in the public directory. Copy the contents of appConfig.example.js into appConfig.

run:
`npm install`


## Development
to start the plugin locally, run:
`twilio flex:plugins:start`

to deploy the plugin to your flex instance run:
`twilio flex:plugins:build`
`twilio flex:plugins:deploy --changelog "v1"`

To release your plugin, open your Flex instance from the "Launch Flex" button in the Twilio Console.
In the Admin View, select the Manage button under "Plugins"
On the Manage Plugins page, find plugin-queue-filter. Save and release.
You must refresh your page before the change will take effect.
Go to your Queues Stats View to use your Filter Queues feature


Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

