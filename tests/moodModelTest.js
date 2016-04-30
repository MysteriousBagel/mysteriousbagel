var expect = require('chai').expect;
var Mood = require('../server/models/moodModel.js');

require(__dirname + '/../server/index.js');

describe('Mood model', function() {

  it('should create a new Mood', function() {
    var newMood = Mood.create();
    expect(newMood).to.be.instanceOf(Object);
  });

});