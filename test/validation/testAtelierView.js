/*global casper*/

describe('Vue ateliers', () => {
  before(() => {
    casper.start('http://localhost:8080/ateliers');
  });

  it('Doit afficher la table des ateliers', () => {
    casper.then(() => {
      'table[class="table"]'.should.be.inDOM.and.be.visible;
    });
  });
});
