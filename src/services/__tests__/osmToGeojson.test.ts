import {
  node,
  overpassWay,
  overpassWayMeta,
  overpassBuggyWay,
} from './fixture';
import { osmToGeojson } from '../osmToGeojson';

describe('osmToGeojson()', () => {
  it('should convert osm_api node', async () => {
    const geojson = await osmToGeojson(node.xml);
    expect(geojson).toEqual(node.geojson);
  });

  it('should convert overpassWay', async () => {
    const geojson = await osmToGeojson(overpassWay.xml);
    expect(geojson).toEqual(overpassWay.geojson);
  });

  it('should convert overpassWayMeta', async () => {
    const geojson = await osmToGeojson(overpassWayMeta.xml);
    expect(geojson).toEqual(overpassWayMeta.geojson);
  });

  it('should convert overpassBuggyWay', async () => {
    const geojson = await osmToGeojson(overpassBuggyWay.xml);
    expect(geojson).toMatchObject({
      tags: { leisure: 'playground' },
      properties: { subclass: 'playground' },
    });
  });
});