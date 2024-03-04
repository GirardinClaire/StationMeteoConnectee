<template>
  <div class="Graph">
    <apexcharts type="line" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

const COLORS = {
  prsr: "#A62615",
  rain: "#008FFB",
  tmpr: "#00C53E",
  lght: "#DEAC63",
  hmdt: "#02F1F4",
  wspd: "#175F23",
  wdir: "#673F63",
};

const TITLES = {
  prsr: "Pression (hPa)",
  rain: "Pluie (mm/m2/h)",
  tmpr: "Température (°C)",
  lght: "Luminosité (Lux)",
  wspd: "Vitesse du vent (m/s)",
  wdir: "Direction du vent (deg)",
  hmdt: "Hygrométrie (%)",
};

//const KEYS = Object.keys(COLORS);

const MEASUREMENTS = {
  pressure: "prsr",
  rain: "rain",
  temperature: "tmpr",
  light: "lght",
  wind_speed: "wspd",
  wind_direction: "wdir",
  humidity: "hmdt",
};

export default {
  components: {
    apexcharts: VueApexCharts,
  },
  data: function () {
    return {
      data: [],
    };
  },
  computed: {
    series() {
      return this.data.map((data) => {
        return {
          name: `${data.origin} - ${data.type}`,
          type: "line",
          data: data.x.map((e, i) => [e, data.y[i]]),
        };
      });
    },
    colors() {
      return this.data.map((data) => {
        return COLORS[data.type];
      });
    },
    yaxis() {
      const axisModel = {};

      return this.data.map((data) => {
        const name = `${data.origin} - ${data.type}`;
        const min = Math.min(...data.y);
        const max = Math.max(...data.y);

        if (axisModel[data.type]) {
          const min_ = Math.min(min, axisModel[data.type].min);
          const max_ = Math.max(max, axisModel[data.type].max);
          axisModel[data.type].min = min_ - (max_ - min_) / 10;

          return {
            seriesName: axisModel[data.type].seriesName,
            show: false,
          };
        } else {
          axisModel[data.type] = {
            seriesName: name,
            show: true,
            axisBorder: { show: true, color: COLORS[data.type] },
            labels: {
              style: { colors: COLORS[data.type] },
              formatter: (val) => {
                const fact =
                  Math.pow(
                    10,
                    Math.floor(0.2 + Math.log(Math.abs(val)) / Math.log(10))
                  ) * 1e-4;
                const valStr = Math.round(val / fact) * fact + "";
                if (valStr.length > 8) {
                  let v = valStr.substring(0, 7) + " ";
                  return v.replaceAll("0 ", " ");
                }
                return valStr;
              },
            },
            min: min - (max - min) / 10 - 1e-10,
            max: max + (max - min) / 10 + 1e-10,
            title: {
              text: TITLES[data.type],
              style: { color: COLORS[data.type] },
            },
            tooltip: {
              enabled: true,
            },
          };
          return axisModel[data.type];
        }
      });
    },
    chartOptions() {
      return {
        responsive: [
          {
            breakpoint: null,
          },
        ],
        colors: this.colors,
        chart: {
          //height: 350,
          type: "line",
          stacked: false,
          width: "100%",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 1,
        },
        xaxis: {
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM yyyy",
              day: "dd MMM",
              hour: "HH:mm",
            },
          },
          type: "datetime",
        },
        yaxis: this.yaxis,
        legend: { horizontalAlign: "center" },
      };
    },
  },
  methods: {
    update() {
      this.series[0].data[0] += 10;
    },
    clear() {
      this.series = [];
      this.axis = [];
      this.data = [];
      return;
    },
    addData(data) {
      const name = data.name;
      const dates = data.measurements.date;

      const makeMeasures = (y, key) => {
        const measures =
          y instanceof Array ? y : new Array(dates.length).fill(y);
        this.data.push({
          x: dates,
          y: measures,
          type: MEASUREMENTS[key],
          origin: name,
        });
      };

      for (const key in data.measurements) {
        if (MEASUREMENTS[key]) {
          makeMeasures(data.measurements[key], key);
        } else {
          for (const key2 in data.measurements[key]) {
            const nKey = `${key}_${key2}`;
            if (MEASUREMENTS[nKey]) {
              makeMeasures(data.measurements[key][key2], nKey);
            }
          }
        }
      }

      return;
    },
  },
};
</script>

<style scoped>
.Graph {
  background-color: default;
  display: grid;
  grid-template-columns: 1fr;
}

.Graph .vue-apexcharts {
  background-color: rgba(133, 21, 35, 0.3);
}
</style>
