import { Atelier } from '../../src/srv/dao.js';
import chai from 'chai';
const should = chai.should(); // eslint-disable-line

describe('Atelier', function() {
  describe('#constructor(settings)', function() {
    it('should create an atelier', function() {
      var atelier = new Atelier({ titre: 'Foo' });
      atelier.getTitre().should.equal('Foo');
    });
  });
});
