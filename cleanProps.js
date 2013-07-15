var fs = require('fs'),
    argv = require('optimist').default('pp', true).argv,
    fileName = argv._[0],
    cleanedFileName = fileName.replace(/\.geo\.json/, '_cleaned.geo.json'),
    prettyPrint = argv.pp,
    geoJSONToClean = require(fileName),
    propsToRetain = [
      'iso_3166_2',
      'sr_sov_a3',
      'sr_adm0_a3',
      'name',
      'name_alt',
      'code_hasc',
      'abbrev',
      'postal',
      'admin'
    ],
    output;

function cleanFeature(feature) {
  var props = feature.properties;

  Object.keys(props).forEach(function(property) {
    if (propsToRetain.indexOf(property) < 0) {
      delete props[ property ];
    }
  });
}

geoJSONToClean.features.forEach(cleanFeature);

// Go ahead and delete this , just in case, the gqis tool added it.
delete geoJSONToClean[ 'crs' ];

output = prettyPrint ? JSON.stringify(geoJSONToClean, null, 4) : JSON.stringify(geoJSONToClean);

fs.writeFile(cleanedFileName, output, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Cleaned JSON saved to ' + cleanedFileName);
  }
});
