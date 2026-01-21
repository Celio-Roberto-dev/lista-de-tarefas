"use client"

import { CheckCircle2, Clock, List } from "lucide-react"
import { Badge } from "./ui/badge"

export type FilterValue = "all" | "pending" | "completed"

type FilterProps = {
    currentFilter: FilterValue
    setCurrentFilter: React.Dispatch<React.SetStateAction<FilterValue>>
    taskCompletedCount: number
}

const Filter = ({currentFilter, setCurrentFilter, taskCompletedCount}: FilterProps) => {
  return (
    <div className="flex gap-2 mb-4">
      <Badge
        className="cursor-pointer"
        variant={currentFilter === "all" ? "default" : "outline"}
        onClick={() => setCurrentFilter("all")}
      >
        <List /> Todas
      </Badge>
      <Badge
        className="cursor-pointer"
        variant={currentFilter === "pending" ? "default" : "outline"}
        onClick={() => setCurrentFilter("pending")}
      >
        <Clock /> Em andamento
      </Badge>
      {taskCompletedCount > 0 && (
      <Badge
        className="cursor-pointer"
        variant={currentFilter === "completed" ? "default" : "outline"}
        onClick={() => setCurrentFilter("completed")}
      >
        <CheckCircle2 /> Concluídas
      </Badge>
      )}
    </div>
  )
}

export default Filter
