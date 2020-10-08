# disbots.js
## An API Parser written by Cory (agentdid127)



Example Usage:


```js
const DISBOTS = require('disbots.js');

const disbots = new DISBOTS(client, auth, {port: port, path: path});


async function example() {
  let ex = await disbots.getUserBots('USERID');
  console.log(ex);
}
```
