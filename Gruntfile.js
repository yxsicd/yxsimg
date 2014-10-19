module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: "min",
        mangle: false
      },
      build1: {
        src: 'src/javascript/**/*.js',
        dest: 'js/<%= pkg.name %>.min.js'
      },

      build2: {
        expand:true,
        cwd:'src/',
        src: 'javascript/**/*.js',
        dest: 'js/'
      },

      buildall: {
        tasks:['build1','build2']
      }

    },

    concat:{

    options: {
      separator: ';',
    },
    dist: {
      src: ['src/javascript/**/*.js'],
      dest: 'js/<%= pkg.name %>.min.js',
    }

    }



  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat']);

};