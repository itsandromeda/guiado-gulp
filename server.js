/*global console, require*/
const express = require('express'),
      app = express();

//Aquí le decimos que use lo archivos estáticos
//y que se muestren al llamar
app.use('/', express.static('public'));

app.listen(3000, () => {
   console.log('Listening on 3000'); 
});