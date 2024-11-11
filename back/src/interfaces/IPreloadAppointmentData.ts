export interface IPreloadAppointmentData {
  date: string;
  time: string;
  reason: string;
  status: "Activo" | "Cancelado";
  userId: number;
}
