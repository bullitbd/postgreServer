'use strict';

process.env.MONGO_URI='mongodb://localhost/entries_testdb';
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

var servAddr = 'localhost:3000';

require('../lib/server.js');

var testObj = {
    tag: "food",
    ideaBody: "recipe for food",
    title: "great food"
};

var id = "";

describe('entriesApi endpoint tests', function () {
    before(function(done) {
        chai.request(servAddr)
            .post('/api/entries')
            .send(testObj)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property("tag");
                // expect(res.body[0]).to.have.property("ideaBody");
                // expect(res.body[0]).to.have.property("title");
                id = res.body._id;

                done();
            });
    });
console.log(id);
    it('get request should return all records', function (done) {
        chai.request(servAddr)
            .get('/api/entries')
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(true);
                done();
            });
    } );


    it('get/:id request should return associated record', function (done) {} );
        console.log(id);
        chai.request(servAddr)
            .get('/api/entries/' + id)
            .end(function(err, res) {
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                expect(Array.isArray(res.body)).to.eql(true);
                // expect(res.body.length).to.equal(1);
                expect(res.body._id).to.eql(id);
                done();
            });

    it('post request should create new record', function (done) {} );
        chai.request(servAddr)
            .post('/api/entries')
            .send(testObj)
            .end(function(err, res) {
                console.log(testObj);
                expect(err).to.eql(null);
                expect(res).to.have.status(200);
                //expect(Array.isArray(res.body)).to.eql(true);
                expect(res.body.length).to.equal(1);
                expect(res.body._id).to.eql(id);
                done();
            });

    // it('put request should replace requested record', function (done) {} );
    //     chai.request(servAddr)
    //         .put('/api/entries/' + id)
    //         .send({tag:"testing"})
    //         .end(function(err, res) {
    //             expect(err).to.eql(null);
    //             expect(res).to.have.status(200);
    //             expect(res.body._id).to.eql(id);
    //             expect(res.body.tag).to.eql('testing');
    //             done();
    //         });


    after(function(done) {
        mongoose.connection.db.dropDatabase(function() {
            done();
        });
    });

});

