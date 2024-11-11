export class CreateAppointmentDto {
  date: string;
  time: string;
  reason: string;
  userId: number;
  status: "Activo" | "Cancelado";
}
