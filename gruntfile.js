module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            build: 'dist',
            banner: '/* <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy/m/d") %>\n' +
              '   <%= pkg.homepage %>\n' +
              '   Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
              ' - Licensed <%= _.pluck(pkg.license, "type").join(", ") %> */\n'
        },
        source: {
            javascript: [
                'src/dom.js',
                'src/dom.ajax.js',
                'src/dom.gesture.js',
                'src/dom.gesture.*.js'
            ]
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            all: {
                files: {
                    '<%= meta.build %>/<%= pkg.name %>.js': '<%= source.javascript %>'
                }
            }
        },
        watch: {
            js: {
                files: ['<%= source.javascript %>'],
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);

};