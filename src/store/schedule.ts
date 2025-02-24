import { create } from "zustand"

interface Schedule {
  id: number;
  price: number;
  startName: string;
  startTime: string;
  trainName: string;
  endName: string;
  endTime: string;
}

interface ScheduleStore {
  schedules: Schedule[];
  addSchedule: (schedule: Schedule) => void;
  removeSchedule: (id: number) => void;
  updateSchedule: (updatedSchedule: Schedule) => void;
  clearSchedules: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedules: [],

  addSchedule: (schedule) => set((state) => ({
    schedules: [...state.schedules, schedule],
  })),

  removeSchedule: (id) => set((state) => ({
    schedules: state.schedules.filter((schedule) => schedule.id !== id),
  })),

  updateSchedule: (updatedSchedule) => set((state) => ({
    schedules: state.schedules.map((schedule) => schedule.id === updatedSchedule.id ? updatedSchedule : schedule),
  })),

  clearSchedules: () => set({ schedules: [] }),
}))