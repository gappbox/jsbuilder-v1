// Angular
import angular from 'angular';
import toastr from 'angular-toastr';
import clipboardModule from 'angular-clipboard';
import 'angular-translate';

// 3th party
import _ from 'lodash';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import prettyJs from 'pretty-js';

// Initialize
const zip = new JSZip();
const app = angular.module('JSBuilder', [toastr, clipboardModule.name, 'pascalprecht.translate']);

// Exports
export { angular, app, _, prettyJs, zip, FileSaver};