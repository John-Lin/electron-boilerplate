'use strict';
let handlebars = require('handlebars');
let layouts = require('handlebars-layouts');
let fs = require('fs');
let path = require('path');
let mkdirp = require('mkdirp');

mkdirp.sync(path.join(__dirname, '../pages'));

let input = path.join(__dirname, '../pages-content');
let pageFiles = fs.readdirSync(input);
let output = path.join(__dirname, '../pages');

let layoutPath = path.join(__dirname, '../layouts/layout.hbs');

// Register helpers
handlebars.registerHelper(layouts(handlebars));

// Register partials
handlebars.registerPartial('layout', fs.readFileSync(layoutPath, 'utf8'));

function buildPages(files) {
  files.forEach((file) => {

    let HTMLPath = path.join(__dirname, `../pages-content/${file}`);

    // Compile template
    let template = handlebars.compile(fs.readFileSync(HTMLPath, 'utf8'));

    // Render template
    let render = template({
      title: 'myApp',
    });
    fs.writeFileSync(path.join(output, file), render);
  });
}

buildPages(pageFiles);
