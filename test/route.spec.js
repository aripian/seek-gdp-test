var sinon = require('sinon');
var expect = require('chai').expect;
var express = require('express');
var supertest = require('supertest');
var route = require('../dist/route');

describe('GET /api', function() {
  var app, request;

  beforeEach(function() {
    app = express();
    app.set('router', express.Router());
    app.set('secret', 'secret-token');

    route(app);

    request = supertest(app);
  });

  it('Unprotected URL should respond with 200', function(done) {
    request
    .get('/api/unprotected')
    .expect('Content-Type', '/json/')
    .expect(200, function(err, res) {
      expect(res.body).to.deep.equal({
        success: true
      });
      done();
    });
  });


  it('Protected URL should respond with 403 without token', function(done) {
    request
    .get('/api/protected')
    .expect('Content-Type', '/json/')
    .expect(403, function(err, res) {
      expect(res.body).to.deep.equal({
        success: false,
        message: 'Unauthorized access'
      });
      done();
    });
  });

  it('Non existent URL should respond with 403 without token', function(done) {
    request
    .get('/api/protected')
    .expect('Content-Type', '/json/')
    .expect(403, function(err, res) {
      expect(res.body).to.deep.equal({
        success: false,
        message: 'Unauthorized access'
      });
      done();
    });
  });

  it('URL /api/token is unprotected', function(done) {
    request
    .get('/api/token')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200, done);
  });

  it('URL /api/protected can be accessed with correct token', function(done) {
    request
    .get('/api/token')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(function(res1) {
      expect(res1.body).to.include.keys('token');
      request
        .get('/api/protected')
        .set('x-access-token', res1.body.token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, function(err, res) {
          expect(res.body).to.deep.equal({
            success: true,
            message: 'Hello world'
          });
          done();
        });
    });
  });

  it('URL /api/protected cannot be accessed with invalid token', function(done) {
    request
    .get('/api/token')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(function(res1) {
      expect(res1.body).to.include.keys('token');
      request
        .get('/api/protected')
        .set('x-access-token', res1.body.token + '-1')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, function(err, res) {
          expect(res.body).to.deep.equal({
            success: false,
            message: 'Failed to authenticate token.'
          });
          done();
        });
    });
  });

  it('Non existent URL with correct token will return 404', function(done) {
    request
    .get('/api/token')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .then(function(res1) {
      expect(res1.body).to.include.keys('token');
      request
        .get('/api/test')
        .set('x-access-token', res1.body.token)
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(404, done);
    });
  });
});