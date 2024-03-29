
const Pitometer = require("@keptn/pitometer").Pitometer;
const ThresholdGrader = require("@keptn/pitometer-grader-threshold").Grader;
const NeoLoadDatasource = require('@neotys/pitometer-source-neoload').Source;


/*
pitometer.addSource(
  "Prometheus",
  new PrometheusSource({
    queryUrl: "http://localhost:9090/api/v1/query"
  })
);
*/
const pitometer = new Pitometer();

pitometer.addSource(
    "NeoLoad",
    new NeoLoadDatasource({
        neoloadapirul: "https://neoload-api.saas.neotys.com",
        neoloaduploadurl:"https://neoload-files.saas.neotys.com",
        apiToken: "dzedezdezdezd"
        // log: console.log,
    })
);

pitometer.addGrader("Threshold", new ThresholdGrader());

const end = new Date();
const start = new Date(new Date().setDate(new Date().getDate() - 2));

pitometer
    .run(require("./perfspec.demo-live.json"), {
        context: "production-run-12345",
        neoloadContext: {
            testid:"f2472490-34bd-45c4-a1e0-f426bf006daf"
        },
        timeStart: +start / 1000,
        timeEnd: +end / 1000,
    })
    .then(results => console.log(JSON.stringify(results)))
    .catch(err => console.error(err));