import multiReporter from '../reporter/multi-reporter.js';
import csvReporter from '../reporter/csv-reporter.js';
import consoleReporter from '../reporter/console-reporter.js';
import jsonReporter from '../reporter/json-reporter.js';
import htmlReporter from '../reporter/html-reporter.js';
import internalReporter from '../reporter/internal-reporter.js';
import xrayCloudReporter from '../reporter/xray-cloud-reporter.js';
import xrayOnpremiseReporter from '../reporter/xray-onpremise-reporter.js';

multiReporter.addReporter(csvReporter,);
multiReporter.addReporter(consoleReporter,);
multiReporter.addReporter(jsonReporter,);
multiReporter.addReporter(htmlReporter,);
multiReporter.addReporter(internalReporter,);
multiReporter.addReporter(xrayCloudReporter,);
multiReporter.addReporter(xrayOnpremiseReporter,);

export default multiReporter;
