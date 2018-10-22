/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe('');
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('URL defined and not empty', function() {
           for (let i in allFeeds) {
               expect(allFeeds[i].url).toBeDefined();
               expect(typeof allFeeds[i].url).toBe('string');
               expect(allFeeds[i].url).not.toBe('');
           };
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name defined and not empty', function() {
           for (let j in allFeeds) {
               expect(allFeeds[j].name).toBeDefined();
               expect(typeof allFeeds[j].name).toBe('string');
               expect(allFeeds[j].name).not.toBe('');
            };
        });
    });


    /* A test suite named "The menu" */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. I analyze the HTML and
         * the CSS to determine how I'm performing the
         * hiding/showing of the menu element.
         */
         it('menu element hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('changes visibility after a click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });

    });

    /* A test suite named "Initial Entries" */
    describe ('Initial Entries', function(){

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done){
            loadFeed(0, done);
            });

        it('LoadFeed called', function() {
            expect($('.feed').has('.entry').length).not.toBe(0);
        });

    });

    /* A test suite named "New Feed Selection" */
    describe ('New Feed Selection', function(){

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let initialFeed;
        let newFeed;

        beforeEach(function(done){
            loadFeed(0, function () {
                initialFeed = $('.feed').html();
                done();
            });
        });

        it('new feed loaded', function(done){

            loadFeed(1, function(){
                newFeed = $('.feed').html();
                expect(newFeed).not.toBe(initialFeed);
                done();
            });

        });
    });
}());
