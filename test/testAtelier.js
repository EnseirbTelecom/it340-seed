import assert from 'assert';
import { Atelier } from '../src/srv/dao.js';

describe('Atelier', function() {
  describe('#constructor(settings)', function() {
    it('should create an atelier', function() {
      var atelier = new Atelier({ titre: 'Foo' });
      assert.equal(atelier.getTitre(), 'Foo');
    });
  });
});
