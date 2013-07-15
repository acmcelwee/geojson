var fs = require('fs'),
    fileName = process.argv[2],
    cleanedFileName = fileName.replace(/\.json/, '_cleaned.json'),
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
    ];

function cleanFeature(feature) {
  var props = feature.properties;

  Object.keys(props).forEach(function(property) {
    if (propsToRetain.indexOf(property) < 0) {
      delete props[ property ];
    }
  });
}

geoJSONToClean.features.forEach(cleanFeature);

fs.writeFile(cleanedFileName, JSON.stringify(geoJSONToClean, null, 4), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Cleaned JSON saved to ' + cleanedFileName);
  }
});
