/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');
var exphbs  = require('express-handlebars');

const fb = require('src/firebase');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .send('Jazz!')
//     .end();
// });
// fb.initialize();
app.use(express.static('build'));

app.engine('handlebars', exphbs({defaultLayout: 'template'}));
app.set('view engine', 'handlebars');


app.get('/', function (req, res) {
    res.render('preview', {name: "Tom Belino", description: "A human person"});
});


// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]
