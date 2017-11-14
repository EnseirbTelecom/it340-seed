/*global casper*/

describe('Vue accueil', () => {
  before(() => {
    casper.start('http://localhost:8080');
  });

  it('Doit afficher l\'accueil', () => {
    casper.then(() => {
      'div[class="jumbotron"]'.should.be.inDOM.and.be.visible;
    });
  });
});
