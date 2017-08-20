/**
 * Created by Antony Repin on 8/4/2017.
 */

'use strict';

angular.module('AdminApp')
  .factory('carrierService',
    [
      'api',
      'settings',
      '$q',

      function (api,
                settings,
                $q) {

        return {
          getList: function () {
            return $q(function (resolve, reject) {
              api.get('carriers')
                .then(function (response) {
                  if (response.status === 200) {
                    resolve(response.data.data);
                  } else {
                    console.error(response);
                  }
                });
            });
          },
          /**
           *
           *
           * @param id
           * @returns {*}
           */
          get: function (id) {
            return $q(function (resolve, reject) {
              api.get('carriers/' + id)
                .then(function (response) {
                  if (response.status === 200) {
                    resolve(response.data.data[0]);
                  } else {
                    console.error(response);
                  }
                });
            });
          },
          /**
           * XHR call to add new Carrier account
           *
           * @param formData
           * @returns {*}
           */
          create: function (formData) {
            return $q(function (resolve, reject) {
              api.setContentType(undefined)
                .post('carriers/create', formData)
                .then(function (response) {
                  if (response.status === 200) {
                    resolve({
                      statusCode: 200,
                      data: response.data.data[0],
                    });
                  } else {
                    resolve({
                      messages: response.data.message,
                      status: response.statusText,
                      statusCode: response.status,
                    });
                  }
                });
            });

          },
          /**
           * XHR call to update existing Carrier account properties
           *
           * @param id {String}
           * @param formData {Object}
           * @returns {*}
           */
          update: function (id, formData) {
            return $q(function (resolve, reject) {
              formData.append('_method', "PUT");

              api.setContentType(undefined)
                .post('carriers/update/' + id, formData)
                .then(function (response) {
                  if (response.status === 200) {
                    resolve({
                      statusCode: 200,
                      data: response.data.data[0],
                    });
                  } else {
                    resolve({
                      messages: response.data.message,
                      status: response.statusText,
                      statusCode: response.status,
                    });
                  }
                });
            });
          },
        };
      }]
  );
