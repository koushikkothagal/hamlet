'use strict';

angular.module('hamlet')

  .factory('HashService', function() {

    return {

      getHash: function(source) {
        return new String(source).hashCode();
      },

      calculateMod: function(qualifier, ranges) {
        var hash = this.getHash(qualifier);
        var mod = hash % 10;
        if (mod < 0) {
          mod *= -1;
        }
        return mod;
      },
      allocateBucket: function(mod, ranges) {
        var cumulativeRangeEnd = ranges[0];
        if (mod <= cumulativeRangeEnd - 1) {
          return 0;
        }
        for (var i = 1; i < ranges.length; i++) {
          if (mod <= cumulativeRangeEnd - 1) {
            return i - 1;
          }
          else {
            cumulativeRangeEnd += ranges[i];
          }
        }
        return ranges.length - 1;
      },
      calculateBucket: function(qualifier, ranges) {
        var mod = this.calculateMod(qualifier, ranges);

        var bucket = this.allocateBucket(mod, ranges);
        return bucket;
      }




    }


  });
