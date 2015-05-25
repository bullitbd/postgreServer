'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var Entry = require('../models/entry_model');

var servAddr = 'localhost:3000';
var testEntries = require('./test_text.js'); // items to populate db in before block

require('../server.js');

var testObjForPost = {
    tag: 'food',
    ideaBody: 'recipe for funny food',
    title: 'funny food'
};

var id = Math.floor(Math.random() * 4) + 1;
console.log('>>>>>>>>>>>>> ' + id);

describe('entriesApi endpoint tests', function() {
    before(function(done) {
        Entry.drop()
            .then (function() {
                Entry.sync()
                    .then(function() {
                        testEntries.forEach(function(entry) {
                            Entry.build(entry)
                                .save(function(err, data) {
                                    if (err) {
                                        console.log('save error => ' + err);
                                    }
                                    console.log(data);
                                });
                        });
                    });
                                            done();

            });

    });

    // it('should have a functioning before hook', function(done) {

    it('get request should return all records', function(done) {
        chai.request(servAddr)
            .get('/api/entries')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(true);
                done();
            });
    });

    it('get/id request should return associated record', function(done) {
        chai.request(servAddr)
            .get('/api/entries/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(false);
                expect(res.body.createdAt).to.not.equal('');
                expect(res.body).to.have.property('id');
                done();
            });

    });

    it('post request should create new record', function(done) {
        chai.request(servAddr)
            .post('/api/entries')
            .send(testObjForPost)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title');
                done();
            });
    });

    it('put request should replace requested record', function(done) {
        chai.request(servAddr)
            .put('/api/entries/' + id)
            .send({tag:'testing'})
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(res.body[0]).to.eql(1);
                done();
            });
    });

    it('delete request should remove requested record', function(done) {
        chai.request(servAddr)
            .delete('/api/entries/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                console.log('Delete res.body => ' + res.body);
                expect(res.body).to.eql(1);
                done();
            });
    });

    after(function(done) {
            done();
    });
});
