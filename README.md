# Install Dependencies
* QGIS
```bash
brew install qgis
npm install
```

# Notes
```bash

# Convert shapefile to geojson and extract relevant country/countries
# 2-digit coordinate precision seems to be good enough for my purposes.
ogr2ogr -f GeoJSON -where "Sr_adm0_a3 IN ('[COUNTRY_CODE]')" -lco COORDINATE_PRECISION=2 [COUNTRY].json ~/Desktop/geo/ne_50m_admin_1_states_provinces_lakes_shp/ne_50m_admin_1_states_provinces_lakes_shp.shp

# Or, if it's already in GeoJSON format
ogr2ogr -f "GeoJSON" -lco COORDINATE_PRECISION=1 output.json input.json

# Then clean up the files by removing unnecessary properties. Include --no-pp if you don't want pretty printed output in the file
node cleanProps.js output.json [--no-pp]
```

