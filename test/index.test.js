/*!
 * error-formater - test/index.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var formater = require('../');

var err = new Error('test error');
err.host = '127.0.0.1';
err.code = 'DUPLICATE';
err.url = '/error';
err.data = {
  one: 'bar',
  tow: {
    a: 1,
    third: {
      hello: 'world',
      fourth: {
        foo: 'bar'
      }
    }
  }
};

describe('error-formatter', function () {
  it('should format error to string', function () {
    var s = formater(err);
    s.should.containEql('DUPLICATEError');
    s.should.containEql('pid:');
    s.should.containEql('URL:');
    s.should.containEql('Data: { one: \'bar\',\n  tow: { a: 1, third: { hello: \'world\', fourth: [Object] } } }');
  });

  it('should format error to json', function () {
    var s = formater.json(err);
    s.should.have.keys([
      'name',
      'message',
      'url',
      'data',
      'pid',
      'code',
      'host',
      'time',
      'hostname',
      'stack'
    ]);
  });

  it('should format non-error to json with exception', function () {
    (function () {
      formater.json("non-json");
    }).should.throw(/input non-error object: non-json/);
  });

  it('should format both ok', function () {
    var s = formater.both(err);
    s.text.should.containEql('DUPLICATEError');
    s.text.should.containEql('pid:');
    s.text.should.containEql('URL:');
    s.text.should.containEql('Data: { one: \'bar\',\n  tow: { a: 1, third: { hello: \'world\', fourth: [Object] } } }');

    s.json.should.have.keys([
      'name',
      'message',
      'url',
      'data',
      'pid',
      'code',
      'host',
      'time',
      'hostname',
      'stack'
    ]);
  })

  it('should format big data safely ok', function () {
    var buff = new Buffer(1025).fill('a');
    err.data = buff.toString();
    var s = formater(err);
    s.should.containEql('DUPLICATEError');
    s.should.containEql('pid:');
    s.should.containEql('URL:');
    var matched = s.match(/Data: '([^\n]*)/);
    var line = matched && matched[1];
    line.length.should.lessThan(1025);
  })
});
