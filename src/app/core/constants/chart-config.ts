export const FINANCE_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' as const },
  },
}

export const FINANCE_CHART_DATA = {
  labels: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer', ],
  datasets: [
    {
      label: 'Příjmy',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Výdaje',
      data: [0, 0, 0, 0, 0, 0],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ]
}

export function buildChartData(incomeByMonth: number[], expensesByMonth: number[]): typeof FINANCE_CHART_DATA {
  return {
    labels: ['Led', 'Úno', 'Bře', 'Dub', 'Kvě', 'Čer', 'Čvc', 'Srp', 'Zář', 'Říj', 'Lis', 'Pro'],
    datasets: [
      {
        ...FINANCE_CHART_DATA.datasets[0],
        data: incomeByMonth,
      },
      {
        ...FINANCE_CHART_DATA.datasets[1],
        data: expensesByMonth,
      }
    ]
  }
}
