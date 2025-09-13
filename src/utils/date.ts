export function localUTCDate(date: string) {
  const [year, month, day] = date.split("-");
  const localDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
  );

  return localDate;
}


export function formatDate(date: string) {
  const localDate = localUTCDate(date);

  return localDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateWithTime(date: string) {
  const localDate = new Date(date);

  return localDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export function formatAge(date: string) {
  const today = new Date();
  const birthDate = localUTCDate(date);

  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }

  return age;
}

export function dateToDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function dateStringToDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}
