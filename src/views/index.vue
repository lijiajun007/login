<template>
  <main class="weather-page">
    <section class="hero-panel">
      <div>
        <p class="welcome">欢迎回来，{{ store.username || '同学' }}</p>
        <h1>近 30 天天气温度变化</h1>
      </div>
      <div class="summary-grid">
        <article class="summary-item">
          <span>平均高温</span>
          <strong>{{ averageHigh }}℃</strong>
        </article>
        <article class="summary-item">
          <span>平均低温</span>
          <strong>{{ averageLow }}℃</strong>
        </article>
        <article class="summary-item">
          <span>温差峰值</span>
          <strong>{{ maxRange }}℃</strong>
        </article>
      </div>
    </section>

    <section class="chart-panel">
      <div class="chart-header">
        <div>
          <h2>本月温度趋势</h2>
          <p>单位：摄氏度</p>
        </div>
        <span class="chart-badge">ECharts</span>
      </div>
      <div ref="chartRef" class="weather-chart" aria-label="一个月内天气温度变化折线图"></div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import { useIndexStore } from '../store/index.ts'

const store = useIndexStore()
const chartRef = ref<HTMLElement | null>(null)
let weatherChart: echarts.ECharts | null = null

const weatherData = [
  { date: '1日', high: 18, low: 9 },
  { date: '2日', high: 19, low: 10 },
  { date: '3日', high: 17, low: 8 },
  { date: '4日', high: 21, low: 11 },
  { date: '5日', high: 22, low: 12 },
  { date: '6日', high: 20, low: 11 },
  { date: '7日', high: 23, low: 13 },
  { date: '8日', high: 24, low: 14 },
  { date: '9日', high: 22, low: 13 },
  { date: '10日', high: 25, low: 15 },
  { date: '11日', high: 26, low: 16 },
  { date: '12日', high: 24, low: 15 },
  { date: '13日', high: 27, low: 17 },
  { date: '14日', high: 29, low: 18 },
  { date: '15日', high: 28, low: 18 },
  { date: '16日', high: 30, low: 19 },
  { date: '17日', high: 31, low: 20 },
  { date: '18日', high: 29, low: 18 },
  { date: '19日', high: 27, low: 17 },
  { date: '20日', high: 28, low: 18 },
  { date: '21日', high: 30, low: 20 },
  { date: '22日', high: 32, low: 21 },
  { date: '23日', high: 31, low: 20 },
  { date: '24日', high: 33, low: 22 },
  { date: '25日', high: 34, low: 23 },
  { date: '26日', high: 32, low: 21 },
  { date: '27日', high: 30, low: 20 },
  { date: '28日', high: 29, low: 19 },
  { date: '29日', high: 31, low: 20 },
  { date: '30日', high: 33, low: 22 },
]

const averageHigh = computed(() => getAverage(weatherData.map((item) => item.high)))
const averageLow = computed(() => getAverage(weatherData.map((item) => item.low)))
const maxRange = computed(() => Math.max(...weatherData.map((item) => item.high - item.low)))

const getAverage = (values: number[]) => {
  const total = values.reduce((sum, value) => sum + value, 0)
  return Math.round(total / values.length)
}

const buildChartOption = (): EChartsOption => ({
  color: ['#2563eb', '#f97316'],
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => `${value}℃`,
  },
  legend: {
    top: 4,
    right: 0,
    data: ['最高温', '最低温'],
  },
  grid: {
    top: 56,
    left: 48,
    right: 24,
    bottom: 44,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: weatherData.map((item) => item.date),
    axisLine: {
      lineStyle: {
        color: '#d7deea',
      },
    },
    axisLabel: {
      color: '#64748b',
    },
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 40,
    axisLabel: {
      color: '#64748b',
      formatter: '{value}℃',
    },
    splitLine: {
      lineStyle: {
        color: '#edf2f7',
      },
    },
  },
  series: [
    {
      name: '最高温',
      type: 'line',
      smooth: true,
      symbolSize: 7,
      lineStyle: {
        width: 3,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(37, 99, 235, 0.22)' },
          { offset: 1, color: 'rgba(37, 99, 235, 0.02)' },
        ]),
      },
      data: weatherData.map((item) => item.high),
    },
    {
      name: '最低温',
      type: 'line',
      smooth: true,
      symbolSize: 7,
      lineStyle: {
        width: 3,
      },
      data: weatherData.map((item) => item.low),
    },
  ],
})

const resizeChart = () => {
  weatherChart?.resize()
}

onMounted(() => {
  if (!chartRef.value) return

  weatherChart = echarts.init(chartRef.value)
  weatherChart.setOption(buildChartOption())
  window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
  weatherChart?.dispose()
})
</script>

<style scoped>
.weather-page {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  background: linear-gradient(135deg, #f6f9ff 0%, #eef6f4 48%, #fff7ed 100%);
  color: #162033;
  font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
}

.hero-panel {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: flex-end;
  max-width: 1180px;
  margin: 0 auto 28px;
}

.welcome {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 16px;
  font-weight: 600;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: 34px;
  line-height: 1.25;
  letter-spacing: 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(110px, 1fr));
  gap: 14px;
  min-width: 420px;
}

.summary-item {
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 8px;
  padding: 16px 18px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.08);
  text-align: left;
}

.summary-item span {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 14px;
}

.summary-item strong {
  color: #0f172a;
  font-size: 28px;
}

.chart-panel {
  max-width: 1180px;
  margin: 0 auto;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 8px;
  padding: 26px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h2 {
  margin-bottom: 6px;
  font-size: 22px;
  color: #0f172a;
}

.chart-header p {
  color: #64748b;
  font-size: 14px;
}

.chart-badge {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.weather-chart {
  width: 100%;
  height: 520px;
}

@media (max-width: 900px) {
  .weather-page {
    padding: 28px 18px;
  }

  .hero-panel {
    display: block;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    min-width: 0;
    margin-top: 22px;
  }

  h1 {
    font-size: 28px;
  }

  .chart-panel {
    padding: 20px 14px;
  }

  .weather-chart {
    height: 420px;
  }
}
</style>
