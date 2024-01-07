1. react-leaflet package

2. Leaflet package:

Either, install it using npm

npm install leaflet and
import 'leaflet/dist/leaflet.css'; in the file where you use Map from react-leaflet.

OR

Include these two lines in the index.html:

```sh
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""/>

<!-- Make sure you put this AFTER Leaflet's CSS -->
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
  integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
  crossorigin=""></script>
```

3. Add Height:

```sh
.leaflet-container {
  width: 100wh; 
  height: 100vh;
}
```

OR

```sh
<Map
   center={position}
   zoom={1}
   style={{ height: '100vh', width: '100wh' }}
   >
   <TileLayer .... />
</Map>
```