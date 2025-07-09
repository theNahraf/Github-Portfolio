"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Controllable contribution data - you can easily modify this
const contributionConfig = {
  // Set specific dates with contribution counts
  specificDates: {
    "2024-01-15": 5,
    "2024-01-16": 3,
    "2024-01-20": 8,
    "2024-02-01": 12,
    "2024-02-02": 7,
    "2024-02-15": 15,
    "2024-03-01": 4,
    "2024-03-10": 9,
    "2024-03-25": 6,
    "2024-04-05": 11,
    "2024-04-20": 8,
    "2024-05-01": 13,
    "2024-05-15": 7,
    "2024-06-01": 10,
    "2024-06-10": 5,
    "2024-07-04": 14,
    "2024-07-15": 9,
    "2024-08-01": 6,
    "2024-08-20": 12,
    "2024-09-05": 8,
    "2024-09-25": 11,
    "2024-10-10": 7,
    "2024-10-30": 15,
    "2024-11-15": 9,
    "2024-12-01": 13,
    "2024-12-20": 6,
    "2025-01-05": 10,
    "2025-01-15": 8,
  },

  // Default contribution level for other days (0 = no contributions)
  defaultLevel: 0,

  // Random contribution probability (0-1, where 0 = never, 1 = always)
  randomProbability: 0.3,

  // Maximum random contribution count
  maxRandomContributions: 4,
}

const getContributionColor = (count: number) => {
  if (count === 0) return "bg-[#161b22]"
  if (count < 5) return "bg-[#0e4429]"
  if (count < 10) return "bg-[#006d32]"
  if (count < 20) return "bg-[#26a641]"
  return "bg-[#39d353]"
}

const formatDateKey = (date: Date) => {
  return date.toISOString().split("T")[0]
}

const getContributionCount = (date: Date) => {
  const dateKey = formatDateKey(date)

  // Check if there's a specific contribution count for this date
  if (contributionConfig.specificDates[dateKey] !== undefined) {
    return contributionConfig.specificDates[dateKey]
  }

  // Use default level
  if (contributionConfig.defaultLevel > 0) {
    return contributionConfig.defaultLevel
  }

  // Random contributions based on probability
  if (Math.random() < contributionConfig.randomProbability) {
    return Math.floor(Math.random() * contributionConfig.maxRandomContributions) + 1
  }

  return 0
}

const ContributionGraph = () => {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(startDate.getDate() - 364)

  // Find the Sunday before or on the start date
  const startSunday = new Date(startDate)
  startSunday.setDate(startDate.getDate() - startDate.getDay())

  // Generate 371 days (53 weeks) to ensure we cover the full year
  const contributionData = []
  for (let i = 0; i < 371; i++) {
    const date = new Date(startSunday)
    date.setDate(startSunday.getDate() + i)
    contributionData.push({
      date,
      count: date <= today ? getContributionCount(date) : 0,
    })
  }

  // Group into weeks (7 days each)
  const weeks = []
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7))
  }

  // Calculate total contributions for the year
  const totalContributions = contributionData
    .filter((day) => day.date <= today)
    .reduce((sum, day) => sum + day.count, 0)

  // Get month labels
  const monthLabels = []
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  weeks.forEach((week, index) => {
    if (week[0] && week[0].date.getDate() <= 7) {
      monthLabels.push({
        index,
        month: months[week[0].date.getMonth()],
      })
    }
  })

  return (
    <Card className="bg-[#161b22] border-[#30363d] w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm sm:text-base">Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 space-y-3">
          <div className="text-xs sm:text-sm text-[#7d8590]">{totalContributions} contributions in the last year</div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto pb-2 w-full">
            <div className="min-w-[260px] sm:min-w-[280px] sm:min-w-[400px] lg:min-w-0">
              {/* Month labels row */}
              <div className="flex mb-1 mb-2 text-xs text-[#7d8590]">
                <div className="w-3 sm:w-4 sm:w-6 lg:w-8 flex-shrink-0"></div>
                {weeks.map((week, index) => {
                  const monthLabel = monthLabels.find((m) => m.index === index)
                  return (
                    <div key={index} className="w-1.5 sm:w-2 sm:w-2.5 text-center flex-shrink-0">
                      {monthLabel && <span className="text-xs">{monthLabel.month}</span>}
                    </div>
                  )
                })}
              </div>

              {/* Day labels and contribution grid */}
              <div className="flex">
                {/* Day labels column */}
                <div className="flex flex-col gap-0.5 gap-1 mr-1 text-xs text-[#7d8590] w-3 sm:w-4 sm:w-6 lg:w-8 flex-shrink-0">
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5"></div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5 flex items-center text-xs">M</div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5"></div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5 flex items-center text-xs">W</div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5"></div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5 flex items-center text-xs">F</div>
                  <div className="h-1 h-1.5 sm:h-2 lg:h-2.5"></div>
                </div>

                {/* Contribution grid */}
                <div className="flex gap-0.5 gap-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-0.5 gap-1 flex-shrink-0">
                      {week.map((day, dayIndex) => {
                        if (!day)
                          return (
                            <div key={dayIndex} className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 flex-shrink-0"></div>
                          )
                        const isToday = day.date.toDateString() === today.toDateString()
                        const isFuture = day.date > today

                        return (
                          <div
                            key={dayIndex}
                            className={`w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm ${
                              isFuture ? "bg-[#161b22]" : getContributionColor(day.count)
                            } hover:ring-1 hover:ring-[#58a6ff] transition-all cursor-pointer ${
                              isToday ? "ring-1 ring-[#58a6ff]" : ""
                            } flex-shrink-0`}
                            title={`${day.count} contributions on ${day.date.toDateString()}`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#7d8590]">
            <span>Less</span>
            <div className="flex items-center gap-0.5 gap-1">
              <div className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-[#161b22] flex-shrink-0" />
              <div className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-[#0e4429] flex-shrink-0" />
              <div className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-[#006d32] flex-shrink-0" />
              <div className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-[#26a641] flex-shrink-0" />
              <div className="w-1 h-1 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5 rounded-sm bg-[#39d353] flex-shrink-0" />
            </div>
            <span>More</span>
          </div>

          {/* Instructions for updating contributions */}
          <div className="mt-3 mt-4 p-2 p-3 bg-[#0d1117] border border-[#30363d] rounded-lg">
            <div className="text-xs text-[#7d8590]">
              <strong className="text-[#e6edf3]">To update contributions:</strong> Edit the `contributionConfig` object
              in `contribution.tsx`
              <br />• Add specific dates to `specificDates` object • Adjust `randomProbability` for random contributions
              • Set `defaultLevel` for consistent daily contributions
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContributionGraph