export interface IAppointments {
  id: number;
  date: Date;
  time: string;
  userId: number;
  status: "Activo" | "Cancelado";
}
