# Notes
```bash
# 1-digit coordinate precision seems to be good enough for us.
ogr2ogr -f "GeoJSON" -lco COORDINATE_PRECISION=1 output.json input.json
node cleanProps.js output.json
```

