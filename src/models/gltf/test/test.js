import gltfBoundingBox from 'gltf-bounding-box';
 
const model = JSON.parse(fs.readFileSync('Test001.gltf'), 'utf8');
 
const boundings = gltfBoundingBox.computeBoundings(model);
 
// boundings:
{
  dimensions: {
    width: 3,
    depth: 2,
    height: 2,
  },
  center: {
    x: 0,
    y: 0,
    z: 0,
  },
}