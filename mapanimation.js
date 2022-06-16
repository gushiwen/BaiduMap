const path = [
  { 'lng': 121.481891, 'lat': 31.232801 },
  { 'lng': 121.485125, 'lat': 31.234662 },
  { 'lng': 121.489401, 'lat': 31.2367 },
  { 'lng': 121.492024, 'lat': 31.237039 },
  { 'lng': 121.493713, 'lat': 31.236607 },
  { 'lng': 121.496731, 'lat': 31.237811 }
];

const busStops = [
  { 'name': '人民广场', 'lng': 121.481891, 'lat': 31.232801 },
  { 'name': '上海大世界', 'lng': 121.485125, 'lat': 31.234662 },
  { 'name': '延福公园', 'lng': 121.489401, 'lat': 31.2367 },
  { 'name': '星腾大厦', 'lng': 121.493713, 'lat': 31.236607 },
  { 'name': '外滩', 'lng': 121.496731, 'lat': 31.237811 }
];

// Initiate map
let map = new BMapGL.Map("map");
let point = new BMapGL.Point(121.481891, 31.232801);
map.centerAndZoom(point, 16);
map.enableScrollWheelZoom(true);
// map.setHeading(80);
// map.setTilt(50);

// Add components to control the map
map.addControl(new BMapGL.ScaleControl());
map.addControl(new BMapGL.ZoomControl());
map.addControl(new BMapGL.CityListControl());
map.addControl(new BMapGL.MapTypeControl());
// map.setTrafficOn();

// add text at specified position
function addText(text, textStyle, position, offSet) {
  let label = new BMapGL.Label(text, {
    position: position,
    offset: new BMapGL.Size(offSet[0], offSet[1]),
  });
  map.addOverlay(label);
  label.setStyle(textStyle);
}

// Add a fake button on map
let btnStyle  = {
  color: '#000',
  fontSize: '25px',
  fontWeight: 'bold',
  padding: '10px 60px',
  border: '1px solid grey'
};
addText('点击生成 人民广场->外滩 巴士路线', btnStyle, point, [-100, 200]);

// Add bus stop markers on map dynamicly
let busStopStyle  = {
  color: '#000',
  fontSize: '12px',
  padding: '5px 10px',
  border: '1px solid grey'
};
let busStopMarkers = [];
let i = 0;
function move() {
  if (i >= busStops.length) return;
  // if (i > 0) map.removeOverlay(busStopMarkers[i-1]);
  let point = new BMapGL.Point(busStops[i].lng, busStops[i].lat);
  let myIcon = new BMapGL.Icon("./images/bus1.png", new BMapGL.Size(50, 25));
  let marker = new BMapGL.Marker(point, { icon: myIcon });
  busStopMarkers.push(marker);
  map.addOverlay(marker);
  addText(busStops[i].name, busStopStyle, point, [-30, -60]);
  i++;
  setTimeout(move, 2000);
}

// Draw the routine at one time
// map.addOverlay(new BMapGL.Polyline(path, { strokeColor: 'blue', strokeWeight: 6, strokeOpacity: 0.5 }));

// Make an array with path coordinates
let pathPoints = [];
path.forEach((item) => {
  let point = new BMapGL.Point(item.lng, item.lat);
  pathPoints.push(point);
});
// Draw the routine dynamicly
let pl = new BMapGL.Polyline(pathPoints);
var trackAni = new BMapGLLib.TrackAnimation(map, pl, {
  duration: 6000,   // 动画持续时长，默认为10000，单位ms
  delay: 3000,        // 动画开始的延迟，默认0，单位ms
  zoom: 16
});

// Call move and trackAni once mouse clicked
map.addEventListener('click', function(e) {
  move();
  trackAni.start();
});
