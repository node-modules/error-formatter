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
err.data = {foo: 'bar'};

describe('error-formater', function () {
  it('should format error to string', function () {
    var s = formater(err);
    s.should.containEql('DUPLICATEError');
    s.should.containEql('pid:');
    s.should.containEql('domainThrown:');
    s.should.containEql('URL:');
    s.should.containEql('Data: {"foo":"bar"}');
  });

  it('should formate error to json', function () {
    var s = formater.json(err);
    s.should.have.keys([
      'name',
      'message',
      'url',
      'data',
      'pid',
      'code',
      'host',
      'domainThrown',
      'time',
      'hostname',
      'stack'
    ]);
  });

  it('should formate both ok', function () {
    var s = formater.both(err);
    s.text.should.containEql('DUPLICATEError');
    s.text.should.containEql('pid:');
    s.text.should.containEql('domainThrown:');
    s.text.should.containEql('URL:');
    s.text.should.containEql('Data: {"foo":"bar"}');

    s.json.should.have.keys([
      'name',
      'message',
      'url',
      'data',
      'pid',
      'code',
      'host',
      'domainThrown',
      'time',
      'hostname',
      'stack'
    ]);
  })
});
