module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],  // this tells Karma to use Jasmine

    files: [
      'node_modules/angular/angular.js',        // AngularJS core
      'node_modules/angular-mocks/angular-mocks.js',  // AngularJS mocks
      'controller.js',                          // your controller
      'test/**/*.spec.js'
    ],

    browsers: ['ChromeHeadless'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher'
    ],

    singleRun: true
  });
};
